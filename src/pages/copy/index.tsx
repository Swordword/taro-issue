import React, { useState } from "react";
import Taro, { useReady, useDidShow } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import PlaceCanvas from "../../components/PlaceCanvas";
import "./index.scss";

const Index: React.FC = () => {
  useReady(() => {
    console.log("page useReady");
  });
  const navigate = () => {
    Taro.navigateBack()
  };
  return (
    <View className='copy-page'>
      <PlaceCanvas></PlaceCanvas>
      <Button onClick={navigate}>back to index page</Button>
    </View>
  );
};

export default Index;
