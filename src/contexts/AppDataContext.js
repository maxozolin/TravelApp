import React, {useState, createContext} from 'react'

export const AppDataContext = createContext()

export function AppDataContext(props) {
    const [appDataContext, changeAppDataContext] = useState({
        "planner": {
            "loading": false,
            "trips": []
        }
    });

    return (
        <AppDataContext.Provider value = {[appDataContext, changeAppDataContext]}>
            {props.children}
        </AppDataContext.Provider>

    );
}