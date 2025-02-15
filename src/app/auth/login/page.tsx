'use client'

import Button from '@/components/UI/button/button.component'
import { CheckIcon } from '@/assets/icons/ui'
import Input from '@/components/UI/input/input.component'
import { MoneyIncomeIcon } from '@/assets/icons'
import { emailPattern } from '@/constants/regex-patterns.constant'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

type Inputs = {
  email: string
  password: string
}

export default function LoginPage() {
  const [emailCheck, setEmailCheck] = useState<string>('')
  const {
    register,
    trigger,
    formState: { errors },
    clearErrors,
    watch
  } = useForm<Inputs>()

  const onSubmit = async () => {
    console.log(watch('email'))

    const isValid = await trigger()
    if (isValid) {
      //
    }
  }

  return (
    <div className="px-[60px] xl:px-[120px] xl:pb-[100px] pt-[120px] w-full h-screen max-w-[1440px] m-[0_auto] grid grid-cols-[2fr_3fr] xl:grid-cols-[2fr_4fr] relative">
      <div className="w-full flex flex-col justify-between">
        <h1>Iniciar sesión</h1>
        <div>
          <Input
            label="Correo electrónico"
            placeholder="juan@gmail.com"
            iconRight={emailPattern.test(emailCheck) ? <CheckIcon /> : undefined}
            {...register('email', {
              required: {
                value: true,
                message: 'Email is required'
              },
              pattern: { value: emailPattern, message: 'Please, enter a valid email' }
            })}
            error={!!errors.email}
            labelBottom={errors.email?.message}
            onChange={(ev) => {
              clearErrors('email')
              setEmailCheck(ev.target.value)
            }}
          />
          <div className="mb-[80px]">
            <Input label="Contraseña" placeholder="Escribe tu contraseña" labelBottom="¿Olvidaste tu contaseña?" />
          </div>
          <Button variant="gradiant" onClick={onSubmit}>
            Iniciar sesion
          </Button>
        </div>
        <div></div>
      </div>
      <MoneyIncomeIcon className="absolute w-[46%] max-w-[662px] bottom-[5%] right-[60px] 4xl:bottom-[14%]" />
    </div>
  )
}
