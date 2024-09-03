import React from 'react';
import { InputGroup, Button, Form, Table, Image, Row, Col, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from'axios';
import ReactWhatsapp from 'react-whatsapp';
import avatar from '../../assets/avatar.jpg';
import { FaWhatsapp } from 'react-icons/fa';
import DeleteConfirm from "../../components/Delete/deleteKonfirm";
import LoadingCard from '../../components/LoadingCard/index';
import { IoMdNotificationsOutline } from 'react-icons/io';


const Navbar = () => {

  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [showConfirm, setShowConfirm] = useState();

  const {id} = useParams();
  const one = "kepada Yth."
 
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

  

  const deleteHandler = (id) => {
    axios({
      method: "DELETE",
      url: `${URL}/recipients/${id}`
    })
    .then(result => {
      getCards()
    })
    .catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
    getCards()
  },[])

  const updateHandler = (id) => {
    axios({
      method: "PUT",
      url: `${URL}/cards/${id}`
    })
    .then(result => {
      getCards()
    })
    .catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
    getCards()
  },[])


    return (
      <div className='container-fluid p-3 ' style={{ height: '100%' }}>
        <DeleteConfirm
        show={showConfirm} onHide={() => setShowConfirm(false)}
         id={id}
        />
        <Row>
                    {
                      cards.length !== 0 ?
                      cards.map(recipient => {
                        return(
                            <>
                               
                            <Col lg={3} key={id} className='mt-3'>
                                <Card className="mt-3 h-100 z-index-n1" >
                                <Row>
                                        <Col className="col-4">
                                        {/* <button type="button" className="btn bg-white position-relative"> */}
                                          
                                          {
                                            recipient && recipient.say === null ? 
                                            <>
                                            <div style={{width: '30px'}} className=' d-flex justify-content-center align-items-center'>
                                          <IoMdNotificationsOutline className='w-100 h-100 fs-6' />
                                            
                                            </div>
                                            </>
                                             : 
                                            <>
                                             <div style={{width: '60px'}}  className='d-flex justify-content-center align-items-center'>
                                          <IoMdNotificationsOutline className='w-100 h-100 fs-6' />
                                            <span className=" top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                              1+
                                              <span className="visually-hidden">unread messages</span>
                                            </span>
                                            </div>
                                            </>
                                           
                                          }
                                          
                                        {/* </button> */}
                                        </Col>
                                        <Col className="col-4">
                                            <Card.Title className="d-flex justify-content-end mt-2">Dear</Card.Title>
                                        </Col>
                                        <Col className="col-4">
                                            <ReactWhatsapp className="border-0 w-100 " number={recipient.phone} message={` ${one}
Bapak/Ibu/Saudara/i
*${recipient.name}*
_____________________________________ 
اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَا تُهُ

ِبِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيْم
Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami:
berikut link lengkap acara kami :

https://invitation-wedding-nine.vercel.app/invitation/${recipient.id}

merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i 
berkenan untuk hadir dan memberikan do'a restu.

والسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ
`} > <FaWhatsapp className="w-10-3 text-success w-50" style={{height: '25%'}}/> </ReactWhatsapp>
                                        </Col>
                                    </Row>
                                    <Card.Body>
                                        <Row className="d-flex">
                                            <button  className='border-0 bg-white' onClick={() => navigate(`/invitation/${recipient.id}`)}>
                                                <Image  className="w-50 rounded mx-auto d-block" src={avatar} />
                                            </button> 
                                            <p className="fw-bold lh-1">Nama : {recipient.name}</p>
                                            <p className="fw-bold lh-1">Alamat : {recipient.adress}</p>
                                            <p className="fw-bold lh-1">Ucapan : {recipient.say}</p>
                                            </Row>
                                    </Card.Body>
                                    
                                </Card>
                            </Col>
                            
                            </>
                            
                        )
                      }) : 
                      <>
                      <Row>
                        <Col lg={3} className='mt-3'>
                          <LoadingCard />
                        </Col>
                        <Col lg={3} className='mt-3'>
                          <LoadingCard />
                        </Col>
                        <Col lg={3} className='mt-3'>
                          <LoadingCard />
                        </Col>
                        <Col lg={3} className='mt-3'>
                          <LoadingCard />
                        </Col>
                        <Col lg={3} className='mt-3'>
                          <LoadingCard />
                        </Col>
                        <Col lg={3} className='mt-3'>
                          <LoadingCard />
                        </Col>
                        <Col lg={3} className='mt-3'>
                          <LoadingCard />
                        </Col>
                      </Row>
                      </>
                     }
         </Row>        
    </div>
                    
                    
        
    ) 
}

export default Navbar;
