import { CiMemoPad } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { CiCreditCard2 } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";

export const userNavList = [
    {
        icon: <CiMemoPad/>,
        nameUZ: 'Buyurtmalarim',
        nameRU: 'Moi zakazi',
        link: '/my_orders'
    },
    {
        icon: <IoHomeOutline/>,
        nameUZ: 'Manzillar',
        nameRU: 'Мои адреса',
        link: '/my_addresses'
    },
    {
        icon: <CiStar/>,
        nameUZ: 'Status',
        nameRU: 'Moi zakazi',
        link: '/my_status'
    },
    {
        icon: <CiCreditCard2/>,
        nameUZ: 'Kuponlarim',
        nameRU: 'Moi zakazi',
        link: '/coupons'
    },
    {
        icon: <CiHeart/>,
        nameUZ: 'Tanlanganlar',
        nameRU: 'Moi zakazi',
        link: '/favorite'
    },
    
]