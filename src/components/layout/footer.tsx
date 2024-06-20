import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';

import { links } from '@/constant/utils';

import BottomShadow from '../../../public/svg/footer/blue-ellipse.svg';
import FooterMatrix from '../../../public/svg/footer/footer-matrix.svg';
import Shadow from '../../../public/svg/footer/shadow-ellipse.svg';

const Footer = () => {
  return (
    <footer className='relative w-full'>
      <div className='bg-border relative z-[3] h-[2px] w-full' />
      <div className='layout relative z-[3]'>
        <div className='grid w-full grid-rows-[1fr_auto] gap-10 pt-10 md:grid-cols-[1fr_3fr] md:grid-rows-1 lg:grid-cols-[1fr_3fr] xl:grid-cols-[1.5fr_3fr] xl:pt-[120px] '>
          <HeadingSection />
          <div className='flex flex-wrap justify-between gap-x-[50px] gap-y-10'>
            <LinksSection section='resources' />
            <LinksSection section='app' />
            <LinksSection section='help' />
          </div>
        </div>
        <FooterSection className='pb-10 pt-[65px] text-center xl:pb-[120px] xl:pt-[120px]' />
      </div>

      <RetroLayer className='relative' />
    </footer>
  );
};

const HeadingSection: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-4 xl:gap-8', className)}>
      <Icons.logo
        className='h-8 w-[114px] xl:h-[48px] xl:w-[170px]'
        width={100}
        height={100}
      />

      <p className='text-secondary text-xs xl:text-base'>
        Lorem Ipsumis simply dummy text of the printing and typesetting
        industry.
      </p>
      <div className='flex gap-3 xl:gap-6'>
        <Icons.discord className='h-auto w-4 xl:w-5' />
        <Icons.telegram className='h-auto w-4 xl:w-5' />
        <Icons.twitter className='h-auto w-4 xl:w-5' />
      </div>
    </div>
  );
};

const LinksSection: React.FC<
  React.HtmlHTMLAttributes<HTMLDivElement> & {
    section: keyof typeof links;
  }
> = ({ className, section }) => {
  return (
    <div className={cn('space-y-5 xl:space-y-7', className)}>
      <h3 className='text-primary font-silkscreen text-base xl:text-2xl'>
        {section.toUpperCase()}
      </h3>
      <ul className='space-y-3 xl:space-y-5'>
        {links[section].map((link, index) => (
          <li key={index}>
            <Link
              aria-label={link.name}
              href={link.url}
              className='text-secondary hover:text-primary text-xs xl:text-base'
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FooterSection: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  return (
    <p
      className={cn('text-secondary text-xs uppercase xl:text-base', className)}
    >
      © 2024 AII rights reserved by <span className='text-primary'>Retro.</span>
    </p>
  );
};

const RetroLayer: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  return (
    <div className={cn('absolute bottom-0 left-0 w-full', className)}>
      <Shadow className='absolute bottom-0 left-0 z-[2] w-full' />
      <FooterMatrix className='absolute bottom-0 left-0 z-0 w-full' />
      <BottomShadow className='absolute bottom-0 left-0 z-0 w-full' />
    </div>
  );
};

export default Footer;
