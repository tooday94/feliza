import axios from 'axios'

const baseURL = 'https://felizabackend.de/api/auth/'

const isRegistretedUser = async(phone) => {
    try {
        const res = await axios.post(baseURL + 'isRegistered', phone)
        
        if(res.status = 200) {
            return {success: true, data: res.data}
        } else {
            return {success: false}
        }
    } catch (error) {
        console.log('aaaaa');
        return {success: false}
    }
}

const createNewUser = async(user) => {
    try {
        const res = await axios.post(baseURL + 'register', user);
        if(res.status = 200) {
            return {data: res.data, success: true}
        } else {
            return {success: false}
        }
    } catch (error) {
        return {success: false}
    }
}

const loginUserWithPassword = async(userDetailes) => {
    try {
        const res = await axios.post(baseURL + 'loginCustomer', userDetailes);
        if(res.status == 200) {
            const token = res.data.accessToken;
            localStorage.setItem('token', token);
            console.log(res.data);
            return {success: true, data: res.data, message: res.message}
        } else {
            console.log('sdfsdfsdf');
            return {success: false, message: res.message}
            
        }
    } catch (error) {
        return {success: false, message: error.message}
    }
}

const getVerifyCodeToNewPassword = async(phoneNumber) => {
    try {
        const res = await axios.post(baseURL + 'sendVerifyCodeForForgetPassword', phoneNumber);
        if(res.status = 200) {
            return {data: res.data, success: true}
        } else {
            return {success: false}
        }
    } catch (error) {
        return {success: false}
    }
}

const restorePassword = async(body) => {
    try {
        const res = await axios.post(baseURL + 'forgetPassword', body);
        if(res.status = 200) {
            return {data: res.data, success: true}
        } else {
            return {success: false}
        }
    } catch (error) {
        return {success: false}
    }
}



export {isRegistretedUser, createNewUser, loginUserWithPassword, getVerifyCodeToNewPassword, restorePassword}