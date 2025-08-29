export function formatNumber(value, fixedDecimals = 4) {
    const n = +value.toFixed(fixedDecimals); // keeps rounding
    return n % 1 === 0 ? n.toString() : n.toFixed(fixedDecimals);
  }

export function debounce(fn, delay = 400) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}