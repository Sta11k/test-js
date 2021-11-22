import { useState } from 'react';
import { observable, Observable, timer } from 'rxjs';

// import { of } from 'rxjs';
// import { map } from 'rxjs/operators';

// import { timer, of,Observable } from 'rxjs';
// import { concatMapTo } from 'rxjs/operators';

export default function Timer() {
  const [time, setTime] = useState(0);

  const hendleStartTimer = e => {
    e.preventDefault();
    const source = timer(1000);
    source.subscribe(data => setTime(data));
    console.log('time', time);

    // source.subscribe(data =>setTime(data));
    // console.log(time);
    // timer(due: number | Date, scheduler?: SchedulerLike): Observable<0>;
  };

  // const targetDate = new Date();
  //     const nowDate = Date.now();
  //       const timer = targetDate - nowDate;
  //       console.log(timer);

  // const timerHour = () => (Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  // console.log("timerHour",timerHour);
  //      const timerMin =()=>  (Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  //  const timerSec =()=> (Math.floor((time % (1000 * 60)) / 1000));
  const stream$ = new Observable(observer => {});
  const source = timer(1000);
  const subcription = stream$.subscribe({
    next: value => source.subscribe(data => setTime(data)),
  });

  console.log(subcription);

  return (
    <>
      <ul>
        {/* <li>HH: { timerHour()}</li>
        <li>MM:{timerMin() }</li> */}
        <li>SS:{time}</li>
        {/* <li className={timer__item}>HH:{}</li>
        <li className={timer__item}>MM:</li>
        <li className={timer__item}>SS:</li> */}
      </ul>
      <ul>
        <li>
          <button onClick={hendleStartTimer}>«Start / Stop»</button>
        </li>
        {/* <li className={button__item}>
           <button onClick={hendelWait}>«Wait»</button>
         </li>
         <li className={button__item}>
           <button onClick={hendeReset}>«Reset»</button>
         </li>  */}
      </ul>
    </>
  );
}

// import { observable, Observable } from 'rxjs';
// import s from './Timer.module.css';
//  import { timer, interval } from 'rxjs';
// // import { useState } from 'react';
// // import { takeUntil } from 'rxjs/operators';

//  function Timer() {

// const timer = new Observable(observer => {
//   let counter = 0;
//   const intervalId = setInterval(() => {
//     observer.next(counter++);
//   }, 1000);
//   return () => {
//    clearInterval(intervalId);
//   }
// });

//    console.log(timer)
//   return (
//     <>
//        <ul className={s.timer}>
//         <li className={s.timer__item}>HH:{}</li>
//         <li className={s.timer__item}>MM:</li>
//         <li className={s.timer__item}>SS:</li>
//       </ul>
//       <ul className={s.button}>
//         {/* <li className={s.button__item}>
//           <button onClick={hendelStartStop}>«Start / Stop»</button>
//         </li> */}
//         {/* <li className={s.button__item}>
//           <button onClick={hendelWait}>«Wait»</button>
//         </li>
//         <li className={s.button__item}>
//           <button onClick={hendeReset}>«Reset»</button>
//         </li> */}
//       </ul>
//     </>
//   );
// }
// export default Timer;
