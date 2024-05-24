import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const Loading = (props) => {
  return (
    <View className='flex-1 flex justify-center items-center' style={{paddingTop: hp(15)}}>
      <ActivityIndicator {...props}/>
    </View>
  )
}

export default Loading