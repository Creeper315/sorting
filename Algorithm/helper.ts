//
import { bubble } from "./Bubble";
import { selection } from "./Selection";
import { insertion } from "./Insertion";
import { merge } from "./Merge";
import { quick } from "./Quick";

export type colorType = { a: 1 | 2; i: number; c: string; a1?: any };
export type moveType = {
    a1: 1 | 2;
    i1: number;
    a2: 1 | 2;
    i2: number;
    a?: any;
};
export type stepType = (colorType | moveType)[];

export function swap(list: number[], i: number, j: number): void {
    let t = list[i];
    list[i] = list[j];
    list[j] = t;
}
//
// export const Color.default = "aliceblue";
export enum Color {
    default = "rgb(173,216,230)",
    parse = "antiquewhite",
    mark = "crimson",
    finish = "forestgreen",
    none = "rgb(240, 232, 230)",
}
export enum Method {
    bubble = "bubble",
    selection = "selection",
    insertion = "insertion",
    merge = "merge",
    quick = "quick",
}
export function compute(
    method: Method,
    list: number[]
): [number[], stepType[]] {
    switch (method) {
        case Method.bubble:
            return bubble(list);
            break;
        case Method.selection:
            return selection(list);
            break;
        case Method.insertion:
            return insertion(list);
            break;
        case Method.merge:
            return merge(list);
            break;
        case Method.quick:
            return quick(list);
            break;

        default:
            console.log("cant get here.");
            return [[], []];
            break;
    }
}
export enum transType {
    allOn = "allOn",
    allowTranslate = "allowTranslate",
    none = "none",
}

export function getTransitionStyle(type: transType, speed?: number) {
    // console.log("speed: ", speed);

    if (!speed) speed = 500;
    let colorTran = Math.min(300, Math.round(speed * 0.7));
    if (type == transType.allOn) {
        return `background-color ${colorTran}ms, transform ${speed}ms, width 800ms, height 800ms`;
    }
    if (type == transType.allowTranslate) {
        return `background-color ${colorTran}ms, transform ${speed}ms`;
    }
    if (type == transType.none) {
        return `background-color ${colorTran}ms`;
    }
}
