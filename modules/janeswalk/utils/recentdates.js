/**
 * Grab the day the 3rd most recent walk appears on
 */
import moment from 'moment';

// Actually a little before today
const today = moment.utc();
today.hours(0);
today.minutes(0);
today.seconds(0);

export function thirdRecentDate(outings) {
  if (outings.length) {
    const lastThree = outings.slice(-3);
    // Find the day the walk starts
    if (lastThree[0].slot) {
      const lastDate = new Date(lastThree[0].slot[0] * 1000);
      lastDate.setUTCHours(0);
      lastDate.setUTCMinutes(0);
      return lastDate;
    }
  }
  return null;
}

export function thirdRecentDateRange(outings) {
  const thirdDate = thirdRecentDate(outings);
  if (thirdDate && thirdDate < today) {
    return [moment(thirdDate.getTime()), null];
  }
  return [today, null];
}
