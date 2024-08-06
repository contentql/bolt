import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded px-8 py-4 font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        purple: 'bg-primary/30 text-primary hover:bg-primary/20',
        gray: 'bg-secondary/30 hover:bg-secondary/20',
        info: 'bg-info-foreground text-info hover:bg-info-foreground/80',
        warning:
          'bg-warning-foreground text-warning hover:bg-warning-foreground/80',
        danger:
          'bg-danger-foreground text-danger hover:bg-danger-foreground/80',
        success:
          'bg-success-foreground text-success hover:bg-success-foreground/80',
      },
    },
    defaultVariants: {
      variant: 'purple',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
