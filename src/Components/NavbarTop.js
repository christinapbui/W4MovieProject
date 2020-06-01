import React from 'react'
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap'

//B. search function
  //B.Q1 how to read the value?
  //B.Q2 how to filter the movie using that keyword
  //B.1 "e" (under "onSubmit") stands for event


export default function NavbarTop(props) {
    let keyword = '' // B.4 variable for keyword

    const searchByKeyword = (e) => { // B.3 added "e" here to catch argument
        e.preventDefault() // B.2 to prevent page from reloading
        console.log("keyword",keyword)
        props.searchTheKeywordProps(keyword)
    }


    return (
        <>
            <Navbar bg="dark" variant="dark" fixed="top">
                <Navbar.Brand href="#home">[boredTV]</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">On Air</Nav.Link>
                <Nav.Link href="#pricing">Popular</Nav.Link>
                </Nav>
                <Form inline onSubmit={(e)=>searchByKeyword(e)}>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e)=>keyword=e.target.value}/>
                <Button variant="outline-info" type="submit">Search</Button>
                </Form>
            </Navbar>
            <br />
        </>
    )
}
