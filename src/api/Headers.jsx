import { load } from '../utils/LocalStorage';

export function headers() {
  const token = load('token');
  return {
    'Content-Type': 'application/json; charset=utf-8 ',
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchWToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers(),
  });
}
