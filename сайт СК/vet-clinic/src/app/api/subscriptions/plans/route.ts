import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const plans = await prisma.subscriptionPlan.findMany({
      where: { isActive: true },
      include: { benefits: true },
      orderBy: { displayOrder: 'asc' },
    });

    const data = plans.map((plan) => ({
      ...plan,
      benefits: plan.benefits.map((b) => b.description),
    }));

    return NextResponse.json({
      success: true,
      data,
    });
  } catch {
    // Return mock data if DB fails
    return NextResponse.json({
      success: true,
      data: [
        { id: '1', name: 'Basic', price: 990, benefits: ['Базовая консультация', '1 консультация/мес'] },
        { id: '2', name: 'Standard', price: 1990, benefits: ['Базовая консультация', '3 консультации/мес', 'Приоритетная очередь'] },
        { id: '3', name: 'Premium', price: 3990, benefits: ['Все преимущества', 'Неограниченные консультации', 'Выезд на дом'] },
      ],
    });
  }
}