import axios from 'axios'

const baseURL = 'https://felizabackend.de/api/categories'

const getParentCategory = async() => {
    try {
        const res = await axios.get(baseURL +  '/getParentCategories')
        if(res.status == 200) {
            return {success: true, data: res.data}
        } else {
            return {success: false, message: 'Xatolik'}
        }
    } catch (error) {
        return {success: false, message: error.message}
    }
}

const getSubCategoriesByParent = async(parent) => {

    try {
      const res = await axios.get('https://felizabackend.de/api/categories/getSubCategoriesByParent/' + parent)
      if(res.status == 200) {
        return {success: true, data: res.data}
      } else {
        return {success: false}
      }
    } catch (error) {
      return {success: false}
    }
}

const getCategoryById = async (id) => {
  try {
    const res = await axios.get(baseURL +  '/getCategoryById/' + id)
    if(res.status == 200) {
        return {success: true, data: res.data}
    } else {
        return {success: false, message: 'Xatolik'}
    }
} catch (error) {
    return {success: false, message: error.message}
}
}

export {getParentCategory, getSubCategoriesByParent, getCategoryById}