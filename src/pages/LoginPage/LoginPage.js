import { Close } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  Button,
  TextField,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { useContext, useState } from "react";
import {
  checkSMSCode,
  createNewUser,
  getVerifyCodeToNewPassword,
  isRegistretedUser,
  loginUserWithPassword,
  restorePassword,
} from "../../api/Login";
import MyContext from "../../components/Context/MyContext";
import { useNavigate } from "react-router-dom";
import { isValidPhoneNumber } from "../../components/Global/Functions";
import { useEffect } from "react";

function LoginPage() {
  const [isRegistreted, setIsRegistreted] = useState(0);
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullname] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [changePasswordCode, setChangePasswordCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [gender, setGender] = useState('female')

  const {
    setUser,
    setIsLoginPageOpen,
    lastAction,
    changeLikedList,
    setLastAction,
    isUzbek
  } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (lastAction.actionType == "phone") {
      setTel(lastAction.phoneNumber);
      checkUser(lastAction.phoneNumber);
    }
  }, []);

  const checkPhoneNumber = () => {
    if (isValidPhoneNumber(tel)) {
      checkUser(tel);
    } else {
      alert("Notög'ri telefon raqam");
    }
  };

  const checkUser = async (tempPhoneNumber) => {
    const phone = {
      phoneNumber: tempPhoneNumber,
    };
    const res = await isRegistretedUser(phone);
    if (res?.success) {
      res.data ? setIsRegistreted(1) : setIsRegistreted(2);
    }
  };

  const loginUser = async () => {
    const tempPass = password == "" ? registerPassword : password;
    const userDetailes = {
      phoneNumber: tel,
      password: tempPass,
    };

    console.log(userDetailes);

    const res = await loginUserWithPassword(userDetailes);
    if (res.success) {
      const currentTime = new Date().getTime();
      const expirationTime = currentTime + 24 * 60 * 60 * 30000;

      const userData = {
        user: res.data,
        expirationTime: expirationTime,
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      setUser(res.data);
      setIsLoginPageOpen(false);
      navigateUser();
      setTel("");
    } else {
      console.log(res.message);
    }
  };

  const checkUserData = () => {
    const nameRegex = /^[a-zA-Z\s]+$/;
  
    if (!nameRegex.test(fullName.trim())) {
      alert(
        isUzbek
          ? "Iltimos ism uchun faqat harflardan foydalaning"
          : "Пожалуйста, используйте только буквы для имени"
      );
      return;
    }
  
    if (fullName.trim().length <= 3) {
      alert(
        isUzbek
          ? "Iltimos ism va familiyangizni töliq kriting"
          : "Пожалуйста, введите полное имя и фамилию"
      );
      return;
    }
  
    if (registerPassword.trim().length <= 5) {
      alert(
        isUzbek
          ? "Parolda kamida 6 ta belgi bo'lishi kerak"
          : "Пароль должен содержать не менее 6 символов"
      );
      return;
    }
  
    if (verifyCode.trim().length !== 4) {
      alert(
        isUzbek
          ? "Iltimos tasdiqlash kodini kiriting"
          : "Пожалуйста, введите код подтверждения"
      );
      return;
    }
  
    const dob = new Date(birthDate);
    if (isNaN(dob.getTime())) {
      alert(
        isUzbek
          ? "Iltimos to'g'ri sanani kiriting"
          : "Пожалуйста, введите правильную дату"
      );
      return;
    }
  
    const currentDate = new Date();
    if (dob > currentDate) {
      alert(
        isUzbek
          ? "Kelajakdagi tug'ilgan sanani kiritish mumkin emas"
          : "Нельзя указать дату рождения из будущего"
      );
      return;
    }
  
    createUser();
  };
  

  const createUser = async () => {
    const user = {
      fullName: fullName,
      password: registerPassword,
      birthDate: birthDate,
      phoneNumber: tel,
      verifyCode: verifyCode,
    };

    const res = await createNewUser(user);
    if (res.success) {
      loginUser();
      // setBirthDate('');
      // setFullname('')
      // setTel('')
      // setVerifyCode('');
      // setRegisterPassword('')
      setIsLoginPageOpen(false);
    } else {
      console.log("xatolik!!!!!");
    }
  };

  const navigateUser = () => {
    if (lastAction.actionType == "basket") {
      navigate("/basket");
      setLastAction("");
      return;
    }

    if (lastAction.actionType == "like") {
      navigate("/favorite");
      setLastAction("");
      return;
    }

    if (lastAction.actionType == "user_page") {
      navigate("/user_page");
      setLastAction("");
      return;
    }
  };

  const handelPassForget = () => {
    getNewVerifyCode();
    setIsRegistreted(4);
  };

  const getNewVerifyCode = async () => {
    const phone = {
      phoneNumber: tel,
    };
    const res = await getVerifyCodeToNewPassword(phone);
    if (!res.success) {
      setIsLoginPageOpen(false);
    }
  };

  const restorePasswordByCustomer = async () => {
    const bodyObj = {
      phoneNumber: tel,
      newPassword: newPassword,
      verifyCode: changePasswordCode,
    };
    
    const res = await restorePassword(bodyObj);

    if (res.success) {
      console.log(tel);
      setIsRegistreted(1);
    }
  };

  const checkVerifyCode = async () => {
    const body = {
      phoneNumber: tel,
      code: verifyCode,
    };
    const res = await checkSMSCode(body);

    if (res?.data.success) {
      setIsRegistreted(3);
    } else {
      alert("Tasdiqlash kodi xato kiritildi");
    }
  };

  const translations = {
    uzbek: {
      loginTitle: "Tizimga Kirish",
      phoneNumberLabel: "Telefon raqamingiz",
      sendButton: "Yuborish",
      passwordLabel: "Parol",
      forgotPassword: "Parolni unutdingizmi?",
      verificationMessage: "Tasdiqlash kodi sizga sms orqali yuborildi",
      verificationCodeLabel: "Tasdiqlash kodi",
      fullNameLabel: "Ism va familiyangiz",
      birthDateHelper: "Tug'ilgan sanangizni kriting",
      passwordHelper: "Kamida 6ta belgidan iborat parol",
      maleLabel: "Erkak",
      femaleLabel: "Ayol",
      cancelButton: "Bekor qilish",
      newPasswordLabel: "Yangi parolni kriting",
      verificationMessage2: "Tasdiqlash kodi sizga sms orqali yuborildi",
      submitButton: "Yuborish",
    },
    russian: {
      loginTitle: "Вход в систему",
      phoneNumberLabel: "Ваш номер телефона",
      sendButton: "Отправить",
      passwordLabel: "Пароль",
      forgotPassword: "Забыли пароль?",
      verificationMessage: "Код подтверждения отправлен вам по SMS",
      verificationCodeLabel: "Код подтверждения",
      fullNameLabel: "Ваше имя и фамилия",
      birthDateHelper: "Введите вашу дату рождения",
      passwordHelper: "Пароль должен содержать не менее 6 символов",
      maleLabel: "Мужчина",
      femaleLabel: "Женщина",
      cancelButton: "Отменить",
      newPasswordLabel: "Введите новый пароль",
      verificationMessage2: "Код подтверждения отправлен вам по SMS",
      submitButton: "Отправить",
    }
  };

  const t = isUzbek ? translations.uzbek : translations.russian;

  return (
    <Box sx={{ width: "100%", paddingBottom: 2 }} align="center">
      <Box sx={{ width: "100%" }}>
        <Box display="flex" padding={2} alignItems="center">
          <Box flex={1} align="center">
            <Typography variant="h5">{t.loginTitle}</Typography>
          </Box>
          <IconButton onClick={() => setIsLoginPageOpen(false)}>
            <Close />
          </IconButton>
        </Box>

        <Box sx={{ display: isRegistreted == 0 ? "block" : "none" }}>
          <Box width="300px" marginY={3}>
            <TextField
              variant="outlined"
              label={t.phoneNumberLabel}
              size="small"
              fullWidth
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
          </Box>

          <Button variant="contained" onClick={checkPhoneNumber}>
            {t.sendButton}
          </Button>
        </Box>

        <Box sx={{ display: isRegistreted == 1 ? "block" : "none" }}>
          <Box width="300px" marginTop={3}>
            <TextField
              variant="outlined"
              label={t.passwordLabel}
              size="small"
              type="password"
              fullWidth
              value={password}
              sx={{ marginY: 2 }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>

          <Button variant="contained" onClick={loginUser}>
            {t.sendButton}
          </Button>
          <Box marginTop={1}>
            <Typography
              fontSize={12}
              sx={{ color: "blue" }}
              onClick={handelPassForget}
            >
              {t.forgotPassword}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: isRegistreted == 2 ? "block" : "none" }}>
          <Box width="300px" marginTop={3}>
            <Typography>{t.verificationMessage}</Typography>
            <TextField
              variant="outlined"
              size="small"
              label={t.verificationCodeLabel}
              fullWidth
              sx={{ marginTop: 2 }}
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
            />
          </Box>

          <Button
            sx={{ marginTop: 2 }}
            variant="contained"
            onClick={checkVerifyCode}
          >
            {t.sendButton}
          </Button>
        </Box>

        <Box
          marginY={2}
          width={"300px"}
          sx={{ display: isRegistreted == 3 ? "block" : "none" }}
        >
          <Box>
            <TextField
              variant="outlined"
              disabled
              value={tel}
              size="small"
              fullWidth
            />

            <TextField
              variant="outlined"
              size="small"
              label={t.fullNameLabel}
              fullWidth
              sx={{ marginTop: 2 }}
              value={fullName}
              onChange={(e) => setFullname(e.target.value)}
            />

            <TextField
              variant="outlined"
              type="date"
              size="small"
              label=""
              fullWidth
              helperText={t.birthDateHelper}
              sx={{ marginTop: 2 }}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />

            <RadioGroup
              row
              value={gender}
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label={t.femaleLabel}
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label={t.maleLabel}
              />
            </RadioGroup>
            <TextField
              variant="outlined"
              size="small"
              label={t.passwordLabel}
              fullWidth
              sx={{ marginY: 2 }}
              helperText={t.passwordHelper}
              value={registerPassword}
              type="password"
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
          </Box>

          <Button variant="outlined" onClick={checkUserData}>
            {t.submitButton}
          </Button>
        </Box>

        <Box sx={{ display: isRegistreted == 4 ? "block" : "none" }}>
          <Typography>{t.verificationMessage2}</Typography>
          <Box width="300px" marginTop={1}>
            <TextField
              variant="outlined"
              label={t.verificationCodeLabel}
              size="small"
              type="number"
              fullWidth
              value={changePasswordCode}
              sx={{ marginY: 2 }}
              onChange={(e) => setChangePasswordCode(e.target.value)}
            />
            <TextField
              variant="outlined"
              size="small"
              label={t.newPasswordLabel}
              fullWidth
              sx={{ marginY: 1 }}
              helperText={t.passwordHelper}
              value={newPassword}
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <Button
              variant="contained"
              sx={{ backgroundColor: "red", marginRight: 1 }}
              size="small"
              onClick={() => setIsRegistreted(1)}
            >
              {t.cancelButton}
            </Button>

            <Button
              variant="contained"
              sx={{ backgroundColor: "green" }}
              size="small"
              onClick={restorePasswordByCustomer}
            >
              {t.sendButton}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
