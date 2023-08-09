import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getRecentReactions } from '../../../../util/storage';
import { SessionIconButton } from '../../../icon';
import { nativeEmojiData } from '../../../../util/emoji';
import { isEqual } from 'lodash';
import { RecentReactions } from '../../../../types/Reaction';

type Props = {
  action: (...args: Array<any>) => void;
  additionalAction: (...args: Array<any>) => void;
};

const StyledMessageReactBar = styled.div`
  background-color: var(--emoji-reaction-bar-background-color);
  border-radius: 25px;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2), 0 0px 20px 0 rgba(0, 0, 0, 0.19);

  position: absolute;
  top: -128px;
  padding: 4px 8px;
  white-space: nowrap;
  width: 378px;

  display: flex;
  flex-flow: wrap;
  align-items: center;

  .session-icon-button {
    margin: 0 4px;
    &:hover svg {
      background-color: var(--chat-buttons-background-hover-color);
    }
  }
`;

const ReactButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;

  border-radius: 300px;
  cursor: pointer;
  font-size: 24px;

  :hover {
    background-color: var(--chat-buttons-background-hover-color);
  }
`;

export const MessageReactBar = (props: Props): ReactElement => {
  const { action, additionalAction } = props;
  const [recentReactions, setRecentReactions] = useState<RecentReactions>();

  useEffect(() => {
    const reactions = new RecentReactions(getRecentReactions());
    if (reactions && !isEqual(reactions, recentReactions)) {
      setRecentReactions(reactions);
    }
  }, []);

  if (!recentReactions) {
    return <></>;
  }

  return (
    <StyledMessageReactBar>
      {recentReactions &&
        recentReactions.items.map(emoji => (
          <ReactButton
            key={emoji}
            role={'img'}
            aria-label={nativeEmojiData?.ariaLabels ? nativeEmojiData.ariaLabels[emoji] : undefined}
            onClick={() => {
              action(emoji);
            }}
          >
            {emoji}
          </ReactButton>
        ))}
      <SessionIconButton
        iconColor={'var(--emoji-reaction-bar-icon-color)'}
        iconPadding={'8px'}
        iconSize={'huge'}
        iconType="plusThin"
        backgroundColor={'var(--emoji-reaction-bar-icon-background-color)'}
        borderRadius="300px"
        onClick={additionalAction}
      />
    </StyledMessageReactBar>
  );
};
