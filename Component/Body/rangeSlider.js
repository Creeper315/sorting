import { Range } from "react-range";
import ss from "../../styles/setting.module.css";

const RangeSlider = ({ step, min, max, State, setState, text }) => {
    return (
        <div className={ss.rangeSlider}>
            <div className={ss.rangeLabel}>{text}</div>
            <Range
                step={step}
                min={min}
                max={max}
                onChange={(e) => setState(e)}
                values={State}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: "6px",
                            width: "100%",
                            backgroundColor: "#ccc",
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: "25px",
                            width: "25px",
                            backgroundColor: "#999",
                        }}
                    >
                        {State}
                    </div>
                )}
            />
        </div>
    );
};

export default RangeSlider;
