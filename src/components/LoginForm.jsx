import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://apitest.reachstar.io/signin', {
                email: email,
                password: password
            });

            console.log('Login successful:', response.data);
            localStorage.setItem("LoggedIn", true);
            localStorage.setItem('user', JSON.stringify(response.data));
            window.location.reload();

        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    return (

        <div className='min-h-screen flex items-center justify-center'>
            <form onSubmit={handleLogin} className='flex flex-col gap-4 m-auto bg-five p-8 sm:rounded-2xl lg:w-1/3 md:w-1/2 sm:w-2/3  w-full'>
                <h1 className='text-xl font-bold text-one text-center'>Log In</h1>

                <input
                    className='w-full border rounded-xl border-three px-3 py-2 focus:outline-none text-four'
                    placeholder='Enter Your email...'
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                />

                <input
                    className='w-full border rounded-xl border-three px-3 py-2 focus:outline-none text-four'
                    placeholder='Enter Your Password...'
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                />

                <button className='w-full rounded-xl bg-one px-3 py-2  text-five font-semibold' type="submit">Log In</button>

                <hr className='border-0 bg-one h-[1px]' />

                <p className='text-sm text-center'> Don't have an account?
                    <Link to='/registration' className='text-one px-1 font-semibold'>Sign up!</Link>
                </p>



            </form>
        </div>

    );
};

export default LoginForm;
