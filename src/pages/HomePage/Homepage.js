import React from 'react'
import {Box, Container, Grid} from '@mui/material'
import HomePageHeader from '../../components/Header/Header'
import Slider from '../../components/Sliders/Slider'
import SliderMain from '../../components/Sliders/Slider'
import CategoryCard from '../../components/HomePage/CategoryCard'
import SaleBox from '../../components/HomePage/SaleBox'
import { CategoryCardList, categorySliderList, categorySliderList2, categorySliderList3, nessaCategoryList } from '../../data/DataList'
import SmallCards from '../../components/Global/Cards/SmallCards'
import BestSellerBox from '../../components/HomePage/BestSellerBox'
import MainCategoryContainer from '../../components/HomePage/MainCategoryContainer'
import CategorySlidersContainer from '../../components/HomePage/CategorySlidersContainer'
import CategoryIconsBox from '../../components/HomePage/CategoryIconsBox'
import { useEffect } from 'react'



function Homepage() {
    const list = CategoryCardList;
    const clothesCategoryList = categorySliderList;

    useEffect(() => {
      window.scrollTo({  
        top: 0,
        behavior: "smooth"
      });
    }, [])
    
  return (
      <Box>
        <Grid container justifyContent='center'>
            <Grid item xs={12}  sx={{marginTop: {xs: '6vh', sm: '60px', lg: '60px'}}}>
              <SliderMain/>
              <CategoryIconsBox/>
              <MainCategoryContainer list={clothesCategoryList} />
              <CategorySlidersContainer categoryId={52}/>
              <CategorySlidersContainer categoryId={43}/>
              <Box sx={{display: {sm: 'block', md: 'none'}}}>
                <MainCategoryContainer list={categorySliderList2} />
                <CategorySlidersContainer categoryId={28}/>
                <CategorySlidersContainer categoryId={22}/>
              </Box>
              
              <MainCategoryContainer list={nessaCategoryList} />
              <CategorySlidersContainer categoryId={62}/>
              <CategorySlidersContainer categoryId={60}/>
              
              
              <MainCategoryContainer list={categorySliderList3} />
              <CategorySlidersContainer categoryId={65}/>
              <CategorySlidersContainer categoryId={13}/>
              <Grid container spacing={1}>
              {/* {
                list.map((item, idx) => {
                    return(
                        <Grid item xs = {12} md = {6} lg = {4} key={idx + item.title}>
                          <CategoryCard  item={item}/>
                        </Grid>
                    )
                })
              } */}
              </Grid>
            </Grid>
        </Grid>
    </Box>
    )
}

export default Homepage