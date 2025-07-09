import React from 'react'
import SignInForm from '@/components/SignInFrom/SignInForm'

export const metadata = {
  title: 'Yojana Connect: Sign Up',
};

function singIn() {
  return (
    <div className='h-[100vh] w-[100vw] flex justify-center items-center'>
        <div className='w-[30%]  rounded-2xl shadow-2xl p-10'>
            <SignInForm/>
        </div>
    </div>
  )
}

export default singIn

