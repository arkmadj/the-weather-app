const routes = [
  {
    path: "/",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/pages/home-page/HomePage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: "/:catchAll(.*)*",
  //   component: () => import("pages/ErrorNotFound.vue"),
  // },
];

export default routes;
