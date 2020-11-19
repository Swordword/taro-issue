import React, { useState } from "react";
import Taro, { useReady, useDidShow } from "@tarojs/taro";
import { View, Canvas } from "@tarojs/components";
import PlaceCanvas from '../../components/PlaceCanvas'
import "./index.scss";

const Index: React.FC = () => {
  useReady(()=>{
    console.log('copy page useReady');
  })
  return (
    <View className='index-page'>
      <PlaceCanvas></PlaceCanvas>
    </View>
  );
};

export default Index;
