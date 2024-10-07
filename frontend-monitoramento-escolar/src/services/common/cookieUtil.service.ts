const cookieDomain = [import.meta.env.VITE_DOMAIN as string];
export function setCookie(
  name: string,
  value: string,
  maxAgeSeconds: number,
  allowedDomains: string[] = cookieDomain,
) {
  const isLocalhost =
    cookieDomain.includes('localhost') || cookieDomain.length === 0;

  if (isLocalhost) {
    // domain cant be set to localhost
    document.cookie = `${name}=${value}; path=/; Max-Age=${maxAgeSeconds}`;
  } else {
    for (const domain of allowedDomains) {
      document.cookie = `${name}=${value}; path=/; Max-Age=${maxAgeSeconds}; domain=${domain}`;
    }
  }
}
/**
 * Deletes a cookie by setting its Max-Age to a negative value, effectively expiring it.
 *
 * @param {string} name - The name of the cookie to delete.
 * @param {string} path - The path of the cookie. Defaults to '/'.
 * @param {string[]} domains - An array of domain strings where the cookie is valid.
 *
 * @remarks
 * This function checks if the cookie exists before attempting to delete it.
 * It iterates over the provided domains and sets the cookie's Max-Age to -99999999 for each domain.
 */
export function delete_cookie(
  name: string,
  path: string = '/',
  domains: string[] = cookieDomain,
) {
  if (get_cookie(name)) {
    domains.forEach((domain) => {
      document.cookie =
        name +
        '=; path=' +
        (path || '/') +
        '; domain=' +
        domain +
        '; Max-Age=-99999999;';
    });
  }
}

/**
 * Retrieves the value of a specified cookie by its name.
 *
 * @param {string} name - The name of the cookie to retrieve.
 * @returns The value of the cookie if found, otherwise `undefined`.
 */
export function get_cookie(name: string): string | null {
  const nameEQ = name.replace(/[-.+*]/g, '\\$&') + '=';
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
}
