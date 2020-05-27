import React from 'react';
import { Link } from "react-router-dom"

function Nav() {

    const navStyle = {
        color: 'white'
    }
    return (
        <nav className='nav'>
            <h3>Antikythera Technologies</h3>
            <ul className='nav-links'>
                <Link style={navStyle} to="/"><li>About BitIndex</li></Link>
                <Link style={navStyle} to="/bitindex"><li>Bit-Index api's</li></Link>
                <Link style={navStyle} to="/bap"><li>Bitcoin Attestation Protocol</li></Link>
            </ul>
        </nav>
    );
}

export default Nav;