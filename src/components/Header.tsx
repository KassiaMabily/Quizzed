import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import userPhoto from '../assets/icon-user-profile.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
    const [ username, setUsername ] = useState<string>();
    const [ experience, setExperience ] = useState<number>(0);

    useEffect(() => {
        async function loadStorageUsername() {
            const user = await AsyncStorage.getItem('@quizzed:username');
            const xp = await AsyncStorage.getItem('@quizzed:experience');
            setUsername(user || '');
            setExperience(parseInt(xp ?? "0"));
        }

        loadStorageUsername();
    }, [username]);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá, { username }</Text>
                <Text style={styles.userName}>{experience} xp</Text>
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
