import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import { sync as osLocaleSync } from 'os-locale';

const DateBreakContainer = styled.div``;

const DateBreakText = styled.div`
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  letter-spacing: 0.6px;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;

  color: var(--text-last-seen-indicator-color);
`;

export const MessageDateBreak = (props: { timestamp: number; messageId: string }) => {
  const { timestamp, messageId } = props;
  let dateFormat;
  if (window.getSettingValue('per-message-timestamps')) {
    dateFormat = {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: 'LL',
      sameElse: 'LL',
    }
  } else {
    moment.locale(osLocaleSync().replace(/_/g, '-'));
    dateFormat = {
      sameElse: 'llll',
    }
  }
  const text = moment(timestamp).calendar(undefined, dateFormat);

  return (
    <DateBreakContainer id={`date-break-${messageId}`}>
      <DateBreakText>{text}</DateBreakText>
    </DateBreakContainer>
  );
};
