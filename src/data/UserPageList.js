import { CiMemoPad } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { CiCreditCard2 } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";

export const userNavList = [
    {
        icon: <CiMemoPad/>,
        nameUZ: 'Buyurtmalarim',
        nameRU: 'Moi zakazi',
        link: '/my_orders'
    },
    {
        icon: <CiSettings/>,
        nameUZ: 'Sozlamalar',
        nameRU: 'Moi zakazi',
        link: '/my_orders'
    },
    {
        icon: <CiStar/>,
        nameUZ: 'Status',
        nameRU: 'Moi zakazi',
        link: '/my_orders'
    },
    {
        icon: <CiCreditCard2/>,
        nameUZ: 'Kuponlarim',
        nameRU: 'Moi zakazi',
        link: '/my_orders'
    },
    {
        icon: <CiHeart/>,
        nameUZ: 'Tanlanganlar',
        nameRU: 'Moi zakazi',
        link: '/favorite'
    },
    
]