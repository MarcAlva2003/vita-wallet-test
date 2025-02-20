'use client'

import { CheckIcon, EyeIcon, EyeOffIcon } from '@/assets/icons/ui'

import { APP_ROUTES } from '@/constants/app-routes.constant'
import Button from '@/components/UI/button/button.component'
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
import { useUserToken } from '@/hooks/useUserToken.hook'

type Inputs = {
  email: string
  password: string
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [emailCheck, setEmailCheck] = useState<string>('')
  const { push } = useRouter()
  const { setTokens, getAccessToken } = useUserToken()
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
      if (data?.ok && data.accessToken && data.client && data.expiry && data.uid) {
        push(APP_ROUTES.HOME)
        setTokens({
          accessToken: data.accessToken,
          client: data.client,
          expiry: data.expiry,
          uid: data.uid
        })
        setUserData({
          balances: data.data?.attributes?.balances,
          firstName: data.data?.attributes.first_name,
          lastName: data.data?.attributes.last_name,
          email: data.data?.attributes.email
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

  if (getAccessToken()) {
    push(APP_ROUTES.HOME)
  }

  return (
    <div className="flex items-center lg:px-[60px] md:bg-white lg:bg-[#FFFFFF] md:p-10 xl:px-[120px] xl:pb-[100px] lg:pt-[120px] w-full h-screen max-w-[1440px] m-[0_auto] lg:grid grid-cols-[2fr_3fr] xl:grid-cols-[2fr_4fr] relative">
      <div className="w-full px-[30px] max-w-[420px] md:shadow-xl md:rounded-[12px] md:mx-[auto] h-full md:h-fit lg:shadow-[none] lg:h-full flex flex-col py-[50px] lg:px-0 lg:pt-0 justify-center lg:justify-between">
        <h1 className="mb-[100px] lg:mb-0">Iniciar sesión</h1>
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
          <div className="mb-10 lg:mb-[80px]">
            <Input
              label="Contraseña"
              placeholder="Escribe tu contraseña"
              labelBottom={<Link href={'/'}>¿Olvidaste tu contaseña?</Link>}
              type={showPassword ? 'text' : 'password'}
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
              iconRight={
                <button
                  className="w-full h-full flex items-center justify-center"
                  onClick={() => {
                    setShowPassword(!showPassword)
                  }}
                >
                  {showPassword ? <EyeIcon></EyeIcon> : <EyeOffIcon></EyeOffIcon>}
                </button>
              }
            />
          </div>
          <Button variant="gradiant" onClick={onSubmit} disabled={isPending}>
            Iniciar sesion
          </Button>
          <p>{userMessage}</p>
        </div>
        <div></div>
      </div>
      <MoneyIncomeIcon className="hidden lg:block absolute w-[46%] max-w-[662px] bottom-[5%] right-[60px] 4xl:bottom-[14%]" />
    </div>
  )
}
