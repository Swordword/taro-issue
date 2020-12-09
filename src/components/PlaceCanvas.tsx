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
  const [canvasShow, setCanvasShow] = useState(false);
  const [show, setShow] = useState(false);
  const ctxRef = useRef<CanvasRenderingContext2D>();
  useDidShow(() => {
    console.log("comp useDidShow");
    eventCenter.once(
      (getCurrentInstance().router as RouterInfo).onShow, // 类型断言
      () => {
        console.log("useDidShow received");
        loadCanvas();
      }
    );
  });

  const loadCanvas = () => {
    console.log("fn loadCanvas");
    function getCanvas() {
      console.log("fn getCanvas");
      return new Promise((resolve, reject) => {
        Taro.createSelectorQuery()
          .select("#myCanvas")
          .node((res) => {
            if (res && res.node) {
              resolve(res);
            } else {
              setTimeout(() => {
                getCanvas();
              }, 100);
            }
          })
          .exec();
      });
    }
    getCanvas().then(init.bind(this));
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
    draw();
  };
  const draw = () => {
    setCanvasShow(true);
    ctxRef.current = ctx;
    console.log("ctxRef.current", ctxRef.current);
    ctxRef.current?.clearRect(
      0,
      0,
      ctxRef.current.canvas.width,
      ctxRef.current.canvas.width
    );
    // ctxRef.current
    if (ctxRef.current) {
      ctxRef.current.fillRect(pagePosition.x, pagePosition.y, 100, 100);
    }
  };
  useEffect(() => {
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {!canvasShow ? <CoverView>加载中 </CoverView> : null}
    </Canvas>
  );
};

export default Index;
