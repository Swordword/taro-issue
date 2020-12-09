import React, { useState } from "react";
import Taro, {
  useReady,
  eventCenter,
  getCurrentInstance,
  RouterInfo,
} from "@tarojs/taro";
import { View, Canvas } from "@tarojs/components";

import "./index.scss";

function Index() {
  let windowWidth: number,
    windowHeight: number,
    // 根据尺寸动态换算 1px 换算成多少rpx
    ratio: number,
    canvas: Record<string, any>,
    ctx: any;
  const [albumPermit, setAlbumPermit] = useState(true);
  const [canvasToTempFilePath, setCanvasToTempFilePath] = useState<string>();
  useReady(function () {
    const query = Taro.createSelectorQuery();
    query
      .select("#myCanvas")
      .node((res) => handleDraw(res))
      .exec();

    // eventCenter.once(
    //   (getCurrentInstance().router as RouterInfo).onReady,
    //   () => {
    //     const query = Taro.createSelectorQuery();
    //     query
    //       .select("#myCanvas")
    //       .node((res)=>handleDraw(res)
    //       )
    //       .exec();
    //   }
    // );
  });
  // 海报绘制
  async function handleDraw(res: Taro.NodesRef.NodeCallbackResult) {
    console.log("this222");
    canvas = res.node;
    // 计算设备像素比 兼容高倍屏
    const systemInfo = Taro.getSystemInfoSync();
    console.log("systemInfo", systemInfo);
    windowWidth = systemInfo.windowWidth;
    windowHeight = systemInfo.windowHeight;
    const pixelRatio = systemInfo.pixelRatio;
    ratio = windowWidth / 750;
    console.log("ratio", ratio);
    canvas.width = 530 * ratio * pixelRatio;
    canvas.height = 750 * ratio * pixelRatio;
    ctx = canvas.getContext("2d");
    ctx.scale(pixelRatio, pixelRatio);
    let canvasWidthPx = 530 * ratio;
    let canvasHeightPx = 750 * ratio;

    // 填充 canvas
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvasWidthPx, canvasHeightPx);

    // TODO: 绘制标题
    // ctx.beginPath();
    ctx.fillStyle = "#333";
    ctx.font = `${32 * ratio}px  "Source Han Serif SC", bold`;
    const str = "Taro issues";
    const text = ctx.measureText(str);
    ctx.fillText(str, 30 * ratio, 480 * ratio);
    // ctx.closePath();
    // TODO: 绘制线
    // ctx.beginPath();
    ctx.strokeStyle = "#DCDCDC";
    ctx.moveTo(30 * ratio, 528 * ratio);
    ctx.lineTo(500 * ratio, 528 * ratio);
    ctx.stroke();
    // ctx.closePath();
    
   // TODO: canvas画布转成图片并返回图片地址
   ctx.draw(false, () => {
    Taro.canvasToTempFilePath({
      canvasId: "myCanvas",
      success: function (r) {
        console.log("r", r);
        setCanvasToTempFilePath(r.tempFilePath);
        Taro.showToast({
          title: "绘制成功",
        });
      },
      fail: function (error) {
        console.log("error", error);
        Taro.showToast({
          title: "绘制失败",
        });
      },
      complete: function () {
 
      },
    });
  });
    
  }
  
  // TODO: 申请权限下载图片 保存到系统相册
  const saveShareImg = () => {
    

    // 获取用户是否开启用户授权相册
    if (!albumPermit) {
      Taro.openSetting({
        success: (result) => {
          if (result) {
            if (result.authSetting["scope.writePhotosAlbum"] === true) {
              setAlbumPermit(true);
              Taro.saveImageToPhotosAlbum({
                filePath: canvasToTempFilePath as string,
                success() {
                  Taro.showToast({
                    title: "图片保存成功，快去浏览器扫描吧",
                    icon: "none",
                    duration: 2000,
                  });
                },
                fail() {
                  Taro.showToast({
                    title: "保存失败",
                    icon: "none",
                  });
                },
              });
            }
          }
        },
        fail: () => {},
        complete: () => {},
      });
    } else {
      Taro.getSetting({
        success(res) {
          // 如果没有则获取授权
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            Taro.authorize({
              scope: "scope.writePhotosAlbum",
              success() {
                setAlbumPermit(true);
                Taro.saveImageToPhotosAlbum({
                  filePath: canvasToTempFilePath!,
                  success() {
                    Taro.showToast({
                      title: "图片保存成功，快去浏览器扫描吧",
                      icon: "none",
                      duration: 2000,
                    });
                  },
                  fail() {
                    Taro.showToast({
                      title: "保存失败",
                      icon: "none",
                    });
                  },
                });
              },
              fail() {
                // 如果用户拒绝过或没有授权，则再次打开授权窗口
                setAlbumPermit(false);
                console.log("请设置允许访问相册");
                Taro.showToast({
                  title: "请设置允许访问相册",
                  icon: "none",
                });
              },
            });
          } else {
            // 有则直接保存
            setAlbumPermit(true);
            Taro.saveImageToPhotosAlbum({
              filePath: canvasToTempFilePath!,
              success() {
                Taro.showToast({
                  title: "图片保存成功，快去浏览器扫描吧",
                  icon: "none",
                  duration: 2000,
                });
              },
              fail() {
                Taro.showToast({
                  title: "保存失败",
                  icon: "none",
                });
              },
            });
          }
        },
        fail(err) {
          console.log(err);
        },
      });
    }
  };
  return (
    <View className='canvas-image-comp'>
      <Canvas
        className='canvas-image'
        canvasId='myCanvas'
        id='myCanvas'
        type='2d'
      />
      <View className='generate-button' onClick={saveShareImg}>
        生成文创海报
      </View>
    </View>
  );
}

export default Index;
