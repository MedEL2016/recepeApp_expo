import { View, Text } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import MasonryList from '@react-native-seoul/masonry-list';
import RecipeCard from './RecipeCard';
import Loading from './Loading';

const Recipes = ({recepes}) => {

  return (
    <View className='mx-2 space-y-3'>
      <Text style={{fontSize: hp(3)}} className='pl-2 font-semibold text-neutral-600'>Recipes</Text>
        <View>
          {
            recepes && recepes.length > 0 ? (
              <MasonryList
                data={recepes}
                keyExtractor={(item) => item.idMeal}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => <RecipeCard item={item} index={index} />}
                // refreshing={isLoadingNext}
                // onRefresh={() => refetch({first: ITEM_CNT})}
                onEndReachedThreshold={0.1}
                // onEndReached={() => loadNext(ITEM_CNT)}
              />
            ):(
              <Loading size={50} color={'rgb(245 158 11)'}/>
            )

          }
        </View>
    </View>
  )
}

export default Recipes