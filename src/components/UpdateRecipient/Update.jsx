import React from 'react';
import {Form, Button, Col, Container, Row, InputGroup} from 'react-bootstrap';
import './FormEditCard.css'
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { update } from '../../redux/recipient/sliceRecipient';
import swal from "sweetalert";
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';

const FormEditCar = (props) => {

    const URL = "https://invitation-lm0g.onrender.com"
    const navigate = useNavigate()

    const {id} = useParams();

    const {register, handleSubmit, setValue} = useForm({});
    const [cards, setCards] = useState({
          id: id,
          name: "",
          phone: 0,
         
        
    })
    const [update, setUpdate] = useState();

    
    const getUpdate = () => {
      axios({
        method: "GET",
        url: `${URL}/recipients/${id}`
      })
      .then(update => {
        setUpdate(update.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
    useEffect(() => {
      getUpdate()
    },[])

        const onSubmit = (data) => {
      axios.put(`${URL}/recipients/${id}`, data).then((res) => {
        if(useForm.length !== 0){
            swal("Gagal Update!", "You clicked the button!", "error")
            
        }else{
            swal("Data berhasil diupdate!", "You clicked the button!", "success")
            navigate('/')
        }
        // navigate('/beranda')
        props.history.push("/recipients");
        
      })
      .catch(error => {
        console.log(error)
      })
    }




    return (
        <Container fluid className='p-0 m-0 containerEditCar'>
            <div className="m-0">
                <h4 className='text-center' style={{marginLeft: "50px", height: "100%"}}>Update Recipient</h4>
                <Col xs="auto" className='colEditcar d-none d-md-block h-100'></Col>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)} key={id}>
                <div className='car-container'>
                    <div className='row row-car'>
                        <div className="w-100 bg-white p-3 d-flex justify-content-center">

                            <fieldset className='font-template w-100'>
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
                                                name="name"
                                                placeholder={update?.name}
                                                className='forminput'
                                                onChange={ (e) => {
                                                    setCards({...cards, [e.target.name]: e.target.value})
                                                  }}
                                                {...register("name")}
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
                                                name="phone"
                                                placeholder={update?.phone}
                                                className='forminput'  
                                                onChange={ (e) => {
                                                    setCards({...cards, [e.target.phone]: e.target.value})
                                                  }}
                                                {...register("phone")}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                               

                                <Form.Group
                                    className="mb-3"
                                    controlId="image"
                                    data-testid="wrapper-Photo">
                                    
                                </Form.Group>
                                <div className="formInfo">
                                    <Row className="mb-3">
                                        <Col sm="4" className="mb-0">
                                            Created at
                                        </Col>
                                        <Col sm="8">{dayjs(update?.createdAt).format("DD MMMM YYYY, HH:MM")}
                                        {/* {update?.createdAt} */}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="4" className="mb-0">
                                            Updated at
                                        </Col>
                                        <Col sm="8">{dayjs(update?.updateAt).format("DD MMMM YYYY, HH:MM")}</Col>
                                    </Row>
                                </div>
                            </fieldset>
                        </div>
                        <div
                            className="d-flex justify-content-center "
                            style={{
                            marginTop: "40px"
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
                                onClick={onSubmit}
                                >
                                Save
                            </Button>
                        </div>

                    </div>
                </div>
            </Form>
        </Container>
    )
}

export default FormEditCar;
