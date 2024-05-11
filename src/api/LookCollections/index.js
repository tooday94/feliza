import axios from 'axios'

const apiUrl = 'https://felizabackend.de/api/lookCollection/'

const getAllCollections = async() => {
    try {
        const res = await axios.get(apiUrl + 'getLookCollection')
        return {success: true, data: res.data}
    } catch (error) {
        return {success: false}
    }
}

const getAllCollectionByID = async(id) => {
    try {
        const res = await axios.get(apiUrl + 'getLookCollectionById/' + id)
        return {success: true, data: res.data}
    } catch (error) {
        return {success: false}
    }
}

export {getAllCollections, getAllCollectionByID}