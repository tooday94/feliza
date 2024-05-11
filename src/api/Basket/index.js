import axios from 'axios'

const baseURL = 'https://felizabackend.de/api/cartItem'


const addProductToBasket = async(cartItem) => {

    try {
        const token = localStorage.getItem('token');
        console.log(token);
        const res = await axios.post(baseURL + '/addCartItem', cartItem, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
        });
        if(res.status == 200) {
            return {success: true, data: res.data}
        }else {
            return {success: false}
        }
    } catch (error) {
        return {success: false}
    }
}

const getCartItemsByCustomerId = async(id) => {
    try {
        const token = localStorage.getItem('token');
        console.log(token);
        const res = await axios.get(baseURL + '/byCustomerId/' + id, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
        });
        if(res.status == 200) {
            return {success: true, data: res.data}
        }else {
            return {success: false}
        }
    } catch (error) {
        return {success: false}
    }
}

const deleteCartItem = async(id) => {
    try {
        const token = localStorage.getItem('token');
        console.log(token);
        const res = await axios.delete(baseURL + '/' + id, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
        });
        if(res.status == 200) {
            return {success: true, data: res.data}
        }else {
            return {success: false}
        }
    } catch (error) {
        return {success: false}
    }
}



export {addProductToBasket, getCartItemsByCustomerId, deleteCartItem}