const months = ['ene',
  'feb',
  'mar',
  'abr',
  'may',
  'jun',
  'jul',
  'ago',
  'sep',
  'oct',
  'nov',
  'dic',
];

function serializePlace(place) {
  if (!place) return null;
  return place.slug;
}

function serializeDate (date) {
  if (!date) return null;

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = `${date.getFullYear()}`.slice(-2);
  return `${day}-${month}-${year}`;
}

export default function serializeFields({
  origin,
  destination,
  departs,
  returns,
  // tripType,
  adults,
  children,
  infants,
}) {
  return {
    origin: serializePlace(origin),
    destination: serializePlace(destination),
    departs: serializeDate(departs),
    returns: serializeDate(returns),
    adults,
    children,
    infants,
  };
}
