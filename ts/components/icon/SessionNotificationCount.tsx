import React from 'react';
import styled from 'styled-components';

type Props = {
  chats?: number;
  count?: number;
};

const StyledCountContainer = styled.div<{ shouldRender: boolean }>`
  position: absolute;
  font-size: 18px;
  line-height: 1.2;
  top: 27px;
  left: 28px;
  padding: 3px 3px;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-default);
  border-radius: 58px;
  font-weight: 700;
  background: var(--unread-messages-alert-background-color);
  transition: var(--default-duration);
  opacity: ${props => (props.shouldRender ? 1 : 0)};
  text-align: center;
  color: var(--unread-messages-alert-text-color);
`;

const StyledCount = styled.div`
  position: relative;
  font-size: 0.6rem;
`;

export const SessionNotificationCount = (props: Props) => {
  const { count, chats } = props;
  const shouldRender = Boolean(count && count > 0);

  return (
    <StyledCountContainer shouldRender={shouldRender}>
      <StyledCount>{chats} /<br/>{count}</StyledCount>
    </StyledCountContainer>
  );
};
