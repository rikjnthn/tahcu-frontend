export default function cookieParser(
  cookie: string
): Record<string, string> | undefined {
  if (!cookie) return;

  const separetedCookies = cookie.split(";").map((cookie) => {
    const [name, value] = cookie.split("=");

    return {
      [name.trim()]: value,
    };
  });

  const cookiesObject = Object.assign({}, ...separetedCookies);

  return cookiesObject;
}
