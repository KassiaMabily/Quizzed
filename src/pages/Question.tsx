import { useRoute } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, SafeAreaView, View, ScrollView } from 'react-native';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import questions from "../../questions.json";
import { Button } from '../components/Button';
import { RootStackParamList } from '../routes/types';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
interface Params {
    difficulty: number;
}

type Props = StackScreenProps<RootStackParamList, 'Question'>;
export function Question({ route, navigation }: Props) {
    const routes = useRoute();

    const {
        difficulty
    } = routes.params as Params;

    const [ showAnswer, setShowAnswer ] = useState<boolean>(false);
    const [ currentQuestion, setCurrentQuestion ] = useState<iQuestion>({} as iQuestion);
    const [ remainingAttempts, setRemainingAttempts ] = useState<number>(0);
    const [ points, setPoints ] = useState<number>(0);

    function handleOptionPress(option: iOption) {
        if(!showAnswer) {
            if(option.is_correct) {
                // Contabilizar os pontos e voltar para o mapa
                Alert.alert("Você acertou!", "", [                
                    { 
                        text: 'OK', 
                        onPress: () => console.log('OK Pressed') 
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
                        onPress: () => console.log('OK Pressed') 
                    }
                ])
            }
        }
        
    }

    useEffect(() => {
        const startNewQuestion = () => {
            let count = 0;
            while (true) 
            {   
                let randomChallengeIndex = Math.floor(Math.random() * questions.length);
                let question: iQuestion = questions[randomChallengeIndex];
                
                if(question.difficulty === difficulty && question.title !== "") {
                    console.log(question);
                    setCurrentQuestion(question);
                    setRemainingAttempts(difficulty);
                    setPoints(difficulty === 1 ? 2 : difficulty === 2 ? 5 : 10)
                    break;
                }

                count++;

                if(count >= questions.length) {
                    break
                }
            }
            
        }

        startNewQuestion();
    }, [])

    if(!currentQuestion.options)
        return (
            <Text>Carregando...</Text>
        )

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
                style={{ width: "100%" }}
                contentContainerStyle={styles.content}
            >
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
    title: {
        marginBottom: 15,
        textAlign: "justify",
        fontFamily: fonts.heading
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
    },
    optionText: {
        textAlign: "justify",
        fontFamily: fonts.text
    }
});