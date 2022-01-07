import { useEffect, useState } from "react";

function Clock() {
    const [timerDays, setTimerDays] =useState ();
 const [timerHours, setTimerHours] =useState ();
 const [timerMinutes, setTimerMinutes] =useState ();
 const [timerSeconds, setTimerSeconds] =useState ();

 let interval;

  const startTimer = () => {
    const countDownDate= new Date("May 30,2022").getTime();

      interval=setInterval(() => {
     const now = new Date ().getTime();
     const distance = countDownDate - now ;
     const days= Math.floor(distance/(24 * 60 * 60 * 1000));
     const hours= Math.floor(distance %(24 * 60 * 60 * 1000)/ (1000 * 60 * 60));
     const minutes= Math.floor(distance %(24 * 60 * 60 * 1000)/ (1000 * 60));
     const seconds= Math.floor(distance %(24 * 60 * 60 * 1000)/ (1000));

     if(distance<0){
       // Stop timer
       clearInterval(interval.current);
       }else{
         //update timer
         setTimerDays(days);
         setTimerHours(hours);
         setTimerMinutes(minutes);
         setTimerSeconds(seconds);
     }
    });
};

useEffect(()=> {startTimer ();
})
    return (
        <section className="timer-container">
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
                        </section> 
                        <span>:</span>
                        <section>
                            <p>{timerMinutes}</p>
                            <small>Minutes</small>
                        </section>
                        <span>:</span>
                        <section>
                            <p>{timerSeconds}</p>
                            <small>Seconds</small>
                        </section>
                    </div>
                </section>
            </section>
    )
}

export default Clock
