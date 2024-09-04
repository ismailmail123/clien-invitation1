import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import "./style.css";
import { FaUserEdit, FaUserPlus } from "react-icons/fa";
import { FaPhotoFilm } from "react-icons/fa6";
import { MdOutlineDateRange, MdOutlineMoreTime, MdOutlineSettings } from "react-icons/md";
import { LuMonitorCheck } from "react-icons/lu";
import { GiSoundOn } from "react-icons/gi";
import { LuGift } from "react-icons/lu";
import Modal from "../modal";
import { useState } from "react";import { useNavigate } from "react-router-dom";
import { IoIosColorPalette } from "react-icons/io";
import Footer from "../../components/Footer";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // Tambahkan state untuk modalType
  const toggleModal = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const handleClick = (type) => {
    setModalType(type); // Set modalType berdasarkan tombol yang diklik
    setIsOpen(true); // Buka modal
  };
  

  return (
    <>
      <div className="bg-body-secondary" 
      // style={{ height: "100vh" }}
      >
        <Navbar />

        <Container>
          <div>
            <h5 className="mt-3 fw-bold" style={{ fontFamily: "Dancing Script, cursive" }}>
              Edit undangan
            </h5>
            <Card>
              <div>
                <Row className="g-3 bg-body-secondary mt-3">
                  <Col lg={6} md={6} sm={12}>
                    <Button 
                      onClick={() => handleClick("mempelai")}
                      className="w-100 bg-secondary-subtle d-flex justify-content-center align-items-center rounded"
                      style={{ height: "100px", flexDirection: "column" }}
                    >
                      <FaUserEdit className="fs-1 text-info-emphasis" />
                      <h6 className="text-black">Edit Mempelai</h6>
                    </Button>
                  </Col>
                  
                  <Col lg={6} md={6} sm={12}>
                    <Button 
                      onClick={() => handleClick("galeri")}
                      className="w-100 bg-secondary-subtle d-flex justify-content-center align-items-center rounded"
                      style={{ height: "100px", flexDirection: "column" }}
                    >
                      <FaPhotoFilm className="fs-1 text-info-emphasis" />
                      <h6 className="text-black">Atur Galeri</h6>
                    </Button>
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <Button 
                      onClick={() => handleClick("tema")}
                      className="w-100 bg-secondary-subtle d-flex justify-content-center align-items-center rounded"
                      style={{ height: "100px", flexDirection: "column" }}
                    >
                      <LuMonitorCheck className="fs-1 text-info-emphasis" />
                      <h6 className="text-black">Atur Tema</h6>
                    </Button>
                  </Col>
                  
                  <Col lg={6} md={6} sm={12}>
                    <Button 
                      onClick={() => handleClick("kado")}
                      className="w-100 bg-secondary-subtle d-flex justify-content-center align-items-center rounded"
                      style={{ height: "100px", flexDirection: "column" }}
                    >
                      <LuGift className="fs-1 text-info-emphasis" />
                      <h6 className="text-black">Atur Kado Online</h6>
                    </Button>
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <Button 
                      onClick={() => navigate("/addThems")}
                      className="w-100 bg-secondary-subtle d-flex justify-content-center align-items-center rounded"
                      style={{ height: "100px", flexDirection: "column" }}
                    >
                      <IoIosColorPalette className="fs-1 text-info-emphasis" />
                      <h6 className="text-black">Upload Thema</h6>
                    </Button>
                  </Col>
                  {/* <Col lg={6} md={6} sm={12}>
                    <Button 
                      onClick={() => navigate("/addSound")}
                      className="w-100 bg-secondary-subtle d-flex justify-content-center align-items-center rounded"
                      style={{ height: "100px", flexDirection: "column" }}
                    >
                      <GiSoundOn className="fs-1 text-info-emphasis" />
                      <h6 className="text-black">Upload Musik</h6>
                    </Button>
                  </Col> */}
                  <Col lg={6} md={6} sm={12}>
                    <Button 
                      onClick={() => navigate("/addrecipient")}
                      className="w-100 bg-secondary-subtle d-flex justify-content-center align-items-center rounded"
                      style={{ height: "100px", flexDirection: "column" }}
                    >
                      <FaUserPlus className="fs-1 text-info-emphasis" />
                      <h6 className="text-black">Tambah Penerima</h6>
                    </Button>
                  </Col>
                  {/* <Col >
                    <Button 
                      onClick={() => handleClick("pengaturan")}
                      className="w-100 bg-secondary-subtle d-flex justify-content-center align-items-center rounded"
                      style={{ height: "100px", flexDirection: "column" }}
                    >
                      <MdOutlineSettings className="fs-1 text-info-emphasis" />
                      <h6 className="text-black">Pengaturan</h6>
                    </Button>
                  </Col> */}
                </Row>
                <Col className="mt-3">
                  <Button className="w-100 bg-secondary-subtle d-flex justify-content-center align-items-center rounded"
                    style={{ height: "100px", flexDirection: "column" }}>
                    <h6 className="text-center text-black">Pastikan semua menu telah dilengkapi sebelum mengirim undangan!!</h6>
                  </Button>
                </Col>
              </div>
            </Card>
          </div>
          <Modal toggleModal={toggleModal} isOpen={isOpen} modalType={modalType} />
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Index;
