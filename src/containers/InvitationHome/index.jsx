import React, { useEffect, useState } from "react";
import { Button, Card, Container, Image } from "react-bootstrap";
import './invitationHome.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import useRecipientStore from "../../store/useRecipientStore";
// ..
AOS.init();

function InvitationHome () {

    const navigate = useNavigate();
    const [recipients, setRecipients] = useState();
    const token = localStorage.getItem("token");
    const {id} = useParams();
    const {user, fetchUser} = useRecipientStore();


    const fetchRecipients = async () => {
      try {
        const response = await axios.get(
          `https://api-invitation.xyz/api/recipients/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRecipients(response.data.data);
      } catch (err) {
        console.log("Data tidak ditemukan", err);
        setRecipients([]); // Set ke array kosong jika terjadi kesalahan
      }
    };
  
    useEffect(() => {
      fetchUser();
      fetchRecipients();
    }, []);

    return (
        <>
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
            <Container>
              
                
                 <>
                  <Card className="mt-3 mb-3 border-0" style={{height: '100vh'}}>
                  <h4 className="invitation-text">اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَا تُهُ</h4> 
                  <div className="invitation-card">
                      <Image className="invitation-image"  src={user ? user[0]?.profile_image : "Tamu Undangan"} />
                  </div>
                  <h4 className="text-center description" >Kepada Bapak/Ibu </h4>
                  <h4 className="text-center description" >{recipients ? recipients.name : "Tamu Undangan"}</h4>
                  <p className="text-center mt-3 fw-bold">
                      Tanpa Mengurangi Rasa Hormat, Kami Mengundang Bapak/Ibu/Saudara/i untuk Hadir di Acara Kami.
                  </p>
                  <div className="d-flex justify-content-center ">
                      <Button className="invitation-button mt-3" onClick={() => navigate(`/invitation/${id}`)} >Buka Undangan Anda</Button>
                  </div>
              </Card>
                 </>
             
               
            </Container>
        </div>
        </>
       
       
    )
}

export default InvitationHome;