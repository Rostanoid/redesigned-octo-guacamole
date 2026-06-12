import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, MapPin, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAuthUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Ожидает подтверждения',
  CONFIRMED: 'Подтверждена',
  IN_PROGRESS: 'В процессе',
  COMPLETED: 'Завершена',
  CANCELED: 'Отменена',
  NO_SHOW: 'Неявка',
};

export const metadata = {
  title: 'Детали записи | ВетКлиника',
};

export default async function AppointmentDetailPage({ params }: { params: { id: string } }) {
  const user = await getAuthUser();
  if (!user) redirect('/login');

  // Mock appointment data
  const appointment = {
    id: params.id,
    startsAt: new Date('2024-06-30T14:00:00'),
    endsAt: new Date('2024-06-30T14:30:00'),
    status: 'CONFIRMED',
    notes: 'Проверка на наличие блох',
    service: { name: 'Терапевтическое осмотр', price: 1500 },
    vet: { firstName: 'Алексей', lastName: 'Смирнов', photoUrl: '/images/vet-1.jpg' },
    pets: [{ name: 'Шарик', type: 'DOG' }],
  };

  return (
    <div className="flex min-h-screen bg-neutral-50 lg:bg-white">
      <main className="flex-1 lg:pl-8">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/dashboard/appointments"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад к записям
          </Link>

          <div className="card mb-8">
            <div className="flex items-start justify-between mb-6">
              <h1 className="text-2xl font-bold text-neutral-900 font-display">
                Терапевтическое осмотр
              </h1>
              <Badge variant={appointment.status === 'CONFIRMED' ? 'success' : 'warning'}>
                {STATUS_LABELS[appointment.status]}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-neutral-500" />
                <span>{new Date(appointment.startsAt).toLocaleDateString('ru-RU')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-neutral-500" />
                <span>
                  {new Date(appointment.startsAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} —{' '}
                  {new Date(appointment.endsAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-neutral-500" />
                <span>
                  {appointment.vet.firstName} {appointment.vet.lastName}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-neutral-500" />
                <span>ул. Пушкинская, д. 15, Москва</span>
              </div>
            </div>

            {appointment.notes && (
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <h3 className="font-medium text-neutral-900 mb-2">Примечания</h3>
                <p className="text-neutral-600">{appointment.notes}</p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-neutral-200 flex items-center justify-between">
              <span className="font-semibold text-neutral-900">
                {appointment.service.price} ₽
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Отменить
                </Button>
                <Button size="sm">
                  Перенести
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}