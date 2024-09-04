import React, { useEffect, useState } from "react";
import { Button, Card, Container, Image } from "react-bootstrap";
import './invitationHome.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { Helmet } from "react-helmet";
import icon from "../../assets/avatar.jpg"

AOS.init();

function InvitationHome() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState();
    const [title, setTitle] = useState("Invitation");
    const [metaImage, setMetaImage] = useState(icon);
    const [favicon, setFavicon] = useState(icon);
    const getData = async () => {
        try {
            const response = await axios.get(`https://api-invitation.xyz/api/recipients/${id}`);
            setData(response.data.data);
            const datas = response.data.data;

      if (datas && datas.user && datas.user.username) {
        setTitle(`${datas.user.wedding.name} & ${datas.user.wedding.parthner_name}`);
      }
      
      if (datas && datas.user && datas.user.profile_image) {
        setMetaImage(datas.user.profile_image);
        setFavicon(datas.user.profile_image);
    }

        } catch (err) {
            console.log("Data tidak ditemukan", err);
            setData([]);
        }
    };

    function capitalizeFirstLetter(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
      }

    useEffect(() => {
        getData();
    }, []);
    useEffect(() => {
        console.log("Meta image URL: ", metaImage); // Debug line
    }, [metaImage]);

    useEffect(() => {
      document.title = title;
    }, [title]);

    return (
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
        <Helmet>
        <link rel="icon" href={favicon} />
                <title>{capitalizeFirstLetter(title)}</title>
                <meta property="og:title" content={title} />
                <meta property="og:image" content={metaImage} />
            </Helmet>
            <Container>
                <Card className="mt-3 mb-3 border-0" style={{ height: '100vh' }}>
                    <h4 className="invitation-text">اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَا تُهُ</h4> 
                    <div className="invitation-card">
                        <Image className="invitation-image" src={data?.user?.profile_image || "Tamu Undangan"} />
                    </div>
                    <h4 className="text-center description">Kepada Bapak/Ibu </h4>
                    <h4 className="text-center description">{data?.name || "Tamu Undangan"}</h4>
                    <p className="text-center mt-3 fw-bold">
                        Tanpa Mengurangi Rasa Hormat, Kami Mengundang Bapak/Ibu/Saudara/i untuk Hadir di Acara Kami.
                    </p>
                    <div className="d-flex justify-content-center">
                        <Button className="invitation-button mt-3" onClick={() => navigate(`/invitation/${id}`)}>
                            Buka Undangan Anda
                        </Button>
                    </div>
                </Card>
            </Container>
        </div>
    );
}

export default InvitationHome;
