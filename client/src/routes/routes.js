import Admin from "../pages/Admin";
import {
    ADMIN_ROUTE,
    BASKET_ROUTE, DEVICE_CARD_ADMIN_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE
} from "../utils/constans";
import Basket from "../pages/Basket";
import Auth from "../pages/Auth";
import DevicePage from "../pages/DevicePage";
import Shop from "../pages/Shop";
import ChangeAndDeleteDevice from "../pages/ChangeAndDeleteDevice";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: DEVICE_CARD_ADMIN_ROUTE,
        Component: ChangeAndDeleteDevice
    }
]
export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    }
]