'use client'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation';

// Validation for form
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*]/, { message: "Password must contain at least one special character" })
})

const LoginForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aadharNumber:"",
      password: "",
    },
  })
  const { getValues } = form;

  function onSubmit() {
   
  }

  const [hiddenPassword, setHiddenPassword] = useState(true);
  function viewPassword() {
    setHiddenPassword(!hiddenPassword);
  }

  return (
    <Form {...form}>
      <h1 className='text-2xl font-semibold text-center m-3'>Login to your Account</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="aadharNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-semibold text-[15px]'>Aadhar Number<span className='text-red-600'>*</span></FormLabel>
              <FormControl>
                <Input placeholder="Input your name" className='h-12 ' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-semibold text-[15px]'>Password<span className='text-red-600'>*</span></FormLabel>
              <div className='flex relative'>
                <FormControl>
                  <Input placeholder="Input your password" className='h-12 ' type={hiddenPassword ? 'password' : 'text'} {...field} />
                </FormControl>
                {hiddenPassword ? 
                  <FontAwesomeIcon className='absolute right-3 top-3.5' onClick={viewPassword} icon={faEye} /> : 
                  <FontAwesomeIcon className='absolute right-3 top-3.5' onClick={viewPassword} icon={faEyeSlash} />
                }
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-[100%] h-12 ' type="submit">Login</Button>
      </form>
    </Form>
  )
}

export default LoginForm;
