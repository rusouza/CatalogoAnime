import React from "react";
import Home from "../paginas/Home.js";
import Descricao from "../paginas/Descricao.js";
import SideBar from "../paginas/SideBar.js";
import { DrawerNavigator } from "react-navigation";

const HomeScreenRouter = DrawerNavigator(
    {
        Home: { screen: Home },
        Descricao: { screen: Descricao }
    },
    {
        contentComponent: props => <SideBar {...props} />
    }
);

export default HomeScreenRouter;