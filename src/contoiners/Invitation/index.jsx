import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import './invitation.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();
import weddingone from '../../assets/wedding1.png';
import weddingtwo from '../../assets/wedding2.png';
import Clock from "../../components/Clock/Clock";
import wedding3 from '../../assets/wedding.jpeg';
import background1 from '../../assets/wedding.jpeg'
import {TbMapSearch} from 'react-icons/tb';
import {ImHome3} from 'react-icons/im';
import{ FaUserFriends, FaRegImages, FaMusic } from 'react-icons/fa';
import ReactAudioPlayer from 'react-audio-player';
import useSound from 'use-sound';
import sound1 from '../../assets/audio backsound.mp3';
import Slide1 from './slide1';
import Slide2 from './slide2';
import Slide3 from './slide3';
import Slide4 from './slide4';
import Slide5 from './slide5';
import Slide6 from './slide6';


function Invitation () {

    const [timerDays, setTimerDays] = useState();
    const [timerHours, setTimerHours] = useState();
    const [timerMinutes, setTimerMinutes] = useState();
    const [timerSeconds, setTimerSeconds] = useState();
    
    const [play, {stop}] = useSound(sound1);

    let interval;

  const startTimer = () => {
    const countDownDate = new Date("9/9/2023 ").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = countDownDate - now;

      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance < 0) {
        // Stop Timer

        clearInterval(interval.current);
      } else {
        // Update Timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    });
  };

  useEffect(() => {
    startTimer();
  });
    
    return (
        <>
         <Container>
            <div className="fixed-bottom bg-success p-2 text-dark bg-opacity-75"
            style={{backgroundColor: '#1f85ad', width: '10re', height: '5%', borderRadius: '100px', }}>
                <div className="d-flex justify-content-center  ">
                    <Row>
                        <Col>
                            <p>
                              <a href="#home">
                                <ImHome3 className="mb-3" />
                              </a>
                            </p>
                        </Col>
                        <Col className="ms-4 ">
                          <p>
                          <a href="#user">
                            <FaUserFriends className="mb-3" />   
                          </a>
                          </p>
                        </Col>
                        <Col className="ms-4 ">
                          <p>
                            <a href="#galeri">
                              <FaRegImages className="mb-3" />
                            </a>
                          </p>
                        </Col>
                        <Col className="ms-4 ">
                          <p>
                            <a href="#maps">
                              <TbMapSearch className="mb-3" />
                            </a>
                          </p>
                        </Col>
                        <Col className="ms-4">
                          <p>
                              <Button
                              onMouseEnter={() => play()}
                              >
                              <FaMusic className="mb-3" />
                              </Button>
                            {/* </a> */}
                          </p>
                          
                        </Col>
                    </Row>
                </div>
            </div>
        </Container>
            
        <div 
        
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        data-aos-anchor-placement="top-center"
        >
            <Container 
                className="d-flex align-items-center justify-content-center"
                style={{
                    backgroundImage: `url(${weddingone})`,
                    backgroundSize: 'cover',
                    height: '760px'
                }}
                id="home"
            >
                <div className="cardslide"
                    style={{
                        backgroundImage: `url(${weddingtwo})`,
                        backgroundSize: 'cover'
                    }}
                >
                    <Card className="card-one">
                        <Image
                            style={{borderRadius: '50%', width: '75%', height: '50%'}}
                            src={wedding3}/>
                        <p className="description">Deta & Riska</p>
                        <p className="description">Sabtu, 09 Desember 2023</p>
                            <Clock
                                timerDays={timerDays}
                                timerHours={timerHours}
                                timerMinutes={timerMinutes}
                                timerSeconds={timerSeconds}
                            />
                    </Card>
                </div>
            </Container>
        </div>
        <Slide1 />
        <Slide2 />
        <Slide3 />
        <Slide4 />
        <Slide5 />
        <Slide6 />
        </>
    )
}

export default Invitation;