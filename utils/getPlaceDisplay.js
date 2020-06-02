export default function getPlaceDisplay (place) {
  if (!place) return '';

  const {
    result_type,
    city_name,
    state,
    display,
  } = place;

  return `${city_name}, ${result_type === 'city' ? state : display}`;
}
