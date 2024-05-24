import React from 'react';
import { StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native';

export default (props) => (
  <SafeAreaView style={styles.AndroidSafeArea} className='bg-white h-full' >
    {props.children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
});

export const safeArea = () => {
    return Platform.OS === 'android' ? StatusBar.currentHeight : 0
}