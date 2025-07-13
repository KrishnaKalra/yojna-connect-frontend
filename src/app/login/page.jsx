import LoginForm from '@/components/LoginForm/LoginForm'
import React from 'react'

export const metadata = {
  title: 'Yojana Connect: Login',
};

function Login() {
  return (
    <div className='h-[100vh] w-[100vw] flex justify-center items-center'>
        <div className='w-[90%] md:w-[50%] lg:w-[30%] rounded-2xl shadow-2xl p-10'>
            <LoginForm/>
        </div>
    </div>
  )
}

export default Login