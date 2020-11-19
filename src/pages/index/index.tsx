import React, { useState } from "react";
import Taro, { useReady, useDidShow } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import PlaceCanvas from "../../components/PlaceCanvas";
import "./index.scss";

const Index: React.FC = () => {
  useDidShow(() => {
    console.log("page useDidShow");
  });
  const navigate = () => {
    Taro.navigateTo({
      url: "/pages/copy/index",
    });
  };
  return (
    <View className='index-page'>
      <PlaceCanvas></PlaceCanvas>
      <Button onClick={navigate}>link to Copy page</Button>
    </View>
  );
};

export default Index;
