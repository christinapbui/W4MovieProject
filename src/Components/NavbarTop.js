import React from 'react'
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap'

export default function NavbarTop() {
    return (
        <>
            <Navbar bg="dark" variant="dark" fixed="top">
                <Navbar.Brand href="#home">[LOGO]</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">On Air</Nav.Link>
                <Nav.Link href="#pricing">Popular</Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
            <br />
        </>
    )
}
