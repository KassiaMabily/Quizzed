import { useRoute } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, SafeAreaView, View, ScrollView } from 'react-native';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import questions from "../../questions.json";
import { Button } from '../components/Button';
import { Load } from '../components/Load';
import { useAuth } from '../contexts/auth';
import { RootStackParamList } from '../routes/types';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
interface Params {
    difficulty: number;
    row: number;
    column: number;
}

type Props = StackScreenProps<RootStackParamList, 'Question'>;
export function Question({ route, navigation }: Props) {
    const routes = useRoute();

    const {
        difficulty,
        row,
        column
    } = routes.params as Params;

    const { updateExperience, openPhaseBoard } = useAuth();

    const [ showAnswer, setShowAnswer ] = useState<boolean>(false);
    const [ currentQuestion, setCurrentQuestion ] = useState<iQuestion | null>(null);
    const [ remainingAttempts, setRemainingAttempts ] = useState<number>(0);
    const [ points, setPoints ] = useState<number>(0);

    function handleOptionPress(option: iOption) {
        if(!showAnswer) {
            if(option.is_correct) {
                // Contabilizar os pontos e voltar para o mapa
                Alert.alert("Você acertou!", "", [                
                    { 
                        text: 'OK', 
                        onPress: async () => {
                            await updateExperience(points);
                            await openPhaseBoard(row, column)
                            navigation.navigate("MapBoard");
                        }
                    }
                ]);
                
            }else if(remainingAttempts > 0) {
                Alert.alert("Poxa, você errou :(", " Deseja tentar novamente?", [
                    {
                        text: 'Sim',
                        onPress: () => {
                            setRemainingAttempts(remainingAttempts - 1);
                            setPoints(points - 1)
                        },
                    },
                    {
                        text: 'Não, desejo ver a resposta',
                        onPress: () => {
                            setShowAnswer(true);
                        },
                    }
                ]);
            }else {
                // Somente voltar para o mapa
                Alert.alert("Você errou :(", "Você voltará para o mapa", [
                    { 
                        text: 'OK', 
                        onPress: () => {
                            navigation.navigate("MapBoard");
                        }
                    }
                ])
            }
        }
        
    }

    useEffect(() => {
        let filtered_questions = questions.filter(q => q.difficulty === difficulty)
        let randomChallengeIndex = Math.floor(Math.random() * filtered_questions.length);
        if(filtered_questions[randomChallengeIndex]) {
            setCurrentQuestion(filtered_questions[randomChallengeIndex]);
            setRemainingAttempts(difficulty - 1);
            setPoints(difficulty === 1 ? 2 : difficulty === 2 ? 5 : 10)
        }
        
    }, [])

    if(currentQuestion === null)
        return (
            <Load />
        )

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
                style={{ width: "100%" }}
                contentContainerStyle={styles.content}
            >
                <View style={styles.wrapperAttempts}>
                    <Text style={styles.attempts}>Você possui: </Text>
                    <Text style={styles.attempts}>{remainingAttempts + 1} { remainingAttempts + 1 > 1 ? "tentativas" : "tentativa"} </Text>
                </View>
                <Text style={styles.title}>{currentQuestion.title}</Text>

                <View style={styles.optionWrapper}>
                    {
                        currentQuestion.options.map(( option, index ) => (
                            <TouchableWithoutFeedback key={`option-${index}`} onPress={() => handleOptionPress(option)}>
                                <View 
                                    style={option.is_correct && showAnswer ? {...styles.optionButton, backgroundColor: colors.blue } : styles.optionButton}
                                >
                                    <Text 
                                        style={option.is_correct && showAnswer ? {...styles.optionText, color: colors.white} : { ...styles.optionText, color: "#000" }}
                                    >
                                            { option.alternative }
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        ))
                    }
                    

                    {
                        showAnswer && (
                            <Button 
                                title={"Voltar para o mapa"}
                                onPress={() => navigation.navigate("MapBoard")}
                            />
                        )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        padding: 30,
    },
    wrapperAttempts: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    attempts: {
        fontFamily: fonts.heading,
        color: colors.red,
    },
    title: {
        marginBottom: 15,
        textAlign: "justify",
        fontFamily: fonts.heading,
        fontSize: 16
    },
    optionWrapper: {
        width: "100%",
    },
    optionButton: {
        marginBottom: 20,
        borderColor: colors.blue,
        borderWidth: 1,
        borderRadius: 16,
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 14
    },
    optionText: {
        textAlign: "justify",
        fontFamily: fonts.text
    }
});