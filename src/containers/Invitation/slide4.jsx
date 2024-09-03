import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import "./invitation.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";

AOS.init();

function Invitation({ data }) {
  const { register, handleSubmit, reset } = useForm();
  const [response, setResponse] = useState();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `https://api-invitation.xyz/api/responses`,
        data
      );
      setResponse(response.data);
      swal("Terima Kasih", "Data berhasil dikirim!", "success");
      reset(); // Reset form setelah submit berhasil
    } catch (err) {
      console.log("Data tidak ditemukan", err);
      swal("Upsss Maaf", "Terjadi kesalahan, silakan coba lagi!", "error");
    }
  };

  return (
    <div
      className="cardslide1"
      style={{
        backgroundImage: `url(${data.user.thems_image1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh",
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
          <div style={{ width: "85%" }}>
            <p
              className="text-center description lh-1"
              style={{ fontSize: 35 }}
            >
              Kehadiran
            </p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                name="name"
                {...register("name", { required: true })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSay">
              <Form.Label>Ucapan</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="message"
                {...register("message", { required: true })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAttendance">
              <Form.Label>Kehadiran</Form.Label>
              <Form.Select
                name="absen"
                {...register("absen", { required: true })}
              >
                <option value="">Pilih Kehadiran</option>
                <option value="Hadir">Hadir</option>
                <option value="Tidak Hadir">Tidak Hadir</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Kirim
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Invitation;
