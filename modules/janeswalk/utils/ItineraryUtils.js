// Default formatter
let dtfDate;

// Date formatted
if (typeof(Intl) === 'object') {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  };

  // FIXME: don't rely on this global
  try {
    const { locale: { name: locale = 'en-US' } = {} } = window.JanesWalk;
    dtfDate = new Intl.DateTimeFormat(locale.replace(/_/g, '-'), options);
  } catch(e) {
    dtfDate = new Intl.DateTimeFormat('en-US', options);
  }
}

// Cache the parsed dates
const _dateCache = {};

function formatDate(dateInMs) {
  if (dtfDate) {
    return dtfDate.format(dateInMs);
  } else {
    const date = new Date(dateInMs);
    const dateString = date.toUTCString();
    return dateString.slice(0, dateString.indexOf(' GMT'));
  }
}

export function dateFormatted(dateInSeconds) {
  let fromCache = _dateCache[dateInSeconds];
  let fromFormat;
  if (dateInSeconds) {
  if (fromCache) {
    return fromCache;
  } else {
    fromFormat = formatDate(dateInSeconds * 1000);
    _dateCache[dateInSeconds] = fromFormat;
    return fromFormat;
  }
  } else {
    // Invalid date
    return dateInSeconds;
  }
};
