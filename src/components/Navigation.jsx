import React, { useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, Form, Image, Nav, NavDropdown, Navbar, Offcanvas } from "react-bootstrap";
import avatar from '../assets/avatar.jpg';
import { IoMdNotificationsOutline } from 'react-icons/io';
import axios from "axios";

export const Navigation = () => {
  const [cards, setCards] = useState();
  const URL = "https://invitation-lm0g.onrender.com"
  const getCards = () => {
    axios({
      method: "GET",
      url: `${URL}/recipients`
    })
    .then(cards => {
      setCards(cards.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
    getCards()
  },[])

  return (
    <> 
      <div style={{height:"200px"}}>container</div>
      {['md'].map((expand) => (
        <Navbar key={expand} expand={expand} style={{position:"sticky", top:"0", backdropFilter:"blur(45)"}} className="mb-3 bg-success p-2 text-dark bg-opacity-50 z-index-3">
            <Container fluid>
                <marquee className = 'fw-bold color-success' style={{width: '65%'}}>Invitation for my Family
                </marquee>
                <div className="d-flex align-items-start justify-content-end" style={{width: '15%'}}>
                          <IoMdNotificationsOutline  className="fs-2  " />
                          
                          <span className=" top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {cards?.length}             
                              <span className="visually-hidden">unread messages</span>
                            </span>
                        </div>
                <Image 
                style={{width: '35px',  
                borderRadius: '50%'}} 
                src={avatar}
                
                />
                
                
               {/* </div> */}
               
                
            </Container>
        </Navbar>
    ))}
    </>
  );
};
