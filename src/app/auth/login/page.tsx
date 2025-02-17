'use client'

import { APP_ROUTES } from '@/constants/app-routes.constant'
import Button from '@/components/UI/button/button.component'
import { CheckIcon } from '@/assets/icons/ui'
import Input from '@/components/UI/input/input.component'
import Link from 'next/link'
import { MoneyIncomeIcon } from '@/assets/icons'
import { emailPattern } from '@/constants/regex-patterns.constant'
import { login } from '@/services/auth.service'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useUserDataContext } from '@/context/user-data.context'
import { useUserToken } from '@/hooks/useUserToken,hook'

type Inputs = {
  email: string
  password: string
}

export default function LoginPage() {
  const [emailCheck, setEmailCheck] = useState<string>('')
  const { push } = useRouter()
  const { setToken } = useUserToken()
  const [userMessage, setUserMessage] = useState<string>('')
  const { setUserData } = useUserDataContext()
  const {
    register,
    trigger,
    formState: { errors },
    clearErrors,
    getValues
  } = useForm<Inputs>()

  const { mutate, isPending } = useMutation({
    mutationFn: (params: { email: string; password: string }) => login(params),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: async (data) => {
      if (data?.ok && data.access_token) {
        push(APP_ROUTES.HOME)
        setToken(data.access_token)
        console.log(data.data.id)
        setUserData({
          balances: data.data?.attributes?.balances,
          firstName: data.data?.attributes.first_name,
          lastName: data.data?.attributes.last_name,
          uid: data.data.id
        })
      } else {
      }
    }
  })

  const onSubmit = async () => {
    const isValid = await trigger()
    if (isValid) {
      setUserMessage('')
      mutate({ password: getValues('password'), email: getValues('email') })
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
            errorMessage={errors.email?.message}
            onChange={(ev) => {
              clearErrors('email')
              setEmailCheck(ev.target.value)
            }}
          />
          <div className="mb-[80px]">
            <Input
              label="Contraseña"
              placeholder="Escribe tu contraseña"
              labelBottom={<Link href={'/'}>¿Olvidaste tu contaseña?</Link>}
              {...register('password', {
                required: {
                  value: true,
                  message: 'Password is required'
                },
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long'
                }
              })}
              error={!!errors.password}
              errorMessage={errors.password?.message}
              onChange={() => {
                clearErrors('password')
              }}
            />
          </div>
          <Button variant="gradiant" onClick={onSubmit} disabled={isPending}>
            Iniciar sesion
          </Button>
          <p>{userMessage}</p>
        </div>
        <div></div>
      </div>
      <MoneyIncomeIcon className="absolute w-[46%] max-w-[662px] bottom-[5%] right-[60px] 4xl:bottom-[14%]" />
    </div>
  )
}
