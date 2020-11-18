import React, { useState, useEffect } from "react";
import Taro, { useDidShow } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";

const Action: React.FC = (props) => {

  return (
    <View>
      <View>
        {props.list.map((item, index) => (
          <View key={index}>
            name is {item.name}, age is {item.age}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Action;
