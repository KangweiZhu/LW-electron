/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

/** 
  All of the routes for the Vision UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Vision UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Vision UI Dashboard React icons
import { IoRocketSharp } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { IoBuild } from "react-icons/io5";
import { BsCreditCardFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { IoHome } from "react-icons/io5";

const routes = [
  {
    type: "collapse",
    name: "信息概览",
    key: "dashboard",
    route: "/dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    component: Dashboard,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "玩家信息",
    key: "profile",
    route: "/profile",
    icon: <BsFillPersonFill size="15px" color="inherit" />,
    component: Profile,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "英雄排行",
    key: "champion_tier",
    route: "/champion_tier",
    icon: <IoStatsChart size="15px" color="inherit" />,
    /*component: Tables,*/
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "英雄数据",
    key: "champion_stats",
    route: "/champion_stats",
    icon: <BsCreditCardFill size="15px" color="inherit" />,
    /*component: Billing,*/
    noCollapse: true,
  },
/*  { type: "title", title: "Account Pages", key: "account-pages" },*/
  {
    type: "collapse",
    name: "登录",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <IoIosDocument size="15px" color="inherit" />,
    component: SignIn,
    noCollapse: true,
  },
  /*{
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <IoRocketSharp size="15px" color="inherit" />,
    component: SignUp,
    noCollapse: true,
  },*/
  { type: "title", title: "客户端工具（需下载客户端）", key: "client-tools" },
  {
    type: "collapse",
    name: "段位图标修改",
    key: "league-rank",
    route: "/league-rank",
    icon: <BsCreditCardFill size="15px" color="inherit" />,
    /*component: Billing,*/
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "生涯背景修改",
    key: "league-profile",
    route: "/league-profile",
    icon: <BsCreditCardFill size="15px" color="inherit" />,
    /*component: Billing,*/
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "秒选英雄",
    key: "league-autopick",
    route: "/league-autopick",
    icon: <BsCreditCardFill size="15px" color="inherit" />,
    /*component: Billing,*/
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "自动选位/自动接受",
    key: "league-autoaccept",
    route: "/league-autoaccept",
    icon: <BsCreditCardFill size="15px" color="inherit" />,
    /*component: Billing,*/
    noCollapse: true,
  },
];

export default routes;
