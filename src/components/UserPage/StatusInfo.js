import React, { useContext } from "react";
import {
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
} from "@mui/material";
import MyContext from "../Context/MyContext";

function StatusInfo() {
    const {isUzbek} = useContext(MyContext)
    

    const uzbekText = {
        info:
          "Biz mijozlarimiz haqida qayg'uramiz va ular uchun eng yaxshi xizmat ko'rsatishni maqsad qilganmiz. Shu sababli, sodiq mijozlar uchun maxsus sodiqlik dasturini yaratdik. Har bir mijozga Bronza, Silver va Gold statuslari beriladi. Har safar statusingiz oshganda, belgilangan miqdorda kupon bilan taqdirlanasiz.",
        conversion: "• 1000 so'm = 1 ball",
        statusTitle: "Statuslarimiz:",
        bronze: {
          title: "• Bronza",
          description:
            "50 000 so'm kupon beriladi. Sizning ballaringiz: 1 500 dan 2 999 gacha",
        },
        silver: {
          title: "• Silver",
          description:
            "100 000 so'm kupon beriladi. Sizning ballaringiz: 3 000 dan 5 999 gacha",
        },
        gold: {
          title: "• Gold",
          description:
            "150 000 so'm kupon Sizning ballaringiz: 6 000 va keyingi har 1000 ball uchun alohida sovg'alar.",
        },
      };
      
      const russianText = {
        info:
          "Мы заботимся о наших клиентах и стремимся предоставлять им лучший сервис. Поэтому мы создали специальную программу лояльности для наших постоянных клиентов. Каждому клиенту присваивается статус Бронза, Сильвер или Голд. Каждый раз, когда ваш статус повышается, вы получаете купон на указанную сумму.",
        conversion: "• 1000 сум = 1 балл",
        statusTitle: "Наши статусы:",
        bronze: {
          title: "• Бронза",
          description:
            "Выдается купон на 50 000 сум. Ваши баллы: от 1 500 до 2 999",
        },
        silver: {
          title: "• Сильвер",
          description:
            "Выдается купон на 100 000 сум. Ваши баллы: от 3 000 до 5 999",
        },
        gold: {
          title: "• Голд",
          description:
            "Выдается купон на 150 000 сум. Ваши баллы: 6 000 и дополнительные подарки за каждые следующие 1 000 баллов.",
        },
      };

      const texts = isUzbek ? uzbekText : russianText;
      
  return (
    
      <Container>
      <Box marginTop={2}>
        <Typography gutterBottom>{texts.info}</Typography>

        <Box sx={{ padding: 1, marginTop: 1 }}>
          <Typography gutterBottom>{texts.conversion}</Typography>
          <Divider />

          <Typography marginTop={1} textAlign={"center"}>
            {texts.statusTitle}
          </Typography>

          {/* Bronze Status */}
          <Typography fontWeight={"bold"} gutterBottom>
            {texts.bronze.title}
          </Typography>
          <Typography paddingLeft={1} variant="body2" gutterBottom>
            {texts.bronze.description}
          </Typography>
          <Divider sx={{ marginY: 1 }} />

          {/* Silver Status */}
          <Typography fontWeight={"bold"}>{texts.silver.title}</Typography>
          <Typography paddingLeft={1} variant="body2" gutterBottom>
            {texts.silver.description}
          </Typography>
          <Divider sx={{ marginY: 1 }} />

          {/* Gold Status */}
          <Typography fontWeight={"bold"}>{texts.gold.title}</Typography>
          <Typography paddingLeft={1} variant="body2" gutterBottom>
            {texts.gold.description}
          </Typography>
        </Box>
      </Box>
      </Container>
    
  );
}

export default StatusInfo;
