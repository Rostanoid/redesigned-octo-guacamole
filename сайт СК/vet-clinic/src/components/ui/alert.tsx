import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  dismissible?: boolean;
  onClose?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', dismissible, onClose, children, ...props }, ref) => {
    const variants = {
      default: 'bg-neutral-50 text-neutral-900 ring-1 ring-neutral-200',
      success: 'bg-green-50 text-green-900 ring-1 ring-green-200',
      warning: 'bg-amber-50 text-amber-900 ring-1 ring-amber-200',
      error: 'bg-red-50 text-red-900 ring-1 ring-red-200',
      info: 'bg-blue-50 text-blue-900 ring-1 ring-blue-200',
    };

    const icons = {
      default: Info,
      success: CheckCircle,
      warning: AlertTriangle,
      error: AlertCircle,
      info: Info,
    };

    const Icon = icons[variant];

    return (
      <div
        className={clsx(
          'flex items-start gap-3 rounded-lg p-4',
          variants[variant],
          className
        )}
        ref={ref}
        {...props}
      >
        <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1 text-sm">{children}</div>
        {dismissible && onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 rounded-lg p-1 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-current"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);