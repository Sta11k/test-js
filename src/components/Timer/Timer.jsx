import { useState, useEffect } from 'react';
import { interval, Observable, Subject, timer } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState('stop');

  // const newLocal = [status];
  useEffect(() => {
    const unsubscribe$ = new Subject();
    interval(100)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if (status === 'start') {
          setSeconds(val => val + 1000);
        }
      });
    console.log(seconds);
    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }, [seconds, status]);

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
    setStatus('wait');
  };

  console.log('object', seconds);
  return (
    <div className="container">
      <span> {new Date(seconds).toISOString().slice(11, 19)}</span>
      <ul className="button">
        <li className="button__item">
          <button name="start" onClick={HendlStartTimer}>
            {/* <button name="start" value={name} onClick={HendlStartTimer}> */}
            «Start / Stop»
          </button>
        </li>
        <li className="button__item">
          <button name="stop" onClick={HendleStopTimer}>
            {/* <button name="stop" value={name} onClick={HendleStopTimer}> */}
            «Stop»
          </button>
        </li>
        <li className="button__item">
          <button name="wait" onClick={HendleWaitTimer}>
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
