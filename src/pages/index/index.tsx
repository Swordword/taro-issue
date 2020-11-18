import React, { useState } from "react";
import Taro, { useReady, useDidShow } from "@tarojs/taro";
import { View, Canvas } from "@tarojs/components";
import "./index.scss";

const Index: React.FC = () => {
  useDidShow(() => {
    console.log("fn loadCanvas");
    Taro.createSelectorQuery()
    .select("#myCanvas")
    .node(init.bind(this)).exec()
      ;
  });
  const init = (res) => {
    const canvas = res
    console.log("canvas", canvas);
  };

  return (
    <View className='index-page'>
      <Canvas
        type='2d'
        style={{ width: "100%", height: "100%" }}
        canvasId='myCanvas'
        id='myCanvas'
        disableScroll
      ></Canvas>
    </View>
  );
};

export default Index;
