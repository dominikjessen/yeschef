import { cn } from '@/lib/utils';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import React from 'react';

const ToggleButton = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root className={cn('flex gap-1 md:gap-2 border rounded-lg p-1', className)} {...props} ref={ref} />
));

ToggleButton.displayName = 'ToggleButton';

const ToggleButtonOption = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'px-1 py-1 md:px-3 md:py-2 rounded data-[state=checked]:text-primary-foreground data-[state=checked]:bg-primary data-[state=unchecked]:bg-transparent data-[state=unchecked]:text-foreground data-[state=unchecked]:hover:bg-primary/10 data-[state=unchecked]:disabled:hover:bg-transparent',
        className
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  );
});

ToggleButtonOption.displayName = 'ToggleButtonOption';

export { ToggleButton, ToggleButtonOption };
