import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import "./style.css";
import "./FormAdd.css";

import {  useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRecipientStore from "../../store/useRecipientStore";
import Footer from "../../components/Footer";


const Index = () => {
  const { addThem } = useRecipientStore();
  const [imgPreview, setImgPreview] = useState();
  const [img_url, setImg_url] = useState();
  const [title, setTitle] = useState();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // const handleFileChange = (e) => {
  //   const { name, files } = e.target;
  //   if (files && files[0]) {
  //     const file = files[0];
  //     setThemData((prevState) => ({
  //       ...prevState,
  //       [name]: file, // Directly store the file object
  //     }));
  //   }
  // };
  const handleImageChange = (file) => {
    setImg_url(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result); // Set pratinjau gambar
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      handleImageChange(file); // this updates both the state and preview
    }
  };


  const handleAddThems = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("img_url", img_url); // append the selected image file

    try {
      await addThem(formData); // upload the image and data to the backend
      alert("Tema berhasil ditambahkan");
      navigate(-1);
    } catch (error) {
      console.error("Error adding galeri:", error);
      setError("Gagal menambahkan Tema");
      alert("Gagal menambahkan tema")
    } finally {
      setIsSubmitting(false); // set submitting to false after completion
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
              Tambahkan Tema
            </h4>
            <Col xs="auto" className="colEditcar d-none d-md-block h-100"></Col>
          </div>
          <Form onSubmit={handleAddThems}>
            <div className="p-3">
              <div className="row row-car">
                <div className="w-100 bg-white d-flex justify-content-center">
                  <fieldset className="p-3 font-template w-100">
                    <Form.Group className="mb-3" controlId="name">
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
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="number">
                      <Row>
                        <Form.Label
                          column
                          sm="4"
                          className="mb-0 d-flex align-items-center"
                        >
                          Tema
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <Col sm="8">
                          <Form.Control
                            type="file"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                          />
                          {imgPreview && (
                            <div className="image-preview">
                              <img
                                src={imgPreview}
                                alt="Image Preview"
                                className="img-fluid"
                              />
                            </div>
                          )}
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
                    Batalkan
                  </Button>
                  {isSubmitting ? (
                <>
                  <Button
                    className="d-flex align-items-center me-3 btnSave text-light"
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Diproses...
                  </Button>
                </>
              ) : (
                   <Button
                  className="d-flex align-items-center me-3 btnSave text-light"
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Simpan
                </Button>
              )}
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
