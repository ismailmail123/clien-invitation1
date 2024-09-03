import { Button, Container, Image} from "react-bootstrap";
import Navbar from "../../components/Navbar";
import "./style.css";
import Iconcht from "../../assets/icon-chat.png";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  return (
    <>
      <div>
        <Navbar />

        <div className="shapedividers_com-3611">
          <div className="p-3" style={{ height: "280px" }}>
            <Container>
              <h3
                style={{
                  fontFamily: "Dancing Script, cursive",
                  fontWeight: "bold",
                }}
              >
                Buat Undangan Digital Website Untuk Undangan Pernikahan
              </h3>
              <p
                style={{
                  fontFamily: "Dancing Script, cursive",
                  marginTop: "20px",
                }}
              >
                Buat undangan online digital website custom dengan satu moment
                meski kamu gaptek tetap bisa bikin undangan website sendiri dari
                smart phone. cukup pilih tema, edit, upload foto, semua bisa
                selesai dalam hitungan menit
              </p>
            </Container>
          </div>
        </div>
        <div
          className="p-3"
          style={{ height: "70vh", backgroundColor: "#d0d5dc", opacity: 0.5 }}
        >
          <Container>
            <section>
              {token ? (
                <>
                  <Button
                    onClick={() => navigate("/edit")}
                    style={{
                      borderRadius: "20px",
                      fontFamily: "Dancing Script, cursive",
                    }}
                    className="w-100 bg-info-subtle text-black"
                  >
                    Edit Undangan
                  </Button>
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ content: "center" }}
                  >
                    <Image src={Iconcht} />
                  </div>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => navigate("/register")}
                    style={{
                      borderRadius: "20px",
                      fontFamily: "Dancing Script, cursive",
                    }}
                    className="w-100 bg-info-subtle text-black"
                  >
                    Daftar dan Gratis
                  </Button>
                  <Button
                    onClick={() => navigate("/login")}
                    style={{
                      borderRadius: "20px",
                      fontFamily: "Dancing Script, cursive",
                    }}
                    className="w-100 bg-dark-subtle mt-3 text-black"
                  >
                    Sudah Punya Akun
                  </Button>
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ content: "center" }}
                  >
                    <Image src={Iconcht} />
                  </div>
                </>
              )}

              <p
                style={{
                  fontFamily: "Dancing Script, cursive",
                  marginTop: "20px",
                }}
              >
                Buat undangan website praktis dan nyaman. tanpa harus didepan laptop
                berjam-jam. cukup dengan pilih tema atau bahkan kamu bebas menyesuaikan tema yang 
                kamu miliki karena telah disediakan upload tema pada menu edit undangan
                sehingga memungkinkan kamu lebih fleksibel dalam menentukan tema dari undangan
                yang kamu miliki.
              </p>
            </section>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;
