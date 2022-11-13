export const debounce = (cb, duration) => {
  let timeout = null;
  return (argument) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(argument);
      timeout = null;
    }, duration);
  };
};
