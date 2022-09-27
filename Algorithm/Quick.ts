import { stepType, swap, colorType, moveType, Color } from "./helper";

export function quick(list: number[]): [number[], stepType[]] {
    let AllStep: stepType[] = [];

    if (list.length === 0 || list.length === 1) return [list, AllStep];
    rec(list, 0, list.length - 1);
    return [list, AllStep];
}

function rec(list: number[], s: number, e: number): void {
    if (s >= e) {
        return;
    }
    let pivot = list[s];
    let mIdx = s + 1;
    for (let i = s + 1; i <= e; i++) {
        let k = list[i];
        if (k >= pivot) continue;
        swap(list, mIdx, i);
        mIdx++;
    }
    swap(list, s, mIdx - 1);
    rec(list, s, mIdx - 2);
    rec(list, mIdx, e);
}
