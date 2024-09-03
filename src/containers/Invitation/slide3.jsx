import React, { useEffect, useState } from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import "./invitation.css";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import swal from "sweetalert";
import cip from "../../assets/cip.jpg";
import mandiriLogo from "../../assets/mandiri1.png";
import muamalatLogo from "../../assets/logo_muamalat.png";
import briLogo from "../../assets/bri.png";
import bsiLogo from "../../assets/bsi.png";

AOS.init();

function Invitation({ data1, user }) {

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        swal(
          "Berhasil disalin!",
          "Nomor berhasil disalin ke clipboard",
          "success"
        );
      })
      .catch((err) => {
        console.error("Gagal menyalin teks:", err);
      });
  };

  function getLogoByTitle(title) {
    switch (title) {
      case "mandiri":
        return mandiriLogo;
      case "muamalat":
        return muamalatLogo;
      case "bri":
        return briLogo;
      case "bni":
        return bsiLogo;
      case "bsi":
        return bsiLogo;
      default:
        return cip; // Default logo jika tidak ada yang cocok
    }
  }

  return (
    <div
      className="cardslide1"
      style={{
        backgroundImage: `url(${data1.user.thems_image1})`,
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
          <div style={{ width: "85%", marginTop: 50 }}>
            <p
              className="text-center description lh-1"
              style={{ fontSize: 40 }}
            >
              Titip Hadiah Online
            </p>
            <p className="text-center fw-bold lh-1" style={{ fontSize: 15 }}>
              Doa restu Bapak/Ibu sekalian merupakan karunia yang sangat berarti
              bagi kami. Dan jika memberi merupakan ungkapan tanda kasih,
              Bapak/Ibu dapat memberi kado secara cashless. Terima kasih
            </p>
            <div style={{ height: "40vh", overflowY: "auto" }}>
              {data1 && data1.user &&
                data1.user.cardpayment &&
                data1.user.cardpayment.map((card) => (
                  <React.Fragment key={card.id}>
                    <div className="card-transaction mt-5">
                      <Row>
                        <Col style={{ marginTop: "7%", fontSize: "10px" }}>
                          <Image
                            src={cip}
                            style={{ width: "30%", borderRadius: "5px" }}
                          />
                          <h6
                            style={{
                              fontSize: "13px",
                              fontWeight: "bold",
                              lineHeight: "1px",
                              marginTop: "10px",
                            }}
                          >
                            {card.number}
                          </h6>
                          <p>{card.name}</p>
                        </Col>
                        <Col>
                          <Image
                            style={{
                              width: "100%",
                              height: "50%",
                              backgroundColor: "transparent",
                            }}
                            src={getLogoByTitle(card.title.toLowerCase())}
                          />
                          <div className="ms-4">
                            <Button
                              className="btn-success mb-3 p-1"
                              onClick={() => handleCopy(card.number)}
                            >
                              Salin
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </React.Fragment>
                ))}
            </div>
          </div>
          <p className="text-center fw-bold lh-1 mt-5" style={{ fontSize: 15 }}>
            Acara ini di selenggarakan dengan mematuhi protokol kesehatan dan
            bagi tamu undangan di harapkan dapat mengikutinya.
          </p>
        </Card>
      </div>
    </div>
  );
}

export default Invitation;
