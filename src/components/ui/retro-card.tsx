import * as React from 'react';

import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  decoration?: boolean;
}

const Card: React.FC<CardProps> & {
  Content: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  RetroShadow: React.FC<React.HTMLAttributes<HTMLDivElement>>;
} = ({ className, children, decoration = false, ...props }, ref) => (
  <div ref={ref} className={cn('relative', className)} {...props}>
    {children}
    {decoration && <CardDecorator />}
  </div>
);
Card.displayName = 'Card';

const CardRetroShadow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'absolute inset-1 z-[9] h-full w-full bg-white shadow-inner xl:inset-3',
      className
    )}
    style={{
      boxShadow: 'inset 0 0 42px -8px #28FFFA',
    }}
    {...props}
  />
));

CardRetroShadow.displayName = 'CardRetroShadow';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'bg-card text-secondary border-border relative z-10 border-2 shadow-sm',
      className
    )}
    {...props}
  />
));
CardContent.displayName = 'CardContent';

const CardDecorator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className }, ref) => (
  <div
    ref={ref}
    className={cn(
      'absolute left-0 top-0  h-full w-full p-2  xl:p-5 ',
      className
    )}
  >
    <div className='relative h-full w-full'>
      <Icons.cardDecoration className='absolute left-0 top-0 z-[10] h-auto w-3 xl:w-4 ' />
      <Icons.cardDecoration className='absolute bottom-0 left-0 z-[10] h-auto w-3 xl:w-4 ' />
      <Icons.cardDecoration className='absolute right-0 top-0 z-[10] h-auto w-3 xl:w-4 ' />
      <Icons.cardDecoration className='absolute bottom-0 right-0 z-[10] h-auto w-3 xl:w-4 ' />
    </div>
  </div>
));

Card.Content = CardContent;
Card.RetroShadow = CardRetroShadow;

export default Card;
