export default function Timer({ onClick }) {
  return (
    <>
      {' '}
      <ul>
        <li>HH:</li>
        <li>MM:</li>
        <li>SS:</li>
        {/* <li className={timer__item}>HH:{}</li>
        <li className={timer__item}>MM:</li>
        <li className={timer__item}>SS:</li> */}
      </ul>{' '}
      <ul>
        {' '}
        {/* <li className={s.button__item}>
           <button onClick={hendelStartStop}>«Start / Stop»</button>
         </li> */}{' '}
        {/* <li className={button__item}>
           <button onClick={hendelWait}>«Wait»</button>
         </li>
         <li className={button__item}>
           <button onClick={hendeReset}>«Reset»</button>
         </li>  */}{' '}
      </ul>{' '}
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
