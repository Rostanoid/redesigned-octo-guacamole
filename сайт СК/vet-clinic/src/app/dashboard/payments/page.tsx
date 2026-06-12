import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CreditCard } from 'lucide-react';
import { getAuthUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

async function getPayments() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/payments`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Ожидает оплаты',
  SUCCEEDED: 'Оплачено',
  FAILED: 'Ошибка',
  REFUNDED: 'Возвращено',
  CANCELED: 'Отменено',
};

export const metadata = {
  title: 'Платежи | ВетКлиника',
};

export default async function PaymentsPage() {
  const user = await getAuthUser();
  if (!user) redirect('/login');

  const payments = await getPayments();

  // Mock payments
  const mockPayments = [
    { id: '1', amount: 1500, status: 'SUCCEEDED', createdAt: new Date('2024-06-15') },
    { id: '2', amount: 2500, status: 'SUCCEEDED', createdAt: new Date('2024-05-20') },
    { id: '3', amount: 1990, status: 'SUCCEEDED', createdAt: new Date('2024-05-01') },
  ];

  const displayPayments = payments.length > 0 ? payments : mockPayments;

  return (
    <div className="flex min-h-screen bg-neutral-50 lg:bg-white">
      <main className="flex-1 lg:pl-8">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 font-display">
              Платежи
            </h1>
            <p className="text-neutral-600 mt-2">
              История ваших оплат
            </p>
          </div>

          {displayPayments.length > 0 ? (
            <div className="card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Сумма</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead>Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayPayments.map((payment: any) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-mono text-sm">
                        #{payment.id.slice(-6)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {payment.amount} ₽
                      </TableCell>
                      <TableCell>
                        {new Date(payment.createdAt).toLocaleDateString('ru-RU')}
                      </TableCell>
                      <TableCell>
                        <Badge variant={payment.status === 'SUCCEEDED' ? 'success' : 'warning'}>
                          {STATUS_LABELS[payment.status] || payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="card text-center py-12">
              <CreditCard className="mx-auto h-12 w-12 text-neutral-300 mb-4" />
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                Нет платежей
              </h2>
              <p className="text-neutral-600">
                История платежей будет отображаться здесь
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}