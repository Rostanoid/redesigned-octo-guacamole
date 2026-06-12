'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import { AppointmentForm } from '@/components/sections/appointment-form';

export const metadata = {
  title: 'Новая запись | ВетКлиника',
};

export default function NewAppointmentPage() {
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

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 font-display">
              Новая запись
            </h1>
            <p className="text-neutral-600 mt-2">
              Выберите удобное время и услугу
            </p>
          </div>

          <div className="card max-w-2xl">
            <AppointmentForm />
          </div>
        </div>
      </main>
    </div>
  );
}