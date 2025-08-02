import { DateTime } from 'luxon';

// Just add four hours to all the dates. It's a hack and easier than trying to diagnose
// and triage this stupid problem across the entire data model.
// Note, this is a pretty large inconsistency in the data base and needs to be addressed evenetually.
export const convertToLocalDate = (dateString) => {
    return DateTime.fromISO(dateString).plus({ hours: 4 });
};

// export const devapiUrl = 'http://127.0.0.1:5001/xyz-moohh-fmbmobile-test/us-central1/app';
// export const testapiUrl = 'https://us-central1-xyz-moohh-fmbmobile-test.cloudfunctions.net/app';
// export const prodapiUrl = 'https://us-central1-xyz-moohh-fmbmobile.cloudfunctions.net/app';
export const apiUrl = 'https://us-central1-xyz-moohh-fmbmobile.cloudfunctions.net/app';
