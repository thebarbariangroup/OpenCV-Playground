let uniqueId = 0;

export function getUniqueId () {
  return uniqueId++;
}


export function debounce (fn, time, timer) {
  clearTimeout(timer);
  return setTimeout(() => {
    fn();
  }, time);
}
