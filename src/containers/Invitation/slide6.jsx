import { Card, Image } from "react-bootstrap";
import "./invitation.css";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

// ..
AOS.init();
function Invitation({ user, data }) {
  const [response, setResponse] = useState();

  const getData = async () => {
    try {
      const response = await axios.get(`https://api-invitation.xyz/api/responses`);// Tambahkan log ini
      setResponse(response.data.data);
    } catch (err) {
      console.log("Data tidak ditemukan", err);
      swal("Upsss Maaf", "Terjadi kesalahan, silakan coba lagi!", "error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
  }, [response]);

  const capitalizeFirstLetter = (string) => {
    if (!string) return ""; // Jika string kosong atau undefined
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const capitalizeFirstLetterOfParagraph = (string) => {
    if (!string) return ""; // Jika string kosong atau undefined
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // console.log("ini response", response.data)
  return (
    <>
      <div
        className="cardslide1"
        style={{
          backgroundImage: `url(${data.user.thems_image1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100v",
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
            <Image
              style={{
                borderRadius: "10%",
                boxShadow: "100px",
                borderColor: "purple",
                width: "50%",
                height: "25%",
              }}
              src={user.cover_image}
            />
            <div style={{ width: "85%" }}>
              <p
                className="text-center lh-1"
                style={{ fontSize: 15, marginTop: "20%" }}
              >
                Merupakan Suatu Kebahagiaan dan Kehormatan bagi Kami, Apabila
                Bapak/Ibu/Saudara/i, Berkenan Hadir di Acara kami
              </p>
            </div>
            <h4 className="fw-bold">Ucapan</h4>
            <div style={{ overflowX: "auto", maxHeight: "300px",}}>
              {response &&
                response.map((response) => (
                  <>
      <Card key={response.id} style={{ border: "1px solid", marginBottom: "5px", flexShrink: 0 }}>
        <Card.Body className="pt-1">
          <Card.Title className="fw-bold m-0">
            {capitalizeFirstLetter(response.name)}
          </Card.Title>
          <Card.Text className="m-0">
            {capitalizeFirstLetterOfParagraph(response.message)}
          </Card.Text>
          <Card.Footer className="text-end m-0 p-0">
            {dayjs(response.createdAt).format("DD/MM/YYYY")}
          </Card.Footer>
        </Card.Body>
      </Card>
                  </>
                ))}
            </div>
            <div style={{ width: "85%" }}>
              <p
                className="text-center description lh-1"
                style={{ fontSize: 40, marginTop: "20%" }}
              >
                ~~Terima Kasih~~
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Invitation;
