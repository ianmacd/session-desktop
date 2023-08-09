import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getShowScrollButton } from '../state/selectors/conversations';

import { SessionIconButton } from './icon';

const SessionScrollButtonDiv = styled.div`
  position: fixed;
  z-index: 2;
  right: 60px;
  animation: fadein var(--default-duration);

  .session-icon-button {
    background-color: var(--message-bubbles-received-background-color);
    box-shadow: var(--scroll-button-shadow);
  }
`;

export const SessionScrollButton = (props: { onClickScrollBottom: () => void, unreadCount: number }) => {
  const show = useSelector(getShowScrollButton);

  return (
    <SessionScrollButtonDiv>
      <SessionIconButton
        iconType="chevron"
        iconSize={'huge'}
        isHidden={!show}
        onClick={props.onClickScrollBottom}
        dataTestId="scroll-to-bottom-button"
	unreadCount={props.unreadCount}
      />
    </SessionScrollButtonDiv>
  );
};
