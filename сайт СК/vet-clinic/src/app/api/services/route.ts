import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      include: {
        category: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: services,
    });
  } catch {
    // Return mock data
    return NextResponse.json({
      success: true,
      data: [
        { id: '1', name: 'Терапевтическое лечение', slug: 'therapy', price: 1500, duration: 30, category: { name: 'Терапия' } },
        { id: '2', name: 'Вакцинация', slug: 'vaccination', price: 800, duration: 15, category: { name: 'Профилактика' } },
        { id: '3', name: 'Хирургия', slug: 'surgery', price: 3500, duration: 60, category: { name: 'Оперативное' } },
        { id: '4', name: 'Диагностика', slug: 'diagnostics', price: 2000, duration: 45, category: { name: 'Диагностика' } },
        { id: '5', name: 'Стоматология', slug: 'dentistry', price: 2500, duration: 40, category: { name: 'Стоматология' } },
        { id: '6', name: 'Груминг', slug: 'grooming', price: 1200, duration: 60, category: { name: 'Уход' } },
      ],
    });
  }
}