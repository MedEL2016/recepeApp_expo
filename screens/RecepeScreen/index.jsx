import { View, Text, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon, HeartIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../../components/Loading';

const RecepeScreen = (props) => {
  const navigation = useNavigation()
  const recepe = props.route.params;
  const [liked, setLiked] = useState(false)
  const [recepeData, setRecepeData] = useState(null)
  const timeout1 = useRef()

  const fetchRecepe = async (idMeal) => {
    try{
        const response = await axios.get('https://themealdb.com/api/json/v1/1/lookup.php?i='+idMeal)
        if(response && response.data){
            setRecepeData(response.data.meals[0])
        }
    }catch(err){
        console.log(err)
    }
  }

  useEffect(() => {
    timeout1.current = setTimeout(() => {
        fetchRecepe(recepe.idMeal)
    }, 600)

    return () => {clearTimeout(timeout1.current)}
  }, [])
  
  const ingredients = (rec) => {
    if(!rec) return []
    let ingredientsList = []

    for(let i = 1; i <= 20; i++){
        if(rec['strIngredient'+i]){
            ingredientsList.push(i)
        }else{
            continue;
        }
    }
    return ingredientsList
  }

  console.log(recepeData)
    
  return (
        <ScrollView
            className='bg-white flex-1 h-full'
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 30}}
        >
            <View className='flex items-center'>
                <Image 
                    source={{uri: recepe.strMealThumb}}
                    style={{width: wp(100), height: hp(50)}}
                    className='rounded-2xl'
                />
            </View>
            <View className='w-full absolute flex-row justify-between items-center pt-8'>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View className='h-10 w-10 flex items-center justify-center rounded-full ml-5 bg-white'>
                        <ChevronLeftIcon size={hp(3.5)} strokeWidth={3} color="#fbbf24"/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setLiked(!liked)}>
                    <View className='h-10 w-10 flex items-center justify-center rounded-full mr-5 bg-white'>
                        <HeartIcon size={hp(3.5)} strokeWidth={2.5} color={liked ? "red" : "#fbbf24"} fill={liked ? 'red' : 'white'}/>
                    </View>
                </TouchableOpacity>
            </View>
                {
                    recepeData ? 
                    <View className='px-4 flex justify-between space-y-4 pt-8'>
                        <View className='space-y-2'>
                            <Text style={{fontSize: hp(3)}} className='font-bold flex-1 text-neutral-700`'>
                                {recepeData?.strMeal}
                            </Text>
                            <Text style={{fontSize: hp(3)}} className='font-medium flex-1 text-neutral-500`'>
                                {recepeData?.strArea}
                            </Text>
                        </View>

                        <View className='flex-row justify-around'>
                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View 
                                    className='bg-white rounded-full flex items-center justify-center'
                                    style={{height: hp(6.5), width: hp(6.5)}}
                                >
                                    <ClockIcon size={hp(4)} strokeWidth={2.5} color='#525252'/>
                                </View>
                                <View className='flex items-center py-2 space-y-1'>
                                    <Text style={{fontSize: hp(2)}} className='font-bold text-neutral-700'>
                                        35
                                    </Text>
                                    <Text style={{fontSize: hp(1.3)}} className='font-bold text-neutral-700'>
                                        Mins
                                    </Text>
                                </View>
                            </View>
                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View 
                                    className='bg-white rounded-full flex items-center justify-center'
                                    style={{height: hp(6.5), width: hp(6.5)}}
                                >
                                    <UsersIcon size={hp(4)} strokeWidth={2.5} color='#525252'/>
                                </View>
                                <View className='flex items-center py-2 space-y-1'>
                                    <Text style={{fontSize: hp(2)}} className='font-bold text-neutral-700'>
                                        3
                                    </Text>
                                    <Text style={{fontSize: hp(1.3)}} className='font-bold text-neutral-700'>
                                        Servings
                                    </Text>
                                </View>
                            </View>
                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View 
                                    className='bg-white rounded-full flex items-center justify-center'
                                    style={{height: hp(6.5), width: hp(6.5)}}
                                >
                                    <FireIcon size={hp(4)} strokeWidth={2.5} color='#525252'/>
                                </View>
                                <View className='flex items-center py-2 space-y-1'>
                                    <Text style={{fontSize: hp(2)}} className='font-bold text-neutral-700'>
                                        439
                                    </Text>
                                    <Text style={{fontSize: hp(1.3)}} className='font-bold text-neutral-700'>
                                        Calories
                                    </Text>
                                </View>
                            </View>
                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View 
                                    className='bg-white rounded-full flex items-center justify-center'
                                    style={{height: hp(6.5), width: hp(6.5)}}
                                >
                                    <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color='#525252'/>
                                </View>
                                <View className='flex items-center py-2 space-y-1'>
                                    <Text style={{fontSize: hp(2)}} className='font-bold text-neutral-700'>
                                        
                                    </Text>
                                    <Text style={{fontSize: hp(1.3)}} className='font-bold text-neutral-700'>
                                        Easy
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View className='space-y-4'>
                            <Text style={{fontSize: hp(2.5)}} className='font-bold flex-1 text-neutral-700'>
                                Ingredients
                            </Text>
                            <View className='space-y-2 ml-2'>
                                {
                                    ingredients(recepeData).map((index) => {
                                        
                                        return(
                                           <View key={index} className='flex-row space-x-4'>
                                                <View style={{height: hp(1.5), width: hp(1.5)}} className='bg-amber-300 rounded-full'/>
                                                <View className='flex-row space-x-2'>
                                                    <Text style={{fontSize: hp(1.7)}} className='font-extrabold text-neutral-700'>{recepeData['strMeasure' + index]}</Text>
                                                    <Text style={{fontSize: hp(1.7)}} className='font-medium text-neutral-600'>{recepeData['strIngredient' + index]}</Text>
                                                </View>
                                            </View>
                                        );
                                    })
                                }
                            </View>
                        </View>
                        <View className='space-y-4'>
                            <Text style={{fontSize: hp(2.5)}} className='font-bold flex-1 text-neutral-700'>
                                Instructions
                            </Text>
                            <View className='space-y-2 bg-gray-100 p-3 rounded-xl'>
                                <Text>
                                    {recepeData.strInstructions}
                                </Text>
                            </View>
                        </View>
                    </View>

                    : 
                    <Loading />
                }
        </ScrollView>
  )
}

export default RecepeScreen