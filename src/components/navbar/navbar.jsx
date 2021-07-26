// import React from "react";
import "./_navbar.css";
import logo from '../picture/logo.svg';
import { Navbar,Container , Nav } from 'react-bootstrap/'

export const Navigation = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                        alt="logo"
                        src= { logo }
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        />{' '}
                    BounsBot
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="Commandes">Commandes</Nav.Link>
                        <Nav.Link href="level">Level</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}