'use client'
import React from 'react'
import Sort from './sidebarComp/Sort';
import Filter from './sidebarComp/Filter';
import Watch from './sidebarComp/Watch';

const Sidebar = () => {
  return (
    <section className='flex flex-col gap-4'>
        <Sort />
        <Watch />
        <Filter />
    </section>
  )
}

export default Sidebar