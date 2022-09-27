import sty1 from "../../styles/property.module.css";
import { useEffect } from "react";
import { merge } from "../../Algorithm/Merge";

const Setting = () => {
    // useEffect(() => {
    //     console.log("::", sty1.bkc);
    // }, []);
    let a = [2, 5, 11, 3, 2, 9, 45, 3, 33];
    return (
        <div>
            setting here
            <div
                className={sty1.bkc}
                onClick={() => {
                    let res = merge(a);
                    console.log(res);
                }}
            >
                test algo
            </div>
            <div className="btn btn-primary">?</div>
        </div>
    );
};

export default Setting;
