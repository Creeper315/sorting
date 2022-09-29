import React, { useState, useEffect, useContext } from "react";
import { SortContext } from "../../Context/sortContext";
import { Method } from "../../Algorithm/helper";

const TopNav = () => {
    const { Algorithm, setAlgorithm } = useContext(SortContext);

    useEffect(() => {
        // console.log("top nav effect", Algorithm);
    }, []);

    function getClass(m: Method): string {
        if (Algorithm !== m) return "sort-btn";
        return `sort-btn active`;
    }

    return (
        <div id="top-nav-contain">
            <div
                className={getClass(Method.bubble)}
                onClick={() => setAlgorithm(Method.bubble)}
            >
                Bubble Sort
            </div>
            <div
                className={getClass(Method.selection)}
                onClick={() => setAlgorithm(Method.selection)}
            >
                Selection Sort
            </div>
            <div
                className={getClass(Method.insertion)}
                onClick={() => setAlgorithm(Method.insertion)}
            >
                Insertion Sort
            </div>
            <div
                className={getClass(Method.merge)}
                onClick={() => setAlgorithm(Method.merge)}
            >
                Merge Sort
            </div>
            <div
                className={getClass(Method.quick)}
                onClick={() => setAlgorithm(Method.quick)}
            >
                Quick Sort
            </div>
        </div>
    );
};

export default TopNav;
