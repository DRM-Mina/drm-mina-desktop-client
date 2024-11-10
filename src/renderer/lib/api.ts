import { API_URL } from '@/env';

export async function fetchGameData() {
  const headers = { 'Content-Type': 'application/json' };
  const res = await fetch(API_URL + 'game-data', { headers, method: 'GET' });
  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json;
}

export async function toggleGameWishlist(
  userPubKey: string,
  gameId: number,
): Promise<boolean> {
  const headers = { 'Content-Type': 'application/json' };

  console.log('wishlist', userPubKey, gameId);

  const res = await fetch(API_URL + 'wishlist/' + userPubKey, {
    headers,
    method: 'POST',
    body: JSON.stringify({ gameId }),
  });

  const json = await res.json();
  const status = res.status;

  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to add wishlist API');
  }

  if (status == 201) {
    return false;
  } else {
    return true;
  }
}

export async function fetchWishlist(userPubKey: string) {
  const headers = { 'Content-Type': 'application/json' };

  const res = await fetch(API_URL + 'wishlist/' + userPubKey, {
    headers,
    method: 'GET',
  });
  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch wishlist API');
  }
  return json;
}

export async function fetchComments(
  gameId: number,
  page: number = 1,
  limit: number = 10,
): Promise<any> {
  const headers = { 'Content-Type': 'application/json' };
  const res = await fetch(
    `${API_URL}comments/${gameId}?page=${page}&limit=${limit}`,
    {
      headers,
      method: 'GET',
    },
  );
  if (!res.ok) {
    const errorResponse = await res.json();
    console.error(errorResponse.message);
    throw new Error(`Failed to fetch comments: ${errorResponse.message}`);
  }

  const json = await res.json();
  return json;
}
