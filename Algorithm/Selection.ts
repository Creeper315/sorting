//
import { swap, stepType, colorType, moveType, Color } from "./helper";
//
export function selection(list: number[]): [number[], stepType[]] {
    let AllStep: stepType[] = [];
    if (list.length === 0 || list.length === 1) return [list, AllStep];

    for (let i = 0; i < list.length - 1; i++) {
        let min = Infinity;
        let minIdx = i;
        for (let j = i; j < list.length; j++) {
            //
            let OneStep: stepType = [];
            if (j > i) OneStep.push({ a: 1, i: j - 1, c: Color.default });
            else OneStep.push({ a: 1, i: list.length - 1, c: Color.default });
            OneStep.push({ a: 1, i: minIdx, c: Color.mark });
            OneStep.push({ a: 1, i: j, c: Color.parse });
            AllStep.push(OneStep);
            //
            let e = list[j];
            if (e < min) {
                //
                OneStep = [];
                OneStep.push({ a: 1, i: minIdx, c: Color.default });
                //
                min = e;
                minIdx = j;
                //
                OneStep.push({ a: 1, i: minIdx, c: Color.mark });
                AllStep.push(OneStep);
                //
            }
        }
        swap(list, i, minIdx);
        // let moveS: moveType = [{ a1: 1, i1: i, a2: 1, i2: minIdx }];
        // let colorS: colorType = [{ a: 1, i: i, c: Color.finish }];
        AllStep.push([{ a1: 1, i1: i, a2: 1, i2: minIdx }]);
        AllStep.push([{ a: 1, i: minIdx, c: Color.default }]);
        AllStep.push([{ a: 1, i: i, c: Color.finish }]);
    }
    AllStep.push([{ a: 1, i: list.length - 1, c: Color.finish }]);
    return [list, AllStep];
}
