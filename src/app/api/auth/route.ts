import { NextRequest } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  if (!body?.accessToken || !body?.expiresIn) {
    return new Response(JSON.stringify({ error: 'Invalid authentication object' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const expiryTime = Date.now() + Number(body.expiresIn) * 1000;

  const newToken = {
    accessToken: body.accessToken,
    expiresIn: body.expiresIn,
    expiryTime,
  };

  const cookieValue = `auth=${JSON.stringify(newToken)}; Path=/; HttpOnly; Secure; SameSite=Lax`;

  return new Response(JSON.stringify({ message: 'success' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': cookieValue,
    },
  });
}

export async function GET(request: NextRequest) {
  const auth = request.cookies.get('auth');

  return new Response(auth?.value);
}

export async function DELETE() {
  // Specify the cookie name to delete
  const cookieName = 'auth';

  // Set the cookie with the same name but with an expired date to clear it
  const expiredCookie = `${cookieName}=; Path=/; HttpOnly; Secure; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;

  return new Response(JSON.stringify({ message: 'Cookie cleared' }), {
    status: 200,
    headers: {
      'Set-Cookie': expiredCookie,
      'Content-Type': 'application/json',
    },
  });
}
