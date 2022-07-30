import { createContext, useState } from 'react';

const UpdateGoalContext = createContext({});

export const UpdateGoalProvider = ({ children }) => {

    const [updateCurrentId, setUpdateCurrentId] = useState('');

    return (
        <UpdateGoalContext.Provider value={{ updateCurrentId, setUpdateCurrentId }}>
            {children}
        </UpdateGoalContext.Provider>
    )
}

export default UpdateGoalContext;