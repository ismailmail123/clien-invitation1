import React, { Fragment } from "react";
import './CountDown.css';

const Clock = ({days, hours, minutes, seconds}) => {

  // console.log("ini days", days)
  return (
    <Fragment>
      <section className="timer-container">
        <section className="timer">
          <div className="clock">
            <section>
              <p className="lh-1 desc description">{days}</p>
              <small>Hari</small>
            </section>
            <span className="mb-4 fs-3">.</span>
            <section>
              <p className="lh-1 desc description">{hours}</p>
              <small>Jam</small>
            </section>{" "}
            <span className="mb-4 fs-3">.</span>
            <section>
              <p className="lh-1 desc description">{minutes}</p>
              <small>Menit</small>
            </section>{" "}
            <span className="mb-4 fs-3">.</span>
            <section>
              <p className="lh-1 desc description">{seconds}</p>
              <small>Detik</small>
            </section>
          </div>
        </section>
      </section>
    </Fragment>
  );
};

Clock.defaultProps = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export default Clock;
