export default function debounce (callback, time = 300) {
  let handler = 0;

  return (event) => {
    clearTimeout(handler);
    handler = setTimeout(() => callback(event), time);
  };
}