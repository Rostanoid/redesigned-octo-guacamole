import { redirect } from 'next/navigation';
import { Users, Calendar, CreditCard, Star } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getAuthUser } from '@/lib/auth';

async function getStats() {
  // Mock stats
  return {
    totalUsers: 1247,
    totalAppointments: 342,
    totalRevenue: 245600,
    avgRating: 4.8,
  };
}

export const metadata = {
  title: 'Админ панель | ВетКлиника',
};

export default async function AdminPage() {
  const user = await getAuthUser();
  if (!user) redirect('/login');

  const stats = await getStats();

  return (
    <div className="flex min-h-screen bg-neutral-50 lg:bg-white">
      <main className="flex-1 lg:pl-8">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 font-display">
              Админ панель
            </h1>
            <p className="text-neutral-600 mt-2">
              Управление клиникой
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="card">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  <p className="text-sm text-neutral-600">Пользователей</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-accent-100 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-accent-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalAppointments}</p>
                  <p className="text-sm text-neutral-600">Записей</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} ₽</p>
                  <p className="text-sm text-neutral-600">Выручка</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Star className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.avgRating}</p>
                  <p className="text-sm text-neutral-600">Средний рейтинг</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-8">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              Последние записи
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead>Клиент</TableHead>
                  <TableHead>Врач</TableHead>
                  <TableHead>Статус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { date: '2024-06-30', client: 'Иванов А.', vet: 'Смирнов А.', status: 'CONFIRMED' },
                  { date: '2024-06-30', client: 'Петрова М.', vet: 'Кузнецова Е.', status: 'PENDING' },
                  { date: '2024-06-29', client: 'Сидоров В.', vet: 'Смирнов А.', status: 'COMPLETED' },
                ].map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.client}</TableCell>
                    <TableCell>{row.vet}</TableCell>
                    <TableCell>
                      <Badge variant={row.status === 'CONFIRMED' ? 'success' : 'warning'}>
                        {row.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              Статистика доходов
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-neutral-600">Январь</span>
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600" style={{ width: '30%' }} />
                  </div>
                  <span className="text-sm font-medium w-16 text-right">30%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600">Февраль</span>
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600" style={{ width: '45%' }} />
                  </div>
                  <span className="text-sm font-medium w-16 text-right">45%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600">Март</span>
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600" style={{ width: '100%' }} />
                  </div>
                  <span className="text-sm font-medium w-16 text-right">100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}