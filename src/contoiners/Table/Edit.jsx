// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";

// function Edit (){

//     const {id} = useParams();

//     const [cards, setCards] = useState()
 
//   const URL = "http://localhost:3000"
//   const getCards = () => {
//     axios({
//       method: "PUT",
//       url: `${URL}/recipients/${id}`
//     })
//     .then(cards => {
//       setCards(cards.data)
//       console.log('ini data idnya', cards.data)
//     })
//     .catch(err => {
//       console.log(err)
//     })
//   }
//   useEffect(() => {
//     getCards()
//   },[])


//     return (
//         <div>{cards?.name}</div>
//     )
// }

// export default Edit;
import React from 'react';
import {Form, Button, Col, Container, Row} from 'react-bootstrap';
// import iconUpload from "../../assets/image/fi_upload.svg";
import './FormEditCar.css'
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { update, updateField } from '../../redux/FormCar/slice';
import swal from "sweetalert";

const FormEditCar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const login = useSelector((state) => state.login);

    const [tempUrl, setTempUrl] = useState()
    const [formValues, setFormValues] = useState({
        // name: '',
        // adress: '',
        // phone: '',
        
    });

    // const {id} = useParams();

    // const [cards, setCards] = useState()


    const URL = "http://localhost:3000"
  const getData = () => {
    axios({
      method: "GET",
      url: `${URL}/recipients/${params.id}`
    })
    .then(cards => {
      setFormValues(cards.data)
      console.log('ini data', cards.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
    getData(params.id)
  },[params.id])


  // const handleSubmit = () => {
  //   axios({
  //     method: "PUT",
  //     url: `${URL}/recipients/${params.id}`
  //   })
  //   .then(cards => {
  //     setFormValues(cards.data)
  //     console.log('ini data idnya', cards.data)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }
  // useEffect(() => {
  //   handleSubmit(params.id)
  // },[params.id])


  const fetchDataCar = async (e) => {
        // e.preventDefault();

        try{
            const response = await axios.put(`${URL}/recipients/${params.id}`
            
            );
            console.log("response", response.data)
            setFormValues(response.data)
        }catch(error) {
            console.log("error", error)

        }
    };

    useEffect(() => {
        fetchDataCar(params.id);
    },[params.id]);

    // const fetchDataCar = async (e) => {
    //     // e.preventDefault();

    //     try{
    //         const response = await axios.get(`https://api-car-rental.binaracademy.org/admin/car/${params.id}`,
    //         {
    //             headers: {
    //                 access_token: login.user.access_token,
    //             }
    //         }
    //         );
    //         // console.log("response", response.data)
    //         setFormValues(response.data)
    //     }catch(error) {
    //         console.log("error", error)

    //     }
    // };

    // useEffect(() => {
    //     fetchDataCar(params.id);
    // },[params.id]);

    // const onChangeFiles = (e) => {
    //     const selectedFiles = e.target.files;
    //     const file = selectedFiles[0];
    //     const tempUrlValue = URL.createObjectURL(file);
    //     setTempUrl(tempUrlValue);

    //     console.log("select file", selectedFiles)

    //     setFormValues({
    //         name: formValues.name,
    //         price: formValues.price,
    //         image: file,
    //         category: formValues.category,
    //     })
    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const formData = new FormData();

    //     formData.append('name', formValues.name);
    //     formData.append('price', formValues.price);
    //     formData.append('image', formValues.image);
    //     formData.append('category', formValues.category);
    //     try{
    //         const response = await axios.put(`https://api-car-rental.binaracademy.org/admin/car/${params.id}`, 
    //         formData,
    //         {
    //             headers: {
    //                 access_token: login.user.access_token,
    //             }
    //         }
    //         )
    //         // console.log("response>", response)
    //         dispatch(update(response.data))
    //         navigate('/carlist');
    //     }catch(error) {
    //         dispatch(updateField());
    //         swal("Update Gagal","", "error")
    //     }
        
    // };

    return (
        <Container fluid className='p-0 m-0 containerEditCar'>
            <Row className="m-0">
                <h4 style={{marginLeft: "330px", height: "100%"}}>Edit Car</h4>
                <Col xs="auto" className='colEditcar d-none d-md-block h-100'></Col>
            </Row>
            <Form onSubmit={fetchDataCar}> 
                <div className='car-container'>
                    <div className='row row-car'>
                        <div className="w-100 bg-white p-3">

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
                                                placeholder="Input Nama"
                                                className='forminput'
                                                onChange={(e) => setFormValues({...formValues, name: e.target.value})}
                                                value={formValues.name ?? ""}
                                            
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
                                            Adress
                                            <span className="text-danger" data-testid="label-SpanPrice">
                                                *
                                            </span>
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control
                                                type="text"
                                                placeholder="Input Harga Sewa Mobil"
                                                className='forminput'
                                                onChange={(e) => setFormValues({...formValues, adress: e.target.value})}
                                                value={formValues.adress ?? ""}
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
                                                type="number"
                                                placeholder="Input Harga Sewa Mobil"
                                                className='forminput'
                                                onChange={(e) => setFormValues({...formValues, phone: e.target.value})}
                                                value={formValues.phone ?? ""}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>

                                <div className="formInfo">
                                    <Row className="mb-3">
                                        <Col sm="4" className="mb-0">
                                            Created at
                                        </Col>
                                        <Col sm="8">{formValues.createdAt}</Col>
                                    </Row>
                                    <Row>
                                        <Col sm="4" className="mb-0">
                                            Updated at
                                        </Col>
                                        <Col sm="8">{formValues.updatedAt}</Col>
                                    </Row>
                                </div>
                            </fieldset>
                        </div>
                        <div
                            className="d-flex"
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
                                // onClick={handleSubmit}
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