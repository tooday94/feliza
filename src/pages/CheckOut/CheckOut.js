import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, Divider } from "@mui/material";
import MediumIcon from "../../components/Global/Icons/MediumIcon";
import homeIcon from "../../assets/icons/home.png";
import contactIcon from "../../assets/icons/contact.png";
import AdresseForm from "../../components/CheckOut/AdresseForm";
import ContactForm from "../../components/CheckOut/ContactForm";
import PaymentMethod from "../../components/CheckOut/PaymentMethod";
import { getAdressByCustomer } from "../../api/Adress";
import { useContext } from "react";
import MyContext from "../../components/Context/MyContext";
import AddressList from "../../components/CheckOut/AddressList";
import SelectedAddress from "../../components/CheckOut/SelectedAddress";
import { addOrder } from "../../api/Order";
import CouponContainer from "../../components/CheckOut/CouponContainer";
import { getCouponsCustomerByID } from "../../api/Customer";
import PriceContainer from "../../components/CheckOut/PriceContainer";

function CheckOut() {
  const [adresseList, setAdresseList] = useState([]);
  const [hasAdress, setHasAdress] = useState(false);
  const [payment, setPayment] = useState("PAYME");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { user, orderItems, isUzbek, cardItems } = useContext(MyContext);
  const [addressId, setAddressId] = useState(0);
  const [newAddress, setNewAddress] = useState(0);
  const [errorList, setErrorList] = useState([]);
  const [couponList, setCouponList] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [priceWithoutCoupon, setPriceWithoutCoupon] = useState("");
  const [price, setPrice] = useState(0);

  console.log(cardItems);

  useEffect(() => {
    const fetchData = async () => {
      console.log(user);
      const res = await getAdressByCustomer(user.customerId);
      if (res?.success) {
        console.log(res.data);
        setAdresseList(res.data);
      }
    };
    fetchData();
  }, [newAddress]);

  useEffect(() => {
    const totalQuantity = cardItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const tempPrice = cardItems.reduce(
      (sum, item) => sum + item.quantity * item.sellPrice,
      0
    );

    const couponPrice = coupon ? coupon.coupon.credit : 0;
    setQuantity(totalQuantity);
    setPriceWithoutCoupon(tempPrice);
    if (priceWithoutCoupon - couponPrice > 10000) {
      setPrice(tempPrice - couponPrice);
    } else {
      setPrice(tempPrice);
    }
  }, [cardItems, coupon]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCouponsCustomerByID(user.customerId);
      if (res?.success) {
        console.log(res.data);
        setCouponList(res.data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (adresseList.length >= 1) {
      setHasAdress(true);
    }
  }, [adresseList]);

  const handleCoupon = (coupon) => {
    const couponPrice = coupon ? coupon.coupon.credit : 0;
    if (priceWithoutCoupon - couponPrice >= 10000) {
      setCoupon(coupon);
    } else {
      const InfoUZB = `Bu kupondan foydalanish uchun harid miqdori ${
        priceWithoutCoupon + 10000
      } so'm dan kam bo'lmasligi kerak`;
      const InfoRUS = `Чтобы использовать этот купон, сумма покупки должна составлять не менее ${
        priceWithoutCoupon + 10000
      } сум`;
      alert(isUzbek ? InfoUZB : InfoRUS);
    }
  };

  const createOrder = () => {
    setErrorList([]);
    const order = {
      receiverName: fullName,
      receiverPhoneNumber: phoneNumber,
      orderTime: "2024-03-07",
      paymentMethod: "PAYME",
      orderCost: price !== "" ? price : 10000,
      shippingCost: 0,
      deliveryDays: 3,
      deliveryDate: "2024-03-07",
      addressId: addressId,
      couponCustomerId: coupon ? coupon.id : null,
      customerId: user.customerId,
      cartItemIds: orderItems,
    };

    const fetchData = async () => {
      const res = await addOrder(order);

      if (res.success) {
        window.location.href = res.data.object;
      }
    };
    if (fullName.trim() === "") {
      errorList.push(
        isUzbek
          ? "Iltimos ismingiz va familiyangizni kiriting"
          : "Пожалуйста, введите ваше имя и фамилию"
      );
    }

    if (addressId === 0) {
      errorList.push(
        isUzbek
          ? "Iltimos manzilingizni kiriting"
          : "Пожалуйста, введите ваш адрес"
      );
    }

    if (phoneNumber.trim() === "") {
      errorList.push(
        isUzbek
          ? "Iltimos telefon raqamingizni kiriting"
          : "Пожалуйста, введите ваш номер телефона"
      );
    }

    if (errorList.length == 0) {
      fetchData();
    } else {
      alert(errorList[0]);
    }
  };

  return (
    <Box sx={{ marginY: "14vh" }}>
      <Grid container display={"flex"} justifyContent={"center"}>
        <Grid item xs={11} md={7} lg={5} xl={3}>
          <Box sx={{ width: "100%" }}>
            <Box display={"flex"} alignItems={"center"}>
              <MediumIcon icon={homeIcon} />
              <Typography sx={{ marginLeft: 1 }}>
                {isUzbek ? "Manzilingiz" : "Ваш адрес"}
              </Typography>
            </Box>
            {!hasAdress ? (
              <AdresseForm
                adresseList={adresseList}
                setHasAdress={setHasAdress}
                setAddressId={setAddressId}
                setNewAddress={setNewAddress}
              />
            ) : addressId == "" ? (
              <AddressList
                adresseList={adresseList}
                setHasAdress={setHasAdress}
                setAddressId={setAddressId}
              />
            ) : (
              <SelectedAddress
                addressId={addressId}
                adresseList={adresseList}
                setAddressId={setAddressId}
              />
            )}

            <Box display={"flex"} alignItems={"center"} sx={{ marginTop: 2 }}>
              <MediumIcon icon={contactIcon} />
              <Typography sx={{ marginLeft: 1 }}>
                {isUzbek ? "Kontakt ma'lumotlari" : "Контактные данные"}
              </Typography>
            </Box>

            <ContactForm
              setFullName={setFullName}
              setPhoneNumber={setPhoneNumber}
              fullName={fullName}
              phoneNumber={phoneNumber}
            />

            <CouponContainer
              list={couponList}
              coupon={coupon}
              setCoupon={handleCoupon}
            />

            <PaymentMethod setPayment={setPayment} payment={payment} />

            <PriceContainer
              quantity={quantity}
              priceWithoutCoupon={priceWithoutCoupon}
              coupon={coupon}
              price={price}
            />

            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                size="small"
                variant="contained"
                sx={{ marginTop: 2, marginBottom: 1 }}
                onClick={createOrder}
              >
                {isUzbek ? "To'lovni amalga oshirish" : "Осуществить платеж"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CheckOut;
