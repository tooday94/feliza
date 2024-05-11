import axios from 'axios'

const apiUrl = 'https://felizabackend.de/api/'


const getAllBrands = async() => {
    try {
        const res = await axios.get(apiUrl + 'brand/getAllBrands');
        if(res.status == 200) {
            return {success: true, data: res.data}
        }
    } catch (error) {
        console.log(error.message);
    }
}

export {getAllBrands}