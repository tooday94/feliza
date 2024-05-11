import axios from 'axios'

const baseURL = 'https://felizabackend.de/api/'


const getAllRegions = async() => {
    try {
      const res = await axios.get(baseURL + 'region/getAllRegions')
      if(res.status == 200) {
        return {success: true, data: res.data}
      } else {
        return {success: false}
      }
    } catch (error) {
      console.log(error.message);
    }
}

const getAllSubRegionsByRegion = async(id) => {
    try {
      const res = await axios.get(baseURL + 'subRegion/getSubRegionsByRegionId/' + id)
      if(res.status == 200) {
        return {success: true, data: res.data}
      } else {
        return {success: false}
      }
    } catch (error) {
      console.log(error.message);
    }
}

const getAllPostFilialBySubRegion = async(id) => {
    try {
      const res = await axios.get(baseURL + 'postFilial/getPostFilialBySubRegionId/' + id)
      if(Object.keys(res.data).length > 0) {
        return {success: true, data: res.data}
      } else {
        return {success: false}
      }
    } catch (error) {
      console.log(error.message);
    }
}

export {getAllRegions, getAllSubRegionsByRegion, getAllPostFilialBySubRegion}