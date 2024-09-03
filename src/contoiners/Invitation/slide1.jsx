import React, { useEffect, useState } from "react";
import { Card, Container, Image } from "react-bootstrap";
import './invitation.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();
import weddingone from '../../assets/wedding1.png';
import weddingtwo from '../../assets/wedding2.png';
import wedding3 from '../../assets/wedding.jpeg';


function Invitation () {

   
    
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
                        backgroundImage: `url(${weddingtwo})`,
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
                        <Card className="card-two" style={{marginTop: 150}} id="user">
                            <div style={{width: '75%'}}>
                                <p className="text-center description lh-1">The Wedding of Deta & Riska</p>
                                <p className="text-center fw-bold" style={{fontSize: 12}}>
                                    ِبِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيْم
                                </p>
                                <p className="text-center fw-bold" style={{fontSize: 12}}>
                                    Atas Rahmat Tuhan Yang Maha Esa, 
                                    kami bermaksud mengundang Anda di acara Kami. 
                                    Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga,
                                    apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu pada
                                </p>
                            </div>
                            
                            <Image
                            className="mt-3 mb-3"
                                style={{borderRadius: '50%', width: '50%', height: '25%'}}
                                src={wedding3}/>
                                <div style={{width: '75%'}}>
                                    <p className="text-center mt-3 fw-bold" style={{fontSize: 12}}>
                                       Dan diantara ayat-ayat-Nya ialah Dia Menciptakan untukmu istri-istri dari jenismu sendiri supaya kamu merasa nyaman kepadanya, 
                                       dan dijadikan-Nya di antaramu mawadah dan warahmah. 
                                       sesungguhnya pada yang demikian itu benar-benar terdapat 
                                       tanda-tanda bagi kaum berfikir <br></br>
                                       (Ar-Rum 21)
                                    </p> 
                                </div>
                                
                        </Card>
                    </div>
                </div>
            </Container>
        
        </>
    )
}

export default Invitation;