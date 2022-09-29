import { createContext, useState } from "react";
export const SortContext = createContext();
import { Method } from "../Algorithm/helper";

const AppWrapper = ({ children }) => {
    const [Algorithm, setAlgorithm] = useState(Method.bubble);
    return (
        <SortContext.Provider value={{ Algorithm, setAlgorithm }}>
            {children}
        </SortContext.Provider>
    );
};

export default AppWrapper;
