import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../routes/types';
import { 
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import welcomeIllustration from '../assets/welcome-illustration.jpg';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

type Props = StackScreenProps<RootStackParamList, 'Welcome'>;
export function Welcome({ route, navigation }: Props) {
  
    function handleNextScreen() {
        navigation.navigate('UserIdentification');
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Quizzed
                </Text>
                <Image 
                    source={welcomeIllustration} 
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.subtitle}>
                  Teste seus conhecimentos de gestão com questões de concurso e agrupadas por dificuldade
                </Text>

                <TouchableOpacity 
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={handleNextScreen}
                >
                <Feather 
                    name="chevron-right"
                    style={styles.buttonIcon}
                />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: fonts.heading,
    color: colors.heading,
    marginTop: 38,
    lineHeight: 34
  },
  image: {
    height: Dimensions.get('window').width * 0.7,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text
  },
  button: {
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    width: 56,
    height: 56
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 24
  },
});
