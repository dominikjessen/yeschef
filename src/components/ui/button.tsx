import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'rounded-lg inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-foreground hover:bg-primary/70',
        destructive: 'bg-destructive text-foreground hover:bg-destructive/90',
        outline: 'border border-border hover:bg-primary hover:text-foreground',
        secondary: 'bg-secondary text-foreground hover:bg-secondary/80',
        text: 'text-primary hover:text-primary/70',
        link: 'text-primary underline-offset-4 hover:underline',
        icon: 'rounded hover:bg-foreground/10',
        unstyled: ''
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 py-1',
        lg: 'h-11 px-8 py-4',
        xl: 'h-14 px-12 py-6',
        icon: 'h-6 w-6 md:h-9 md:w-9 lg:h-10 lg:w-10',
        unstyled: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
