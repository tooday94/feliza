import { Close } from '@mui/icons-material'
import { Box, IconButton, Typography, Button, TextField, Alert } from '@mui/material'
import React, {useContext, useState} from 'react'
import { createNewUser, getVerifyCodeToNewPassword, isRegistretedUser, loginUserWithPassword, restorePassword } from '../../api/Login';
import MyContext from '../../components/Context/MyContext';
import {useNavigate} from 'react-router-dom'
import { isValidPhoneNumber } from '../../components/Global/Functions';
import { useEffect } from 'react';



function LoginPage() {
    const [isRegistreted, setIsRegistreted] = useState(0);
    const [tel, setTel] = useState('');
    const [password, setPassword] = useState('')
    const [fullName, setFullname] = useState('');
    const [registerPassword, setRegisterPassword] = useState('')
    const [birthDate, setBirthDate] = useState('');
    const [verifyCode, setVerifyCode] = useState('');
    const [changePasswordCode, setChangePasswordCode] = useState('');
    const [newPassword, setNewPassword] = useState('')
    

    const {setUser, setIsLoginPageOpen, lastAction, changeLikedList, setLastAction} = useContext(MyContext)
    const navigate = useNavigate();
    
    useEffect(() => {
        
        if(lastAction.actionType == 'phone') {
            setTel(lastAction.phoneNumber);
            checkUser(lastAction.phoneNumber);
        }
    }, [])

    const checkPhoneNumber = () => {
        if(isValidPhoneNumber(tel)) {
            checkUser(tel);
        } else {
            alert("Notög'ri telefon raqam")
        }
    }

    const checkUser = async(tempPhoneNumber) => {
        const phone = {
            phoneNumber: tempPhoneNumber
        }
        const res = await isRegistretedUser(phone);
        if(res?.success) {
            res.data? setIsRegistreted(1) : setIsRegistreted(2)
        }
    }

    const loginUser = async() => {
        const userDetailes = {
            phoneNumber: tel,
            password: password
        } 

        const res = await loginUserWithPassword(userDetailes);
        if(res.success) {

            const currentTime = new Date().getTime();
            const expirationTime = currentTime + 24 * 60 * 60 * 30000;

            const userData = {
              user: res.data,
              expirationTime: expirationTime,
            };

            localStorage.setItem('userData', JSON.stringify(userData));
            setUser(res.data);
            setIsLoginPageOpen(false)
            navigateUser();
            setTel('')
        } else {
            console.log(res.message);
        }
    }

    const checkUserData = () => {

        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(fullName.trim())) {
            alert('Iltimos ism uchun faqat harflardan foydalaning');
            return;
        }

        if (fullName.trim().length <= 3) {
            alert('Iltimos ism va familiyangizni töliq kriting');
            return;
        }
        if (registerPassword.trim().length <= 5) {
            alert("Parolda kamida 6 ta belgi bo'lishi kerak");
            return;
        }
        if (verifyCode.trim().length !== 4) {
            alert("Iltimos tasdiqlash kodini kiriting");
            return;
        }

        const dob = new Date(birthDate);
        if (isNaN(dob.getTime())) {
            alert("Iltimos to'g'ri sanani kiriting");
            return;
        }

        const currentDate = new Date();
        if (dob > currentDate) {
            alert("Kelajakdagi tug'ilgan sanani kiritish mumkin emas");
            return;
        }    
        createUser();
    };


    const createUser = async() => {
        const user = {
            fullName: fullName,
            password: registerPassword,
            birthDate: birthDate,
            phoneNumber: tel,
            verifyCode: verifyCode
        }

        const res = await createNewUser(user);
        if(res.success) {
            console.log("Foydalanuvchi qoshildi");
            setBirthDate('');
            setFullname('')
            setTel('')
            setVerifyCode('');
            setRegisterPassword('')
            setIsLoginPageOpen(false);
            navigateUser();
        } else {
            console.log('xatolik!!!!!');
        }
    }

    const navigateUser = () => {

        if(lastAction.actionType == 'basket') {
            navigate('/basket')
            setLastAction('')
            return;
        }

        if(lastAction.actionType == 'like') {
            navigate('/favorite')
            setLastAction('')
            return;
        }

        // if(lastAction.actionType == 'like_product') {
        //     changeLikedList(lastAction.product_id)
        // }

        if(lastAction.actionType == 'user_page') {
            navigate('/user_page')
            setLastAction('')
            return;
        }
    }

    const handelPassForget = () => {
        getNewVerifyCode();
        setIsRegistreted(3)
    }

    const getNewVerifyCode = async() => {
        const phone = {
            phoneNumber: tel
        }
        const res = await getVerifyCodeToNewPassword(phone);
        if(!res.success) {
            setIsLoginPageOpen(false)
        }
    }

    const restorePasswordByCustomer = async () => {
        const bodyObj = {
            phoneNumber : tel,
            newPassword : newPassword,
            verifyCode : changePasswordCode
        }
        console.log(bodyObj);
        const res = await restorePassword(bodyObj);

        if(res.success) {
            console.log(tel);
            setIsRegistreted(1);
        }

    }

  return (
    <Box sx={{width: '100%'}} align='center'>  
        <Box  sx={{width: '100%'}}>
            <Box display='flex'   padding={2} alignItems='center'>
                <Box flex={1} align= 'center'>
                    <Typography variant='h5'>
                        Tizimga Kirish
                    </Typography>
                </Box>
                <IconButton onClick={() => setIsLoginPageOpen(false)}>
                     <Close/>
                </IconButton>
            </Box>

            <Box sx={{display: isRegistreted == 0? 'block' : 'none'}}>
                <Box width='300px' marginY={3}>
                    <TextField 
                    variant='outlined' 
                    label='Telefon raqamingiz' 
                    size='small' 
                    fullWidth
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}/>
                </Box>
            
                <Button 
                    variant= 'contained' 
                    onClick={checkPhoneNumber}
                >
                        Yuborish
                </Button>
            </Box>


            <Box sx={{display: isRegistreted == 1? 'block' : 'none'}}>
                <Box width='300px' marginTop={3}>

                    <TextField 
                    variant='outlined' 
                    label='Parol' 
                    size='small'
                    type='password' 
                    fullWidth
                    value={password}
                    sx={{marginY: 2}}
                    onChange={(e) => setPassword(e.target.value)}/>
                </Box>
            
                <Button variant= 'contained' onClick={loginUser}>
                    Yuborish
                </Button>
                <Box marginTop={1}>
                    <Typography fontSize={12} sx={{color: 'blue'}} onClick= {handelPassForget}>
                        Parolni unutdingizmi?
                    </Typography>
                </Box>
            </Box>

            <Box marginY={2} width={'300px'} sx={{display: isRegistreted == 2? 'block' : 'none'}}>
                <Box>
                    <Typography>
                        Tasdiqlash kodi sizga SMS orqali yuboriladi
                    </Typography>
                <TextField variant='outlined' disabled value={tel} size='small' fullWidth/>
                <TextField 
                    variant='outlined' 
                    size='small' 
                    label='Tasdiqlash kodi' 
                    fullWidth 
                    sx={{marginTop: 2}}
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    />
                <TextField 
                    variant='outlined' 
                    size='small' 
                    label='Ism va familiyangiz' 
                    fullWidth 
                    sx={{marginTop: 2}}
                    value={fullName}
                    onChange={(e) => setFullname(e.target.value)}
                    />
                
                <TextField 
                    variant='outlined' 
                    type='date' 
                    size='small' 
                    label='' 
                    fullWidth 
                    helperText = "Tug'ilgan sanangizni kriting"
                    sx={{marginTop: 2}}
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    />
                <TextField variant='outlined' 
                    size='small' 
                    label='Parol'  
                    fullWidth 
                    sx={{marginY: 2}}
                    helperText = 'Kamida 6ta belgidan iborat parol'
                    value={registerPassword}
                    type='password'
                    onChange={(e) => setRegisterPassword(e.target.value)}
                />
                </Box>

                <Button variant='outlined' onClick={checkUserData}>
                    Yuborish
                </Button>
            </Box>

            <Box sx={{display: isRegistreted == 3? 'block' : 'none'}}>
                <Typography>
                    Tasdiqlash kodi sizga sms orqali yuborildi
                </Typography>
                <Box width='300px' marginTop={1}>

                    <TextField 
                    variant='outlined' 
                    label='Tasdiqlash kodi' 
                    size='small'
                    type='number' 
                    fullWidth
                    value={changePasswordCode}
                    sx={{marginY: 2}}
                    onChange={(e) => setChangePasswordCode(e.target.value)}
                    />
                    <TextField variant='outlined' 
                    size='small' 
                    label='Yangi parolni kriting'  
                    fullWidth 
                    sx={{marginY: 1}}
                    helperText = 'Kamida 6ta belgidan iborat parol'
                    value={newPassword}
                    type='password'
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <Button 
                    variant='contained' 
                    sx={{backgroundColor: 'red', marginRight: 1}} 
                    size='small'
                    onClick={() => setIsRegistreted(1)}
                >
                    Bekor qilish
                </Button>

                <Button 
                    variant='contained' 
                    sx={{backgroundColor: 'green'}} 
                    size='small'
                    onClick={restorePasswordByCustomer}
                >
                    Yuborish
                </Button>
                
                </Box>
            </Box>
        </Box>

        
    </Box>
  )
}

export default LoginPage