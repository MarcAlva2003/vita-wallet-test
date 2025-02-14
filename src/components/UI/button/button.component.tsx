import React, { ButtonHTMLAttributes } from 'react'

import clsx from 'clsx'

type IButtonVariant = 'gradiant' | 'outlined'
type IButtonSizes = 'small' | 'medium' | 'large'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  variant: IButtonVariant
  size?: IButtonSizes
}

const Button: React.FC<ButtonProps> = (props) => {
  const { children, variant, size, ...rest } = props
  const variantStyles: Record<IButtonVariant | 'disabled', string> = {
    gradiant: 'bg-gradient-to-r from-blue-2 to-blue-1 text-white',
    outlined:
      'bg-gradient-to-r from-blue-2 to-blue-1 bg-white text-blue-1',
    disabled: 'text-white bg-gray-2 border'
  }

  const sizeStyles: Record<IButtonSizes, string> = {
    small: 'px-4 h-[44px]',
    medium: 'px-4 h-[58px]',
    large: 'px-6 h-[52px]'
  }

  const btnContainerClsx = clsx(
    `w-full ${sizeStyles[size ?? 'large']} ${
      variant === 'outlined' && !rest.disabled ? 'bg-white' : ''
    } rounded-[4px] text-base flex items-center`
  )

  const buttonClsx = clsx(`${variantStyles[rest.disabled ? 'disabled' : variant]} p-[1px] rounded-[6px] font-semibold`)

  return (
    <button className={buttonClsx} {...rest}>
      <div className={btnContainerClsx}>{children}</div>
    </button>
  )
}

export default Button
