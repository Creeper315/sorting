import { stepType, swap, colorType, moveType, Color } from "./helper";

export function quick(list: number[]): [number[], stepType[]] {
    let AllStep: stepType[] = [];

    if (list.length === 0 || list.length === 1) return [list, AllStep];
    rec(AllStep, list, 0, list.length - 1);
    return [list, AllStep];
}

function rec(AllStep: stepType[], list: number[], s: number, e: number): void {
    if (s > e) {
        return;
    }
    if (s === e) {
        aniColor(AllStep, s, Color.finish);
        return;
    }
    let pivot = list[s];
    aniColor(AllStep, s, Color.mark);
    let mIdx = s + 1;
    for (let i = s + 1; i <= e; i++) {
        let k = list[i];
        aniColor(AllStep, i, Color.parse);
        if (k >= pivot) continue;
        swap(list, mIdx, i);
        if (i == mIdx) aniColor(AllStep, i, Color.default);
        else aniSwap(AllStep, mIdx, i, Color.default, Color.parse);
        mIdx++;
    }
    swap(list, s, mIdx - 1);
    aniSwap(AllStep, s, mIdx - 1, Color.default, Color.mark);
    aniResetRangeColor(AllStep, mIdx, e);
    AllStep.push([{ a: 1, i: mIdx - 1, c: Color.finish }]);

    rec(AllStep, list, s, mIdx - 2);
    rec(AllStep, list, mIdx, e);
}

function aniSwap(
    AllStep: stepType[],
    iLeft: number,
    iRight: number,
    cLeft: Color,
    cRight: Color
): void {
    AllStep.push([
        { a: 1, i: iLeft, c: cRight },
        { a: 1, i: iRight, c: cLeft },
        { a1: 1, a2: 1, i1: iLeft, i2: iRight },
    ]);
}

function aniResetRangeColor(AllStep: stepType[], s: number, e: number): void {
    let OneStep: stepType = [];
    for (let i = s; i <= e; i++) {
        OneStep.push({ a: 1, i, c: Color.default });
    }
    AllStep.push(OneStep);
}

function aniColor(AllStep: stepType[], i: number, c: Color): void {
    AllStep.push([{ a: 1, i, c }]);
}
