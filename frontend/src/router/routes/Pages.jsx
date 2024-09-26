import { lazy } from "react";

const PagesRoutes = [

  //Workspace
  {
    path: "/pages/workspace",
    component: lazy(() => import("../../view/main/dashboard/workspace")),
    layout: "VerticalLayout",
    isProtected: true,
  },
  {
    path: "/pages/profile/social/:id",
    component: lazy(() => import("../../view/main/dashboard/Profile/SocialProfile")),
    layout: "VerticalLayout",
    isProtected: true,
  },
  {
    path: "/pages/experience",
    component: lazy(() => import("../../view/main/dashboard/experience")),
    layout: "VerticalLayout",
    isProtected: true,
    show: "user",
  },
  {
    path: "/pages/recommendations",
    component: lazy(() => import("../../view/main/dashboard/recommendations")),
    layout: "VerticalLayout",
    isProtected: true,
    show: "user",
  },
  {
    path: "/pages/graph",
    component: lazy(() => import("../../view/main/dashboard/graph")),
    layout: "VerticalLayout",
    isProtected: true,
    show: "user",
  },
  {
    path: "/pages/education",
    component: lazy(() => import("../../view/main/dashboard/education")),
    layout: "VerticalLayout",
    isProtected: true,
    show: "user",
  },
  {
    path: "/pages/addFriends",
    component: lazy(() => import("../../view/main/AddFriends/AddFriends")),
    layout: "VerticalLayout",
    isProtected: true,
  },
  // Admin routes
  {
    path: "/admin/users",
    component: lazy(() => import("../../view/main/admin/users/AdminUsers")),
    layout: "VerticalLayout",
    isProtected: false,
  },
  {
    path: "/admin/feedback",
    component: lazy(() => import("../../view/main/dashboard/Feedback/Feedback")),
    layout: "VerticalLayout",
    isProtected: true,
  },

  // PAGES
  {
    path: "/pages/authentication/login",
    component: lazy(() => import("../../view/pages/authentication/login")),
    layout: "FullLayout",
    isProtected: false,
  },
  {
    path: "/pages/authentication/recover-password",
    component: lazy(() =>
      import("../../view/pages/authentication/recover-password")
    ),
    layout: "FullLayout",
    isProtected: false,
  },
  {
    path: "/pages/authentication/verify-email",
    component: lazy(() =>
      import("../../view/pages/authentication/verify-email")
    ),
    layout: "FullLayout",
    isProtected: false,
  },
  {
    path: "/pages/authentication/register",
    component: lazy(() => import("../../view/pages/authentication/register")),
    layout: "FullLayout",
    isProtected: false,
  },
  {
    path: "/pages/authentication/reset-password",
    component: lazy(() =>
      import("../../view/pages/authentication/reset-password")
    ),
    layout: "FullLayout",
    isProtected: false,
  },
  {
    path: "/pages/profile/personel-information",
    component: lazy(() => import("../../view/pages/profile")),
    layout: "HorizontalLayout",
    isProtected: true,

  },
  {
    path: "/pages/profile/password-change",
    component: lazy(() => import("../../view/pages/profile")),
    layout: "HorizontalLayout",
    isProtected: true,
  },

];

export default PagesRoutes;