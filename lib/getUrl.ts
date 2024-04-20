function getURL(url: string) {
  return process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${url}`
    : `http://localhost:3000${url}`;
}

export default getURL;
