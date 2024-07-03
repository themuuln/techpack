export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function calcPrice(price: number, duration: string) {
  return duration === 'Yearly' ? '$' + price * 10 + '/yr' : '$' + price + '/mo';
}
