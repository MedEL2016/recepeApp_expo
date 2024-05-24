import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Animated, {useSharedValue, withSpring} from "react-native-reanimated";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {

  const ringPadding1 = useSharedValue(0);
  const ringPadding2 = useSharedValue(0);

  const navigation = useNavigation()


  useEffect(() => {
    ringPadding1.value = 0;
    ringPadding2.value = 0;
    
    setTimeout(() => 
        ringPadding1.value = withSpring(ringPadding1.value + hp(5))      
    , 100)
    setTimeout(() =>
      ringPadding2.value = withSpring(ringPadding2.value + hp(5.5))      
    , 300)

    
    setTimeout(() => {
      navigation.navigate('HomeScreen')
    }, 3000)

  }, [])

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500 h-full">

      {/* Logo image with animated rings */}
      <Animated.View className="bg-white/20 rounded-full" style={{padding: ringPadding1}}>
        <Animated.View className="bg-white/20 rounded-full" style={{padding: ringPadding2}}>
          <Image
            source={require("../../assets/images/welcome.png")}
            style={{height: hp(20), width: hp(20)}}
          />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}
      <View className='flex items-center space-y-2'>
        <Text className='font-bold text-white tracking-widest text-6xl'>
            Foody
        </Text>
        <Text className='font-medium text-white tracking-widest text-lg'>
            Food is always right
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;