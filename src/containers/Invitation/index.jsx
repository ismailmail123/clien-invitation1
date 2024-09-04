import React, { useEffect, useState, useRef, Fragment } from "react";
import { Button, Card, Col, Container, Image, Row, Modal } from "react-bootstrap";
import "./invitation.css";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
import Clock from "../../containers/Clock/Clock";
import { TbMapSearch } from "react-icons/tb";
import { ImHome3 } from "react-icons/im";
import { FaUserFriends, FaRegImages, FaMusic } from "react-icons/fa";
import Slide1 from "./slide1";
import Slide2 from "./slide2";
import Slide3 from "./slide3";
import Slide4 from "./slide4";
import Slide5 from "./slide5";
import Slide6 from "./slide6";// Ganti dengan path musik Anda
import axios from "axios";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/id";
import pengantin from "../../assets/pengantin-kartoon.png";
import icon from "../../assets/wedding2.png";

function Invitation() {
  const [timerDays, setTimerDays] = useState(0);
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [data, setData] = useState();
  const [showModal, setShowModal] = useState(true);
  const [countDownDate, setCountDownDate] = useState(null); // State untuk menyimpan tanggal pernikahan

  const audioRef = useRef(null);
  let interval;
  const { id } = useParams();

  const startTimer = () => {
    if (countDownDate) {
      const targetDate = new Date(countDownDate).getTime();

      interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (24 * 60 * 60 * 1000));
        const hours = Math.floor((distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
        const seconds = Math.floor((distance % (60 * 1000)) / 1000);

        if (distance < 0) {
          clearInterval(interval);
        } else {
          setTimerDays(days);
          setTimerHours(hours);
          setTimerMinutes(minutes);
          setTimerSeconds(seconds);
        }
      }, 1000);
    }
  };

  useEffect(() => {
    startTimer();

    if (audioRef.current) {
      audioRef.current.play();
    }

    return () => {
      clearInterval(interval);
    };
  }, [countDownDate]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const getData = async () => {
    try {
      const response = await axios.get(`https://api-invitation.xyz/api/recipients/${id}`);
      setData(response.data.data);

      // Ambil tanggal pernikahan dari data API dan set sebagai countDownDate
      if (response.data.data.user.wedding.date) {
        setCountDownDate(response.data.data.user.wedding.date);
      }
    } catch (err) {
      console.log("Data tidak ditemukan", err);
      setData([]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const formatTanggal = (dateString) => {
    dayjs.locale("id");
    let formattedDate = dayjs(dateString).format("dddd, DD MMMM YYYY");
    // Ganti "Minggu" dengan "Ahad"
    formattedDate = formattedDate.replace("Minggu", "Ahad");
    return formattedDate;
};

  function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  const handleCloseModal = () => setShowModal(false);


  return (
    <>
      <Container
        className="m-0 fixed-bottom bg-success p-2 text-dark bg-opacity-75"
        style={{
          backgroundColor: "#1f85ad",
          width: "456px",
          height: "5%",
          borderRadius: "100px",
          position: "fixed",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row className="m-0 w-100 d-flex justify-content-between align-items-center">
          <Col className="p-0 d-flex justify-content-center align-items-center">
            <a href="#home">
              <ImHome3 className="fs-3 text-light" />
            </a>
          </Col>
          <Col className="p-0 d-flex justify-content-center align-items-center">
            <a href="#user">
              <FaUserFriends className="fs-3 text-light" />
            </a>
          </Col>
          <Col className="p-0 d-flex justify-content-center align-items-center">
            <a href="#galeri">
              <FaRegImages className="fs-3 text-light" />
            </a>
          </Col>
          <Col className="p-0 d-flex justify-content-center align-items-center">
            <a href="#maps">
              <TbMapSearch className="fs-3 text-light" />
            </a>
          </Col>
          <Col className="p-0 d-flex justify-content-center align-items-center">
            <Button
              onClick={togglePlayPause}
              variant="link"
              className="text-light"
            >
              <FaMusic
                className={`fs-3 ${isPlaying ? "text-primary" : "text-muted"}`}
              />
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Modal untuk ditampilkan saat halaman pertama kali dimuat */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Selamat Datang!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="d-flex align-items-center gap-3 "
            style={{ border: "1px solid green", borderRadius: 10, padding: 10 }}
          >
            <p>Apakah anda ingin mendengarkan musik !</p>
            <Button
              onClick={togglePlayPause}
              variant="light"
              className={`btn w-25 ${
                isPlaying ? "text-primary" : "text-muted"
              }`}
              style={{ border: "1px solid green" }}
            >
              Ya
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <p style={{ fontSize: "12px" }}>
            Created By : Ismail (+6285342545607)
          </p>
          <Button variant="danger" onClick={handleCloseModal}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>

      {data && data.user ? (
  <>
    {(data.user.profile_image !== null ||
      data.user.cover_image !== null ||
      data.user.thems_image !== null ||
      data.user.thems_image1 !== null) ? (
      <div
        className="cardslide"
        style={{
          backgroundImage: `url("${data.user.thems_image || icon}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100vh",
        }}
        id="home"
      >
        <Card className="card-one">
          {data.user.profile_image == null ? (
            <Image
              style={{ borderRadius: "50%", width: "60%", height: "30%" }}
              src={pengantin}
            />
          ) : (
            <Image
              style={{ borderRadius: "50%", width: "60%", height: "30%" }}
              src={data.user.profile_image}
            />
          )}
          {data.user.wedding && (
            <div className="lh-1 p-3">
              <h3
                className=" mt-0 mb-0 fw-bold text-start"
                style={{ fontFamily: "Dancing Script, cursive" }}
              >
                {capitalizeFirstLetter(data.user.wedding.name)} &{" "}
              </h3>
              <h3
                className="text-end mt-0 fw-bold"
                style={{
                  marginBottom: "3rem",
                  fontFamily: "Dancing Script, cursive",
                }}
              >
                {capitalizeFirstLetter(data.user.wedding.parthner_name)}
              </h3>
              <h3 className="description text-center mb-3">
                {formatTanggal(data.user.wedding.date)}
              </h3>
            </div>
          )}
          <Clock
            days={timerDays}
            hours={timerHours}
            minutes={timerMinutes}
            seconds={timerSeconds}
          />
        </Card>
        <audio ref={audioRef} src={data.user.wedding.sound} autoPlay loop />
      </div>
      
    ) : (
      <div
        className="cardslide"
        style={{
          backgroundImage: `url(${icon})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100vh",
        }}
        id="home"
      >
        <Card className="card-one">
          {data.user.profile_image == null ? (
            <Image
              style={{ borderRadius: "50%", width: "60%", height: "30%" }}
              src={pengantin}
            />
          ) : (
            <Image
              style={{ borderRadius: "50%", width: "60%", height: "30%" }}
              src={data.user.profile_image}
            />
          )}
          {data.user.wedding ? (
            <div className="lh-1 p-3">
              <h3
                className=" mt-0 mb-0 fw-bold text-start"
                style={{ fontFamily: "Dancing Script, cursive" }}
              >
                {capitalizeFirstLetter(data.user.wedding.name)} &{" "}
              </h3>
              <h3
                className="text-end mt-0 fw-bold"
                style={{
                  marginBottom: "3rem",
                  fontFamily: "Dancing Script, cursive",
                }}
              >
                {capitalizeFirstLetter(data.user.wedding.parthner_name)}
              </h3>
              <h3 className="description text-center mb-3">
                {formatTanggal(data.user.wedding.date)}
              </h3>
            </div>
          ) : (
            <div className="lh-1 p-3">
              <h3>Data Belum diinput</h3>
              <h3>Data Belum diinput</h3>
            </div>
          )}
          <Clock
            days={timerDays}
            hours={timerHours}
            minutes={timerMinutes}
            seconds={timerSeconds}
          />
        </Card>
      </div>
    )}

<Fragment>
  {data.user.wedding ? (
    <>
      <Slide1 wedding={data.user.wedding} data={data} user={data.user} />
      <Slide2 wedding={data.user.wedding} data={data} />
      <Slide3 data1={data} user={data.user} />
      <Slide4 data={data} />
      {/* Memeriksa apakah galeri ada dan tidak kosong */}
      {data.user.galerie && data.user.galerie.length > 0 ? (
        <Slide5 data={data} galerie={data.user.galerie} />
      ) : null}
      <Slide6 data={data} user={data.user} />
    </>
  ) : (
    <p>Data wedding tidak tersedia</p>
  )}
</Fragment>

  </>
) : (
  <>
  <p className="d-flex justify-content-center align-items-center">Data tidak tersedia</p>
  </>
)}


      {/* Audio element for background music */}
      
    </>
  );
}

export default Invitation;

