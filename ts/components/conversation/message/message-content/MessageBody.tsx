import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import LinkifyIt from 'linkify-it';
import MarkdownIt from 'markdown-it';
import katex from 'katex';
import { RenderTextCallbackType } from '../../../../types/Util';
import { getEmojiSizeClass, SizeClassType } from '../../../../util/emoji';
import { AddMentions } from '../../AddMentions';
import { AddNewLines } from '../../AddNewLines';
import { Emojify } from '../../Emojify';
import { LinkPreviews } from '../../../../util/linkPreviews';
import { showLinkVisitWarningDialog } from '../../../dialog/SessionConfirm';
import styled from 'styled-components';
import { PubKey } from '../../../../session/types';
import { isUsAnySogsFromCache } from '../../../../session/apis/open_group_api/sogsv3/knownBlindedkeys';
import { getConversationController } from '../../../../session/conversations';

const linkify = LinkifyIt();

const markdown = MarkdownIt('default', {
  html: false,
  linkify: true,
  typographer: true,
  // This seems not to work:
  breaks: false
  }
)
  // tslint:disable:no-var-requires no-require-imports
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-sup'))
  .use(require('markdown-it-ins'))
  .use(require('markdown-it-mark'))
  .use(require('markdown-it-container'), 'spoiler', {
    validate: (params: string) => {
      return params.trim().match(/^spoiler\s+(.*)$/);
    },

    render: (tokens: Array<any>, idx: number) => {
      const m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);

      if (tokens[idx].nesting === 1) {
        // opening tag
        return `<details><summary>${markdown.utils.escapeHtml(m[1])}</summary>\n`;
      } else {
        // closing tag
        return '</details>\n';
      }
    }
  })
  .use(require('markdown-it-container'), 'latex', {
    validate: (params: string) => {
      return params.trim().match(/^latex\s+(.*)$/);
    },

    render: (tokens: Array<any>, idx: number) => {
      const m = tokens[idx].info.trim().match(/^latex\s+(.*)$/);

      if (tokens[idx].nesting === 1) {
        // We don't call escapeHtml, so LaTeX must contain no Markdown.
        return katex.renderToString(m[1], {throwOnError: false});
      }
      return '\n';
    }
  })
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-highlightjs'), { inline: true }
  // tslint:enable:no-var-requires no-require-imports
);

type Props = {
  text: string;
  /** If set, all emoji will be the same size. Otherwise, just one emoji will be large. */
  disableJumbomoji: boolean;
  /** If set, links will be left alone instead of turned into clickable `<a>` tags. Used in quotes, convo list item, etc */
  disableLinks: boolean;
  isGroup: boolean;
};

const renderMentions: RenderTextCallbackType = ({ text, key, isGroup }) => (
  <AddMentions key={key} text={text} isGroup={isGroup} />
);

export const renderTextDefault: RenderTextCallbackType = ({ text }) => <>{text}</>;

const renderNewLines: RenderTextCallbackType = ({ text: textWithNewLines, key, isGroup }) => {
  return (
    // tslint:disable-next-line: use-simple-attributes
    <AddNewLines
      key={key}
      text={textWithNewLines}
      renderNonNewLine={isGroup ? renderMentions : renderTextDefault}
      isGroup={isGroup}
    />
  );
};

const renderEmoji = ({
  text,
  key,
  sizeClass,
  renderNonEmoji,
  isGroup,
}: {
  text: string;
  key: number;
  sizeClass: SizeClassType;
  renderNonEmoji: RenderTextCallbackType;
  isGroup: boolean;
}) => (
  <Emojify
    key={key}
    text={text}
    sizeClass={sizeClass}
    renderNonEmoji={renderNonEmoji}
    isGroup={isGroup}
  />
);

/**
 * This component makes it very easy to use all three of our message formatting
 * components: `Emojify`, `Linkify`, and `AddNewLines`. Because each of them is fully
 * configurable with their `renderXXX` props, this component will assemble all three of
 * them for you.
 */

const JsxSelectable = (jsx: JSX.Element): JSX.Element => {
  return (
    <span
      className="text-selectable"
      onDragStart={(e: any) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }}
      onDragEnd={(e: any) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }}
    >
      {jsx}
    </span>
  );
};

