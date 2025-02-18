import { useEffect, useMemo, useRef, useState } from 'react'

import { ChevronDownIcon } from '@/assets/icons/ui'
import clsx from 'clsx'
import { useOutsideClick } from '@/hooks/useOutsideClick.hook'

interface IButtonDropOption {
  value: string
  label: string | React.ReactNode
  icon?: React.ReactNode
}

interface IButtonDrop {
  options: IButtonDropOption[]
  value?: string
  onChange?: (value: IButtonDropOption) => void
}

export const ButtonDrop: React.FC<IButtonDrop> = (props) => {
  const { options, value, onChange } = props
  const btnDropContainer = useRef<HTMLDivElement>(null)

  const [selectedOption, setSelectedOption] = useState<IButtonDropOption>(
    !value
      ? options[0]
      : (): IButtonDropOption => {
          const val = options.filter((item) => item.value === value)
          return val.length > 0 ? val[0] : options[0]
        }
  )
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const selectBtnClsx = clsx(`px-4 h-[54px] rounded-[6px] flex items-center border border-solid border-gray-1`, {
    'focus:outline-none focus:ring-2 focus:ring-blue-2': isOpen
  })
  const selectOptoinClsx = clsx(
    `rounded-[6px] border border-solid border-gray-1 absolute w-full top-[calc(100%+8px)] z-10 bg-white`
  )

  const onClickOutsideHandler = () => {
    handleClose()
  }

  useOutsideClick(btnDropContainer, onClickOutsideHandler)

  const getValueOption = (): IButtonDropOption => {
    const val = options.filter((item) => item.value === value)
    return val.length > 0 ? val[0] : options[0]
  }

  const filteredOptions = useMemo(() => {
    return options.filter((item) => {
      return item.value !== selectedOption.value
    })
  }, [options, selectedOption])

  useEffect(() => {
    setSelectedOption(!value ? options[0] : getValueOption())
  }, [value])
  const handleOpenChange = () => {
    setIsOpen(!isOpen)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const onOptionChange = (val: IButtonDropOption) => {
    if (onChange) onChange(val)
    setSelectedOption(val)
    handleClose()
  }

  return (
    <div className="relative select-none" ref={btnDropContainer}>
      <button className={selectBtnClsx} onClick={handleOpenChange}>
        <div>{selectedOption.label}</div>
        <div className={`ml-1 transition-all ${isOpen ? 'rotate-[-180deg]' : ''}`}>
          <ChevronDownIcon />
        </div>
      </button>
      {isOpen && (
        <div className={selectOptoinClsx}>
          <ul className="w-full">
            {filteredOptions.map((item: IButtonDropOption) => (
              <li
                key={`option-${item.value}`}
                className="w-full first:rounded-[6px_6px_0_0] last:rounded-[0_0_6px_6px] overflow-hidden"
              >
                <button
                  className="py-2 w-full flex justify-center hover:bg-gray-3 h-[44px] items-center"
                  onClick={() => {
                    onOptionChange(item)
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
