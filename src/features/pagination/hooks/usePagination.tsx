const usePagination = (current: number, last: number, delta: number) => {
  const leftSibling = current - delta;
  const rightSibling = current + delta + 1;
  const pageNumbers = [];

  for (let i = 2; i < last; i += 1) {
    if (i >= leftSibling && i < rightSibling) {
      pageNumbers.push(i);
    }
  }

  if (current === 3 + delta) pageNumbers.unshift(2);
  if (current === last - 2 - delta) pageNumbers.push(last - 1);

  return pageNumbers;
};

export default usePagination;
