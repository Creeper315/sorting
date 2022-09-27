import type { NextPage } from "next";
import TopNav from "../Component/TopNav/topNav";
import Body from "../Component/Body/body";
import sy from "../styles/body.module.css";

const Home: NextPage = () => {
    return (
        <div className={sy.indexContain}>
            <TopNav />
            <Body />
        </div>
    );
};

export default Home;
