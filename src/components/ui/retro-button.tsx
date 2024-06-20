'use client';
import React from 'react';

import { cn } from '@/lib/utils';

interface RetroButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  action?: () => void;
  topColor?: string;
  className?: string;
  border?: boolean;
}

const RetroButton = React.forwardRef<HTMLButtonElement, RetroButtonProps>(
  ({ children, action, topColor, className, border = true, ...props }, ref) => {
    return (
      <button
        className={cn(
          'group relative inline-block p-2 font-bold outline-none',
          className
        )}
        ref={ref}
        onClick={action}
        {...props}
      >
        <span className='duration-285 bg-primary absolute inset-0 h-full w-full translate-x-0.5 translate-y-0.5 transform transition ease-out xl:translate-x-1 xl:translate-y-1 '></span>
        <span
          className={`absolute inset-0 h-full w-full ${
            topColor ? topColor : 'bg-[#120414]'
          } ${
            border ? 'border' : 'border-none'
          } duration-285  border-border group-active:translate-x-0.5 group-active:translate-y-0.5 xl:group-active:translate-x-1 xl:group-active:translate-y-1`}
        ></span>
        <div className='duration-285 font-silkscreen text-primary relative flex items-center justify-center text-xs font-bold group-active:translate-x-0.5 group-active:translate-y-0.5 xl:text-base xl:group-active:translate-x-1 xl:group-active:translate-y-1 '>
          {children}
        </div>
      </button>
    );
  }
);

RetroButton.displayName = 'RetroButton';

export default RetroButton;
