import { Card, Image } from "react-bootstrap";
import "./invitation.css";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();
function Invitation({ wedding, data, user }) {
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
          <Card className="card-two" style={{ marginTop: 50 }} id="user">
            <div style={{ width: "75%" }}>
              <p className="text-center description1 lh-1">
                The Wedding of {wedding.name} & {wedding.parthner_name}
              </p>
              <p className="text-center fw-bold" style={{ fontSize: 12 }}>
                ِبِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيْم
              </p>
              <p className="text-center fw-bold" style={{ fontSize: 10 }}>
                Atas Rahmat Tuhan Yang Maha Esa, kami bermaksud mengundang Anda
                di acara Kami. Merupakan suatu kehormatan dan kebahagiaan bagi
                kami sekeluarga, apabila Bapak/Ibu/Saudara/i berkenan hadir dan
                memberikan doa restu pada
              </p>
            </div>

            <Image
              className="mt-3 mb-3"
              style={{ borderRadius: "50%", width: "40%", height: "20%" }}
              src={user.profile_image}
            />
            <div style={{ width: "75%" }}>
              <p className="text-center mt-3 fw-bold" style={{ fontSize: 10 }}>
                Dan diantara ayat-ayat-Nya ialah Dia Menciptakan untukmu
                istri-istri dari jenismu sendiri supaya kamu merasa nyaman
                kepadanya, dan dijadikan-Nya di antaramu mawadah dan warahmah.
                sesungguhnya pada yang demikian itu benar-benar terdapat
                tanda-tanda bagi kaum berfikir <br></br>
                (Ar-Rum 21)
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Invitation;
