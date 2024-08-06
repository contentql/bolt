import { type VariantProps, cva } from 'class-variance-authority'
import clsx from 'clsx'
import * as React from 'react'
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineInformationCircle,
} from 'react-icons/hi'
import { IconType } from 'react-icons/lib'

import { cn } from '@/utils/cn'

const alertVariants = cva(
  'relative flex gap-8 items-center w-full rounded py-12 px-8',
  {
    variants: {
      variant: {
        default: 'bg-secondary',
        danger: 'text-danger bg-danger-foreground [&>svg]:text-destructive',
        success: 'text-success bg-success-foreground [&>svg]:text-success',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type AlertVariants = VariantProps<typeof alertVariants>

type IconObjectType = {
  [K in NonNullable<AlertVariants['variant']>]: IconType
}

const icon: IconObjectType = {
  danger: HiOutlineExclamationCircle,
  success: HiOutlineCheckCircle,
  default: HiOutlineInformationCircle,
}

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, children, ...props }, ref) => {
  const IconComponent = variant ? icon[variant] : null

  return (
    <div
      ref={ref}
      role='alert'
      className={cn(alertVariants({ variant }), className)}
      {...props}>
      {IconComponent && <IconComponent className={clsx('size-20')} />}
      {children}
    </div>
  )
})
Alert.displayName = 'Alert'

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
))
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertDescription }
