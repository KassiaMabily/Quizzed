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
        const data = await AsyncStorage.getItem('@quizzes:board');
        const board = data ? (JSON.parse(data) as (boolean| null)[][]): USER_DEFAULT_BOARD;
  
        let row = 0;
        let column = 0;

        for(var i = 0; i < board.length; i++){
            let indexOfLastFalse = board[i].lastIndexOf(false);
            if(indexOfLastFalse !== -1) {
                row = i;
                column = indexOfLastFalse;
            }
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
        const data = await AsyncStorage.getItem('@quizzes:board');
        const board = data ? (JSON.parse(data) as (boolean| null)[][]): USER_DEFAULT_BOARD;
  
        return board;
    } catch (err: any) {
        throw new Error(err);
    }
}