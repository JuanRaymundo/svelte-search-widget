import { onMount } from 'svelte';

export default function onOutsideClick (getEl, callback) {
  async function handleDocumentClick (event) {
    event.stopPropagation();
    const el = getEl();
    if (el && !el.contains(event.target)) {
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