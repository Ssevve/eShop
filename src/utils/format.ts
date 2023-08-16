export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }

  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
}