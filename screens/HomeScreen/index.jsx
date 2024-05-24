import React, { useEffect, useRef, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import SafeAreaView from "../../utils/SafeAreaView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../../components/Categories";
import axios from "axios";
import Recipes from "../../components/Recipes";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState(null);
  const [recepes, setRecepes] = useState(null);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRecepes = async (category = "Seafood") => {
    setRecepes(null);
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/filter.php?c=" + category
      );
      if (response && response.data) {
        setRecepes(response.data.meals);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    categories && categories.length && fetchRecepes();
  }, [categories]);

  useEffect(() => {
    activeCategory && fetchRecepes(activeCategory);
  }, [activeCategory]);

  return (
    <SafeAreaView>
      <View className="flex-1 bg-white">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          className="space-y-6 pt-4"
        >
          <View className="mx-4 flex-row justify-between items-center mb-2">
            <TouchableOpacity>
              <Image
                source={require("../../assets/images/avatars/avatar9.png")}
                style={{ height: hp(6), width: hp(6) }}
                className="rounded-full"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <View className="relative">
                <BellIcon size={hp(5)} color={"gray"} />
                <View className="rounded-full bg-red-500 absolute top-0 right-0 h-4 w-4">
                  <Text className=" text-white text-xs text-center">9</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View className="mx-4 space-y-2 mb-2">
            <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
              Hello Med!
            </Text>
            <View>
              <Text
                style={{ fontSize: hp(3.8) }}
                className="font-semibold text-neutral-600"
              >
                Make your own food,
              </Text>
            </View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-neutral-600"
            >
              stay at
              <Text style={{ fontSize: hp(3.8) }} className="text-amber-400">
                {" "}
                home
              </Text>
            </Text>
          </View>

          <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
            <TextInput
              placeholder="Search any recipe"
              placeholderTextColor={"gray"}
              style={{ fontSize: hp(1.7) }}
              className="flex-1 text-base mb-1 pl-3 tracking-wider"
            />
            <View className="bg-white rounded-full p-3">
              <MagnifyingGlassIcon
                size={hp(2.5)}
                strokeWidth={3}
                color={"gray"}
              />
            </View>
          </View>

          <View>
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              changeCategory={setActiveCategory}
            />
          </View>
          <View>
            <Recipes recepes={recepes} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
