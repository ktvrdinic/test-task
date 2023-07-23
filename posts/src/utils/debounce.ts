const debounce = (callback: (...arg: any) => any, delay: number) => {
 let timeoutId: NodeJS.Timeout;

 return (...args: any[]) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
   callback(...args);
  }, delay);
 };
};

export default debounce;
