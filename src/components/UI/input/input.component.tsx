import React, { InputHTMLAttributes } from 'react'

import clsx from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: boolean
  errorMessage?: string;
  labelBottom?: string | React.ReactNode
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

const Input: React.FC<InputProps> = (props) => {
  const { label, error, iconLeft, iconRight, labelBottom, errorMessage, ...rest } = props

  const inputClsx = clsx(
    'border text-black placeholder-gray-1 text-base rounded-[6px] h-[54px] w-full py-[14px] px-3 focus:outline-none focus:ring-2 focus:ring-blue-2',
    {
      'pl-11': iconLeft,
      'pr-11': iconRight,
      'border-red focus:ring-red text-red': error,
      'border-gray-1': !error
    }
  )

  return (
    <div className="mb-4">
      {/* INPUT TOP */}
      {label && (
        <label htmlFor={props.id} className={`block text-sm mb-[6px] font-medium ${error ? 'text-red' : 'text-black'}`}>
          {label}
        </label>
      )}
      {/* INPUT BODY */}
      <div className="relative">
        {iconLeft && (
          <div className="absolute inset-y-0 left-0 flex items-center w-[50px] justify-center">{iconLeft}</div>
        )}
        <input className={inputClsx} {...rest} />
        {iconRight && (
          <div className="absolute inset-y-0 right-0 flex items-center w-[50px] justify-center">{iconRight}</div>
        )}
      </div>
      {/* INPUT BOTTOM */}
      {errorMessage && <p className={`text-red text-sm mt-1 text-sm text-end`}>{errorMessage}</p>}
      {labelBottom && <p className={`text-black text-sm mt-1 text-sm text-end`}>{labelBottom}</p>}
    </div>
  )
}

export default Input
