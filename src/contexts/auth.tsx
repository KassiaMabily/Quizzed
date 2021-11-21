import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { boardLoad, experienceLoad, getCurrentPhase, USER_DEFAULT_BOARD } from "../libs/storage";


interface AuthContextData {
    username: string;
    userBoard: (boolean | null)[][] | undefined;
    currentRow: number;
    currentColumn: number;
    experience: number;
    setUserBoard: (state: (boolean | null)[][]) => void;
    setCurrentRow: (state: number) => void;
    setCurrentColumn: (state: number) => void;
    updateExperience: (state: number) => Promise<void>;
    updateUsername: (state: string) => Promise<void>;
    openPhaseBoard: (row: number, column: number) => Promise<void>;
    loadGame: () => Promise<void>;
    resetGame: () => Promise<void>;
}

interface Props {
    children: React.ReactElement<any, any>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
const AuthProvider = ({ children }: Props) => {
    const [ loading, setLoading ] = useState(true);

    const [ username, setUsername ] = useState("");
    const [ userBoard, setUserBoard ] = useState<(boolean| null)[][]>();
    const [ currentRow, setCurrentRow ] = useState(0);
    const [ currentColumn, setCurrentColumn ] = useState(0);
    const [ experience, setExperience ] = useState(0);

    const updateExperience = async (e: number) => {
        let new_experience = experience + e
        await AsyncStorage.setItem('@quizzed:experience', JSON.stringify(new_experience));
        setExperience(new_experience);
    }

    const updateUsername = async (user: string) => {
        setUsername(user);
        await AsyncStorage.setItem('@quizzed:username', user);
    }

    const openPhaseBoard = async (row: number, column: number) => {
        let new_board = userBoard;
        if (new_board) {
            // console.log("Atual:", currentRow, currentColumn);
            // console.log("Clicado:", row, column);
            for(var i = row; i < currentRow + 1; i++) {
                for(var j = column; j < currentColumn + 1; j++){
                    new_board[i][j] = true;
                    setCurrentRow(i);
                    setCurrentColumn(j);
                }
            }
            setUserBoard(new_board);
            await AsyncStorage.setItem('@quizzed:board', JSON.stringify(new_board));
        }
    }

    async function loadGame() {
        const boardStoraged = await boardLoad();
        const experienceStoraged = await experienceLoad();
        const { row, column } = await getCurrentPhase();

        setUserBoard(boardStoraged);
        setCurrentRow(row);
        setCurrentColumn(column);
        setExperience(experienceStoraged);
    }

    async function resetGame() {
        await AsyncStorage.setItem('@quizzed:board', JSON.stringify(USER_DEFAULT_BOARD));
        await AsyncStorage.setItem('@quizzed:experience', JSON.stringify(0));

        await loadGame();
    }

    useEffect(() => {
        loadGame();
    }, []);


    return (
        <AuthContext.Provider 
            value={{
                username,
                userBoard,
                currentRow,
                currentColumn,
                experience,
                setUserBoard,
                setCurrentRow,
                setCurrentColumn,
                updateExperience,
                updateUsername,
                openPhaseBoard,
                loadGame,
                resetGame
            }}
        >
            {children}
        </AuthContext.Provider>
    )
  
};

function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider.');
    }

    return context;
}

export { AuthProvider, useAuth };