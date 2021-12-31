import React,{ Fragment } from 'react';

const Clock = ({ timerDays, timerHours, timerMinutes, timerSecondes}) => {
    return (
    <Fragment>
        <section className="timer-contaier">
            <section className="timer">
                <div className="clock">
                    <section>
                        <p>{timerDays}</p>
                        <small>Days</small>
                    </section>
                    <span>:</span>
                    <section>
                        <p>{timerHours}</p>
                        <small>Hours</small>
                    </section>{""}
                    <span>:</span>
                    <section>
                        <p>{timerMinutes}</p>
                        <small>Minutes</small>
                    </section>{""}
                    <span>:</span>
                    <section>
                        <p>{timerSecondes}</p>
                        <small>Secondes</small>
                    </section>
                </div>
            </section>
        </section>
    </Fragment>
    );
};
Clock.defaultProps = {
    timerDays: 10,
    timerHours: 10,
    timerMinutes: 10,
    timerSecondes: 10,
};

export default Clock;
