import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';
import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { Question } from '../pages/Question';

import AuthRoutes from './tab.routes';
import { RootStackParamList } from './types';

const StackRoutes = createStackNavigator<RootStackParamList>();

const AppRoutes: React.FC = () => (
    <StackRoutes.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: colors.white
            }
        }}
    >
        <StackRoutes.Screen 
            name="Welcome"
            component={Welcome}
        />
        <StackRoutes.Screen 
            name="UserIdentification"
            component={UserIdentification}
        />
        <StackRoutes.Screen 
            name="Confirmation"
            component={Confirmation}
        />
        <StackRoutes.Screen 
            name="Ranking"
            component={AuthRoutes}
        />
        <StackRoutes.Screen 
            name="Question"
            component={Question}
        />
        <StackRoutes.Screen 
            name="MapBoard"
            component={AuthRoutes}
        />
    </StackRoutes.Navigator>
)

export default AppRoutes;
