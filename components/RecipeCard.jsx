import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Animated, {FadeInDown} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const RecipeCard = ({item, index}) => {
  let isEven = index % 2 === 0
  const navigation = useNavigation();

  return (
    <Animated.View entering={FadeInDown.delay(index+100).duration(600).springify().damping(12)}>
        <Pressable
            onPress={() => {
                navigation.navigate('RecepeScreen', {...item})
            }}
            style={{width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0}}
            className='flex justify-center mb-4 space-y-1'
        >
            <Image 
                source={{uri: item.strMealThumb}}
                style={{width: '100%', height: hp(35)}}
                className='bg-black/5 rounded-3xl'
            />
            <Text style={{fontSize: hp(1.5)}} className='font-semibold ml-2 text-neutral-600'>
                {
                    item.strMeal.length > 20 ? item.strMeal.slice(0, 20)+'...' : item.strMeal
                }
            </Text>
        </Pressable>
    </Animated.View>
  )
}

export default RecipeCard