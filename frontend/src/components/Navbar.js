import React, { useState, useRef, useEffect } from 'react';
import { IoLogOutOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const menuRef = useRef(null);

    const firebase = useFirebase();

    const loggedIn = firebase.isLoggedIn;
    console.log(loggedIn);

    const handleClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    return (
        <nav className="flex flex-col lg:flex-row justify-between items-center w-full p-4 bg-white shadow-md">
            <div className="flex items-center justify-between w-full lg:w-auto">
                {/* <img src="/assets/logo.jpg" alt="Logo" className="h-12" /> */}
                <p className="text-[#00F020] text-2xl font-bold hover:text-green-400 transition">CarbMine</p>
                <button
                    onClick={toggleNav}
                    className="lg:hidden text-black focus:outline-none"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
            <ul className={`flex flex-col lg:flex-row lg:space-x-6 mt-4 lg:mr-10 ${isNavOpen ? 'block' : 'hidden'} lg:flex`}>
                <div className="flex flex-col lg:flex-row lg:justify-center lg:flex-grow lg:mr-[450px] ">
                    <li className="lg:mr-6">
                        <Link to="/" className="text-black text-xl hover:text-[#00F020] transition">Home</Link>
                    </li>
                    <li className="lg:mr-6">
                        <Link to="/calculation" className="text-black text-xl hover:text-[#00F020] transition">Calculation</Link>
                    </li>
                    <li className="lg:mr-6">
                        <Link to="/main" className="text-black text-xl hover:text-[#00F020] transition">Try</Link>
                    </li>
                    <li className="lg:mr-6">
                        <Link to="/estimate" className="text-black text-xl hover:text-[#00F020] transition">Estimate</Link>
                    </li>
                </div>
                <li className="relative lg:ml-auto">
                    {!loggedIn && (
                        <Link
                            to="/login"
                            className="text-green-400 text-xl hover:bg-green-400 hover:text-white transition border border-green-400 rounded-3xl py-2 px-3"
                        >
                            Login
                        </Link>
                    )}
                    {loggedIn && (
                        <div className='flex items-center'>
                            <div className='w-12 h-12 rounded-full flex items-center justify-center bg-green-700 hover:bg-blue-400 cursor-pointer' onClick={handleClick}>
                                <img src='/assets/profile.jpg' alt="Profile" />
                            </div>
                            {isMenuOpen && (
                                <div ref={menuRef} className="absolute bg-white rounded shadow-lg z-50 p-4 mt-36 -ml-8 lg:-ml-20 w-48">
                                    <div className="flex flex-col items-start gap-4">
                                        <div className='flex flex-row space-x-2'>
                                            <Link to="/">
                                                <button className="text-green-500 pl-6 hover:bg-white hover:text-red-600" onClick={firebase.handleLogout}>Logout</button>
                                            </Link>
                                            <Link to="/">
                                                <button className="text-green-500 pl-2 hover:bg-white hover:text-red-600 text-lg">
                                                    <IoLogOutOutline />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;



{/* <header className="absolute top-0 z-20 flex h-[60px] w-full bg-opacity-0 px-[5%] max-lg:mr-auto max-lg:px-4 lg:justify-around">
    <a className="h-[50px] w-[50px] p-[4px]" href="/">
        <img src="./assets/logo.png" alt="logo" className="object h-full w-full" />
    </a>
    <div className="collapsible-header animated-collapse max-lg:shadow-md" id="collapsed-header-items">
        <div className="flex h-full w-max gap-5 text-base text-black max-lg:mt-[30px] max-lg:flex-col max-lg:place-items-end max-lg:gap-5 lg:mx-auto lg:place-items-center">
            <a className="header-links" href="/">About us</a>
            <a className="header-links" href="#pricing">Pricing</a>
            <a className="header-links" href="/">Features</a>
            <a className="header-links" href="/">Blog</a>
            <a className="header-links" href="/">Contact us</a>
        </div>

    </div>
    <button className="bi bi-list absolute right-3 top-3 z-50 text-3xl text-black lg:hidden" onClick={toggleHeader} aria-label="menu" id="collapse-btn"></button>
</header> */}