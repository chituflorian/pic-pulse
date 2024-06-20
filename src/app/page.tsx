import * as React from 'react';

import RetroButton from '@/components/ui/retro-button';
import Card from '@/components/ui/retro-card';

export default function Page() {
  return (
    <main className='layout flex-1 pb-[100px] pt-[99px] xl:pt-[136px]'>
      <h1>Retro Finance</h1>
      <Card decoration>
        <Card.Content>
          <div className='flex flex-col gap-3 p-12'>
            <h2 className='text-2xl font-semibold'>Card Title</h2>
            <p className='text-muted-foreground text-sm'>Card Description</p>
            <RetroButton>Click me</RetroButton>
          </div>
        </Card.Content>
        <Card.RetroShadow />
      </Card>
    </main>
  );
}
