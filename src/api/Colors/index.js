import axios from 'axios'

const apiUrl = 'https://felizabackend.de/api/'

const getAllColors = async() => {
    try {
        const res = await axios.get(apiUrl + 'color/getAllColors');
        if(res.status == 200) {
            return {success: true, data: res.data}
        }
    } catch (error) {
        console.log(error.message);
    }
}

export {getAllColors}