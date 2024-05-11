import axios from 'axios'

const baseURL = 'https://felizabackend.de/api/product'


const getAllProduct = async() => {
    try {
        const res = await axios.get(baseURL + '/getAllProducts')
        if(res.status == 200) {
            return {success: true, data: res.data}
        } else {
            return {success: false}
        }
    } catch (error) {
        return {success: false}
    }
}

const getProductListByCategoryID = async(id, page) => {
    try {
        const res = await axios.get(baseURL + '/getProductByCategoryId/' + id, {
            params: {
                page: page,
                size: 5
            }
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

const getProductByID = async(id) => {
    try {
        const res = await axios.get(baseURL + '/getProductById/' + id);
        if(res.status == 200) {
            return {success: true, data: res.data}
            
        } else {
            return {success: false}
        }
    } catch (error) {
        return {success: false}
    }
}

const getProductsByRefNumber = async(refNumber) => {
    try {
        const res = await axios.get(baseURL + '/getProductsByReferenceNumber/' + refNumber);
        if(res.status == 200) {
            return {success: true, data: res.data}
            
        } else {
            return {success: false}
        }
    } catch (error) {
        return {success: false}
    }
}


const getFilteredProducts = async (filterRequest, page) => {
    const queryParams = new URLSearchParams({
        page: 1,
        size: 7,
        colorIds: filterRequest?.colorIds.join(','),
        brandIds: filterRequest?.brandIds.join(','),
        sizeIds: filterRequest?.sizes.join(','), 
        categoryId: filterRequest?.categoryId,
        maxPrice: filterRequest?.maxPrice,
        minPrice: filterRequest?.minPrice,
        categorySale: filterRequest?.categorySale,
        sortType: filterRequest?.sortType,
        sortBy: 'sellPrice'
      });
    try {
        const res = await axios.get(`https://felizabackend.de/api/product/filterAndSortProducts?${queryParams}`);
        
        if (res.status === 200) {
            return { success: true, data: res.data, message: 'Success'};
        } else {
            return { success: false, message: 'resError' };
        }
    } catch (error) {
        return { success: false, message: 'catchError' };
    }
};

const getSaleProductListByCategoryID = async(id) => {
    try {
        const res = await axios.get(baseURL + '/getSaleProductsByCategoryId/' + id);
        console.log(res.data);
        if(res.status == 200) {
            
            return {success: true, data: res.data}
        } else {
            return {success: false}
        }
    } catch (error) {
        return {success: false}
    }
}


 
export {getAllProduct, getProductListByCategoryID, getProductByID, 
    getProductsByRefNumber, getFilteredProducts, getSaleProductListByCategoryID}