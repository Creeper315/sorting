import { useState, useEffect } from "react";

const TopNav = () => {
    useEffect(() => {
        // console.log("top nav effect");
    }, []);

    return (
        <div id="top-nav-contain">
            <div className="sort-btn">Bubble Sort</div>
            <div className="sort-btn">Selection Sort</div>
            <div className="sort-btn">Insertion Sort</div>
            <div className="sort-btn">Merge Sort</div>
            <div className="sort-btn">Quick Sort</div>
        </div>
    );
};

export default TopNav;
