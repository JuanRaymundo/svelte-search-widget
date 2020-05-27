function serializePassengers (passengers) {
  const adults = `A${passengers.adults}`;
  const children = passengers.children ? `-I${passengers.children}` : '';

  return `${adults}${children}`;
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
    departs,
  ];

  if (tripType === 'round') {
    segments.push(returns);
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
