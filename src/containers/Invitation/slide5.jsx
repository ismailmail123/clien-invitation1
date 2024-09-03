import { Card, Col, Row, Image } from "react-bootstrap";
import "./invitation.css";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

function Invitation({ galerie, data }) {
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
        <Card className="card-two" id="galeri">
          <div style={{ width: "85%" }}>
            <p
              className="text-center description lh-1"
              style={{ fontSize: 40 }}
            >
              Our Gallery
            </p>
          </div>
          <div className="gallery-container">
            <Row className="g-3">
              {galerie &&
                galerie.map((galery, index) => (
                  <Col
                    key={index}
                    xs={12}
                    sm={6}
                    md={6}
                    lg={3}
                    className="d-flex"
                  >
                    <Image
                      className="gallery-image"
                      src={galery.image}
                      alt={`Gallery ${index}`}
                    />
                  </Col>
                ))}
            </Row>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Invitation;
