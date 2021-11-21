import AsyncStorage from '@react-native-async-storage/async-storage';

export const USER_DEFAULT_BOARD: (boolean | null)[][] = [
    [null,null,false],
    [false,false,false],
    [false,null,null],
    [false,false,null],
    [null,false,null],
]

export async  function getCurrentPhase(): Promise<{row: number, column: number}> {
    try {
        const data = await AsyncStorage.getItem('@quizzed:board');
        const board = data ? (JSON.parse(data) as (boolean| null)[][]): USER_DEFAULT_BOARD;
  
        let row = -1;
        let column = -1;

        let has_counted = false;

        for(var i = 0; i < board.length; i++){
            for(var j = 0; j < board[i].length; j++){
                if(board[i][j] === true && !has_counted) {
                    row = i;
                    column = j;
                    has_counted = true;
                }
            }
        }

        if(row === -1 && column === -1) {
            row = 4;
            column = 1;
        }

        return {
            row: row,
            column: column
        };
    } catch (err: any) {
        throw new Error(err);
    }

    
}

export async function boardLoad(): Promise<(boolean| null)[][]> {
    try {
        const data = await AsyncStorage.getItem('@quizzed:board');
        const board = data ? (JSON.parse(data) as (boolean| null)[][]): USER_DEFAULT_BOARD;
  
        return board;
    } catch (err: any) {
        throw new Error(err);
    }
}

export async function experienceLoad(): Promise<number> {
    try {
        const data = await AsyncStorage.getItem('@quizzed:experience');
        const experience = data ? (JSON.parse(data) as number): 0;
  
        return experience;
    } catch (err: any) {
        throw new Error(err);
    }
}