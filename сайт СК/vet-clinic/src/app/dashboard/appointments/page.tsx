import Link from 'next/link';
import { Plus, Calendar } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getAuthUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

async function getAppointments() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/appointments`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Ожидает подтверждения',
  CONFIRMED: 'Подтверждена',
  IN_PROGRESS: 'В процессе',
  COMPLETED: 'Завершена',
  CANCELED: 'Отменена',
  NO_SHOW: 'Неявка',
};

export const metadata = {
  title: 'Мои записи | ВетКлиника',
};

export default async function AppointmentsPage() {
  const user = await getAuthUser();
  if (!user) redirect('/login');

  const appointments = await getAppointments();

  return (
    <div className="flex min-h-screen bg-neutral-50 lg:bg-white">
      <main className="flex-1 lg:pl-8">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 font-display">
                Мои записи
              </h1>
              <p className="text-neutral-600 mt-2">
                История и предстоящие приемы
              </p>
            </div>
            <Link
              href="/dashboard/appointments/new"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Новая запись
            </Link>
          </div>

          {appointments.length > 0 ? (
            <div className="card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Дата и время</TableHead>
                    <TableHead>Услуга</TableHead>
                    <TableHead>Врач</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment: any) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        {new Date(appointment.startsAt).toLocaleDateString('ru-RU')} в{' '}
                        {new Date(appointment.startsAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                      </TableCell>
                      <TableCell>{appointment.service?.name || '—'}</TableCell>
                      <TableCell>
                        {appointment.vet ? `${appointment.vet.firstName} ${appointment.vet.lastName}` : '—'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={appointment.status === 'CONFIRMED' ? 'success' : 'warning'}>
                          {STATUS_LABELS[appointment.status] || appointment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link
                          href={`/dashboard/appointments/${appointment.id}`}
                          className="text-sm text-primary-600 hover:text-primary-700"
                        >
                          Подробнее
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="card text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-neutral-300 mb-4" />
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                Нет записей
              </h2>
              <p className="text-neutral-600 mb-6">
                Запишитесь к врачу для профилактики или лечения
              </p>
              <Link href="/dashboard/appointments/new" className="btn-primary inline-flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Записаться
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}