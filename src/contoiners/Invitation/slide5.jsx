import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import './invitation.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();
import weddingone from '../../assets/wedding1.png';
import background1 from '../../assets/backgound1.png';
import cip from '../../assets/cip.jpg';
import galeri1 from '../../assets/penutup (2).jpeg';
import galeri2 from '../../assets/penutup (3).jpeg';
import galeri3 from '../../assets/penutup (4).jpeg';
import galeri4 from '../../assets/penutup (5).jpeg';
import galeri5 from '../../assets/penutup (6).jpeg';
import galeri6 from '../../assets/penutup (7).jpeg';
import galeri7 from '../../assets/penutup (8).jpeg';
import galeri8 from '../../assets/penutup (9).jpeg';
import galeri9 from '../../assets/penutup (10).jpeg';

function Invitation () {

  const [formValues, setFormValues] = useState()


  const handleSubmit = () => {

  }
    return (
        <>
        
            <Container 
                className="d-flex align-items-center justify-content-center"
                style={{
                    backgroundImage: `url(${weddingone})`,
                    backgroundSize: 'cover'
                }}
            >
                <div className="cardslide1"
                    style={{
                        backgroundImage: `url(${background1})`,
                        backgroundSize: 'cover'
                    }}
                >
                  <div 
          
                    data-aos="fade-up"
                    data-aos-offset="200"
                    data-aos-delay="25"
                    data-aos-duration="500"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-center"
                  >
                      <Card className="card-two" id="galeri" >
                          <div style={{width: '85%'}}>
                              <p className="text-center description lh-1" style={{fontSize: 40}}>Our galery</p>
                          </div>
                          <Row>
                            <Image className="w-100" style={{borderRadius: '30px'}} src={galeri1}/>
                            <Col className="col-4 mt-3" >
                                <Image className="w-100" style={{borderRadius: '10px'}} src={galeri6} />
                            </Col>
                            <Col className="col-4 mt-3" >
                                <Image className="w-100" style={{borderRadius: '10px'}} src={galeri3} />
                            </Col>
                            <Col className="col-4 mt-3" >
                            <   Image className="w-100" style={{borderRadius: '10px'}} src={galeri4} />
                            </Col>
                          </Row>
                          <Row>
                            <Col className="col-6 mt-3" >
                                <Image className="w-100" style={{borderRadius: '10px'}} src={galeri5} />
                            </Col>
                            <Col className="col-6 mt-3" >
                                <Image className="w-100" style={{borderRadius: '10px'}} src={galeri2} />
                            </Col>
                           
                          </Row>
                          <Row>
                            <Col className="col-4 mt-3" >
                                <Image className="w-100" style={{borderRadius: '10px'}} src={galeri7} />
                            </Col>
                            <Col className="col-4 mt-3" >
                                <Image className="w-100" style={{borderRadius: '10px'}} src={galeri8} />
                            </Col>
                            <Col className="col-4 mt-3" >
                            <   Image className="w-100" style={{borderRadius: '10px'}} src={galeri9} />
                            </Col>
                          </Row>
                        
                      </Card>
                  </div>
                </div>
                
            </Container>
        
        </>
    )
}

export default Invitation;