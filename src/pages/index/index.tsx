import React from "react";
import Taro, { useReady,useDidShow } from "@tarojs/taro";
import { View,Video,CoverImage,CoverView, Text, Button, Canvas } from "@tarojs/components";
import "./index.scss";

let systemInfo, ctx, canvas, img, imgWidth, imgHeight;
const src = 'https://static.massivejohn.com/yellow.jpeg'
const Index: React.FC = () => {
  useReady(() => {
    loadCanvas();
  });
  // 加载canvas
  const loadCanvas = () => {
    systemInfo = Taro.getSystemInfoSync();
    console.log("systemInfo", systemInfo);
    // const { screenWidth, screenHeight } = systemInfo;
    const query = Taro.createSelectorQuery();
    query
      .select("#myCanvas")
      .node((res) => {
        console.log("res", res);
        canvas = res.node;
        ctx = canvas.getContext("2d");
        img = canvas.createImage();
        img.onload = () => {
          drawCover();
        };
        Taro.getImageInfo({
          // src: props.cover,
          src: src,
          success: (imgInfo) => {
            console.log("imgInfo", imgInfo);
            imgWidth = imgInfo.width;
            imgHeight = imgInfo.height;
            img.src = imgInfo.path;
          },
          fail: (err) => {
            console.log(err);
          },
        });
      })
      .exec();
  };
  const drawCover = () => {
    const rate = 1,
      scale = 1;
    ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
  };
  const navigate = () => {
    Taro.navigateTo({
      url: "/pages/index/index",
    });
  };
  const touchStart = (e) => {
    Taro.showToast({
      title: String(e.touches[0].x),
    });
  };
  const play = () => {

  }
  return (
    <View className='index-page'>
      <Button onClick={navigate}>navigate</Button>
      <View className='canvas-container'>
        <Canvas
          type='2d'
          style={{ width: "400px", height: "400px" }}
          canvasId='myCanvas'
          id='myCanvas'
          disableScroll
          onTouchStart={touchStart}
        >
          <CoverView className='content'>Hello world</CoverView>
        </Canvas>
      </View>
      <View className='container'>
      <Video id='myVideo' src='src'>
        <CoverView className='controls'>
          <CoverView className='play' onClick={play}>
            <CoverImage className='img' src={src} />
          </CoverView>
        </CoverView>
      </Video>
      </View>
    </View>
  );
};

export default Index;
