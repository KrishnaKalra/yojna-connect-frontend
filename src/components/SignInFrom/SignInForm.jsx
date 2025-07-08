"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { base_backend_url } from "../../../constants";


const formSchema = z
  .object({
    full_name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    aadhaar_number: z
      .string()
      .length(12, { message: "Aadhar Number must be exactly 12 digits." })
      .regex(/^\d{12}$/, { message: "Aadhar Number must contain only digits." }),
    mobile_number: z
      .string()
      .length(10, { message: "Phone number must be exactly 10 digits." })
      .regex(/^[6-9]\d{9}$/, {
        message: "Phone number must start with 6, 7, 8, or 9.",
      }),
    dob: z
      .string()
      .refine((dateStr) => {
        const inputDate = new Date(dateStr);
        const now = new Date();
        return (
          !isNaN(inputDate.getTime()) &&
          inputDate < now
        );
      }, {
        message: "Date of Birth must be a valid date in the past.",
      }),
    gender: z.enum(["Male", "Female", "Other"], {
      message: "Gender must be selected.",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[?!@#$%^&*]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmPass: z.string(),
    user_type : z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPass) {
      ctx.addIssue({
        path: ["confirmPass"],
        message: "Passwords do not match.",
        code: z.ZodIssueCode.custom,
      });
    }
  });




const SignInForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aadhaar_number: "",
      password: "",
      user_type: "User",
      full_name: "",
      dob: "",
      gender: "",
      mobile_number: "",
      confirmPass : "",
      },
  });

  async function onSubmit(data) {
    const {confirmPass , ...userData} = data;
    console.log(userData)
    const res =  await fetch(`${base_backend_url}/auth/signup`,{
      method : 'POST',
      headers :{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(userData)
    })
    const response = await res.json();
    console.log(response)
    
  }

  const [hiddenPassword, setHiddenPassword] = useState(true);
  function viewPassword() {
    setHiddenPassword(!hiddenPassword)
  }

  return (
    <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-semibold text-center m-3 my-4">
        Create New Account
      </h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-[15px]">
                Name<span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Input your name"
                  className="h-12 "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 w-[100%] ">
        <FormField
          control={form.control}
          name="aadhaar_number"
          render={({ field }) => (
            <FormItem className={'w-[50%]'}>
              <FormLabel className="font-semibold text-[15px]">
                Aadhar Number<span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Input your aadhar Number"
                  className="h-12 "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobile_number"
          render={({ field }) => (
            <FormItem className={'w-[50%]'}>
              <FormLabel className="font-semibold text-[15px]">
                Phone Number<span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Input your phone no."
                  className="h-12 w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="flex gap-2 w-[100%] ">
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className={"w-[35%]"}>
                <FormLabel className="font-semibold text-[15px]">
                  Date of Birth<span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    placeholder="Input your email"
                    className="h-12 w-full "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className={"w-[65%]"}>
                <FormLabel className="font-semibold text-[15px]">
                  Gender<span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value} className='w-full !h-12'>
                    <SelectTrigger className="w-full !h-12">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-[15px]">
                Password<span className="text-red-600">*</span>
              </FormLabel>
              <div className="flex relative">
                <FormControl>
                  <Input
                    placeholder="Input your password"
                    className="h-12 "
                    type={hiddenPassword ? "password" : "text"}
                    {...field}
                  />
                </FormControl>
                {hiddenPassword ? (
                  <FontAwesomeIcon
                    className="absolute right-3 top-3.5"
                    onClick={viewPassword}
                    icon={faEye}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="absolute right-3 top-3.5"
                    onClick={viewPassword}
                    icon={faEyeSlash}
                  />
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPass"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-[15px]">
               Confirm Password<span className="text-red-600">*</span>
              </FormLabel>
              <div className="flex relative">
                <FormControl>
                  <Input
                    placeholder="Input your password"
                    className="h-12 "
                    type="password"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-[100%] h-12 " type="submit">
          Sign Up
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
