import { CiMemoPad } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { CiCreditCard2 } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";

export const userNavList = [
    {
        icon: <CiMemoPad/>,
        nameUZ: 'Buyurtmalarim',
        nameRU: 'Мои заказы',
        link: '/my_orders'
    },
    {
        icon: <IoHomeOutline/>,
        nameUZ: 'Manzillar',
        nameRU: 'Адреса',
        link: '/my_addresses'
    },
    {
        icon: <CiStar/>,
        nameUZ: 'Status',
        nameRU: 'Статус',
        link: '/my_status'
    },
    {
        icon: <CiCreditCard2/>,
        nameUZ: 'Kuponlarim',
        nameRU: 'Мои купоны',
        link: '/coupons'
    },
    {
        icon: <CiHeart/>,
        nameUZ: 'Tanlanganlar',
        nameRU: 'Избранное',
        link: '/favorite'
    },
    
]