import "./App.css";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Homepage from "./pages/HomePage/Homepage";
import HomePageHeader from "./components/Header/Header";
import Products from "./pages/Products/Products";
import { useEffect, useState } from "react";
import Menu from "./pages/Menu/Menu";
import Product from "./pages/Product/Product";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import BasketPage from "./pages/BasketPage/BasketPage";
import MyContext from "./components/Context/MyContext";
import { addProductToBasket, getCartItemsByCustomerId } from "./api/Basket";
import UserPage from "./pages/UserPage/UserPage";
import { addLikedItem, deleteLikedItem, getLikedItems } from "./api/LikedList";
import CheckOut from "./pages/CheckOut/CheckOut";
import MainFooter from "./components/Footer/MainFooter";
import Looks from "./pages/Looks/Looks";
import LookPage from "./pages/LookPage/LookPage";
import SaleProducts from "./pages/SaleProducts/SaleProducts";
import MyOrders from "./pages/MyOrders/MyOrders";
import Order from "./pages/Order/Order";

function App() {
  const initialLastSeenList = [];
  const [isLoginPageOpen, setIsLoginPageOpen] = useState(false);
  const [isUserActive, setIsUserActive] = useState(false);
  const [likedList, setLikedList] = useState([]);
  const [isUzbek, setIsUzbek] = useState(true);
  const [orderItems, setOrderItems] = useState([]);
  const [lastAction, setLastAction] = useState("");
  const [cardItems, setCardItems] = useState([]);
  const [refreshCard, setRefreshCard] = useState(0);

  const [user, setUser] = useState(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);

      if (userData.expirationTime > new Date().getTime()) {
        return userData.user;
      } else {
        localStorage.removeItem("userData");
        return null;
      }
    } else {
      return null;
    }
  });

  useEffect(() => {
    refreshLikedList();
  }, [user]);

  const [lastSeenList, setLastSeenList] = useState(() => {
    const storedLastSeenList = localStorage.getItem("lastSeenProducts");
    return storedLastSeenList
      ? JSON.parse(storedLastSeenList)
      : initialLastSeenList;
  });

  const refreshLikedList = async () => {
    if (user) {
      const res = await getLikedItems(user.customerId);
      if (res.success) {
        //const newList = res.data.map(item => item.product)
        console.log(res.data);
        setLikedList(res.data);
      }
    } else {
      setLikedList([]);
    }
  };

  useEffect(() => {
    localStorage.setItem("lastSeenProducts", JSON.stringify(lastSeenList));
  }, [lastSeenList]);

  function addToLastSeenList(value) {
    const list = [...lastSeenList];

    if (list.some((item) => item.id === value.id)) {
      list.filter((item) => item.id !== value.id);
      list.unshift(value);
    } else if (list.length >= 10) {
      list.pop();
      list.unshift(value);
    } else {
      list.unshift(value)
    }

    setLastSeenList(list);
  }

  const changeLikedList = (id) => {
    if (checkIfIdExists(id)) {
      console.log("Öchirish");
      const likedItem = getObjectById(id);
      deleteLikedItemFromList(likedItem.id);
    } else {
      addLikedItemToList(id);
    }
  };

  const checkIfIdExists = (targetId) => {
    return likedList.some((obj) => obj?.product?.id == targetId);
  };

  const getObjectById = (targetId) => {
    return likedList.find((obj) => obj?.product?.id == targetId);
  };

  const deleteLikedItemFromList = async (id) => {
    const res = await deleteLikedItem(id);
    if (res.success) {
      refreshLikedList();
    }
  };

  const addLikedItemToList = async (id) => {
    const jsonBody = {
      customerId: user.customerId,
      productId: id,
    };

    const res = await addLikedItem(jsonBody);
    if (res.success) {
      setLikedList([...likedList, jsonBody]);
      refreshLikedList();
    }
  };

  const addToBasket = async (productSizeVariantId) => {
    const cartItem = {
      customerId: user.customerId,
      productSizeVariantId: productSizeVariantId,
      quantity: 1,
    };

    const res = await addProductToBasket(cartItem);
    if (!res?.success) {
      alert("Xatolik");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCartItemsByCustomerId(user.customerId);
      if (res.success) {
        setCardItems(res.data);
      }
    };
    if (user) {
      fetchData();
    }
  }, [refreshCard]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(234, 87, 116)",
      },
      secondary: {
        main: "#edf2ff",
      },
    },
    shape: {
      borderRadius: 5,
    },
  });

  return (
    <MyContext.Provider
      value={{
        likedList,
        changeLikedList,
        addToBasket,
        lastSeenList,
        addToLastSeenList,
        isUserActive,
        setIsUserActive,
        user,
        setUser,
        isLoginPageOpen,
        setIsLoginPageOpen,
        isUzbek,
        setIsUzbek,
        orderItems,
        setOrderItems,
        lastAction,
        setLastAction,
        refreshCard,
        setRefreshCard,
        cardItems,
        setCardItems,
      }}
    >
      <ThemeProvider theme={theme}>
        <Box>
          <BrowserRouter>
            <HomePageHeader />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/products/:id" element={<Products />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/sale_product/:id" element={<SaleProducts />} />
              <Route path="/favorite" element={<FavoritePage />} />
              <Route path="/basket" element={<BasketPage />} />
              <Route path="/user_page" element={<UserPage />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/looks" element={<Looks />} />
              <Route path="/look/:id" element={<LookPage />} />
              <Route path="/my_orders" element={<MyOrders />} />
              <Route path="/order/:id" element={<Order />} />
            </Routes>
            <MainFooter />
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </MyContext.Provider>
  );
}

export default App;
