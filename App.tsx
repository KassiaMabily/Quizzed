import 'react-native-gesture-handler';
import React from 'react';
import { 
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost'
import AppLoading from 'expo-app-loading';
import { AuthProvider } from "./src/contexts/auth";

import Routes from './src/routes';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular, 
    Jost_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}