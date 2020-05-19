import { onMount } from 'svelte';

export default function onOutsideClick (getElements, callback) {
  async function handleDocumentClick (event) {
    event.stopPropagation();
    const elements = getElements();
    if (!elements) return;

    const isInside = elements instanceof Array
      ? elements.some(el => el && el.contains(event.target))
      : elements.contains(event.target);

    if (!isInside) {
      callback(event);
    }
  }

  onMount(() => {
    document.addEventListener('mouseup', handleDocumentClick);
    return () => {
      document.removeEventListener('mouseup', handleDocumentClick);
    }
  });
}