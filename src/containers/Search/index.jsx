import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import "./style.css";
import { FaRegEdit, FaRegEye, FaShareSquare } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { PiCheckLight } from "react-icons/pi";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useRecipientStore from "../../store/useRecipientStore";
import ReactWhatsapp from "react-whatsapp";
import swal from "sweetalert";

const Index = () => {
  const { recipients = [], fetchRecipient, updateRecipientStatus, deleteRecipient } = useRecipientStore();
  const [filteredRecipients, setFilteredRecipients] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const navigate = useNavigate();;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRecipientId, setSelectedRecipientId] = useState(null);
  const one = "kepada Yth.";

  useEffect(() => {
    fetchRecipient();
  }, [fetchRecipient]);

  useEffect(() => {
    if (recipients.length > 0 && query) {
      const filtered = recipients.filter(recipient => {
        const isNameMatch = recipient.name.toLowerCase().includes(query.toLowerCase());
        const isNumberMatch = recipient.number.toLowerCase().includes(query.toLowerCase());
        return (isNameMatch || isNumberMatch);
      });
      setFilteredRecipients(filtered);
    }
  }, [recipients, query]);

  const handleMarkAsSent = async (recipientId) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const recipientStatusData = { status: 'terkirim' };
      await updateRecipientStatus(recipientId, recipientStatusData);
      await fetchRecipient(); // Re-fetch data to update state
      swal("Success", "Recipient data updated successfully", "success");
    } catch (error) {
      console.error("Failed to update recipient data", error);
      swal("Error", "Failed to update recipient data", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (recipientId) => {
    setSelectedRecipientId(recipientId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (selectedRecipientId) {
      await deleteRecipient(selectedRecipientId);
      alert("Recipient successfully deleted");
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <div className="bg-body-secondary" style={{ height: "100vh" }}>
        <Navbar />
        <Container>
          <div>
            <Row>
              {filteredRecipients.length > 0 ? (
                filteredRecipients.map((recipient) => (
                  <Col md={12} key={recipient.id} >
                    <Card className="w-100">
                      <Card.Body style={{borderBottom: "1px solid #d6d3d1"}} className="d-flex align-items-center p-0">
                        <div className="flex-grow-1">
                          <h6>{recipient.name}</h6>
                          <p>{recipient.number}</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-end">
                          <Button className="bg-transparent border-0 p-0 me-2" style={{ color: "green" }}>
                            <ReactWhatsapp
                              className="border-0 w-100 p-0"
                              number={recipient.number}
                              message={` ${one}
Bapak/Ibu/Saudara/i
*${recipient.name}*
______________________________ 
اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ

ِبِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيْم
Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami:
berikut link lengkap acara kami :

https://invitation-wedding-nine.vercel.app/invitation/${recipient.id}

merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i 
berkenan untuk hadir dan memberikan do'a restu.

والسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ
`}>
                              <FaShareSquare />
                            </ReactWhatsapp>
                          </Button>
                          {recipient.status !== "terkirim" ? (
                            <Button className="bg-transparent border-0 p-0 me-2 text-dark text-wrap w-25" onClick={() => handleMarkAsSent(recipient.id)}>
                              Tandai sebagai Terkirim
                            </Button>
                          ) : (
                            <PiCheckLight className="text-success me-2" />
                          )}
                          <Button onClick={() => navigate(`/editrecipient/${recipient.id}`)} className="bg-transparent border-0 p-0 me-2" style={{ color: "blue" }}>
                            <FaRegEdit />
                          </Button>
                          <Button onClick={() => navigate(`/open/${recipient.id}`)} className="bg-transparent border-0 p-0 me-2" style={{ color: "yellowgreen" }}>
                            <FaRegEye />
                          </Button>
                          <Button className="bg-transparent border-0 p-0" style={{ color: "red" }} onClick={() => handleDelete(recipient.id)}>
                            <MdOutlineDelete />
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p>No recipients found matching your search criteria.</p>
              )}
            </Row>
          </div>
        </Container>
         {/* Delete Confirmation Modal */}
         <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this recipient?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete}>Delete</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Index;
