export const toAbsoluteUrl = (pathname) => process.env.PUBLIC_URL + pathname;
export function getCurrentUrl(location) {
  return location.pathname.split(/[?#]/)[0];
}
export function checkIsActive(location, url) {
  const current = getCurrentUrl(location);
  const currentSplit = current.split('/');

  if (!current || !url) {
    return false;
  }

  if (current === url) {
    return true;
  }

  if (url.split('/').every((urlPiece) => currentSplit.includes(urlPiece))) {
    return true;
  }

  return false;
}


