'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'w-full px-4 py-2 border border-border bg-background text-foreground placeholder:text-muted-foreground rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-forest transition resize-none',
        className
      )}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
