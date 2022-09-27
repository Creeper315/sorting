//
import { stepType, swap, colorType, moveType, Color } from "./helper";
//
export function insertion(list: number[]): [number[], stepType[]] {
    let AllStep: stepType[] = [];
    if (list.length === 0 || list.length === 1) return [list, AllStep];

    for (let i = 1; i < list.length; i++) {
        let OneStep: stepType = [];
        for (let j = i; j >= 0; j--) {
            let cur = list[j];
            let prev = list[j - 1] || -Infinity;

            //
            if (j == i) {
                let co: colorType = { a: 1, i: j, c: Color.parse };
                let mo: moveType = { a1: 1, i1: j, a2: 2, i2: j };
                OneStep.push(co, mo);
                AllStep.push(OneStep);
            }

            if (cur >= prev) {
                AllStep.push([
                    { a: 1, i: j - 1, c: Color.finish },
                    { a: 2, i: j, c: Color.finish },
                    { a1: 2, i1: j, a2: 1, i2: j },
                ]);
                break;
            }
            swap(list, j, j - 1);
            AllStep.push([
                { a1: 1, i1: j - 1, a2: 1, i2: j },
                { a1: 2, i1: j, a2: 2, i2: j - 1 },
            ]);
        }
    }

    return [list, AllStep];
}
