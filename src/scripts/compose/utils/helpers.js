let uniqueId = 0;

export function getUniqueId () {
  return uniqueId++;
}


let debounceTimer;

export function debounce (fn, time) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    fn();
  }, time);
}