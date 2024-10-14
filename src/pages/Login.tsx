import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { setCodeToCookie } from '../utils/cookies';

const inputFormSchema = z.object({
  code: z.string(),
})

type FormInput = z.infer<typeof inputFormSchema>

export function Login() {
  const { register, handleSubmit } = useForm<FormInput>()
  const navigate = useNavigate()

  function handleSubmitCode(data: FormInput) {
    if (data.code === 'e209a0a9-000f-4007-bc01-12f662330748') {
      setCodeToCookie(data.code)
      navigate("/player")
    } else {
      console.log(data.code)
    }
  }

  return (
    <div className="h-screen bg-background text-primary flex justify-center items-center">
      <form 
        onSubmit={handleSubmit(handleSubmitCode)}
        className="flex flex-col"
        > 
        <div className="my-3">
          <Label htmlFor="code">Insira o código aqui</Label>
          <div className="mb-2"/>

          <Input id="code" {...register('code')} className="w-80" />
        </div>
          <Button size="default" className="ml-auto w-24" type="submit">Entrar</Button>
      </form>
    </div>
  )
}
