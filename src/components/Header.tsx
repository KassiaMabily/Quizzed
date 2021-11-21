import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import userPhoto from '../assets/icon-user-profile.png';
import { useAuth } from '../contexts/auth';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
    const { username, experience, resetGame } = useAuth();

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá, { username }</Text>
                <Text style={styles.userName}>{ experience } xp</Text>
                <TouchableWithoutFeedback onPress={resetGame}>
                    <Text>Resetar</Text>
                </TouchableWithoutFeedback>
            </View>

            <Image source={userPhoto} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40
    }
});
