import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function calcPrice(price: number, duration: string) {
  return duration === 'Yearly' ? '$' + price * 10 + '/yr' : '$' + price + '/mo';
}
