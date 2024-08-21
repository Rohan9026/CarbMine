import React, { useState, useRef, useEffect } from 'react';
import { IoLogOutOutline } from "react-icons/io5/index";
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
        <nav className="flex flex-col lg:flex-row justify-between items-center w-full p-4 bg-white border-b border-gray-300 shadow-md">
            <div className="flex items-center justify-between w-full lg:w-auto">
                <img src="/assets/logo.jpg" alt="Logo" className="h-12" />
                <button
                    onClick={toggleNav}
                    className="lg:hidden text-black focus:outline-none"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
            <ul className={`flex flex-col lg:flex-row lg:space-x-6 mt-4 lg:mt-0 lg:mr-10 ${isNavOpen ? 'block' : 'hidden'} lg:flex`}>
                <li>
                    <Link to="/" className="text-black font-bold text-2xl hover:text-red-400 transition">Home</Link>
                </li>
                <li>
                    <Link to="/calculation" className="text-black font-bold text-2xl hover:text-red-400 transition">Calculation</Link>
                </li>
                <li>
                    <Link to="/main" className="text-black font-bold text-2xl hover:text-red-400 transition">Try</Link>
                </li>
                <li>
                    <Link to="/estimate" className="text-black font-bold text-2xl hover:text-red-400 transition">Estimate</Link>
                </li>
                <li className="relative">
                    {!loggedIn && (
                        <Link
                            to="/login"
                            className="text-black font-bold text-2xl hover:text-red-400 transition"
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