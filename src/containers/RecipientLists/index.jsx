import { Button, Card,Container, Modal, Table } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import "./style.css"
import { FaShareSquare, FaRegEdit, FaRegEye } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import useRecipientStore from "../../store/useRecipientStore";
import { useNavigate} from "react-router-dom";
import ReactWhatsapp from 'react-whatsapp';
import Footer from "../../components/Footer";
import swal from "sweetalert";
import { PiCheckLight } from "react-icons/pi";

const Index = () => {
  const { fetchRecipient, recipients, deleteRecipient, updateRecipientStatus } = useRecipientStore();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRecipientId, setSelectedRecipientId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const one = "kepada Yth.";

  useEffect(() => {
    fetchRecipient();
  }, [fetchRecipient]);

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

  return (
    <>
      <div className="bg-body-secondary" style={{ height: "100vh" }}>
        <Navbar />
        <Container>
          <div>
            <h5 className="mt-3 fw-bold" style={{ fontFamily: "Dancing Script, cursive" }}>
              Daftar penerima Undangan
            </h5>
            <Card>
              <div>
                <Table striped bordered hover variant="light">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Nama</th>
                      <th>No. Hp</th>
                      <th className="text-center" colSpan={4}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipients && recipients.map((recipient, index) => (
                      <tr key={recipient.id}>
                        <td style={{ textAlign: "center", verticalAlign: "middle" }}>{index + 1}</td>
                        <td style={{ textAlign: "center", verticalAlign: "middle" }}>{recipient.name}</td>
                        <td style={{ textAlign: "center", verticalAlign: "middle" }}>{recipient.number}</td>
                        <td style={{ fontSize: "0.8rem", textAlign: "center", verticalAlign: "middle", color: "green" }}>
                          <Button className="bg-transparent border-0" style={{color: "green" }}>
                            <ReactWhatsapp className="border-0 w-100 p-0" number={recipient.number} message={` ${one}
Bapak/Ibu/Saudara/i
*${recipient.name}*
______________________________ 
اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَا تُهُ

ِبِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيْم
Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami:
berikut link lengkap acara kami :

https://digital-invitation-eight.vercel.app/open/${recipient.id}

merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i 
berkenan untuk hadir dan memberikan do'a restu.

والسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ
`} >
                              <FaShareSquare />
                            </ReactWhatsapp>
                          </Button>
                          {
                            recipient.status !== "terkirim" ? (
                              <div>
                            <button className="p-0 lh-1 bg-transparent" onClick={() => handleMarkAsSent(recipient.id)}>Tandai sebagai Terkirim</button>
                          </div>
                            ):(
                            <PiCheckLight className="text-success"  />
                            )
                          }
                          
                        </td>
                        <td title="Edit" style={{ fontSize: "0.8rem", textAlign: "center", verticalAlign: "middle", color: "blue" }}>
                          <Button onClick={() => navigate(`/editrecipient/${recipient.id}`)} className="bg-transparent border-0 p-0" style={{color: "blue" }}>
                            <FaRegEdit />
                          </Button>
                        </td>
                        <td title="View" style={{ fontSize: "0.8rem", textAlign: "center", verticalAlign: "middle", }}>
                          <Button onClick={() => navigate(`/open/${recipient.id}`)} className="bg-transparent border-0 p-0" style={{color: "yellowgreen" }}>
                            <FaRegEye />
                          </Button>
                        </td>
                        <td title="Delete" style={{ fontSize: "0.8rem", textAlign: "center", verticalAlign: "middle", color: "red" }}>
                          <Button className="bg-transparent border-0 p-0" style={{ color: "red" }} onClick={() => handleDelete(recipient.id)}>
                            <MdOutlineDelete />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card>
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
      <Footer />
    </>
  );
};

export default Index;

