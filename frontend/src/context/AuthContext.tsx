import * as React from 'react';

interface Children {
    children: JSX.Element
}

interface ContextProps {
    isAuth: Boolean;
    setAuth: Function;
}

// Create Context 
const Context = React.createContext<ContextProps>({ isAuth: false, setAuth: () => null });

// Provider
export const AuthProvider = ({ children }: Children): JSX.Element => {

    // State
    const [isAuth, setAuth] = React.useState<Boolean>(false);

    return (

        <Context.Provider value={{ isAuth, setAuth }}>

            {children}

        </Context.Provider>
    )
}

// Custom hook
export function useAuth() {

    //Context recebe o atual valor do contexto UserContext
    const context = React.useContext<ContextProps>(Context);

    // Return actual context value
    return context;

}