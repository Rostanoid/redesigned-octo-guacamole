import { UserRole, PetType, Sex, AppointmentStatus, PaymentStatus } from '@prisma/client';

export interface User {
  id: string;
  email: string;
  phone?: string | null;
  role: UserRole;
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
  isVerified: boolean;
}

export interface Pet {
  id: string;
  userId: string;
  name: string;
  type: PetType;
  breed?: string | null;
  sex: Sex;
  dateOfBirth?: Date | null;
  weightKg?: number | null;
  coatColor?: string | null;
  microchipId?: string | null;
  notes?: string | null;
  photoUrl?: string | null;
  isActive: boolean;
}

export interface Veterinarian {
  id: string;
  firstName: string;
  lastName: string;
  slug: string;
  title?: string | null;
  biography?: string | null;
  photoUrl?: string | null;
  experienceYears: number;
  rating: number;
  isAvailable: boolean;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  duration: number;
  imageUrl?: string | null;
  category: {
    name: string;
    slug: string;
  };
}

export interface Appointment {
  id: string;
  userId: string;
  vetId: string;
  serviceId: string;
  status: AppointmentStatus;
  startsAt: Date;
  endsAt: Date;
  notes?: string | null;
  vet: Veterinarian;
  service: Service;
  pets?: Pet[];
}

export interface Review {
  id: string;
  userId: string;
  user: {
    firstName: string;
    lastName: string;
  };
  rating: number;
  comment?: string | null;
  isPublished: boolean;
  createdAt: Date;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  durationMonths: number;
  benefits: string[];
}

export interface UserSubscription {
  id: string;
  planId: string;
  plan: SubscriptionPlan;
  status: string;
  billingCycle: string;
  startDate: Date;
  currentPeriodEnd: Date;
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: string;
  description?: string | null;
  paidAt?: Date | null;
  createdAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null;
  isPublished: boolean;
  publishedAt?: Date | null;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  userId: string;
  role: string;
  body: string;
  createdAt: Date;
}

export interface Schedule {
  id: string;
  veterinarianId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  slotDuration: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type PetTypeLabels = {
  [K in PetType]: string;
};

export const PET_TYPE_LABELS: PetTypeLabels = {
  DOG: 'Собака',
  CAT: 'Кошка',
  BIRD: 'Птица',
  RODENT: 'Грызун',
  REPTILE: 'Рептилия',
  OTHER: 'Другой',
};

export type SexLabels = {
  [K in Sex]: string;
};

export const SEX_LABELS: SexLabels = {
  MALE: 'Мужской',
  FEMALE: 'Женский',
  UNKNOWN: 'Неизвестно',
};

export type AppointmentStatusLabels = {
  [K in AppointmentStatus]: string;
};

export const APPOINTMENT_STATUS_LABELS: AppointmentStatusLabels = {
  PENDING: 'Ожидает подтверждения',
  CONFIRMED: 'Подтверждена',
  IN_PROGRESS: 'В процессе',
  COMPLETED: 'Завершена',
  CANCELED: 'Отменена',
  NO_SHOW: 'Неявка',
};

export type PaymentStatusLabels = {
  [K in PaymentStatus]: string;
};

export const PAYMENT_STATUS_LABELS: PaymentStatusLabels = {
  PENDING: 'Ожидает оплаты',
  SUCCEEDED: 'Оплачено',
  FAILED: 'Ошибка оплаты',
  REFUNDED: 'Возвращено',
  CANCELED: 'Отменено',
};