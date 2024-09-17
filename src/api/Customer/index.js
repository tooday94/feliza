import axios from 'axios'

const baseURL = 'https://felizabackend.uz/api/customers/'

const getCustomerByID = async(id) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(baseURL + 'getCustomerById/' + id, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
        });

        if(res.status == 200) {
            return {success: true, data: res.data}
        } else {
            return {success: false}
        }
    } catch (error) {
        return {success: false}
    }
}

const getCouponsCustomerByID = async(id) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://felizabackend.uz/api/couponCustomer/getCouponsByCustomerId/' + id, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
        });

        if(res.status == 200) {
            return {success: true, data: res.data}
        } else {
            return {success: false}
        }
    } catch (error) {
        return {success: false}
    }
}
export {getCustomerByID, getCouponsCustomerByID}