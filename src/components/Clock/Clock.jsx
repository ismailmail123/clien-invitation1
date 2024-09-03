import React, { Fragment } from "react";
import './CountDown.css';
import '../../contoiners/Invitation/invitation.css';

const Clock = ({ timerDays, timerHours, timerMinutes, timerSeconds }) => {
  return (
    <Fragment>
      <section className="timer-container">
        <section className="timer">
          <div className="clock">
            <section>
              <p className="lh-1 desc description">{timerDays}</p>
              <small>Hari</small>
            </section>
            <span className="mb-4 fs-3">.</span>
            <section>
              <p className="lh-1 desc description">{timerHours}</p>
              <small>Jam</small>
            </section>{" "}
            <span className="mb-4 fs-3">.</span>
            <section>
              <p className="lh-1 desc description">{timerMinutes}</p>
              <small>Menit</small>
            </section>{" "}
            <span className="mb-4 fs-3">.</span>
            <section>
              <p className="lh-1 desc description">{timerSeconds}</p>
              <small>Detik</small>
            </section>
          </div>
        </section>
      </section>
    </Fragment>
  );
};

Clock.defaultProps = {
  timerDays: 0,
  timerHours: 0,
  timerMinutes: 0,
  timerSeconds: 0,
};

export default Clock;

