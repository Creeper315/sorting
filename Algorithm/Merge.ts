import { stepType, swap, colorType, moveType, Color } from "./helper";

export function merge(list: number[]): [number[], stepType[]] {
    let AllStep: stepType[] = [];
    if (list.length === 0 || list.length === 1) return [list, AllStep];
    let sorted = rec(list, 0, list.length - 1);
    return [sorted, AllStep];
}

function rec(list: number[], s: number, e: number): number[] {
    if (s > e) {
        console.log("cannnot get hrere");
        return list;
    }
    if (s === e) return [list[s]];
    if (s + 1 === e) {
        let a = list[s];
        let b = list[e];
        if (a < b) return [a, b];

        return [b, a];
    }

    let mIdx = Math.floor((s + e) / 2);
    // console.log(s, e, mIdx);

    let sorted1 = rec(list, s, mIdx);
    let sorted2 = rec(list, mIdx + 1, e);

    let p1 = 0;
    let p2 = 0;
    let result = [];
    while (p1 < sorted1.length || p2 < sorted2.length) {
        let a = sorted1[p1];
        let b = sorted2[p2];
        if (a == undefined || b < a) {
        }

        if (a == undefined || b < a) {
            result.push(b);
            p2++;
            continue;
        }
        if (b == undefined || a <= b) {
            result.push(a);
            p1++;
            continue;
        }
    }

    return result;
}
