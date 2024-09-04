import { Col, Container } from "react-bootstrap";
import { FaInstagram } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { IoLogoWhatsapp } from "react-icons/io";
import ReactWhatsapp from "react-whatsapp";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="bg-secondary mt-3">
      <Container className="p-3 d-flex gap-3 ">
        <Col lg={6}>
          <div className="footer-item">
            <h4
              style={{ fontFamily: "Dancing Script, cursive" }}
              className="fw-bold text-light mb-3"
            >
              Contact
            </h4>
            <p
              className="text-light"
              style={{ fontFamily: "Dancing Script, cursive" }}
            >
              Alamat: Jl. Poros Kariango-Maros Sulawesi Selatan
            </p>
            <p
              className="text-light"
              style={{ fontFamily: "Dancing Script, cursive" }}
            >
              Email: ismailbary2@gmail.com
            </p>
            <p
              className="text-light"
              style={{ fontFamily: "Dancing Script, cursive" }}
            >
              Phone: +6285342545607
            </p>
          </div>
        </Col>
        <Col lg={6}>
          <div className="footer-item">
            <h4
              style={{ fontFamily: "Dancing Script, cursive" }}
              className="fw-bold text-light mb-3"
            >
              Media Sosial
            </h4>
            <div className="w-100 d-flex justify-content-center align-items-center">
              <Link to="https://www.instagram.com/ismail_adzikr/">
                <FaInstagram
                  className="me-3 fs-2 fw-bold"
                  style={{ color: "#a26dba" }}
                />
              </Link>
              <Link to="https://m.facebook.com/profile.php/?id=100005335387345">
              <CiFacebook
                className="me-3 fs-2 fw-bold"
                style={{ color: "blue" }}
              />
              </Link>
              <Link
                to="https://www.linkedin.com/in/is-mail-71511025a/"
                className="p-0 m-0 bg-transparent border-0"
              >
                <CiLinkedin
                  className="me-3 fs-2 fw-bold"
                  style={{ color: "#0b236a" }}
                />
              </Link>
              <ReactWhatsapp
                className="border-0 bg-transparent p-0"
                number="+6285342545607"
                message={` 
اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَا تُهُ
`}
              >
                {" "}
                <IoLogoWhatsapp
                  className=" fs-2 fw-bold"
                  style={{ color: "green" }}
                />{" "}
              </ReactWhatsapp>
            </div>
          </div>
        </Col>
      </Container>
    </div>
  );
};

export default Index;
