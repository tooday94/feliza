import axios from 'axios'

const baseURL = 'https://felizabackend.uz/api/order/'


const addOrder = async(order) => {

    try {
        
        const token = localStorage.getItem('token');
        
        const res = await axios.post(baseURL + 'addOrder', order, {
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

const getOrdersByCustomerId = async(id) => {
    try {
        const token = localStorage.getItem('token');
        
        const res = await axios.get(baseURL + 'getAllByCustomerId/' + id, {
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

const getOrdersById = async(id) => {
    try {
        const token = localStorage.getItem('token');
        
        const res = await axios.get(baseURL + 'getOrderById/' + id, {
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

export {addOrder, getOrdersByCustomerId, getOrdersById}