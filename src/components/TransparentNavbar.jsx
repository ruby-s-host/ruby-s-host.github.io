import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import "../App.css"

function TransparentNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Navbar expand="lg" className={`navbar-custom fixed-top ${isScrolled ? 'bg-light' : 'bg-transparent'}`}>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav" className="justify-content-center">
                <Nav className="ml-auto">
                    <Nav.Link href="#home">About Me</Nav.Link>
                    <Nav.Link href="#features">Skills</Nav.Link>
                    <Nav.Link href="#pricing">Projects</Nav.Link>
                    <Nav.Link href="#pricing">Awards/Achievements</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default TransparentNavbar;
