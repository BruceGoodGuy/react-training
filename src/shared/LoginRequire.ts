export async function requireAuth(request: Request): Promise<boolean | Boolean | null> {
  // return null;
  const status = await fetch(`${import.meta.env.VITE_API_URL}a/status`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await status.json();
  console.log("Response from auth status:", !response.success);

  if (!response.success) {
    const url = new URL(request.url);
    return Response.redirect(`/auth/login?redirectTo=${url.pathname}`, 302);
  }

  return false;
}
