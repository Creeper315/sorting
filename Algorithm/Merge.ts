import { stepType, swap, colorType, moveType, Color } from "./helper";

export function merge(list: number[]): [number[], stepType[]] {
    let AllStep: stepType[] = [];
    if (list.length === 0 || list.length === 1) return [list, AllStep];
    let sorted = rec(AllStep, list, 0, list.length - 1);
    colorAll(AllStep, 0, list.length - 1);
    return [sorted, AllStep];
}

function rec(
    AllStep: stepType[],
    list: number[],
    s: number,
    e: number
): number[] {
    if (s > e) {
        console.log("cannnot get hrere");
        return list;
    }
    if (s === e) {
        dropDown(AllStep, s, s);
        hoverBack(AllStep, s, s);
        return [list[s]];
    }
    if (s + 1 === e) {
        let a = list[s];
        let b = list[e];
        if (a < b) {
            dropDown(AllStep, s, s);
            dropDown(AllStep, e, e);
            hoverBack(AllStep, s, e);
            return [a, b];
        }
        dropDown(AllStep, e, s);
        dropDown(AllStep, s, e);
        hoverBack(AllStep, s, e);
        return [b, a];
    }

    let mIdx = Math.floor((s + e) / 2);

    let sorted1 = rec(AllStep, list, s, mIdx);
    let sorted2 = rec(AllStep, list, mIdx + 1, e);

    let p1 = 0;
    let p2 = 0;
    let result = [];
    let tracker = -1;
    while (p1 < sorted1.length || p2 < sorted2.length) {
        let a = sorted1[p1];
        let b = sorted2[p2];

        if (a == undefined || b < a) {
            result.push(b);
            tracker++;
            dropDown(AllStep, mIdx + 1 + p2, s + tracker);
            p2++;
            continue;
        }
        if (b == undefined || a <= b) {
            result.push(a);
            tracker++;
            dropDown(AllStep, s + p1, s + tracker);
            p1++;
            continue;
        }
    }
    hoverBack(AllStep, s, e);
    return result;
}

// [
//     { a: 2, i: s, c: Color.default },
//     { a: 2, i: e, c: Color.default },
//     { a1: 2, i1: s, a2: 1, i2: s },
//     { a1: 2, i1: e, a2: 1, i2: e },
// ];

function dropDown(AllStep: stepType[], i1: number, i2: number): void {
    AllStep.push([
        { a: 1, i: i1, c: Color.parse },
        { a1: 1, i1: i1, a2: 2, i2: i2 },
    ]);
}

function hoverBack(AllStep: stepType[], s: number, e: number): void {
    let OneStep: stepType = [];
    for (let i = s; i <= e; i++) {
        OneStep.push({ a: 2, i, c: Color.default });
        OneStep.push({ a1: 2, i1: i, a2: 1, i2: i });
    }
    AllStep.push(OneStep);
}

function colorAll(AllStep: stepType[], s: number, e: number): void {
    let OneStep: stepType = [];
    for (let i = s; i <= e; i++) {
        OneStep.push({ a: 1, i, c: Color.finish });
    }
    AllStep.push(OneStep);
}
