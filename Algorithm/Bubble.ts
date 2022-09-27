//
import { stepType, colorType, moveType, Color } from "./helper";
//
export function bubble(list: number[]): [number[], stepType[]] {
    let AllStep: stepType[] = [];
    if (list.length === 0 || list.length === 1) return [list, AllStep];

    for (let i = list.length - 1; i > 0; i--) {
        let OneStep: stepType = [];
        for (let j = 0; j < i; j++) {
            let a = list[j];
            let b = list[j + 1];

            OneStep = [
                { a: 1, i: j, c: Color.parse },
                { a: 1, i: j + 1, c: Color.parse },
            ];

            if (j >= 1) OneStep.push({ a: 1, i: j - 1, c: Color.default });
            AllStep.push(OneStep);

            if (a > b) {
                list[j] = b;
                list[j + 1] = a;

                OneStep = [{ a1: 1, i1: j, a2: 1, i2: j + 1 }];
                AllStep.push(OneStep);
            }
        }
        OneStep = [
            { a: 1, i, c: Color.finish },
            { a: 1, i: i - 1, c: Color.default },
        ];
        AllStep.push(OneStep);
    }
    AllStep.push([{ a: 1, i: 0, c: Color.finish }]);
    return [list, AllStep];
}
