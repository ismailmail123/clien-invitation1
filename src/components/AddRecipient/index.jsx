import React from 'react';
import {Form, Button, Col, Container, Row, InputGroup} from 'react-bootstrap';
import './FormEditCard.css'
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { update } from '../../redux/recipient/sliceRecipient';
import swal from "sweetalert";

const FormEditCar = () => {

    const URL = "https://invitation-lm0g.onrender.com"
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const login = useSelector((state) => state.login);

    const [recipient, setRecipient] = useState();
    const [formValues, setFormValues] = useState({
        name: null,
        price: 0,
        image: "",
        category: null,
        
    });
    const [name, setName] = useState('');
    const [adress, setAdress] = useState('');
    const [phone, setPhone] = useState(0);
   

   
  const getData = () => {
    axios({
      method: "GET",
      url: `${URL}/recipients`
    })
    .then(recipients => {
      setRecipient(recipients.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
    getData()
  },[])
const submitHendler = () => {
    axios({
      method: "POST",
      url: `${URL}/recipients`,
      data:{
        name,adress,phone
      }
    })
    .then(result => {
      getData()
      navigate('/')
    })
    .catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
    getData()
  },[])



    return (
        <Container fluid className='p-0 m-0 containerEditCar'>
            <div className="m-0">
                <h4 className='text-center' style={{marginLeft: "50px", height: "100%"}}>Add Recipient</h4>
                <Col xs="auto" className='colEditcar d-none d-md-block h-100'></Col>
            </div>
            {/* <Form
            onSubmit={handleSubmit}
            >  */}
                <div className='car-container'>
                    <div className='row row-car'>
                        <div className="w-100 bg-white d-flex justify-content-center p-3">

                            <div className='font-template w-100'>
                                <Form.Group
                                    className="mb-3"
                                    controlId="name"
                                    data-testid="wrapper-labelName">
                                    <Row>
                                        <Form.Label
                                            data-testid="label-Name"
                                            column
                                            sm="4"
                                            className="mb-0 d-flex align-items-center">
                                            Nama
                                            <span className="text-danger" data-testid="label-SpanName">
                                                *
                                            </span>
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control
                                                type="text"
                                                placeholder="Input Nama Penerima"
                                                className='forminput'
                                                onChange={(e) => setName(e.target.value)} 
                                              />
                                                
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="price"
                                    data-testid="wrapper-labelPrice">
                                    <Row>
                                        <Form.Label
                                            data-testid="label-Price"
                                            column
                                            sm="4"
                                            className="mb-0 d-flex align-items-center">
                                            Alamat
                                            <span className="text-danger" data-testid="label-SpanPrice">
                                                *
                                            </span>
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control
                                                type="text"
                                                placeholder="Inputkan Alamat Penerima"
                                                className='forminput'
                                                onChange={(e) => setAdress(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="price"
                                    data-testid="wrapper-labelPrice">
                                    <Row>
                                        <Form.Label
                                            data-testid="label-Price"
                                            column
                                            sm="4"
                                            className="mb-0 d-flex align-items-center">
                                            No. Hp
                                            <span className="text-danger" data-testid="label-SpanPrice">
                                                *
                                            </span>
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control
                                                type="text"
                                                placeholder="contoh : +6285396978754"
                                                className='forminput'
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                            <p className="lh-1">sertakan kode negara (+6285xxx)</p>
                                        </Col>
                                    </Row>
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId="image"
                                    data-testid="wrapper-Photo">
                                </Form.Group>
                            </div>
                        </div>
                        <div
                            className="d-flex justify-content-center"
                            style={{
                            marginTop: "40px",
                            marginRight: 0
                        }}>
                            <Button
                                className='d-flex align-items-center me-3 btnCancel'
                                onClick={() => navigate('/')}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className='d-flex align-items-center text-white btnSave'
                                onClick={() => submitHendler()}
                                >
                                Save
                            </Button>
                        </div>

                    </div>
                </div>
           
        </Container>
    )
}

export default FormEditCar;
