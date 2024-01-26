import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationForm = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://apitest.reachstar.io/signup', formData);
            console.log('Registration successful:', response.data);
            console.log('Login successful:', response.data);
            localStorage.setItem("LoggedIn", true);
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate("/");
            window.location.reload();

        } catch (error) {
            if (error.response) {
                console.error('Registration failed with status:', error.response.status);
                console.error('Response data:', error.response.data);
                setErrorMessage('Registration failed. Please try again.');

            } else if (error.request) {
                console.error('No response received from the server');
                setErrorMessage('Registration failed. Please check your internet connection.');

            } else {
                console.error('Error setting up the request:', error.message);
                setErrorMessage('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <form onSubmit={handleFormSubmit} className='flex flex-col gap-4 m-auto bg-five p-8 sm:rounded-2xl lg:w-1/3 md:w-1/2 sm:w-2/3  w-full'>

                {errorMessage && (
                    <p className='fixed right-5 bottom-5 bg-one text-five max-w-96 p-4 rounded-xl'>
                        {errorMessage}
                    </p>
                )}

                <h1 className='text-xl font-bold text-one text-center'>Register</h1>

                <input
                    className='w-full border rounded-xl border-three px-3 py-2 focus:outline-none text-four'
                    placeholder='Enter Your name...'
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />

                <input
                    className='w-full border rounded-xl border-three px-3 py-2 focus:outline-none text-four'
                    placeholder='Enter Your Email...'
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />

                <input
                    className='w-full border rounded-xl border-three px-3 py-2 focus:outline-none text-four'
                    placeholder='Enter Your Password...'
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />

                <button className='w-full rounded-xl bg-one px-3 py-2 text-five font-semibold' type="submit">
                    Register
                </button>

                <hr className='border-0 bg-one h-[1px]' />

                <p className='text-sm text-center'>Already an account?
                    <Link to='/' className='text-one px-1 font-semibold'>Log In!</Link>
                </p>

            </form>
        </div>

    );
};

export default RegistrationForm;
