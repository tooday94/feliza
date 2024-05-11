import axios from 'axios'

const apiUrl = 'https://felizabackend.de/api/karusel/'

const getAllKaruselSlides = async() => {
    try {
        const res = await axios.get(apiUrl + 'getAllKarusels')
        if(res.status == 200) {
          return {success: true, data: res.data}
        } else {
          return {success: false}
        }
    } catch (error) {
        return {success: false}
    }
  }

  export {getAllKaruselSlides}