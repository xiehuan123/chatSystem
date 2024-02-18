export function useBounce() {
  const debounce = (fn, delay=1000) => {
    let timer = null
    return function (...args) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, delay)
    }
  }
  return {debounce}
}
