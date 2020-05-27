export default function validateFields({ origin, destination, departs, returns, tripType }) {
  return {
    origin: !origin,
    destination: !destination,
    departs: tripType !== 'openTicket' && !departs,
    returns: tripType === 'round' && !returns,
  };
}
