import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { Box, Stack } from "@mui/material"; // MUI для адаптивного меню

// Глобальный стиль для полного отключения горизонтальной прокрутки
const GlobalStyle = createGlobalStyle`
  body {
    background: black;
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    word-wrap: break-word;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
`;

const Container = styled.div`
  background: black;
  color: #0f0;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  flex-direction: column;
  white-space: pre-wrap;
  width: 90%;
  max-width: 800px;
//   text-align: center;
  overflow-x: hidden;
  word-wrap: break-word;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 10px;
  height: 18px;
  background: #0f0;
  margin-left: 5px;
  animation: blink 0.5s steps(2, start) infinite;

  @keyframes blink {
    50% { opacity: 0; }
  }
`;

const linkedStars = [
  { link: "/about", label: "О компании" },
  { link: "/services", label: "Услуги" },
  { link: "/portfolio", label: "Портфолио" },
  { link: "/contacts", label: "Контакты" }
];

const ContactPage = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [startTyping, setStartTyping] = useState(false);
  const [showRussianText, setShowRussianText] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const fullText = `find anncom.ru contacts\n\n`
    + `COORDINATES:\n`
    + `Planet Earth, Milky Way Galaxy\n`
    + `55.9142° N, 37.8256° E (Korolyov, Moscow Region)\n\n`
    + `Phone: +7-915-322-0056\n`
    + `General inquiries: anncom@anncom.ru\n`
    + `Director: director@anncom.ru\n`
    + `Tech Support Bot N.: autodialer@anncom.ru\n`
    + `Working Hours: Mon-Fri 10:00-18:00\n\n`
    + `Analytics. Communications, LLC.\n`
    + `INN/KPP: 5018203995/501801001\n`
    + `OGRN: 1205000037252\n`
    + `Address: 141070, Moscow Region, Korolev,\n`
    + `Tsiolkovsky St. 2-A, Office 106`;

  const russianText = `ANNCOM.RU\n\n`
    + `Номер телефона: +7-915-322-0056\n`
    + `E-mail для общих вопросов и вопросах о сотрудничестве: anncom@anncom.ru\n`
    + `Написать директору: director@anncom.ru\n`
    + `Связь с тех.поддержкой Бот N.: autodialer@anncom.ru\n`
    + `Часы и режим работы: Пн-пт с 10.00 до 18.00\n\n`
    + `ООО «Аналитика коммуникаций» / Analytics. Communications, LLC.\n`
    + `ИНН/КПП: 5018203995/501801001\n`
    + `ОГРН: 1205000037252\n`
    + `Адрес: 141070, Московская область, г. Королев, ул. Циолковского дом 2-А 106`;

  useEffect(() => {
    setTimeout(() => {
      setShowCursor(false);
      setTimeout(() => {
        setStartTyping(true);
      }, 500);
    }, 1500);
  }, []);

  useEffect(() => {
    if (!startTyping || showRussianText) return;

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowRussianText(true);
          setTimeout(() => setShowMenu(true), 1500);
        }, 1500);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [index, startTyping]);


  
  return (
    <>
      <GlobalStyle />
      <Container>
        {showRussianText ? russianText : text}
        {showCursor && <Cursor />}
        {showMenu && (
          <Box sx={{
            marginTop: 3,
            background: "black",
            padding: "10px 0",
            width: "100%",
            textAlign: "center"
          }}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              justifyContent="center"
            >
              {linkedStars.map((star, index) => (
                <Link
                  key={index}
                  to={star.link}
                  style={{
                    color: "#0f0",
                    textDecoration: "none",
                    fontSize: "16px"
                  }}
                >
                  [{star.label}]
                </Link>
              ))}
            </Stack>
          </Box>
        )}
      </Container>
    </>
  );
};

export default ContactPage;