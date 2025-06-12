export async function requireStaff(
  request: Request
): Promise<boolean | Boolean | null | Response> {
  // return null;
  const status = await fetch(`${import.meta.env.VITE_API_URL}s/status/staff`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await status.json();

  if (!response.success) {
    const url = new URL(request.url);
    return Response.redirect(`/pages/home`, 302);
  }

  return false;
}
