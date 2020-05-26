function serializePassengers (passengers) {
  const adults = `A${passengers.adults}`;
  const children = passengers.children ? `-I${passengers.children}` : '';

  return `${adults}${children}`;
}
const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

function serializeDate (date) {
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = `${date.getFullYear()}`.slice(-2);
  return `${day}-${month}-${year}`;
}

function makePathSegments ({
  origin,
  destination,
  departs,
  returns,
  tripType,
  adults,
  children,
  infants,
}) {
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
    serializePassengers({ adults, children, infants }),
    'providers',
  );

  return segments;
}

export default function makeRedirectUrl (fields, config) {
  const pathSegments = makePathSegments(fields);
  const url = [config.funnel, ...pathSegments].join('/');

  return url;
}
