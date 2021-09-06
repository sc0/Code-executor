import { from, interval, zip } from 'rxjs';
import { map, scan } from 'rxjs/operators';

  export const textAnimation = (placeholder: string) => zip(
    from(placeholder).pipe(scan((acc: string, cur: string) => acc + cur, '')),
    interval(50)
  ).pipe(map(x => x[0]));
