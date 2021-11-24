import { useState, useEffect } from 'react'; import { fromEvent, interval,
Observable, Subject, timer } from 'rxjs'; import { debounce, takeUntil } from
'rxjs/operators';

export default function Timer() { const [seconds, setSeconds] = useState(0);
const [status, setStatus] = useState('stop'); const [count, setCount] =
useState(0); console.log('STATUS', status); console.log('count', count);
useEffect(() => { const unsubscribe$ = new Subject(); interval(300)
.pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if (status === 'start') {
          setSeconds(() => seconds + 1000);
        }
      });
    return () => {
      unsubscribe$.next();
unsubscribe$.complete(); }; }, [seconds, status]);

useEffect(() => { const count$ = new Observable(); timer(300)
.pipe(takeUntil(count$))
      .subscribe(() => {
        if (count === 2) {
          setStatus('wait');
        }
        return () => {
          count$.next();
count$.complete(setStatus('start')); }; }); }, [count]); const HendlStartTimer =
e => { e.preventDefault();

    setStatus('start');
    setCount(0);

};

const HendleStopTimer = e => { setStatus('stop'); setSeconds(0); setCount(0); };

const HendleResetTimer = e => { setSeconds(0); setStatus('start'); setCount(0);
};

const HendleWaitTimer = e => { setCount(() => count + 1); // setStatus('wait');
};

// useEffect(() => { // if (count === 1) { // const timer = setTimeout(() =>
console.log('Hello, World!'), 290); // // setStatus('wait'); // } //
setCount(0); // // console.log('timer', timer); // // // setStatus('wait'); //
return () => clearTimeout(timer); // }, [count]);

// console.log('object', seconds); return ( <div className="container"> <span>
{new Date(seconds).toISOString().slice(11, 19)}</span> <ul className="button">

<li className="button__item"> <button name="start" onClick={HendlStartTimer}>
{/_ <button name="start" value={name} onClick={HendlStartTimer}> _/} «Start /
Stop» </button> </li> <li className="button__item">
<button name="stop" onClick={HendleStopTimer}> {/_
<button name="stop" value={name} onClick={HendleStopTimer}> _/} «Stop» </button>
</li> <li className="button__item">
<button name="wait" id="timer-1" onClick={HendleWaitTimer}> {/_
<button name="wait" value={name} onClick={HendleWaitTimer}> _/} «Wait» </button>
</li> <li className="button__item">
<button name="reset" onClick={HendleResetTimer}> {/_
<button name="reset" value={name} onClick={HendleResetTimer}> _/} «Reset»
</button> </li> </ul> </div> ); }
