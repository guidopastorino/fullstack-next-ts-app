'use client'

import React, { createContext, useState, ReactNode } from "react";

// tipos del usuario
interface UserProps {
    _id: string;
    dateJoined: number;
    profileImage: string;
    fullname: string;
    username: string;
    followers: string[];
    following: string[];
    blocked: string[];
    privateAccount: boolean;
    isLogged: boolean;
}

interface AppContextProps {
    children: React.ReactNode;
}

export const AppContext = createContext<{ userData: UserProps; setUserData: React.Dispatch<React.SetStateAction<UserProps>> } | undefined>(undefined);

export default function AppContextProvider({ children }: AppContextProps) {

    // user data
    const [userData, setUserData] = useState<UserProps>({
        _id: "",
        dateJoined: 0,
        profileImage: "",
        fullname: "",
        username: "",
        followers: [],
        following: [],
        blocked: [],
        privateAccount: false,
        isLogged: true,
    });

    return (
        <AppContext.Provider value={{ userData, setUserData }}>
            {children}
        </AppContext.Provider>
    );
}
