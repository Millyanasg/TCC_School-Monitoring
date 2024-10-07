import { apiInstance } from '@stores/common/api.store';
import { setCookie, get_cookie, delete_cookie } from './cookieUtil.service';
import { TokenPayloadWithExpiration } from '@backend/auth/strategies/TokenPayload';
import { RegisterDto } from '@backend/auth/dto/RegisterDto';
import { LoginDto } from '@backend/auth/dto/LoginDto';
import axios from 'axios';

export function jwtDecode(token: string): TokenPayloadWithExpiration {
  const data = JSON.parse(atob(token.split('.')[1]));

  if (!data) {
    throw new Error('Invalid token');
  }

  if (!data.email || !data.type || !data.iat || !data.exp) {
    throw new Error('Invalid token');
  }

  return {
    email: data.email,
    type: data.type,
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
    const response = await axios.post('/auth/refresh', null, {
      headers: {
        refresh_token: refreshToken,
      },
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

export function hasTokens() {
  const token = get_cookie('token');
  const refreshToken = get_cookie('refresh_token');

  return !!token && !!refreshToken;
}

export async function loginUser({ email, password }: LoginDto) {
  try {
    const response = await apiInstance.post('/auth/login', {
      email: email,
      password: password,
    });

    const { accessToken, refreshToken } = response.data;
    const accessTokenExpiration = getTokenExpirationTime(accessToken);
    const refreshTokenExpiration = getTokenExpirationTime(refreshToken);
    setCookie('token', `Bearer ${accessToken}`, accessTokenExpiration);

    setCookie('refresh_token', refreshToken, refreshTokenExpiration);

    return response.data;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}

export async function registerUser(data: RegisterDto) {
  try {
    const response = await apiInstance.post('/auth/register', data);

    const { accessToken, refreshToken } = response.data;
    const accessTokenExpiration = getTokenExpirationTime(accessToken);
    const refreshTokenExpiration = getTokenExpirationTime(refreshToken);
    setCookie('token', `Bearer ${accessToken}`, accessTokenExpiration);

    setCookie('refresh_token', refreshToken, refreshTokenExpiration);

    return response.data;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}
