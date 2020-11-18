import React, { useState, useEffect, useLayoutEffect } from "react";
import Taro, { useDidShow, useReady } from "@tarojs/taro";
import { View, Input, Button } from "@tarojs/components";
import Action from "./Action";
import "./index.scss";

const Index = () => {
  const initialList = [
    { name: "aa", age: 11 },
    {
      name: "bb",
      age: 22,
    },
  ];
  const [list, setList] = useState(initialList);
  useEffect(() => {
    setTimeout(() => {
      setList([
        { name: "bob", age: 99 },
        {
          name: "bob",
          age: 88,
        },
      ]);
    }, 3000);
  });
  return (
    <View className='demand-input-page'>
      {/* <Button onClick={navigate}>重复进入</Button> */}
      <Action list={list} />
    </View>
  );
};

export default Index;
