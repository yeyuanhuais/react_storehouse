import { lazy } from "react";

export const OutRouter = [
  {
    path: "/login",
    key: "login",
    component: lazy(() => import("pages/login/login")),
  },
];

export const InRouter = [
  {
    path: "/home",
    key: "home",
    component: lazy(() => import("pages/home")),
  },
  {
    path: "/list",
    key: "list",
    component: lazy(() => import("pages/list")),
  },
  {
    path: "/editor",
    key: "editor",
    component: lazy(() => import("pages/editor")),
  },
  {
    path: "/video",
    key: "edivideotor",
    component: lazy(() => import("pages/video")),
  },
];
