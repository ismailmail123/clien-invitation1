import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import './invitation.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();
import weddingone from '../../assets/wedding1.png';
import background1 from '../../assets/backgound1.png';
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";


function Invitation (props) {

  const {id} = useParams();

    const {register, handleSubmit, setValue} = useForm({});
    const [cards, setCards] = useState({
          id: id,
          name: "",
          say: "",
         
        
    })
    

    useEffect(() => {
       
      axios.get(`https://invitation-lm0g.onrender.com/recipients/${id}`, id)
      .then(res => {
        res.data.map(item => item.id)
        setValue({...cards, name: res.data.name, say: res.data.say })
      })
      .catch(err => console.log(err))
    },[])

    const onSubmit = (data) => {
      axios.put(`https://invitation-lm0g.onrender.com/recipients/${id}`, data).then((res) => {
        if(useForm.length !== 0){
            swal("Upsss Maaf", "You clicked the button!", "error")
            
        }else{
            swal("Terima Kasih", "You clicked the button!", "success")
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
        
            <Container 
                className="d-flex align-items-center justify-content-center"
                style={{
                    backgroundImage: `url(${weddingone})`,
                    backgroundSize: 'cover'
                }}
            >
                <div className="cardslide1"
                    style={{
                        backgroundImage: `url(${background1})`,
                        backgroundSize: 'cover'
                    }}
                >
                  <div 
          
                    data-aos="fade-up"
                    data-aos-offset="200"
                    data-aos-delay="25"
                    data-aos-duration="500"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-center"
                  >
                      <Card className="card-two">
                          <div style={{width: '85%'}}>
                              <p className="text-center description lh-1" style={{fontSize: 40}}>Kehadiran</p>
                          </div>
                          <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label>Nama</Form.Label>
                              <Form.Control
                                type="text"
                                name="name"
                                {...register("name")}
                              />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                              <label className="form-label">Ucapana</label>
                              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                              name="say"
                              {...register("say")}
                              ></textarea>
                              
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                              <label className="form-label">Kehadiran</label>
                              <Form.Select >
                                <option>-</option>
                                <option>Hadir</option>
                                <option>Tidak hadir</option>
                              </Form.Select>
                            </Form.Group>
                            <Button
                              variant="primary"
                              type="submit"
                              className="w-100 mb-3"
                            >
                            Kirim
                            </Button>
                          </Form>
                      </Card>
                  </div>
                </div>
                
            </Container>
            
        
        </>
    )
}

export default Invitation;