import { forwardRef } from 'react';
import { clsx } from 'clsx';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, size = 'md', fallback, ...props }, ref) => {
    const sizeClasses = {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg',
      xl: 'h-16 w-16 text-xl',
    };

    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    return (
      <div
        className={clsx(
          'relative flex items-center justify-center rounded-full bg-neutral-200 font-medium text-neutral-700',
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {src ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt || 'Аватар'}
              className="h-full w-full rounded-full object-cover"
            />
          </>
        ) : (
          <span>{fallback ? getInitials(fallback) : '?'}</span>
        )}
      </div>
    );
  }
);

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max = 3, children, ...props }, ref) => {
    const childrenArray = Array.from(children as React.ReactNode);
    const visibleChildren = childrenArray.slice(0, max);
    const remaining = childrenArray.length - max;

    return (
      <div className={clsx('flex -space-x-2', className)} ref={ref} {...props}>
        {visibleChildren}
        {remaining > 0 && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-sm font-medium text-neutral-600">
            +{remaining}
          </div>
        )}
      </div>
    );
  }
);