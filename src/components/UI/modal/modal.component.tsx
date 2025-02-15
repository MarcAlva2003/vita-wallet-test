import './modal.styles.css'

import { useEffect, useState } from 'react'

import { XIcon } from '@/assets/icons/ui'
import clsx from 'clsx'

interface IModalContainer {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}
export const ModalContainer: React.FC<IModalContainer> = (props) => {
  const { children, isOpen, onClose } = props
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const modalBgClsx = clsx(
    'bg-modal-container transition-all fixed w-full h-screen bg-[#00000080] top-0 left-0 right-0 bottom-0 flex items-center justify-center',
    {
      'bg-modal-open': modalOpen,
      'bg-modal-closed': !modalOpen
    }
  )
  const modalContainerClsx = clsx('modal-container transition-all p-5 bg-white rounded-[6px] min-w-[200px]', {
    'modal-open': modalOpen,
    'modal-closed': !modalOpen
  })

  useEffect(() => {
    setModalOpen(isOpen)
  }, [isOpen])

  return (
    <div className={modalBgClsx}>
      <div className={modalContainerClsx}>
        <div className="flex justify-end">
          <button className="p-1" onClick={onClose}>
            <XIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
