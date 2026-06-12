import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
});

export const registerSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
  firstName: z.string().min(1, 'Введите имя'),
  lastName: z.string().min(1, 'Введите фамилию'),
  phone: z.string().optional(),
});

export const petSchema = z.object({
  name: z.string().min(1, 'Введите имя питомца'),
  type: z.enum(['DOG', 'CAT', 'BIRD', 'RODENT', 'REPTILE', 'OTHER']),
  breed: z.string().optional(),
  sex: z.enum(['MALE', 'FEMALE', 'UNKNOWN']),
  dateOfBirth: z.string().optional(),
  weightKg: z.number().optional(),
  coatColor: z.string().optional(),
  microchipId: z.string().optional(),
  notes: z.string().optional(),
});

export const appointmentSchema = z.object({
  vetId: z.string().min(1, 'Выберите врача'),
  serviceId: z.string().min(1, 'Выберите услугу'),
  startsAt: z.string().min(1, 'Выберите дату и время'),
  petIds: z.array(z.string()).min(1, 'Выберите хотя бы одного питомца'),
  notes: z.string().optional(),
});

export const contactSchema = z.object({
  firstName: z.string().min(1, 'Введите имя'),
  lastName: z.string().optional(),
  email: z.string().email('Введите корректный email'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Введите тему сообщения'),
  message: z.string().min(10, 'Сообщение должно быть не менее 10 символов'),
});

export const reviewSchema = z.object({
  rating: z.number().int().min(1, 'Оценка от 1 до 5').max(5, 'Оценка от 1 до 5'),
  comment: z.string().min(10, 'Комментарий должен быть не менее 10 символов').optional(),
  serviceId: z.string().optional(),
});

export const subscriptionCheckoutSchema = z.object({
  planId: z.string().min(1, 'Выберите тариф'),
  billingCycle: z.enum(['MONTHLY', 'YEARLY']),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type PetInput = z.infer<typeof petSchema>;
export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type SubscriptionCheckoutInput = z.infer<typeof subscriptionCheckoutSchema>;