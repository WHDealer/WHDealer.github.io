import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { loadingRequest } from '../../../store/loading/actions';
import { addEventToGoogleCalendar } from './googleCalendarAPI';

const GoogleCalendar: React.FC<RouteComponentProps> = (props) => {
  const query = new URLSearchParams(props.location?.search);
  const summary = query.get('summary') || '';
  const start = query.get('start') || '';
  const end = query.get('end') || '';

  const dispatch = useDispatch();

  const event = {
    summary: summary,
    // location: '800 Howard St., San Francisco, CA 94103',
    // description: 'Really great refreshments',
    start: {
      dateTime: start,
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: end,
      timeZone: 'America/Los_Angeles',
    },
    // recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
    // attendees: [{ email: 'lpage@example.com' }, { email: 'sbrin@example.com' }],
    reminders: {
      useDefault: false,
      overrides: [
        // { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 15 },
      ],
    },
  };

  useEffect(() => {
    dispatch(loadingRequest());
    addEventToGoogleCalendar(event);
  });

  return <div />;
};

export default GoogleCalendar;
