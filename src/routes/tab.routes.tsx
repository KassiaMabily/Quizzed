import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import { MapBoard } from '../pages/MapBoard';
import { MaterialIcons } from '@expo/vector-icons';
import { Ranking } from '../pages/Ranking';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
    return (
        <AppTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.blue,
                tabBarInactiveTintColor: colors.heading,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    paddingHorizontal: 20,
                    height: 70
                },
            }}
        >
        <AppTab.Screen
            name="Quiz"
            component={MapBoard}
            options={{
                tabBarIcon: (({ size, color } : {size: any, color: any}) => (
                    <MaterialIcons 
                        name="dynamic-form"
                        size={size}
                        color={color}
                    />
                ))
            }}
        />
        <AppTab.Screen
            name="Ranking"
            component={Ranking}
            options={{
                tabBarIcon: (({ size, color } : {size: any, color: any}) => (
                    <MaterialIcons 
                        name="star"
                        size={size}
                        color={color}
                    />
                ))
            }}
        />
        </AppTab.Navigator>
    )
}

export default AuthRoutes;