type LinkifyProps = {
  text: string;
  /** Allows you to customize now non-links are rendered. Simplest is just a <span>. */
  renderNonLink: RenderTextCallbackType;
  isGroup: boolean;
};

const SUPPORTED_PROTOCOLS = /^(http|https):/i;

const Linkify = (props: LinkifyProps): JSX.Element => {
  const { text, isGroup, renderNonLink } = props;
  const results: Array<any> = [];
  let count = 1;
  const dispatch = useDispatch();
  const matchData = linkify.match(text) || [];
  let last = 0;

  // disable click on <a> elements so clicking a message containing a link doesn't
  // select the message. The link will still be opened in the browser.
  const handleClick = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const url = e.target.href;

    showLinkVisitWarningDialog(url, dispatch);
  }, []);

  if (matchData.length === 0) {
    return renderNonLink({ text, key: 0, isGroup });
  }

  matchData.forEach((match: { index: number; url: string; lastIndex: number; text: string }) => {
    if (last < match.index) {
      const textWithNoLink = text.slice(last, match.index);
      results.push(renderNonLink({ text: textWithNoLink, isGroup, key: count++ }));
    }

    const { url, text: originalText } = match;
    const isLink = SUPPORTED_PROTOCOLS.test(url) && !LinkPreviews.isLinkSneaky(url);
    if (isLink) {
      results.push(
        <a key={count++} href={url} onClick={handleClick}>
          {originalText}
        </a>
      );
    } else {
      results.push(renderNonLink({ text: originalText, isGroup, key: count++ }));
    }

    last = match.lastIndex;
  });

  if (last < text.length) {
    results.push(renderNonLink({ text: text.slice(last), isGroup, key: count++ }));
  }

  return <>{results}</>;
};

const StyledPre = styled.pre`
  backdrop-filter: brightness(0.8);
  padding: var(--margins-xs);
  user-select: text;
`;

export const MessageBody = (props: Props) => {
  const { text, disableJumbomoji, disableLinks, isGroup } = props;
  const sizeClass: SizeClassType = disableJumbomoji ? 'default' : getEmojiSizeClass(text);

  if (disableLinks) {
    return JsxSelectable(
      renderEmoji({
        text,
        sizeClass,
        key: 0,
        renderNonEmoji: renderNewLines,
        isGroup,
      })
    );
  }

  if (window.getSettingValue('message-formatting')) {
    const onlyEmoji = text.match(/^((\ud83c[\udde6-\uddff]){2}|([\#\*0-9]\u20e3)|(\u00a9|\u00ae|[\u2000-\u3300]|[\u/d83c-\ud83e][\ud000-\udfff])((\ud83c[\udffb-\udfff])?(\ud83e[\uddb0-\uddb3])?(\ufe0f?\u200d([\u2000-\u3300]|[\ud83c-\ud83e][\ud000-\udfff])\ufe0f?)?)*)$/)

    if (!onlyEmoji) {
      /* Resolve mentioned ids to user names and mark them up in bold */
      const mention = new RegExp(`@${PubKey.regexForPubkeys}`, 'g');
      const textWithMentions = text.trim().replace(mention,
        (_match, capture) => {
          if (isUsAnySogsFromCache(capture)) {
            /* It's me. Italicise also. */
            return `***@${window.i18n('you')}***`;
          }

          /* It's someone else. */
          return `**@${getConversationController().get(capture)?.getContactProfileNameOrShortenedPubKey() || PubKey.shorten(capture)}**`;
        }
      );

      /* tslint:disable:react-no-dangerous-html */
      return (
        <div className="text-selectable"
             dangerouslySetInnerHTML={{__html: `<span style="font-size: 1.1em;">${markdown.render(textWithMentions)}</span>`}}
        />
      );
    }
  }

  if (text && text.startsWith('```') && text.endsWith('```') && text.length > 6) {
    return <StyledPre className="text-selectable">{text.substring(4, text.length - 3)}</StyledPre>;
  }

  return JsxSelectable(
    <Linkify
      text={text}
      isGroup={isGroup}
      renderNonLink={({ key, text: nonLinkText }) => {
        return renderEmoji({
          text: nonLinkText,
          sizeClass,
          key,
          renderNonEmoji: renderNewLines,
          isGroup,
        });
      }}
    />
  );
};
