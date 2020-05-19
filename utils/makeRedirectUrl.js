function serializePassengers (passengers) {
  const adults = `A${passengers.adults}`;
  const infants = passengers.infants ? `-I${passengers.infants}` : '';

  return `${adults}${infants}`;
}
const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

function serializeDate (date) {
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = `${date.getFullYear()}`.slice(-2);
  return `${day}-${month}-${year}`;
}

function makePathSegments ({ origin, destination, departs, returns, passengers, tripType }) {
  const segments = [
    'search',
    origin,
    destination,
    serializeDate(departs),
  ];

  if (tripType === 'round') {
    segments.push(serializeDate(returns));
  }

  segments.push(
    'p',
    serializePassengers(passengers),
    'providers',
  );

  return segments;
}

export default function makeRedirectUrl (fields, config) {
  const pathSegments = makePathSegments(fields);
  const url = [config.funnel, ...pathSegments].join('/');

  return url;
}
