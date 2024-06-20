import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import RetroButton from '@/components/ui/retro-button';
import Card from '@/components/ui/retro-card';

import BottomShadow from '../../../public/svg/footer/blue-ellipse.svg';
import Shadow from '../../../public/svg/footer/shadow-ellipse.svg';
import HeaderMatrix from '../../../public/svg/header/header-matrix.svg';

const Header = () => {
  return (
    <header className='layout'>
      <NavBar className='mt-4 xl:mt-[52px]' />
      <RetroLayer />
    </header>
  );
};

const NavBar: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  return (
    <Card className={className}>
      <Card.Content className='flex h-[52px] xl:inset-2 xl:h-[72px]'>
        <div className='border-border flex items-center justify-center border-r-2 p-4 xl:p-5'>
          <Icons.logo className='h-8 w-[114px]' />
        </div>
        <div className='flex flex-1 items-center justify-end gap-3 p-3 pb-4 xl:gap-6'>
          <Icons.discord className='h-auto w-4 xl:w-5' />
          <Icons.telegram className='h-auto w-4 xl:w-5' />
          <Icons.twitter className='h-auto w-4 xl:w-5' />
          <div className='h-full w-[1px] bg-[#49274659]'></div>
          <Link href='#'>Docs</Link>
          <Link href='#'>Audit</Link>
          <RetroButton className='h-8 px-4 xl:h-[44px] xl:px-[44px]'>
            <span className='font-silkscreen text-xs font-bold xl:text-base'>
              Launch app
            </span>
          </RetroButton>
        </div>
      </Card.Content>
      <Card.RetroShadow className='inset-1' />
    </Card>
  );
};

const RetroLayer: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  return (
    <div className={cn('absolute left-0 top-0 w-full', className)}>
      <Shadow className='absolute left-0 top-0 z-[2] w-full' />
      <HeaderMatrix className='absolute left-0 top-0 z-0 w-full' />
      <BottomShadow className='absolute left-0 top-0 z-0 w-full' />
    </div>
  );
};

export default Header;
