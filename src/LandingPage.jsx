import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import StarryBackground from "./StarryBackground";

// Стили для звезды-ссылки
const StarLink = styled(motion(Link))`
  position: absolute;
  width: 10px;
  height: 10px;
  background: radial-gradient(circle, rgba(255,255,255,1) 30%, rgba(63,0,255,0.8) 70%, rgba(0,0,0,0) 100%);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(63, 0, 255, 0.8), 0 0 20px rgba(63, 0, 255, 0.5);
  transform: translate(-50%, -50%);
  z-index: 2;
  display: block;
  opacity: 0.9;
  transition: opacity 0.5s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    transform: translate(-50%, -50%) scale(2);
    opacity: 1;
    box-shadow: 0 0 15px rgba(63, 0, 255, 1), 0 0 25px rgba(63, 0, 255, 0.8);
  }
`;

// Стили для надписи при наведении
const StarLabel = styled(motion.div)`
  position: absolute;
  color: #0f0;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  background: black;
  padding: 5px 10px;
  border: 1px solid #0f0;
  border-radius: 4px;
  text-transform: uppercase;
  white-space: nowrap;
  z-index: 3;
  transform: translate(-50%, -200%);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  &:before {
    content: "[";
    color: #0f0;
  }
  &:after {
    content: "]";
    color: #0f0;
  }
`;

// Стили для всплывающего окна подтверждения
const ConfirmationBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: black;
  border: 2px solid #0f0;
  color: #0f0;
  font-family: 'Courier New', monospace;
  padding: 20px;
  z-index: 100;
  text-align: center;
`;

const Button = styled.button`
  background: black;
  color: #0f0;
  font-family: 'Courier New', monospace;
  border: 1px solid #0f0;
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
  &:hover {
    background: #0f0;
    color: black;
  }
`;

// Фиксированные ссылки
const linkedStars = [
  { x: 20, y: 30, link: "/about", label: "О компании" },
  { x: 50, y: 50, link: "/services", label: "Услуги" },
  { x: 70, y: 20, link: "/portfolio", label: "Портфолио" },
  { x: 40, y: 80, link: "/contacts", label: "Контакты" }
];

const FlashingStar = styled(motion.div)`
  position: absolute;
  width: 14px;
  height: 14px;
  background: radial-gradient(circle, rgba(0, 255, 255, 1) 30%, rgba(0, 255, 255, 0.8) 70%, rgba(0, 0, 0, 0) 100%);
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.9), 0 0 40px rgba(0, 255, 255, 0.8), 0 0 50px rgba(0, 255, 255, 0.6);
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const LandingPage = () => {
    const [hoveredStar, setHoveredStar] = useState(null);
    const [confirmingNavigation, setConfirmingNavigation] = useState(false);
    const [pendingNavigation, setPendingNavigation] = useState(null);
    const [flashingStars, setFlashingStars] = useState([]);
    const navigate = useNavigate();
    const [randomHighlightedStar, setRandomHighlightedStar] = useState(null);
    const [pendingLabel, setPendingLabel] = useState(""); // Для отображения имени ссылки

    // Функция обработки клика по ссылке с подтверждением
    const handleNavigation = (star) => {
      setConfirmingNavigation(true);
      setPendingNavigation(star.link);
      setPendingLabel(star.label);
    };

    // Функция для случайного появления названия звезды
    useEffect(() => {
      const randomHighlight = () => {
        const randomStar = linkedStars[Math.floor(Math.random() * linkedStars.length)];
        setRandomHighlightedStar(randomStar.label);

        setTimeout(() => {
          setRandomHighlightedStar(null);
        }, 1500); // Надпись исчезает через 1 секунду
      };

      const interval = setInterval(randomHighlight, Math.random() * (8000 - 3000) + 3000);
      return () => clearInterval(interval);
    }, []);


    // Функция для создания случайной яркой звезды
    useEffect(() => {
      const createFlashingStar = () => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const id = Math.random();

      setFlashingStars((prev) => [...prev, { id, x, y }]);

      setTimeout(() => {
          setFlashingStars((prev) => prev.filter(star => star.id !== id));
      }, 1000); // Звезда исчезает через 1 секунду
      };

      const interval = setInterval(createFlashingStar, Math.random() * (10000 - 2000) + 2000);
      return () => clearInterval(interval);
  }, []);

    return (
      <div style={{ overflow: "hidden", position: "relative", width: "100vw", height: "100vh" }}>
        <StarryBackground />
        {linkedStars.map((star, index) => (
          <div key={index} style={{ position: 'absolute', top: `${star.y}vh`, left: `${star.x}vw` }}>
            <StarLink to={"#"} 
              onMouseEnter={() => setHoveredStar(star.label)}
              onMouseLeave={() => setHoveredStar(null)}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(star);
              }}
            />
            {(hoveredStar === star.label || randomHighlightedStar === star.label) && (
              <StarLabel initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {star.label}
              </StarLabel>
            )}
          </div>
        ))}

      {confirmingNavigation && (
          <ConfirmationBox>
            <p>Ещем раздел "{pendingLabel}"?</p>
            <Button onClick={() => {
              setConfirmingNavigation(false);
              navigate(pendingNavigation);
            }}>Да</Button>
            <Button onClick={() => setConfirmingNavigation(false)}>Нет</Button>
          </ConfirmationBox>
        )}
        {/* Анимация случайных вспышек звезд */}
        <AnimatePresence>
          {flashingStars.map((star) => (
          <FlashingStar
              key={star.id}
              style={{ top: `${star.y}vh`, left: `${star.x}vw` }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.5 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
          />
          ))}
        </AnimatePresence>
      </div>
    );
  };

export default LandingPage;