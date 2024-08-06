import React from 'react'

import { cn } from '@/utils/cn'

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn('mx-auto w-full max-w-[120rem] px-12', className)}>
      {children}
    </div>
  )
}

export default Container
