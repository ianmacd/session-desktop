import classNames from 'classnames';
import React, { useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Data } from '../../../data/data';
import { useConversationPropsById, useIsPinned } from '../../../hooks/useParamSelector';
import { getUsBlindedInThatServer } from '../../../session/apis/open_group_api/sogsv3/knownBlindedkeys';
import { UserUtils } from '../../../session/utils';
import {
  openConversationToSpecificMessage,
  openConversationWithMessages,
} from '../../../state/ducks/conversations';
import { SectionType } from '../../../state/ducks/section';
import { isSearching } from '../../../state/selectors/search';
import { getFocusedSection } from '../../../state/selectors/section';
import { Timestamp } from '../../conversation/Timestamp';
import { SessionIcon } from '../../icon';
import { ContextConversationId } from './ConversationListItem';
import { UserItem } from './UserItem';

const NotificationSettingIcon = (props: { isMessagesSection: boolean }) => {
  const convoId = useContext(ContextConversationId);
  const convoSetting = useConversationPropsById(convoId)?.currentNotificationSetting;

  if (!props.isMessagesSection) {
    return null;
  }

  switch (convoSetting) {
    case 'all':
      return null;
    case 'disabled':
      return (
        <SessionIcon
          iconType="mute"
          iconColor={'var(--conversation-tab-text-color)'}
          iconSize="small"
        />
      );
    case 'mentions_only':
      return (
        <SessionIcon
          iconType="bell"
          iconColor={'var(--conversation-tab-text-color)'}
          iconSize="small"
        />
      );
    default:
      return null;
  }
};

const StyledConversationListItemIconWrapper = styled.div`
  svg {
    margin: 0px 2px;
  }

  display: flex;
  flex-direction: row;
`;

function useHeaderItemProps(conversationId: string) {
  const convoProps = useConversationPropsById(conversationId);
  if (!convoProps) {
    return null;
  }
  return {
    isPinned: !!convoProps.isPinned,
    mentionedUs: convoProps.mentionedUs || false,
    unreadCount: convoProps.unreadCount || 0,
    activeAt: convoProps.activeAt,
  };
}

const ListItemIcons = () => {
  const isMessagesSection = useSelector(getFocusedSection) === SectionType.Message;
  const conversationId = useContext(ContextConversationId);
  const isPinned = useIsPinned(conversationId);

  const pinIcon =
    isMessagesSection && isPinned ? (
      <SessionIcon
        iconType="pin"
        iconColor={'var(--conversation-tab-text-color)'}
        iconSize="small"
      />
    ) : null;
  return (
    <StyledConversationListItemIconWrapper>
      {pinIcon}
      <NotificationSettingIcon isMessagesSection={isMessagesSection} />
    </StyledConversationListItemIconWrapper>
  );
};

const MentionAtSymbol = styled.span`
  background: var(--unread-messages-alert-background-color);
  color: var(--unread-messages-alert-text-color);
  text-align: center;
  margin-top: 0px;
  margin-bottom: 0px;
  padding-inline-start: 3px;
  padding-inline-end: 3px;

  position: static;
  margin-inline-start: 5px;

  font-weight: 700;
  font-size: var(--font-size-xs);
  letter-spacing: 0.25px;

  height: 16px;
  min-width: 16px;
  border-radius: 8px;
  cursor: pointer;

  :hover {
    filter: grayscale(0.7);
  }
`;

export const ConversationListItemHeaderItem = () => {
  const conversationId = useContext(ContextConversationId);

  const isSearchingMode = useSelector(isSearching);

  const convoProps = useHeaderItemProps(conversationId);

  const openConvoToLastMention = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();

      // mousedown is invoked sooner than onClick, but for both right and left click
      if (e.button === 0) {
        const usInThatConversation =
          getUsBlindedInThatServer(conversationId) || UserUtils.getOurPubKeyStrFromCache();

        const oldestMessageUnreadWithMention =
          (await Data.getFirstUnreadMessageWithMention(conversationId, usInThatConversation)) ||
          null;
        if (oldestMessageUnreadWithMention) {
          await openConversationToSpecificMessage({
            conversationKey: conversationId,
            messageIdToNavigateTo: oldestMessageUnreadWithMention,
            shouldHighlightMessage: true,
          });
        } else {
          window.log.info('cannot open to latest mention as no unread mention are found');
          await openConversationWithMessages({
            conversationKey: conversationId,
            messageId: null,
          });
        }
      }
    },
    [conversationId]
  );

  if (!convoProps) {
    return null;
  }
  const { unreadCount, mentionedUs, activeAt } = convoProps;

  let atSymbol = null;
  let unreadCountDiv = null;
  if (unreadCount > 0) {
    atSymbol = mentionedUs ? (
      <MentionAtSymbol title="Open to latest mention" onMouseDown={openConvoToLastMention}>
        @
      </MentionAtSymbol>
    ) : null;
    unreadCountDiv = (
      <p className="module-conversation-list-item__unread-count">
        {unreadCount > 9999 ? '9999+' : unreadCount}
      </p>
    );
  }

  return (
    <div className="module-conversation-list-item__header">
      <div
        className={classNames(
          'module-conversation-list-item__header__name',
          unreadCount > 0 ? 'module-conversation-list-item__header__name--with-unread' : null
        )}
      >
        <UserItem />
      </div>
      <ListItemIcons />

      {unreadCountDiv}
      {atSymbol}

      {!isSearchingMode && (
        <div
          className={classNames(
            'module-conversation-list-item__header__date',
            unreadCount > 0 ? 'module-conversation-list-item__header__date--has-unread' : null
          )}
        >
          <Timestamp timestamp={activeAt} isConversationListItem={true} momentFromNow={true} />
        </div>
      )}
    </div>
  );
};
