import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Animated, {FadeIn, FadeInDown} from 'react-native-reanimated'

const Categories = ({categories, activeCategory, changeCategory}) => {

  return (
    categories &&
    <Animated.View entering={FadeInDown.duration(500).springify()}>
        <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className='space-x-4'
            contentContainerStyle={{paddingHorizontal: 15}}     
        >
            {
                categories.map((item, index) => {
                    let isActive = item.strCategory === activeCategory;

                    return(
                        <TouchableOpacity
                            key={index}
                            className={`flex items-center space-y-1`}
                            onPress={() => {changeCategory(item.strCategory)}}
                        >   
                            <View className={`rounded-full p-[6px] ${isActive ? 'bg-amber-500' : 'bg-black/10'}`}>
                                <Image 
                                    source={{uri: item.strCategoryThumb}}
                                    style={{width: hp(6), height: hp(6)}}
                                    className='rounded-full'
                                />
                            </View>
                            <Text className='text-neutral-600' style={{fontSize: hp(1.6)}}>
                                {item.strCategory}
                            </Text>
                        </TouchableOpacity>
                    );
                })
            }
        </ScrollView>
    </Animated.View>
  )
}

export default Categories