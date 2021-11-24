import { useState, useEffect } from 'react';
import { interval, Observable, Subject, timer } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState('stop');
  const [count, setCount] = useState(0);
  console.log('STATUS', status);
  // console.log('count', count);
  useEffect(() => {
    const unsubscribe$ = new Subject();
    interval(1000)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if (status === 'start') {
          setSeconds(() => seconds + 1000);
        }
      });
    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }, [seconds, status]);

  useEffect(() => {
    const count$ = new Observable();
    timer(300)
      .pipe(takeUntil(count$))
      .subscribe(() => {
        if (count === 2) {
          setStatus('wait');
        } else {
          setCount(0);
        }
        return () => {
          debounceTime(300);
          count$.next();

          count$.complete(setStatus('stop'));
        };
      });
  }, [count, status]);

  const HendlStartTimer = e => {
    e.preventDefault();

    setStatus('start');
  };

  const HendleStopTimer = e => {
    setStatus('stop');
    setSeconds(0);
  };

  const HendleResetTimer = e => {
    setSeconds(0);
    setStatus('start');
  };

  const HendleWaitTimer = e => {
    setCount(() => count + 1);
  };

  return (
    <div className="container">
      <span> {new Date(seconds).toISOString().slice(11, 19)}</span>
      <ul className="button">
        <li className="button__item">
          <button name="start" onClick={HendlStartTimer}>
            {/* <button name="start" value={name} onClick={HendlStartTimer}> */}
            «Start»
          </button>
        </li>
        <li className="button__item">
          <button name="stop" onClick={HendleStopTimer}>
            {/* <button name="stop" value={name} onClick={HendleStopTimer}> */}
            «Stop»
          </button>
        </li>
        <li className="button__item">
          <button name="wait" id="timer-1" onClick={HendleWaitTimer}>
            {/* <button name="wait" value={name} onClick={HendleWaitTimer}> */}
            «Wait»
          </button>
        </li>
        <li className="button__item">
          <button name="reset" onClick={HendleResetTimer}>
            {/* <button name="reset" value={name} onClick={HendleResetTimer}> */}
            «Reset»
          </button>
        </li>
      </ul>
    </div>
  );
}
