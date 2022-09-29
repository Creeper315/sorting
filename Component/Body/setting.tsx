import ss from "../../styles/setting.module.css";

import { FcSettings } from "react-icons/fc";
import { MdSettingsBackupRestore } from "react-icons/md";
import { FaRegPlayCircle } from "react-icons/fa";
import { BsPauseCircle, BsPlayCircle } from "react-icons/bs";

import RangeSlider from "./rangeSlider";

import {
    useEffect,
    useState,
    forwardRef,
    useImperativeHandle,
    useRef,
} from "react";

// 打开网页，Arr 自动出现，default 10 个 column，speed 1
// 播放，暂停。 只有暂停的时候，才可以点击 reset 按钮，reset 按钮不会创建新 listNum listNum 返回起点
// 只有点击 reset 后，或者刚刚打开网页的时候，才可以点击 Create New 按钮 创建新 listNum

const Setting = forwardRef((props, myRef) => {
    const [Speed, setSpeed] = useState<[number]>([1]);
    const animationIdx = useRef<number>(0);

    // const numCol = useRef<number>(20); // this var will be used twice
    const [NumCol, setNumCol] = useState<[number]>([10]);
    const maxCol = 30;
    const maxNum = 50;

    const listNum = useRef<number[]>([]);
    const [Stopped, setStopped] = useState(true);

    let speedMap: { [k: number]: number } = {
        0.5: 1000,
        0.75: 750,
        1: 550,
        1.25: 425,
        1.5: 350,
        1.75: 290,
        2: 200,
    };

    useImperativeHandle(myRef, () => ({
        maxCol,
        maxNum,
        numCol: NumCol[0],
        listNum: listNum.current,
        speed: speedMap[Speed[0]],
        stopped: Stopped,
        // animationIdx,
        createArr,
    }));

    function getRandom(min: number, max?: number) {
        // 比如，input 进去 3,8。那么就return 一个随机integer：3,4,5,6,7,8 都可以
        if (max == undefined) {
            max = min;
            min = 0;
        }
        let n = Math.random() * (max - min) + min;
        return Math.round(n);
    }

    function createArr() {
        // console.log("here", listNum.current);
        let arr = [];
        for (let i = 0; i < NumCol[0]; i++) {
            arr.push(getRandom(1, maxNum));
        }
        listNum.current = arr;
        return arr;
    }

    return (
        <div className={ss.settingContain}>
            <div className={ss.gear}>
                <FcSettings className={ss.ri} />
                <div className={ss.panel}>
                    <RangeSlider
                        step={1}
                        min={5}
                        max={30}
                        State={NumCol}
                        setState={setNumCol}
                        text={"Number Size"}
                    />
                    <RangeSlider
                        step={0.25}
                        min={0.5}
                        max={2}
                        State={Speed}
                        setState={setSpeed}
                        text={"Speed: "}
                    />
                    <div className={ss.btns}>
                        <div
                            className={ss.btnsContain}
                            onClick={() => setStopped(!Stopped)}
                        >
                            {Stopped ? (
                                <FaRegPlayCircle className={ss.play} />
                            ) : (
                                <BsPauseCircle className={ss.pause} />
                            )}
                        </div>
                        <div className={ss.btnsContain}>
                            <MdSettingsBackupRestore className={ss.reset} />
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="btn btn-primary">Sort</div>
            <div className="btn btn-primary">Pause</div>
            <div className="btn btn-primary">Reset</div> */}
        </div>
    );
});

export default Setting;
