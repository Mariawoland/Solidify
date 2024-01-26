import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";


const Navbar = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    }

    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(prev => !prev);
    };
    const LoggedIn = localStorage.getItem("LoggedIn", true);

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let prevScrollPos = window.scrollY;

        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const isScrolledUp = currentScrollPos < prevScrollPos;

            setVisible(isScrolledUp || currentScrollPos < 100);
            prevScrollPos = currentScrollPos;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (

        <>

            <header className={`z-50 fixed inset-0 w-full flex justify-between items-center transition-all duration-300 md:px-10 px-5 h-[70px] bg-one text-five ${!visible ? 'translate-y-[-100%]' : 'translate-y-0'}`}>

                <Link to='/'>
                    <img src='/assets/logo.png' className='w-[120px]' />
                </Link>

                <button className='sm:hidden flex text-[25px] font-semibold' onClick={handleClick}>
                    <CiMenuBurger />
                </button>

                <div className={`text-base font-semibold sm:flex hidden gap-7 items-center transition-all duration-300 sm:flex-row flex-col lg:items-center lg:gap-9 lg:p-0 p-2 tracking-wide ms-auto lg:text-[15px] md:text-[14px]`}>

                    <div className='flex gap-10 items-center'>
                        <Link to='/'>
                            <img src='/assets/logo.png' className='sm:hidden flex w-[190px]' />
                        </Link>

                    </div>

                    <Link to='/'>Home</Link>

                    <Link to='/about'>About</Link>

                    {
                        !LoggedIn && <Link to="/registration" className='px-4 bg-five py-2 font-semibold text-one rounded-xl'>Sign Up
                        </Link>
                    }

                    {
                        LoggedIn && <Link to="/create">Create
                        </Link>
                    }

                    {
                        LoggedIn && <Link to="/" className='px-4 bg-five py-2 font-semibold text-one rounded-xl text-center' onClick={logout}>Log Out
                        </Link>
                    }

                </div>

            </header>

            <div className={`z-[100] bg-five text-one fixed top-0 right-0 font-semibold flex flex-col gap-6 p-5 transition-all duration-300 h-screen text-base ${clicked === true ? 'translate-x-0' : 'translate-x-[100%]'}`}>

                <div className='flex gap-14 items-center'>

                    <Link to='/'>
                        <img src='/icon.png' className='md:hidden flex w-[45px]' />
                    </Link>

                    <button className='md:hidden flex text-[40px]' onClick={handleClick}>
                        <IoIosClose />
                    </button>

                </div>

                <Link to='/'>Home</Link>

                <Link to='/about'>About</Link>

                {
                    !LoggedIn && <Link to="/registration" className='px-4 bg-one py-2 font-semibold text-five rounded-xl text-center'>Sign Up
                    </Link>
                }

                {
                    LoggedIn && <Link to="/create">Create
                    </Link>
                }

                {
                    LoggedIn && <Link to="/" className='px-4 bg-one py-2 font-semibold text-five rounded-xl text-center' onClick={logout}>Log Out
                    </Link>
                }

            </div>
        </>
    )
}

export default Navbar