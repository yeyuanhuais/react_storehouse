import { lazy } from "react";

export const OutRouter = [
  {
    path: "/login",
    key: "login",
    exact: true,
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
];
