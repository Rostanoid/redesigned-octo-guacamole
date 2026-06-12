'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface AppointmentFormProps {
  onSuccess?: () => void;
}

export function AppointmentForm({ onSuccess }: AppointmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    petType: '',
    petName: '',
    date: '',
    time: '',
    service: '',
    phone: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock submission
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess?.();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Тип питомца"
          placeholder="Выберите тип"
          options={[
            { value: 'DOG', label: 'Собака' },
            { value: 'CAT', label: 'Кошка' },
            { value: 'BIRD', label: 'Птица' },
            { value: 'RODENT', label: 'Грызун' },
            { value: 'REPTILE', label: 'Рептилия' },
            { value: 'OTHER', label: 'Другой' },
          ]}
          value={formData.petType}
          onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
        />
        
        <Input
          label="Кличка питомца"
          placeholder="Введите кличку"
          value={formData.petName}
          onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Желаемая дата"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
        
        <Select
          label="Время"
          placeholder="Выберите время"
          options={[
            { value: '09:00', label: '09:00' },
            { value: '10:00', label: '10:00' },
            { value: '11:00', label: '11:00' },
            { value: '12:00', label: '12:00' },
            { value: '14:00', label: '14:00' },
            { value: '15:00', label: '15:00' },
            { value: '16:00', label: '16:00' },
            { value: '17:00', label: '17:00' },
          ]}
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
        />
      </div>

      <Select
        label="Услуга"
        placeholder="Выберите услугу"
        options={[
          { value: 'therapy', label: 'Терапевтическое лечение' },
          { value: 'vaccination', label: 'Вакцинация' },
          { value: 'surgery', label: 'Хирургия' },
          { value: 'diagnostics', label: 'Диагностика' },
          { value: 'dentistry', label: 'Стоматология' },
          { value: 'grooming', label: 'Груминг' },
        ]}
        value={formData.service}
        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
        required
      />

      <Input
        label="Телефон для связи"
        type="tel"
        placeholder="+7 (___) ___-__-__"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />

      <Textarea
        label="Примечания"
        placeholder="Опишите проблему или укажите особые пожелания"
        rows={4}
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
      />

      <Button
        type="submit"
        loading={isSubmitting}
        className="w-full sm:w-auto"
      >
        Отправить заявку
      </Button>
    </form>
  );
}