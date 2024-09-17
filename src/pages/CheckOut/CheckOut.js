import React, {useState, useEffect} from 'react'
import {Box, Typography, Grid, Button} from '@mui/material'
import MediumIcon from '../../components/Global/Icons/MediumIcon'
import homeIcon from  '../../assets/icons/home.png'
import contactIcon from  '../../assets/icons/contact.png'
import AdresseForm from '../../components/CheckOut/AdresseForm';
import ContactForm from '../../components/CheckOut/ContactForm'
import PaymentMethod from '../../components/CheckOut/PaymentMethod'
import { getAdressByCustomer } from '../../api/Adress'
import { useContext } from 'react'
import MyContext from '../../components/Context/MyContext'
import AddressList from '../../components/CheckOut/AddressList'
import SelectedAddress from '../../components/CheckOut/SelectedAddress'
import { addOrder } from '../../api/Order'
import CouponContainer from '../../components/CheckOut/CouponContainer'
import { getCouponsCustomerByID } from '../../api/Customer'



function CheckOut() {

  const [adresseList, setAdresseList] = useState([]);
  const [hasAdress, setHasAdress] = useState(false);
  const [payment, setPayment] = useState('PAYME');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const {user, orderItems, isUzbek} = useContext(MyContext)
  const [addressId, setAddressId] = useState(0)
  const [newAddress, setNewAddress] = useState(0)
  const [errorList, setErrorList] = useState([])
  const [couponList, setCouponList] = useState([])
  const [couponId, setCouponId] = useState(null)



  
  
  useEffect(() => {
    const fetchData = async () => {
      console.log(user);
      const res = await getAdressByCustomer(user.customerId)
      if(res?.success) {
        console.log(res.data);
        setAdresseList(res.data);
      }
    }
    fetchData();
  }, [newAddress])


  useEffect(() => {
    const fetchData = async() => {
        const res = await getCouponsCustomerByID(user.customerId)
        if(res?.success) {
            console.log(res.data);
            setCouponList(res.data)
        }
    }

    fetchData();
  }, [])

  useEffect(() => {
    if(adresseList.length >= 1) {
      setHasAdress(true)
    }
  }, [adresseList])

  
  const createOrder = () => {
    setErrorList([]);
    const order = {
      receiverName : fullName,
      receiverPhoneNumber : phoneNumber,
      orderTime : "2024-03-07",
      paymentMethod : 'PAYME',
      orderCost : 2000,
      shippingCost : 0,
      deliveryDays : 3,
      deliveryDate : "2024-03-07",
      addressId : addressId,
      couponCustomerId : null,
      customerId : user.customerId,
      cartItemIds : orderItems
    }


    const fetchData = async () => {
      
      const res = await addOrder(order)

      if(res.success) {
      console.log('Buyurtma berildi');
     // window.open(res.data.object, "_blank");
     window.location.href = res.data.object;
      }
    }
    if(fullName.trim() == '') {
      errorList.push('Iltimos ismin va familiyangizni kriting')
    }

    if(addressId == 0) {
      errorList.push("Iltimos manzilingizni kriting")
    }

    if(phoneNumber.trim() == '') {
      errorList.push('Iltimos telefon raqamingizni kriting')
    }

    if(errorList.length == 0) {
      fetchData();
    } else {
      alert(errorList[0]);
    }
  }


  return (
    <Box sx={{marginY: '14vh'}}>
        <Grid container display={'flex'} justifyContent={'center'}>
          <Grid item xs= {11} md= {7} lg = {5} xl = {3}>
            <Box sx={{ width: '100%'}}>

              <Box display={'flex'} alignItems={'center'}>
                <MediumIcon icon = {homeIcon}/>
                <Typography sx={{marginLeft: 1}}>
                  {
                    isUzbek? "Manzilingiz" : "Ваш адрес"
                  }
                </Typography>
              </Box>
              {
                !hasAdress ? <AdresseForm adresseList = {adresseList} setHasAdress = {setHasAdress} 
                setAddressId={setAddressId} setNewAddress={setNewAddress}/> : addressId == '' ? <AddressList 
                adresseList = {adresseList} setHasAdress = {setHasAdress} 
                setAddressId = {setAddressId}/> : <SelectedAddress addressId = {addressId} adresseList = {adresseList} 
                setAddressId = {setAddressId}/>
              } 

              <Box display={'flex'} alignItems={'center'} sx={{marginTop: 2}}>
                <MediumIcon icon = {contactIcon}/>
                <Typography sx={{marginLeft: 1}}>
                  {
                    isUzbek? "Kontakt ma'lumotlari" : "Контактные данные"
                  }
                </Typography>
              </Box>


              <ContactForm setFullName = {setFullName} setPhoneNumber={setPhoneNumber} fullName = {fullName} phoneNumber = {phoneNumber}/>

              <CouponContainer list={couponList}/>

              <PaymentMethod setPayment = {setPayment} payment={payment}/>

              <Box sx={{display: 'flex', justifyContent: 'end'}}>
                <Button  size='small'  variant='contained'   sx={{marginTop: 2, marginBottom: 1}} onClick={createOrder}>
                  {
                    isUzbek? "To'lovni amalga oshirish" : "Осуществить платеж"
                  }
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
    </Box>
  )
}

export default CheckOut