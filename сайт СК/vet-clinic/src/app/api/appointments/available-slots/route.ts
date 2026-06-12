import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const vetId = searchParams.get('vetId');
    const date = searchParams.get('date');

    if (!vetId || !date) {
      return NextResponse.json(
        { success: false, error: 'Необходимо указать vetId и date' },
        { status: 400 }
      );
    }

    const schedules = await prisma.schedule.findMany({
      where: {
        veterinarianId: vetId,
        isActive: true,
      },
    });

    // Generate available slots based on schedule
    const dayOfWeek = new Date(date).getDay();
    const schedule = schedules.find(s => s.dayOfWeek === dayOfWeek);

    if (!schedule) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    const slots: string[] = [];
    const [startHour, startMin] = schedule.startTime.split(':').map(Number);
    const [endHour, endMin] = schedule.endTime.split(':').map(Number);
    
    const startTime = new Date(date);
    startTime.setHours(startHour, startMin, 0, 0);
    
    const endTime = new Date(date);
    endTime.setHours(endHour, endMin, 0, 0);

    let current = new Date(startTime);
    while (current < endTime) {
      slots.push(current.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));
      current.setTime(current.getTime() + schedule.slotDuration * 60000);
    }

    return NextResponse.json({
      success: true,
      data: slots,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}