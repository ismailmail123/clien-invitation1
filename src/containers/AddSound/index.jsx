import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import "./style.css";
import "./FormAdd.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRecipientStore from "../../store/useRecipientStore";
import Footer from "../../components/Footer";

const Index = () => {
  const { addThem } = useRecipientStore();
  const [musicData, setMusicData] = useState({
    title: "",
    sound_url: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMusicData((prevState) => ({
        ...prevState,
        sound_url: file, // Store the selected music file
      }));
    }
  };

  const handleAddMusic = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", musicData.title);
    formData.append("sound_url", musicData.sound_url); // append the selected music file

    // try {
    //   await addThem(formData); // upload the music and data to the backend
    //   alert("Musik berhasil ditambahkan");
    //   navigate(-1);
    // } catch (error) {
    //   console.error("Error adding music:", error);
    //   alert("Gagal menambahkan musik");
    // } finally {
    //   setIsSubmitting(false);
    // }
    try {
      await addThem(formData); 
      alert("Musik berhasil ditambahkan");
      navigate(-1);
    } catch (error) {
      console.error("Error adding music:", error);
      alert("Gagal menambahkan musik: " + JSON.stringify(error)); // Menampilkan error sebagai JSON string
    }
  };

  return (
    <>
      <div className="bg-body-secondary" style={{ height: "100vh" }}>
        <Navbar />
        <Container fluid className="p-0 m-0 containerEditCar">
          <div className="m-0">
            <h4
              className="text-center fw-bold"
              style={{
                marginLeft: "50px",
                height: "100%",
                fontFamily: "Dancing Script, cursive",
              }}
            >
              Add Music
            </h4>
            <Col xs="auto" className="colEditcar d-none d-md-block h-100"></Col>
          </div>
          <Form onSubmit={handleAddMusic}>
            <div className="p-3">
              <div className="row row-car">
                <div className="w-100 bg-white d-flex justify-content-center">
                  <fieldset className="p-3 font-template w-100">
                    <Form.Group className="mb-3" controlId="title">
                      <Row>
                        <Form.Label
                          column
                          sm="4"
                          className="mb-0 d-flex align-items-center"
                        >
                          Judul
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <Col sm="8">
                          <Form.Control
                            type="text"
                            value={musicData.title}
                            onChange={(e) =>
                              setMusicData((prevState) => ({
                                ...prevState,
                                title: e.target.value,
                              }))
                            }
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="sound_url">
                      <Row>
                        <Form.Label
                          column
                          sm="4"
                          className="mb-0 d-flex align-items-center"
                        >
                          Upload Musik
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <Col sm="8">
                          <Form.Control
                            type="file"
                            accept="audio/*"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </fieldset>
                </div>
                <div
                  className="d-flex justify-content-center"
                  style={{ marginTop: "40px" }}
                >
                  <Button
                    className="d-flex align-items-center me-3 btnCancel"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="d-flex align-items-center text-white btnSave"
                    disabled={isSubmitting}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Index;
