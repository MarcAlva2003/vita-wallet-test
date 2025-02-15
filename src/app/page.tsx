'use client'

import { BitcoinIcon, ChileIcon, TetherIcon } from '@/assets/icons/ui'

import { BalanceCard } from '@/components/balance-card/balance-card.component'
import Button from '@/components/UI/button/button.component'
import { ButtonDrop } from '@/components/UI/select/button-drop.component'
import Input from '@/components/UI/input/input.component'
import { ModalContainer } from '@/components/UI/modal/modal.component'
import { useState } from 'react'

export default function Home() {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const handleOpenModal = () => {
    setModalOpen(true)
  }
  const handleCloseModal = () => {
    setModalOpen(false)
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button variant="gradiant" onClick={handleOpenModal}>
        Open Modal
      </Button>
      <h1>TITLE</h1>
      <h2>Subtitle</h2>
      <h3 className="">Subtitle 2 SEMIBOLD</h3>
      <h3 className="font-[400]">Subtitle 2</h3>
      <div className="w-[280px]">
        <BalanceCard balanceAmount={10000000} currencyIcon={<ChileIcon />} currencyLabel="Peso chileno" />
      </div>
      <ButtonDrop
        options={[
          {
            label: <ChileIcon />,
            value: 'chile'
          },
          {
            label: <BitcoinIcon />,
            value: 'bitcoin'
          },
          {
            label: <TetherIcon />,
            value: 'tether'
          }
        ]}
      />
      <Input
        placeholder="This is the placeholder"
        label="This is the label"
        labelBottom="Help text"
        iconLeft={<BitcoinIcon />}
      />
      <Input
        error
        placeholder="This is the placeholder"
        label="This is the label"
        labelBottom="Help text"
        iconLeft={<BitcoinIcon />}
      />
      <Input
        placeholder="This is the placeholder"
        label="This is the label"
        labelBottom="Help text"
        iconRight={<BitcoinIcon />}
      />
      <Input
        error
        placeholder="This is the placeholder"
        label="This is the label"
        labelBottom="Help text"
        iconRight={<BitcoinIcon />}
      />
      <Button variant="gradiant">Button Gradiant</Button>
      <Button variant="outlined">Button Outlined</Button>
      <Button variant="gradiant" disabled>
        Button Disabled
      </Button>
      <ModalContainer isOpen={modalOpen} onClose={handleCloseModal}>
        asd
      </ModalContainer>
    </div>
  )
}
