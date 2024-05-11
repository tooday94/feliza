import axios from 'axios'

const baseURL = 'https://felizabackend.de/api/address/'


const addAddress = async(adress) => {

    try {
        console.log(adress);
        const token = localStorage.getItem('token');
        console.log(token);
        const res = await axios.post(baseURL + 'addAddress', adress, {
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

const getAdressByCustomer = async (id) => {
    try {
        const token = localStorage.getItem('token');
        console.log(token);
        const res = await axios.get(baseURL + 'getAddressesByCustomerId/' + id, {
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

export {addAddress, getAdressByCustomer}