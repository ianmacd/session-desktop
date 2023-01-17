import React, { useState } from 'react';
// tslint:disable: use-simple-attributes no-submodule-imports

import { useDispatch } from 'react-redux';
import { SessionButton } from '../../basic/SessionButton';
import { SessionIdEditable } from '../../basic/SessionIdEditable';
import { SessionSpinner } from '../../basic/SessionSpinner';
import { OverlayHeader } from './OverlayHeader';
import { resetOverlayMode } from '../../../state/ducks/section';
import { PubKey } from '../../../session/types';
import { ConversationTypeEnum } from '../../../models/conversationAttributes';
import { SNodeAPI } from '../../../session/apis/snode_api';
import { onsNameRegex } from '../../../session/apis/snode_api/SNodeAPI';
import { getConversationController } from '../../../session/conversations';
import { ToastUtils, UserUtils } from '../../../session/utils';
import { openConversationWithMessages } from '../../../state/ducks/conversations';
import useKey from 'react-use/lib/useKey';
import { YourSessionIDPill, YourSessionIDSelectable } from '../../basic/YourSessionIDPill';
import { Flex } from '../../basic/Flex';
import { SessionIconButton } from '../../icon';
import { SpacerMD } from '../../basic/Text';
import styled from 'styled-components';

const SessionIDDescription = styled.div`
  color: var(--text-secondary-color);
  font-family: var(--font-default);
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  text-align: center;
`;

function copyOurSessionID() {
  const ourSessionId = UserUtils.getOurPubKeyStrFromCache();
  if (!ourSessionId) {
    return;
  }
  window.clipboard.writeText(ourSessionId);
  ToastUtils.pushCopiedToClipBoard();
}

export const OverlayMessage = () => {
  const dispatch = useDispatch();

  function closeOverlay() {
    dispatch(resetOverlayMode());
  }

  useKey('Escape', closeOverlay);
  const [pubkeyOrOns, setPubkeyOrOns] = useState('');
  const [loading, setLoading] = useState(false);

  const title = window.i18n('newMessage');
  const buttonText = window.i18n('next');
  const subtitle = window.i18n('enterSessionID');
  const placeholder = window.i18n('enterSessionIDOrONSName');

  const disableNextButton = !pubkeyOrOns || loading;

  async function openConvoOnceResolved(resolvedSessionID: string) {
    const convo = await getConversationController().getOrCreateAndWait(
      resolvedSessionID,
      ConversationTypeEnum.PRIVATE
    );

    // we now want to show a conversation we just started on the leftpane, even if we did not send a message to it yet
    if (!convo.isActive() || !convo.isApproved()) {
      convo.set({ active_at: Date.now(), isApproved: true });
      await convo.commit();
    }

    await openConversationWithMessages({ conversationKey: resolvedSessionID, messageId: null });

    closeOverlay();
  }

  async function handleMessageButtonClick() {
    if (!pubkeyOrOns && !pubkeyOrOns.length) {
      ToastUtils.pushToastError('invalidPubKey', window.i18n('invalidNumberError')); // or ons name
      return;
    }
    //const pubkeyorOnsTrimmed = pubkeyOrOns.trim();
    const pubkeyorOnsTrimmed = pubkeyOrOns;

    if (!PubKey.validateWithErrorNoBlinding(pubkeyorOnsTrimmed)) {
      await openConvoOnceResolved(pubkeyOrOns);
      return;
    }

    // this might be an ONS, validate the regex first
    const mightBeOnsName = new RegExp(onsNameRegex, 'g').test(pubkeyorOnsTrimmed);
    if (!mightBeOnsName) {
      ToastUtils.pushToastError('invalidPubKey', window.i18n('invalidNumberError'));
      return;
    }
    setLoading(true);
    try {
      const resolvedSessionID = await SNodeAPI.getSessionIDForOnsName(pubkeyorOnsTrimmed);
      if (PubKey.validateWithErrorNoBlinding(resolvedSessionID)) {
        throw new Error('Got a resolved ONS but the returned entry is not a vlaid SessionID');
      }
      // this is a pubkey
      await openConvoOnceResolved(resolvedSessionID);
    } catch (e) {
      window?.log?.warn('failed to resolve ons name', pubkeyorOnsTrimmed, e);
      ToastUtils.pushToastError('invalidPubKey', window.i18n('failedResolveOns'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="module-left-pane-overlay">
      <OverlayHeader title={title} subtitle={subtitle} />

      <SessionIdEditable
        editable={!loading}
        placeholder={placeholder}
        onChange={setPubkeyOrOns}
        dataTestId="new-session-conversation"
        onPressEnter={handleMessageButtonClick}
      />

      <SessionSpinner loading={loading} />

      <SessionIDDescription>{window.i18n('startNewConversationBy...')}</SessionIDDescription>

      <Flex container={true} width="100%">
        <SpacerMD />
        <YourSessionIDPill />
        <SpacerMD />
      </Flex>
      <Flex
        container={true}
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        padding="0 var(--margins-md)" // YourSessionIDSelectable already has a left margin of 15px
      >
        <YourSessionIDSelectable />
        <SessionIconButton iconSize="small" iconType="copy" onClick={copyOurSessionID} />
      </Flex>
      <SessionButton
        text={buttonText}
        disabled={disableNextButton}
        onClick={handleMessageButtonClick}
        dataTestId="next-new-conversation-button"
      />
    </div>
  );
};
