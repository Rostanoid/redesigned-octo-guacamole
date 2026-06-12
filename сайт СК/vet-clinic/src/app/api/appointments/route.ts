import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { appointmentSchema } from '@/lib/validations';
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

    const appointments = await prisma.appointment.findMany({
      where: { userId: user.id },
      include: {
        service: true,
        vet: true,
      },
      orderBy: { startsAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: appointments,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

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
    const validated = appointmentSchema.parse(body);

    const service = await prisma.service.findUnique({
      where: { id: validated.serviceId },
    });

    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Услуга не найдена' },
        { status: 404 }
      );
    }

    const startsAt = new Date(validated.startsAt);
    const endsAt = new Date(startsAt.getTime() + service.duration * 60000);

    const appointment = await prisma.appointment.create({
      data: {
        userId: user.id,
        vetId: validated.vetId,
        serviceId: validated.serviceId,
        startsAt,
        endsAt,
        notes: validated.notes,
        pets: {
          connect: validated.petIds.map((id) => ({ id })),
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: appointment,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ошибка валидации' },
      { status: 400 }
    );
  }
}