function getURL(url: string) {
  const urlToReturn = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${url}`
    : `http://localhost:3000${url}`;

  return urlToReturn;
}

export default getURL;
