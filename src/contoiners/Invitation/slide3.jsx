import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import './invitation.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();
import weddingone from '../../assets/wedding1.png';
import background1 from '../../assets/backgound1.png';
import cip from '../../assets/cip.jpg';
import mandiri from '../../assets/mandiri1.png';
import swal from "sweetalert";


function Invitation () {

  const [copyTex, setCopyText] = useState('');
  const handleCopy = () => {
    navigator.clipboard.writeText(copyTex)
    swal("Berhasil disalin!", "You clicked the button!", "success")
  }

  const [copyTex1, setCopyText1] = useState('');
  const handleCopy1 = () => {
    navigator.clipboard.writeText(copyTex1)
    swal("Berhasil disalin!", "You clicked the button!", "success")
  }

  
  useEffect(()=> {
    setCopyText1('1010010426854')
  }, [])

  useEffect(()=> {
    setCopyText('1740002875011')
  },[])


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
                      <Card className="card-two" >
                          <div style={{width: '85%'}}>
                              <p className="text-center description lh-1" style={{fontSize: 40}}>Titip Hadiah Online</p>
                              <p className="text-center fw-bold lh-1" style={{fontSize: 15}}>
                              Doa restu Bapak/Ibu sekalian merupakan karunia yang sangat berarti bagi kami. 
                              Dan jika memberi merupakan ungkapan tanda kasih, 
                              Bapak/Ibu dapat memberi kado secara cashless. Terima kasih
                              </p>
                          </div>
                          <Card className="card-transaction mt-5">
                            <Row>
                              <Col  style={{marginTop: '7%', fontSize: '10px'}}>
                                <Image src={cip} style={{width: '30%', borderRadius: '5px'}}/>
                                <h6  style={{fontSize: '13px', fontWeight: 'bold', lineHeight: '1px', marginTop: '10px'}}>1010010426854</h6>
                                <p>M DETA R HANDOKO</p>

                              </Col>
                              <Col >
                                <Image style={{width: '100%', height: '50%', backgroundColor: 'transparent'}} src={mandiri}/>
                                <div className="ms-4">
                                  <Button className="btn-success mb-3 p-1" onClick={handleCopy1}>salin</Button>
                                </div>
                                
                              </Col>
                            </Row>
                            
                          </Card>
                          <Card className="card-transaction mt-3">
                            <Row>
                              <Col style={{marginTop: '7%', fontSize: '10px'}}>
                                <Image src={cip} style={{width: '30%', borderRadius: '5px'}}/>
                                <h6 style={{fontSize: '13px', fontWeight: 'bold', lineHeight: '1px', marginTop: '10px'}}>1740002875011</h6>
                                <p>A RISKAWATI</p>

                              </Col>
                              <Col >
                                <Image style={{width: '100%', height: '50%', backgroundColor: 'transparent'}} src={mandiri}/>
                                <div className="ms-4">
                                  <Button className="btn-success mb-3 p-1" onClick={handleCopy}>salin</Button>
                                </div>
                              </Col>
                            </Row>
                            
                          </Card>
                          <p className="text-center fw-bold lh-1 mt-5" style={{fontSize: 15}}>
                          Acara ini di selenggarakan dengan mematuhi protokol kesehatan dan bagi tamu undangan di harapkan dapat mengikutinya.
                          </p>    
                      </Card>
                  </div>
                </div>
                
            </Container>
        
        </>
    )
}

export default Invitation;