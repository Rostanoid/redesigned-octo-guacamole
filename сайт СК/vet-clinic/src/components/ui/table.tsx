import { forwardRef } from 'react';
import { clsx } from 'clsx';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, children, ...props }, ref) => (
    <div className="overflow-x-auto">
      <table
        className={clsx('w-full border-collapse text-sm', className)}
        ref={ref}
        {...props}
      >
        {children}
      </table>
    </div>
  )
);

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, children, ...props }, ref) => (
  <thead className={clsx('bg-neutral-50', className)} ref={ref} {...props}>
    {children}
  </thead>
));

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => (
    <tbody className={clsx('divide-y divide-neutral-200', className)} ref={ref} {...props}>
      {children}
    </tbody>
  )
);

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, children, ...props }, ref) => (
    <tr
      className={clsx(
        'transition-colors hover:bg-neutral-50/50',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </tr>
  )
);

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, ...props }, ref) => (
    <th
      className={clsx(
        'px-4 py-3 text-left font-semibold text-neutral-700 first:pl-6 last:pr-6',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </th>
  )
);

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, ...props }, ref) => (
    <td
      className={clsx('px-4 py-3 text-neutral-900 first:pl-6 last:pr-6', className)}
      ref={ref}
      {...props}
    >
      {children}
    </td>
  )
);