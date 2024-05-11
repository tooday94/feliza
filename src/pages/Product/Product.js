import { Box, Drawer, Typography} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MyContext from '../../components/Context/MyContext';
import { getProductByID, getProductsByRefNumber } from '../../api/Product';
import LastSeenSLider from '../../components/Global/SliderContainer/LastSeenSLider';
import DesktopProductContainer from '../../components/ProductPage/DesktopProductContainer';
import MobileContainer from '../../components/ProductPage/MobileContainer';
import ProductDrawer from '../../components/ProductPage/ProductDrawer';

function Product() {


    const {id} = useParams();
    const [item, setItem] = useState('')
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const {addToBasket, addToLastSeenList, likedList, changeLikedList, 
          user, setIsLoginPageOpen, isUzbek} = useContext(MyContext);
    const [products, setProducts] = useState([])
    const [isLiked, setIsLiked] = useState(false);
    const [isSale, setIsSale] = useState(false)
    

    
    useEffect(() => {
      const index = getIndexById(id)
      if( index >= 0){
        setIsLiked(true)
      } else {
        setIsLiked(false)
      }
    }, [likedList, id])

    const getIndexById = (targetId) => {
      return likedList.findIndex(obj => obj?.product?.id == targetId);
    };

    

    useEffect(() => {
      const fetchData = async()=> {
        const res = await getProductByID(id);
        if(res.success) {
          setItem(res.data)
          if(res.data.sale > 0) {
            setIsSale(true)
          }
          addToLastSeenList(res.data)
          window.scrollTo({  
            top: 0,
            behavior: "smooth" // Optional: adds smooth scrolling effect
        });
        }
      }
      fetchData();
    }, [id])

    useEffect(() => {
      const fetchData = async() => {
          const res = await getProductsByRefNumber(item?.referenceNumber);
          if(res.success) {
              setProducts(res.data)
          }
      }
      if(item?.referenceNumber) {
        fetchData();
      }
  }, [item])


    function addProductToBasket(sizeId) {
      addToBasket(sizeId)
      setIsDrawerOpen(false)
    }

    
    const handelLikeList = () => {
      if(!user) {
        setIsLoginPageOpen(true)
      } else {
        changeLikedList(id)
        setIsLiked(!isLiked)
      }
    }

    const handelClick = () => {
      if(!user) {
        setIsLoginPageOpen(true)
      } else {
        setIsDrawerOpen(true)
      }
    }

    
  return (
    <Box sx={{paddingTop: '7vh'}} id='page-head'>

      {/*  Mobil qurulmalar uchun moslashgan Slider, katta ekranlarda körinmaydi */}
        <Box sx={{display: {xs: 'block', md: 'none'}}}>
          <MobileContainer handelLikeList={handelLikeList} item={item} isLiked={isLiked} 
            isSale = {isSale} products = {products} id = {id} handelClick = {handelClick}/>
        </Box>

        <Box sx={{display: {xs: 'none', md: 'block'}}}>
          <DesktopProductContainer item={item} products={products} id={id} handelClick={handelClick}/>
        </Box>

        <LastSeenSLider/>
        
        <ProductDrawer item={item} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} addProductToBasket={addProductToBasket}/>
    </Box>
  )
}

export default Product