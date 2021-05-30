import { GOOGLE_CLIENT_ID as CLIENT_ID, GOOGLE_API_KEY as API_KEY } from '../../../config';

declare global {
  interface Window {
    gapi: any;
  }
}

const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

const gapi = window.gapi;

export const addEventToGoogleCalendar = async (event: any) => {
  gapi.load('client:auth2', async () => {
    console.log('loaded client');
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    });
    const authInstance = await gapi.auth2.getAuthInstance();
    const signedIn = authInstance.isSignedIn.get();

    if (!signedIn) await authInstance.signIn();

    gapi.client.load('calendar', 'v3', () => {
      const request = gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });

      request.execute((event: any) => {
        window.location = event.htmlLink;
      });
    });
  });
};
