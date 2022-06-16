import React, { lazy } from "react";
import MyIcon from "components/my_icon";
export const OutRouter = [
  {
    path: "/login",
    key: "login",
    component: lazy(() => import("pages/login/login")),
  },
];

export const InRouter = [
  {
    label: "首页",
    path: "/home",
    key: "100000",
    icon: <MyIcon type="icon-home" />,
    component: lazy(() => import("pages/home")),
  },
  {
    label: "编辑器",
    key: "200000",
    icon: <MyIcon type="icon-fuwenbenbianjiqi" />,
    children: [
      {
        label: "slate编辑器",
        path: "/editor/slate",
        key: "200001",
        component: lazy(() => import("pages/editor/slate")),
      },
    ],
  },
  {
    label: "视频播放器",
    key: "300000",
    icon: <MyIcon type="icon-video" />,
    children: [
      {
        label: "Ffmpeg视频解码",
        path: "/video/ffmpeg",
        key: "300001",
        component: lazy(() => import("pages/video/ffmpeg")),
      },
    ],
  },
];
