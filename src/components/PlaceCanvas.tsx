import React, { useEffect, useRef, useState } from "react";
import { Canvas, CoverView } from "@tarojs/components";
import Taro, {
  RouterInfo,
  useReady,
  useDidShow,
  eventCenter,
  getCurrentInstance,
} from "@tarojs/taro";

import CoverModel from "./CoverModel";

const Index: React.FC = () => {
  const [pagePosition, setPagePosition] = useState({
    x: 0,
    y: 0,
  });
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [show, setShow] = useState(false);
  const ctxRef = useRef<CanvasRenderingContext2D>();
  useReady(() => {
    console.log("comp useReady");
    eventCenter.once(
      (getCurrentInstance().router as RouterInfo).onReady, // 类型断言
      () => {
        console.log("useReady received");
        loadCanvas();
      }
    );
  });

  const loadCanvas = () => {
    Taro.createSelectorQuery().select("#myCanvas").node(init.bind(this)).exec();
  };
  /**
   *
   * @param res
   */
  const init = (res) => {
    console.log("res", res);
    const canvas = res.node;
    canvas.width = res.node._width;
    canvas.height = res.node._height;
    const tempctx = canvas.getContext("2d");
    tempctx.fillStyle = "red";
    setCtx(tempctx);
  };
  useEffect(() => {
    ctxRef.current = ctx;
    console.log("ctxRef.current", ctxRef.current);
    // ctxRef.current
    if (ctxRef.current) {
      ctxRef.current.fillRect(pagePosition.x, pagePosition.y, 100, 100);
    }
  }, [ctx, pagePosition]);
  const render = () => {};
  const handleTouchStart = (e) => {
    console.log("e", e);
    setPagePosition({
      x: e.touches[0].x,
      y: e.touches[0].y,
    });
    render();
  };
  return (
    <Canvas
      type='2d'
      style={{ width: "100%", height: "50%" }}
      onTouchStart={handleTouchStart}
      canvasId='myCanvas'
      id='myCanvas'
      disableScroll
    >
      
      {show ? <CoverModel exit={() => setShow(false)} /> : null}
    </Canvas>
  );
};

export default Index;
