import axios from 'axios'

const baseURL = 'https://felizabackend.de/api/likedItem/'

const addLikedItem = async(jsonBody) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.post(baseURL + 'addLikedItem', jsonBody, {
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

const getLikedItems = async(id) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(baseURL + 'getByCustomerId/' + id, {
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

const deleteLikedItem = async(id) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.delete(baseURL+ 'deleteLikedItem/' + id, {
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



export {addLikedItem, getLikedItems, deleteLikedItem}