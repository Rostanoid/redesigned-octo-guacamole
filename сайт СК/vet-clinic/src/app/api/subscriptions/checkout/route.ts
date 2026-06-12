import { NextRequest, NextResponse } from 'next/server';
import { subscriptionCheckoutSchema } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Не авторизован' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validated = subscriptionCheckoutSchema.parse(body);

    // Mock checkout session
    const checkoutUrl = `/dashboard/subscription/checkout?plan=${validated.planId}&cycle=${validated.billingCycle}`;

    return NextResponse.json({
      success: true,
      data: {
        checkoutUrl,
        sessionId: `mock_session_${Date.now()}`,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Ошибка валидации' },
      { status: 400 }
    );
  }
}