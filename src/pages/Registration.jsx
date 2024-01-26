import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';
import "../index.css";

const Registration = () => {



    return (
        <div className='bg-five'>

            <RegistrationForm />
        </div>
    );
}

export default Registration;