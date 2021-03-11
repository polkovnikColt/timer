import {interval, merge, Subject} from "rxjs";
import {takeUntil, map, exhaustMap, scan, debounceTime,buffer,filter} from "rxjs/operators";

const reset$ = new Subject();
const stop$ = new Subject();
const start$ = new Subject();
const timer$ = new Subject();
const buffer$ = timer$.pipe(debounceTime(300));
const wait$ = timer$.pipe(
    buffer(buffer$),
    map((list) => list.length),
    filter((x) => x === 2),
)

export const main$ = merge(
    start$.pipe(
        exhaustMap(() =>
            interval(1000).pipe(
                takeUntil(wait$),
                takeUntil(stop$),
                map(() => 1),
            ),
        ),
    ),
    reset$.pipe(map(() => 0)),
    stop$.pipe(map(() => 0)),
).pipe(scan((acc, value) => (value === 0 ? 0 : acc + value)));

export const reset = () => reset$.next();
export const stop = () => stop$.next();
export const start = () => start$.next();
export const wait = () => timer$.next();