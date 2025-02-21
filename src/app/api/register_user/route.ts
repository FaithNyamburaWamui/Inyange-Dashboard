import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const baseUrl = process.env.BASE_URL;
  try {
    const { last_name, first_name, email, password, phone_number, user_role, username } = await request.json();
    const response = await fetch(`${baseUrl}/api/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ last_name, first_name, email, password, username, user_role, phone_number }),
    });

    const textResponse = await response.text();
    console.log('Backend response:', textResponse, 'Status:', response.status);

    if (!response.ok) {
      try {
        const errorData = JSON.parse(textResponse);
        return NextResponse.json(
          { error: errorData.detail || 'Failed to create user' },
          { status: response.status }
        );
      } catch {
        // Removed '_e' since it's unused
        return NextResponse.json(
          { error: 'Unexpected response format from backend' },
          { status: response.status }
        );
      }
    }

    const result = JSON.parse(textResponse);
    console.log('User created successfully:', result);
    return NextResponse.json(result, { status: 201 });
    
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
