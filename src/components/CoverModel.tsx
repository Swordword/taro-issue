import React, { useEffect, useRef, useState } from "react";
import Taro from '@tarojs/taro'
import { CoverView } from "@tarojs/components";
import './covermodel.scss'

const navigate = ()=>{
  Taro.navigateTo({
    url:'/pages/copy/index'
  })
}
const CoverModel = (props) => {
  return (
    <CoverView className='cover-model'>
      <CoverView onClick={props.exit}>exit</CoverView>
      
      <CoverView onClick={navigate}>hello world</CoverView>
    </CoverView>
  );
};
export default CoverModel