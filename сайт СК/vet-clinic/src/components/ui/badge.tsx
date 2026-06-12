import { forwardRef } from 'react';
import { clsx } from 'clsx';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    return (
      <span
        className={clsx(
          'inline-flex items-center rounded-full font-medium',
          size === 'sm' && 'px-2 py-0.5 text-xs',
          size === 'md' && 'px-3 py-1 text-sm',
          variant === 'default' && 'bg-neutral-100 text-neutral-800',
          variant === 'primary' && 'bg-primary-100 text-primary-800',
          variant === 'success' && 'bg-green-100 text-green-800',
          variant === 'warning' && 'bg-amber-100 text-amber-800',
          variant === 'danger' && 'bg-red-100 text-red-800',
          variant === 'outline' &&
            'border border-neutral-300 bg-white text-neutral-700',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  }
);