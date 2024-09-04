import React, { useEffect, useState, useRef } from "react";
import { Button, Card } from "react-bootstrap";
import "./invitation.css";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

import Clock from "../../containers/Clock/Clock";
import dayjs from "dayjs";

function Invitation({ wedding, data, countDownDate }) {
  const [timerDays, setTimerDays] = useState(0);
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const intervalRef = useRef();

  const startTimer = () => {
    if (countDownDate) {
      const targetDate = new Date(countDownDate).getTime();

    intervalRef.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance < 0) {
        clearInterval(intervalRef.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  }
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(intervalRef.current); // Cleanup interval saat komponen di-unmount
    };
  }, []); // Kosongkan dependency array agar hanya berjalan sekali saat komponen mount


  const formatTanggal = (dateString) => {
    dayjs.locale("id");
    let formattedDate = dayjs(dateString).format("dddd, DD MMMM YYYY");
    // Ganti "Minggu" dengan "Ahad"
    formattedDate = formattedDate.replace("Minggu", "Ahad");
    return formattedDate;
};

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
          <Card className="card-two" id="maps">
            <div style={{ width: "75%" }}>
              <h3
                className="text-center description lh-1"
                style={{ fontSize: 35, marginBottom: 50 }}
              >
                Save The Date
              </h3>

              <p className="text-center fw-bold lh-1" style={{ fontSize: 17 }}>
                {formatTanggal(wedding.date)}
              </p>
            </div>
            <a href={wedding.address}>
              <Button className="btn-success mb-5">Buka Lokasi</Button>
            </a>

            <Clock
              days={timerDays}
              hours={timerHours}
              minutes={timerMinutes}
              seconds={timerSeconds}
            />
          </Card>
        </div>
      </div>
    </>
  );
}

export default Invitation;
