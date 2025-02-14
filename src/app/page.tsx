'use client'

import { BalanceCard } from '@/components/balance-card/balance-card.component'
import Button from '@/components/UI/button/button.component'
import { ButtonDrop } from '@/components/UI/select/button-drop.component'
import { IconComponent } from '@/components/UI/icon/icon.component'
import Input from '@/components/UI/input/input.component'
import { icons } from '@/components/UI/icon/icons'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className='w-[280px]'>

      <BalanceCard
        balanceAmount={10000000}
        currencyIcon={icons.chile}
        currencyLabel='Peso chileno'
        />
        </div>
      <ButtonDrop
        options={[
          {
            label: <IconComponent icon={icons.chile} />,
            value: 'chile'
          },
          {
            label: <IconComponent icon={icons.bitcoin} />,
            value: 'bitcoin'
          },
          {
            label: <IconComponent icon={icons.tether} />,
            value: 'tether'
          },
        ]}
      />
      <Input
        placeholder="This is the placeholder"
        label="This is the label"
        labelBottom="Help text"
        iconLeft={<IconComponent icon={icons.bitcoin} />}
      />
      <Input
        error
        placeholder="This is the placeholder"
        label="This is the label"
        labelBottom="Help text"
        iconLeft={<IconComponent icon={icons.bitcoin} />}
      />
      <Input
        placeholder="This is the placeholder"
        label="This is the label"
        labelBottom="Help text"
        iconRight={<IconComponent icon={icons.bitcoin} />}
      />
      <Input
        error
        placeholder="This is the placeholder"
        label="This is the label"
        labelBottom="Help text"
        iconRight={<IconComponent icon={icons.bitcoin} />}
      />
      <Button variant="gradiant">Button Gradiant</Button>
      <Button variant="outlined">Button Outlined</Button>
      <Button variant="gradiant" disabled>
        Button Disabled
      </Button>
    </div>
  )
}
