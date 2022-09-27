import Setting from "./setting";
import ss from "../../styles/body.module.css";
import React, { useRef, useEffect, useState } from "react";
import {
    stepType,
    compute,
    Method,
    colorType,
    moveType,
    Color,
    getTransitionStyle,
    transType,
} from "../../Algorithm/helper";
import { selection } from "../../Algorithm/Selection";
import { SP } from "next/dist/shared/lib/utils";

const Body = () => {
    const Speed = 500;
    const chart1 = useRef<HTMLDivElement>(null);
    // const chart2 = useRef<HTMLDivElement>(null); 如果chart1,2 大小不一样的话，我们才需要 ref chart 2，然后来计算大小？

    const [H, setH] = useState(0);
    const [W, setW] = useState(0);

    //

    const numCol = useRef<number>(0); // this var will be used twice
    const maxCol = 15;
    const maxNum = 50;

    const [All1, setAll1] = useState<colType[]>([]);
    const [All2, setAll2] = useState<colType[]>([]);
    const [TransitionOn, setTransitionOn] = useState<boolean>(true); // 是否需要 width height transition 的 animation
    const transOnStyle = `all ${Speed}ms ease-out`;
    const transOffStyle = `transform ${Speed}ms ease-out`;

    const AllStep = useRef<stepType[]>([]);
    const listNum = useRef<number[]>([]);
    const stopped = useRef(false);
    // const [method, setmethod] = useState<Method>(Method.bubble);
    // console.log("All len: ", All1);
    // console.log("All2: ", All2);

    enum display {
        none = "none",
        invisible = "invisible",
        show = "show",
    }
    type colType = {
        display: display;
        color: string;
        count: number; // 如果 count 是 0，默认这个 column 是未使用的，所以设置其 width 和 height 也是 0
        height: string;
        transX: number;
        transY: number;
        translate: boolean;
        div: HTMLDivElement | null;
    };

    const noneObj: colType = {
        display: display.none,
        color: Color.none,
        // color: Color.finish,
        height: `0px`,
        count: 0,
        transX: 0,
        transY: 0,
        translate: false,
        div: null,
    };

    // console.log("AllColumn: ", AllColumn);

    useEffect(() => {
        // console.log("set effect", chart.current && chart.current.clientHeight);
        if (chart1.current == null) return;
        let computed = getComputedStyle(chart1.current);
        let h =
            chart1.current.clientHeight -
            parseFloat(computed.paddingTop) -
            parseFloat(computed.paddingBottom);
        let w =
            chart1.current.clientWidth -
            parseFloat(computed.paddingLeft) -
            parseFloat(computed.paddingRight);
        setH(h);
        setW(w);
    }, [chart1]); // 需要这里的 chat1 吗？是 useref 哎

    useEffect(() => {
        let arr1 = [];
        for (let i = 0; i < maxCol; i++) {
            arr1.push({ ...noneObj }); // 这里一定要 destructure 这个 object，不然就会创造一个 array，都是同一个 object
        }
        setAll1(arr1);
        let arr2 = [];
        for (let i = 0; i < maxCol; i++) {
            arr2.push({ ...noneObj }); // 这里一定要 destructure 这个 object，不然就会创造一个 array，都是同一个 object
        }
        setAll2(arr2);
    }, []);

    function getRandom(min: number, max?: number) {
        // 比如，input 进去 3,8。那么就return 一个随机integer：3,4,5,6,7,8 都可以
        if (max == undefined) {
            max = min;
            min = 0;
        }
        let n = Math.random() * (max - min) + min;
        return Math.round(n);
    }

    function setNone(obj: colType) {
        obj.display = display.none;
        obj.div = null;
    }
    function setInvisible(obj: colType) {
        obj.display = display.invisible;
        obj.div = null;
    }

    // function trans(div: HTMLDivElement, turnOn: boolean) {
    //     if (turnOn) div.style.transition = transOn;
    //     if (!turnOn) div.style.transition = transOff;
    // }

    function initArrBoth() {
        initArr1();
        initArr2();
    }
    function initArr1() {
        const unit = H / maxNum;
        numCol.current = getRandom(10, maxCol);
        // let copy = [...All1];
        listNum.current = [];
        for (let i = 0; i < numCol.current; i++) {
            let r = getRandom(1, maxNum);
            let obj = All1[i];
            obj.display = display.show;
            obj.color = Color.default;
            obj.count = r;
            listNum.current.push(r);
            obj.height = `${r * unit}px`;
            // obj.transition = TransitionOn ? transOnStyle : transOffStyle;
        }

        for (let i = numCol.current; i < maxCol; i++) {
            // let obj = All1[i];
            // obj.display = display.none;
            setNone(All1[i]);
        }
        // console.log("after init All1: ", All1);
        setAll1([...All1]);
    }
    function initArr2() {
        for (let i = 0; i < numCol.current; i++) {
            // All2[i].display = display.none;
            setInvisible(All2[i]);
        }
        for (let i = numCol.current; i < maxCol; i++) {
            // All2[i].display = display.none;
            setNone(All2[i]);
        }
        setAll2([...All2]);
    }

    function changeColor(e: any) {
        let obj;
        if (e.a == 1) {
            obj = All1[e.i];
            // setAll1([...All1]);
        } else {
            obj = All2[e.i];
            // setAll2([...All2]);
        }
        if (obj) obj.color = e.c;
    }

    function swapHeight(c1: colType, c2: colType) {
        c1.transX = 0;
        c1.transY = 0;
        c2.transX = 0;
        c2.transY = 0;
        c1.translate = false;
        c2.translate = false;

        let { display: d1, count: ct1, height: h1, color: co1 } = c1;
        let { display: d2, count: ct2, height: h2, color: co2 } = c2;

        c1.height = h2;
        c1.color = co2;
        c1.count = ct2;
        c1.display = d2;

        c2.height = h1;
        c2.color = co1;
        c2.count = ct1;
        c2.display = d1;

        // if (c1.div && c2.div) {
        //     c1.div.style.transition = "none";
        //     c2.div.style.transition = "none";
        // }
        setAll1([...All1]);
        setAll2([...All2]);
    }

    function move(moveObj: any) {
        // 首先，不能 move 到一个 display: none 的位置 (假设 input 是valid，则 l1, l2 都不是 none 的 column)
        // 如果 move 到 display: show 的位置, 那么就和这个 div 交换。
        // 如果 move 到 display: invisible 的位置，也相当于和这个 div 交换
        // 拿到这个 <div> , 加入 transform translate。
        // console.log("in move");
        let fromArr = moveObj.a1;
        let toArr = moveObj.a2;
        let fromIdx = moveObj.i1;
        let toIdx = moveObj.i2;
        const Len = listNum.current.length;
        if (fromIdx < 0 || toIdx < 0 || fromIdx >= Len || toIdx >= Len) return;
        if (fromArr == toArr && fromIdx == toIdx) return;

        let a1 = fromArr == 1 ? All1 : All2;
        let a2 = toArr == 1 ? All1 : All2;
        let c1 = a1[fromIdx];
        let c2 = a2[toIdx];
        if (c1.display == display.none || c2.display == display.none) return; //

        let c1_top = 20;
        let c2_top = 20;
        let transY = c2_top - c1_top;
        let transX = 0;
        if (c1.div !== null && c2.div !== null) {
            c1_top = c1.div.offsetTop + c1.div.clientHeight;
            c2_top = c2.div.offsetTop + c2.div.clientHeight;
            transY = c2_top - c1_top;
            // console.log("transY: ", transY);
            transX = c2.div.offsetLeft - c1.div.offsetLeft;
        }
        c1.transX = transX;
        c1.transY = transY;
        c2.transX = -transX;
        c2.transY = -transY;
        c1.translate = true;
        c2.translate = true;
        // setAll1([...All1]);
        // setAll2([...All2]);

        setTimeout(() => {
            swapHeight(c1, c2);
        }, Speed - 20);
        // console.log("c1 ref", All1[3].div?.offsetLeft);
        // console.log("c2 ref", All2[4].div);
    }
    function wait(ms: number) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("");
            }, ms);
        });
    }
    // async function tryy() {
    //     console.log("here 1");
    //     await wait(800);
    //     console.log("here 2");
    // }
    async function testAnimation() {
        setTransitionOn(false);
        console.log("listNum.current: ", listNum.current);
        let [sorted, allStep] = compute(Method.insertion, listNum.current);
        console.log("sorted, step: ", sorted, allStep);
        for (let oneStep of allStep) {
            if (stopped.current) break;
            for (let os of oneStep) {
                // console.log("os: ", os);

                if (os.a != undefined) {
                    changeColor(os);
                }
                if (os.a1 != undefined) {
                    move(os);
                }
            }
            setAll1([...All1]);
            setAll2([...All2]);
            await wait(Speed);
        }
    }

    function drawColumns(Cols: colType[], which?: 1 | 2) {
        if (H === 0 || W === 0) {
            // 这里是刚开始页面没加载好的时候，h, w 都是 = 0.直到 useEffect 算出来 h, w 值的时候，才行
            return null;
        }
        return Cols.map((e, idx) => {
            let sty: any = {};
            if (e.display == display.none) {
                sty.width = "0px";
                sty.height = "0px";
            } else if (e.display == display.invisible) {
                sty.height = "0px";
            } else if (e.display == display.show) {
                sty.height = e.height;
            }
            sty.transform = `translate(${e.transX}px,${e.transY}px)`;
            sty.backgroundColor = e.color;
            if (TransitionOn)
                sty.transition = getTransitionStyle(transType.allOn, Speed);
            else {
                if (e.translate)
                    sty.transition = getTransitionStyle(
                        transType.allowTranslate,
                        Speed
                    );
                else sty.transition = getTransitionStyle(transType.none);
            }

            return (
                <div
                    key={idx}
                    className={ss.column}
                    style={sty}
                    ref={(r) => (e.div = r)}
                >
                    {e.display == display.show && e.count}
                </div>
            );
        });
    }

    return (
        <div className={ss.bodyContain}>
            <button onClick={initArrBoth}>init</button>
            <button onClick={testAnimation}>test</button>
            {/* <button onClick={() => setTransitionOn(!TransitionOn)}>
                {TransitionOn ? "is On" : "is Off"}
            </button> */}
            <button onClick={() => (stopped.current = !stopped.current)}>
                Stop
            </button>
            <div className={ss.chartContain}>
                <div className={ss.chart} ref={chart1}>
                    {drawColumns(All1, 1)}
                </div>
                <div className={ss.chart}>{drawColumns(All2, 2)}</div>
            </div>

            <Setting />
        </div>
    );
};

export default Body;
