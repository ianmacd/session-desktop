import React from 'react';
import moment from 'moment';

type Props = {
  time: number;
};

export const MessageClock = (props: Props): JSX.Element => {
  const { time } = props;

  moment.locale('en-gb');
  return <div style={{ fontSize: '0.8em', float: 'right' }}>
	   {moment(time).format('LT')}
	 </div>;
};
