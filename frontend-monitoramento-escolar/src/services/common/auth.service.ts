import { apiInstance } from '../../stores/common/api.store';
import { setCookie, get_cookie, delete_cookie } from './cookieUtil.service';

export function jwtDecode(token: string) {
  const data = JSON.parse(atob(token.split('.')[1]));

  if (!data) {
    throw new Error('Invalid token');
  }

  if (!data.email || !data.type || !data.id) {
    throw new Error('Invalid token');
  }

  return {
    email: data.email,
    type: data.type,
    id: data.id,
    iat: data.iat,
    exp: data.exp,
  };
}

export function getTokenExpirationTime(token: string): number {
  const tokenData = jwtDecode(token);
  const expirationTime = tokenData.exp - tokenData.iat;
  const remainingTime = expirationTime - 60; // 1 minuto antes da expiração
  return remainingTime;
}

async function renewSession(refreshToken: string) {
  try {
    const response = await apiInstance.post('/auth/refresh', {
      refreshToken,
    });

    const { token, refreshToken: newRefreshToken } = response.data;
    setCookie('token', `Bearer ${token}`, getTokenExpirationTime(token));
    setCookie(
      'refresh_token',
      newRefreshToken,
      getTokenExpirationTime(newRefreshToken),
    );
  } catch (error) {
    console.error('Refresh token error:', error);
    throw error;
  }
}
export async function refreshToken(): Promise<void> {
  try {
    const refreshToken = get_cookie('refresh_token');
    const token = get_cookie('token');

    if (refreshToken && !token) {
      const refreshTokenData = jwtDecode(refreshToken);

      if (refreshTokenData.exp * 1000 < Date.now()) {
        await logout();
        return;
      }

      await renewSession(refreshToken);
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    await logout();
  }
}

export async function get_userData() {
  const token = get_cookie('token');

  if (!token) {
    return;
  }
  const response = await apiInstance.get('/auth/me');

  return response.data;
}

export async function logout(): Promise<void> {
  localStorage.removeItem('authToken');
  const cookiesToRevoke = ['token', 'refresh_token'];

  for (const cookie of cookiesToRevoke) {
    delete_cookie(cookie);
  }

  // remove all local storage items
  localStorage.clear();

  // Aguarda a exclusão dos cookies
  await new Promise((resolve) => setTimeout(resolve, 200));
}

export async function registerUser({
  name,
  email,
  password,
  recaptcha,
}: {
  name: string;
  email: string;
  password: string;
  recaptcha: string;
}) {
  try {
    const response = await apiInstance.post('/auth/register', {
      email: email,
      password: password,
      name: name,
      recaptcha: recaptcha,
    });

    const { token, refreshToken } = response.data;

    setCookie('token', `Bearer ${token}`, getTokenExpirationTime(token));

    setCookie(
      'refresh_token',
      refreshToken,
      getTokenExpirationTime(refreshToken),
    );

    console.log(response.data, 'response');
    return response.data;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await apiInstance.post('/auth/login', {
      email: email,
      password: password,
    });

    const { token, refreshToken } = response.data;

    setCookie('token', `Bearer ${token}`, getTokenExpirationTime(token));

    setCookie(
      'refresh_token',
      refreshToken,
      getTokenExpirationTime(refreshToken),
    );

    return response.data;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}
