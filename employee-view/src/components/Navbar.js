import React from 'react';

const Navbar = () => {
    return (
        <div className="flex bg-purple-950 h-16 px-2 py-2 items-center">
            <h1 className="font-bold text-4xl text-left">Employee Management Site</h1>
            <div className="space-x-4 ml-auto">
                <a className="hover:text-blue-700" href="/">Home</a>
                <a className="hover:text-blue-700" href="/">Profile</a>
                <a className="hover:text-blue-700" href="/">Logout</a>
                <a className="hover:text-blue-700" href="/">About</a>
            </div>
        </div> 
    );
};

export default Navbar;