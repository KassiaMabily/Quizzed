import React, { createRef, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, ScrollView, View, Dimensions, TouchableWithoutFeedback, Alert } from 'react-native';
import * as Svg from 'react-native-svg';
import colors from '../styles/colors';
import { boardLoad, getCurrentPhase } from '../libs/storage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../routes/types';
import { useAuth } from '../contexts/auth';
import { Header } from '../components/Header';
import { useIsFocused } from '@react-navigation/core';

const windowWidth = Dimensions.get('window').width;



const BOARD = [
    [0,0,8],
    [5,6,7],
    [4,0,0],
    [3,2,0],
    [0,1,0],
]

type Props = StackScreenProps<RootStackParamList, 'MapBoard'>;
export function MapBoard({ route, navigation }: Props) {
    const size = 80;
    const radius = 40;

    const isFocused = useIsFocused();
    const scrollViewRef = createRef<ScrollView>();
    const { userBoard, currentRow, currentColumn, loadGame } = useAuth();
    

    const hasNeighbor = (indexRow: number, indexColumn: number) => {
        let top = false;
        let left = false;
        let right = false;
        let bottom = false;

        // TOP
        if((indexRow - 1)>= 0){
            top = BOARD[indexRow - 1][indexColumn] !== 0;
        }

        // BOTTOM
        if((indexRow + 1) < BOARD.length){
            bottom = BOARD[indexRow + 1][indexColumn] !== 0;
        }

        // LEFT
        if(indexColumn - 1 >= 0) {
            left = BOARD[indexRow][indexColumn - 1] !== 0;
        }

        if(indexColumn + 1 <= 2) {
            right = BOARD[indexRow][indexColumn + 1] !== 0;
        }
        

        return {
            top, left, right, bottom
        }
    }

    
    const countPhases = (indexRow: number, indexColumn: number) => {

        let current = BOARD[currentRow][currentColumn];
        let new_phase = BOARD[indexRow][indexColumn];
        
        return (current === 1 && userBoard && !userBoard[currentRow][currentColumn] ? (new_phase - current) + 1 : (new_phase - current));
    }
    
    const renderLine = ({top = false, left = false, right = false, bottom = false}) => {
        return (
            <View style={{ position: "absolute", top: 0, zIndex: 1 }}>
                <Svg.Svg height="100" width={(windowWidth / 3) * 1.3}>
                {
                    top && (
                        <Svg.Line 
                            x1={((windowWidth / 3) * 1.3) / 2} 
                            y1="0" 
                            x2={((windowWidth / 3) * 1.3) / 2} 
                            y2={((windowWidth / 3) * 1.3) / 2} 
                            stroke={colors.blue}
                            strokeWidth={3}
                        />
                    )
                }

                {
                    left && (
                        <Svg.Line 
                            x1={((windowWidth / 3) * 1.3) / 2} 
                            y1={60} 
                            x2="5" 
                            y2={60} 
                            stroke={colors.blue}
                            strokeWidth={3} 
                        />
                    )
                }
                </Svg.Svg>
            </View>
        )
    }

    
    const renderCircle = ( i: number, indexRow: number, indexColumn: number ) => {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    let nivel_dificuldade = countPhases(indexRow, indexColumn);
                    console.log(`Avançar ${nivel_dificuldade} casas`)
                    if(nivel_dificuldade >= 1 && nivel_dificuldade <= 3) {
                        navigation.navigate("Question", { difficulty: nivel_dificuldade, row: indexRow, column: indexColumn })
                    }else{
                        Alert.alert(`Você pode avançar até 3 casas!`)
                    }
                    
                }}
            >
                <View style={{ zIndex: 999, position: "relative" }}>
                    <Svg.Svg width={size} height={size}>
                        <Svg.Circle
                            fill={userBoard ? userBoard[indexRow][indexColumn] ? colors.green : colors.blue : colors.blue}
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                        />
                        <Svg.Text
                            stroke={colors.white}
                            fontSize="15"
                            x={size / 2}
                            y={(size / 2) + 5}
                            textAnchor="middle"
                        >
                            { i }
                        </Svg.Text>
                    </Svg.Svg>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    useEffect(() => {
        loadGame();
    }, [isFocused])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={{ marginHorizontal: 20 }}>
                <Header />
            </View>
            <ScrollView 
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef?.current?.scrollToEnd({ animated: true })}
                style={styles.scrollView}
            >
                
                {
                    BOARD.map((row, indexRow) => {
                        return (
                        <View key={`row-${indexRow}`} style={styles.row}>
                            {
                            row.map((column, indexColumn) => (
                                column !== 0 ? (
                                    <View key={`column-${indexColumn}`} style={styles.column}>
                                        { renderCircle(column, indexRow, indexColumn) }
                                        { renderLine(hasNeighbor(indexRow, indexColumn)) }
                                    </View>
                                ) : (
                                    <View key={`column-${indexColumn}`} style={styles.column} />
                                )
                            ))
                            }
                        </View>
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        marginHorizontal: 20,
        marginBottom: 20,
        flexDirection: "column-reverse"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    column: {
        width: windowWidth / 3,
        height: 100,
        alignItems: "center",
        justifyContent: "flex-end"
    }
});