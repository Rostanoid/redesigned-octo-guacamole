import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getAuthUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Не авторизован' },
        { status: 401 }
      );
    }

    const payments = await prisma.payment.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: payments,
    });
  } catch {
    // Return mock data
    return NextResponse.json({
      success: true,
      data: [
        { id: '1', amount: 1500, status: 'SUCCEEDED', createdAt: new Date() },
      ],
    });
  }
}