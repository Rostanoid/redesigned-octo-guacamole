import { forwardRef } from 'react';
import { clsx } from 'clsx';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-neutral-700"
          >
            {label}
            {props.required && <span className="text-red-500">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          className={clsx(
            'rounded-lg border px-4 py-2.5 text-base text-neutral-900 outline-none transition-colors resize-y',
            'border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <span className="text-sm text-red-600">{error}</span>}
        {helperText && !error && (
          <span className="text-sm text-neutral-500">{helperText}</span>
        )}
      </div>
    );
  }
);