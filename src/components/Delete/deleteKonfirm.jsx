import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router";
import Delete from "../../assets/delete.png";
// import { useDispatch } from "react-redux";
// import deletedId from './CarItem';
// import { remove } from "../../redux/ListCar/slice";
// import axios from "axios";

function DeleteConfirm(props) {
  const { 
    show,
    onHide,
    id
    } = props;
    const [cards, setCards] = useState();
    const navigate = useNavigate()
//   const dispatch = useDispatch();


//   const deletedCar = async (e) =>{
//     e.preventDefault();
//     try{
//         const response = await axios.delete(`https://api-car-rental.binaracademy.org/admin/car/${id}`, 
//         {
//             headers: {
//                 access_token: 
//                     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY2NTI0MjUwOX0.ZTx8L1MqJ4Az8KzoeYU2S614EQPnqk6Owv03PUSnkzc"
//             }
//         }
//         );
//         dispatch(remove(response.data));
//         onHide();

//     }catch(error){
//         console.log("error >", error)
//     }
    
// }

const URL = "https://invitation-lm0g.onrender.com"
const getCards = () => {
  axios({
    method: "GET",
    url: `${URL}/recipients`
  })
  .then(cards => {
    setCards(cards.data)
  })
  .catch(err => {
    console.log(err)
  })
}
useEffect(() => {
  getCards()
},[])



const deleteHandler = (id) => {
  axios({
    method: "DELETE",
    url: `${URL}/recipients/${id}`
  })
  .then(result => {
    getCards()
    navigate('/')
  })
  .catch(err => {
    console.log(err)
  })
}


  return (
    <Modal show={show} onHide={onHide} id={id}>
    <Modal.Header className="border-0" closeButton />
      <Modal.Body>
        <div>
          <Card className="text-center border-0 d-flex justify-content-center align-items-center">
            <Card.Img
              variant="top"
              src={Delete}
              style={{ width: "25%" }}
            />
            <Card.Body>
              <Card.Title>Menghapus Data Penerima</Card.Title>
              <Card.Text>
                Setelah dihapus, data Penerima tidak dapat dikembalikan. Yakin ingin
                menghapus?
              </Card.Text>
              <Button className="w-25" variant="outline-primary"
               onClick={deleteHandler}
               >Ya</Button>
              <Button className="ms-3 w-25" variant="outline-primary" onClick={() => onHide()}>Tidak</Button>
            </Card.Body>
          </Card>
        </div>
      </Modal.Body>
    </Modal>
    
  );
}

export default DeleteConfirm;
