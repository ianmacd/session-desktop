/* global window, dcodeIO, textsecure, StringView */

// eslint-disable-next-line func-names
(function() {
  let server;

  function stringToArrayBufferBase64(string) {
    return dcodeIO.ByteBuffer.wrap(string, 'base64').toArrayBuffer();
  }

  const Response = function Response(options) {
    this.verb = options.verb || options.type;
    this.path = options.path || options.url;
    this.body = options.body || options.data;
    this.success = options.success;
    this.error = options.error;
    this.id = options.id;

    if (this.id === undefined) {
      const bits = new Uint32Array(2);
      window.crypto.getRandomValues(bits);
      this.id = dcodeIO.Long.fromBits(bits[0], bits[1], true);
    }

    if (this.body === undefined) {
      this.body = null;
    }
  };

  const IncomingHttpResponse = function IncomingHttpResponse(options) {
    const request = new Response(options);

    this.verb = request.verb;
    this.path = request.path;
    this.body = request.body;

    this.respond = (status, message) => {
      // Mock websocket response
      window.log.info(status, message);
    };
  };


  window.HttpResource = function HttpResource(_server, opts = {}) {
    server = _server;
    let { handleRequest } = opts;
    if (typeof handleRequest !== 'function') {
      handleRequest = request => request.respond(404, 'Not found');
    };
    let connected = false;

    this.startPolling = async function pollServer(callBack) {
      const myKeys = await textsecure.storage.protocol.getIdentityKeyPair();
      const pubKey = StringView.arrayBufferToHex(myKeys.pubKey)
      let result;
      try {
        result = await server.retrieveMessages(pubKey);
        connected = true;
      } catch(err) {
        connected = false;
        setTimeout(() => { pollServer(); }, 5000);
        return;
      }
      if (typeof handleRequest === 'function') {
        callBack(connected);
      }
      if (!result.messages) {
        setTimeout(() => { pollServer(); }, 5000);
        return;
      }
      result.messages.forEach(async message => {
        const { data } = message;
        const dataPlaintext = stringToArrayBufferBase64(data);
        const messageBuf = textsecure.protobuf.WebSocketMessage.decode(dataPlaintext);
        if (messageBuf.type === textsecure.protobuf.WebSocketMessage.Type.REQUEST) {
          handleRequest(
            new IncomingHttpResponse({
              verb: messageBuf.request.verb,
              path: messageBuf.request.path,
              body: messageBuf.request.body,
              id: messageBuf.request.id,
            })
          );
        }
      });
      setTimeout(() => { pollServer(); }, 5000);
    };

    this.isConnected = function isConnected() {
      return connected;
    }
  };
})();