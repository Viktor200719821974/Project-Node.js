import Admin from "../pages/Admin";
import {
    ADMIN_ROUTE,
    BASKET_ROUTE, DEVICE_CARD_ADMIN_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE, REGISTER_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE, USER_BLOCKED_ADMIN_ROUTE
} from "../utils/constans";
import Basket from "../pages/Basket";
import Auth from "../pages/Auth";
import DevicePage from "../pages/DevicePage";
import Shop from "../pages/Shop";
import ChangeAndDeleteDevice from "../pages/ChangeAndDeleteDevice";
import DevicePageAdmin from "../pages/DevicePageAdmin";
import BlockedAndUnblockedUser from "../pages/BlockedAndUnblockedUser";
import Register from "../components/Register";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: DEVICE_CARD_ADMIN_ROUTE,
        Component: ChangeAndDeleteDevice
    },
    {
        path: DEVICE_CARD_ADMIN_ROUTE + '/:id',
        Component: DevicePageAdmin
    },
    {
        path: USER_BLOCKED_ADMIN_ROUTE,
        Component: BlockedAndUnblockedUser
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
    },
    {
        path: REGISTER_ROUTE,
        Component: Register
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
]