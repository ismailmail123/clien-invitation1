import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import "./style.css";
import "./FormAdd.css";
import { useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import useRecipientStore from "../../store/useRecipientStore";
import Footer from "../../components/Footer";

const Index = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");    
  // const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addRecipient} = useRecipientStore();
  const navigate = useNavigate();
  
    
  const handleAdd = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
  
    const recipientData = {
      name,
      number,
    };

        await addRecipient(recipientData);
        swal("Success", "Recipient data updated successfully", "success");
        navigate(-1); // Navigate back
        
      
    
  };

  return (
    <>
      <div className="bg-body-secondary" style={{ height: "100vh" }}>
        <Navbar />
        <Container fluid className='p-0 m-0 containerEditCar'>
          <div className="m-0">
            <h4 className='text-center fw-bold' style={{marginLeft: "50px", height: "100%",  fontFamily: "Dancing Script, cursive"}}>Add Recipient</h4>
            <Col xs="auto" className='colEditcar d-none d-md-block h-100'></Col>
          </div>
          <Form onSubmit={handleAdd}>
            <div className='p-3'>
              <div className='row row-car'>
                <div className="w-100 bg-white d-flex justify-content-center">
                  <fieldset className='p-3 font-template w-100'>
                    <Form.Group className="mb-3" controlId="name">
                      <Row>
                        <Form.Label column sm="4" className="mb-0 d-flex align-items-center">
                          Nama
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <Col sm="8">
                          <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="number">
                      <Row>
                        <Form.Label column sm="4" className="mb-0 d-flex align-items-center">
                          No. Hp
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <Col sm="8">
                          <Form.Control
                            type="text"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </fieldset>
                </div>
                <div className="d-flex justify-content-center" style={{ marginTop: "40px" }}>
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
