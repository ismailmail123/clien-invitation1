import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {useForm} from "react-hook-form";
import { Container, Form, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import axios from "axios";
import './style.css';
import swal from "sweetalert";

const EditUser = (props) => {

  


    const navigate = useNavigate()

    const {id} = useParams();

    const {register, handleSubmit, setValue} = useForm({});
    const [cards, setCards] = useState({
          id: id,
          name: "",
          phone: 0,
         
        
    })
    const [update, setUpdate] = useState();

    const URL = "http://localhost:3000"
    const getUpdate = () => {
      axios({
        method: "GET",
        url: `${URL}/recipients/${id}`
      })
      .then(update => {
        setUpdate(update.data)
        console.log('ini data', update)
      })
      .catch(err => {
        console.log(err)
      })
      console.log('ini card', getUpdate)
    }
    useEffect(() => {
      getUpdate()
    },[])

      useEffect(() => {
       
        axios.get(`http://localhost:3000/recipients/${id}`, id)
        .then(res => {
          res.data.map(item => item.id)
          console.log('ini respon', res)
          setValue({...cards, name: res.data.name, phone: res.data.phone })
        })
        .catch(err => console.log(err))
      },[])
     

    // useEffect(() => {
    //   axios.get(`/user/${id}`).then((result) => {
    //     setValue("id", result.data.id);
    //     setValue("name", result.data.name);
    //     setValue("nik", result.data.nik);
    //     setValue("alamat", result.data.alamat);
    //     setValue("jenis_kelamin", result.data.jenis_kelamin);
    //     setValue("agama", result.data.agama);
    //     setValue("status_pernikahan", result.data.status_pernikahan);
    //     setValue("tujuan", result.data.tujuan);
    //   });
    // });

    const onSubmit = (data) => {
      axios.put(`https://drab-lime-sea-urchin-gown.cyclic.app/recipients/${id}`, data).then((res) => {
        if(useForm.length !== 0){
            swal("Gagal Update!", "You clicked the button!", "error")
            
        }else{
            swal("Berhasil disalin!", "You clicked the button!", "success")
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
      <>
        <div className="formcontrol">
          <Card className="formbody">
            <Form className="w-100 p-3" onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-center" >Update Recipient</h1>
              <Row>
                <Col className="flex-column d-flex justify-content-center w-100">
                  <label>Name</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder={update?.name}                    name="name"
                    
                    onChange={ (e) => {
                        setCards({...cards, [e.target.name]: e.target.value})
                      }}
                    {...register("name")}
                  />

                  <label>phone</label>
                  <input
                    className="form-input"
                    placeholder={update?.phone}   
                    type="text"
                    name="phone"
                    onChange={ (e) => {
                        setCards({...cards, [e.target.phone]: e.target.value})
                      }}
                    {...register("phone")}
                  />
                <div className="formInfo">
                    <Row className="mb-3">
                        <Col sm="4" className="mb-0">
                        Created at
                        </Col>
                        <Col sm="8">{update?.createdAt}</Col>
                    </Row>
                    <Row>
                        <Col sm="4" className="mb-0">
                        Updated at
                        </Col>
                        <Col sm="8">{update?.updatedAt}</Col>
                    </Row>
                </div>

              </Col>
            </Row>
            <Row>
                <Col>
                    <button type="submit" className="mt-3 btn btn-outline-primary w-75"
                    onClick={() => navigate('/')}
                    >
                    Cancel
                    </button>
                </Col>
                <Col>
                    <button type="submit" className="mt-3 btn btn-outline-success w-75">Update</button>
                </Col>
            </Row>
            </Form>
          </Card>
        </div>
      </>
    );
}

export default EditUser;