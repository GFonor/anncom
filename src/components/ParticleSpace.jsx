import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { OrbitControls } from "@react-three/drei";


import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";

const TerminalTrigger = ({ onOpen }) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity((prev) => (prev === 1 ? 0.7 : 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={onOpen}
      style={{
        position: "absolute",
        bottom: "20px",  // ✅ Размещаем внизу
        left: "20px",    // ✅ Размещаем слева
        color: "#0f0",
        fontFamily: "Courier New, monospace",
        fontSize: "18px",
        cursor: "pointer",
        opacity,
        transition: "opacity 1.5s ease-in-out",
        zIndex: 30,
      }}
    >
      [терминал]
    </div>
  );
};

const Logo = ({ onClick }) => {
  const texture = useLoader(TextureLoader, "/dialer/newsite/logo.png");

  return (
    <sprite
      position={[0, 0, -0.5]}
      scale={[1, 1, 1]}
      onPointerDown={onClick}
      onPointerOver={(e) => (document.body.style.cursor = "pointer")}
      onPointerOut={(e) => (document.body.style.cursor = "default")}
    >
      <spriteMaterial
        attach="material"
        map={texture}
        // transparent={true}
        // premultipliedAlpha={true}
        // depthTest={false}
        // depthWrite={false}
      />
    </sprite>
  );
};

const CameraAnimation = () => {
  const cameraRef = useRef();
  const [zoomIn, setZoomIn] = useState(true);
  const [progress, setProgress] = useState(0);

  useFrame(({ camera }) => {
    if (zoomIn && progress < 1) {
      setProgress((prev) => prev + 0.00001); // Скорость приближения

      camera.position.lerp(
        { x: 0, y: 0, z: 2 }, // Финальная позиция камеры (внутри сферы)
        progress
      );

      if (progress >= 1) {
        setZoomIn(false); // Останавливаем приближение
      }
    }
  });

  return null;
};



// 🔹 Фиксированные команды навигации
const commands = {
  "botn": "/botn",
  "услуги": "/services",
  "портфолио": "/portfolio",
  "контакты": "/contacts",
};


// 🔹 Функция генерации случайного большого числа
const getRandomStart = () => {
    return Math.floor(Math.random() * (9999999 - 1000000)) + 1000000;
  };

// 🔹 Функция генерации простых чисел начиная с произвольного числа
const generatePrimes = function* () {
    let num = getRandomStart(); // Начинаем с большого случайного числа
    while (true) {
      if (isPrime(num)) yield num;
      num++;
    }
  };

// 🔹 Проверка числа на простоту
const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  

  const DigitalDecodeText = ({ text, speed = 50 }) => {
    const [displayText, setDisplayText] = useState("");
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?/{}[]";
  
    useEffect(() => {
      let currentText = text.split("").map(() => characters[Math.floor(Math.random() * characters.length)]);
      setDisplayText(currentText.join(""));
  
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          currentText[index] = text[index]; // Заменяем на реальный символ
          setDisplayText(currentText.join(""));
          index++;
        } else {
          clearInterval(interval);
        }
      }, speed);
  
      return () => clearInterval(interval);
    }, [text, speed]);
  
    return (
      <pre
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          overflowWrap: "break-word",
          fontFamily: "Courier New, monospace",
          color: "#0f0",
          fontSize: "16px",
        }}
      >
        {displayText}
      </pre>
    );
  };
  
  // 🔹 Терминал с эффектом расшифровки
  const HelpTerminal = ({ onClose, zIndex }) => {
    const instructionText = `
  О компании
  
  Мы — команда IT-специалистов, создающая современные решения для бизнеса и частных пользователей. Наш профиль — разработка программного обеспечения для web и мобильных платформ, работа с базами данных, анализ данных и автоматизация процессов.
  
  За годы работы мы накопили опыт в создании эффективных, надежных и масштабируемых решений, которые помогают компаниям оптимизировать их работу.
  
  - Разрабатываем кастомные IT-продукты, ориентированные на задачи бизнеса.
  - Создаем web- и мобильные приложения, включая сервисы для мониторинга инфраструктуры, аналитики и безопасности.
  - Работаем с базами данных, строим надежные системы хранения и обработки информации.
  - Развиваем собственные проекты в области искусственного интеллекта и анализа данных.
  - Разрабатываем решения для мониторинга сетевой инфраструктуры, включая приложения для отслеживания состояния серверов и сетей.
  
  Мы верим, что технологии должны работать на человека, а не наоборот, и помогаем клиентам внедрять удобные и эффективные цифровые решения.
  
  Для выхода нажмите [Esc] или закройте это окно.
  `;
  
    return (
<div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "650px",
        maxWidth: "90%",
        maxHeight: "70vh",
        padding: "10px",
        background: "black",
        color: "#0f0",
        fontFamily: "Courier New, monospace",
        fontSize: "16px",
        // border: "2px solid green",
        zIndex: zIndex,
        textAlign: "left",
        overflowY: "auto", // ✅ Добавляем прокрутку при необходимости
        scrollbarWidth: "thin", // ✅ Стилизация для Firefox
        scrollbarColor: "green black", // ✅ Стилизация для Firefox
      }}
    >
      {/* ✅ Стилизация прокрутки для Webkit-браузеров (Chrome, Edge, Safari) */}
      <style>
        {`
        /* Полоса прокрутки */
        ::-webkit-scrollbar {
          width: 8px;
        }

        /* Трек (фон за ползунком) */
        ::-webkit-scrollbar-track {
          background: black;
          border-radius: 5px;
        }

        /* Ползунок (сам скролл) */
        ::-webkit-scrollbar-thumb {
          background: green;
          border-radius: 5px;
        }

        /* Ползунок при наведении */
        ::-webkit-scrollbar-thumb:hover {
          background: lime;
        }
        `}
      </style>
        <DigitalDecodeText text={instructionText} speed={1} /> {/* 👈 Эффект расшифровки */}
        <button
          onClick={onClose}
          style={{
            background: "black",
            color: "#0f0",
            border: "1px solid green",
            fontFamily: "Courier New, monospace",
            fontSize: "14px",
            padding: "5px",
            marginTop: "10px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          [Закрыть]
        </button>
      </div>
    );
  };
  
// 🔹 Компонент "навигации" с анимированным меню
const NavigationTrigger = ({ onOpen, onToggleMenu, showMenu }) => {
    const [opacity, setOpacity] = useState(1);
    const menuRef = useRef(null);
    const timeoutRef = useRef(null);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setOpacity((prev) => (prev === 1 ? 0.7 : 1));
      }, 2000);
      return () => clearInterval(interval);
    }, []);
  
    // Автоматическое закрытие меню через 30 секунд
    useEffect(() => {
      if (showMenu) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          onToggleMenu(false);
        }, 30000); // Закрытие через 30 секунд
      }
    }, [showMenu]);
  
    // Закрытие меню при клике вне его
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          onToggleMenu(false);
          clearTimeout(timeoutRef.current); // Очищаем таймер при закрытии вручную
        }
      };
      if (showMenu) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        clearTimeout(timeoutRef.current); // Убираем таймер при размонтировании
      };
    }, [showMenu]);
  
    return (
      <div style={{ position: "absolute", top: "20px", left: "20px", zIndex: 30 }}>
        {/* ✅ Кнопка [навигация] */}
        <div
          onClick={onToggleMenu}
          style={{
            color: "#0f0",
            fontFamily: "Courier New, monospace",
            fontSize: "18px",
            cursor: "pointer",
            opacity,
            transition: "opacity 1.5s ease-in-out",
          }}
        >
          [навигация]
        </div>
  
        {/* ✅ Блок с меню */}
        <div
          ref={menuRef}
          style={{
            marginTop: "5px",
            background: "black",
            padding: "5px",
            width: "180px",
            fontFamily: "Courier New, monospace",
            fontSize: "16px",
            color: "#0f0",
            transition: "opacity 1.5s ease-in-out", // ✅ Плавное появление за 1.5 сек
            opacity: showMenu ? 1 : 0,
            visibility: showMenu ? "visible" : "hidden", // ✅ Скрываем без display: none
          }}
        >
          {Object.keys(commands).map((key) => (
            <div
              key={key}
              onClick={() => onOpen(commands[key])}
              style={{
                padding: "8px",
                cursor: "pointer",
                transition: "background 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.background = "rgba(0,255,0,0.2)")}
              onMouseOut={(e) => (e.target.style.background = "black")}
            >
              <span style={{ fontSize: "18px" }}>[{key}]</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

// 🔹 Терминал с простыми числами
const PrimeTerminal = () => {
    const [output, setOutput] = useState([]);
    const primeGenerator = useRef(generatePrimes()).current;
  
    // Эффект "печати" чисел
    useEffect(() => {
      const interval = setInterval(() => {
        const newPrime = primeGenerator.next().value;
        setOutput((prev) => {
          const newOutput = [...prev, `> ${newPrime}`];
          return newOutput.length > 2 ? newOutput.slice(-2) : newOutput;
        });
      }, 2000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          right: "10px",
          width: "300px",
          maxWidth: "80%",
          padding: "10px",
          background: "black",
          color: "green",
          fontFamily: "Courier New, monospace",
          fontSize: "14px",
          border: "2px solid green",
          zIndex: 10,
          wordWrap: "break-word",
          whiteSpace: "pre-wrap", // Перенос строк
          textAlign: "left",
        }}
      >
        <pre>{output.join("\n")}</pre>
      </div>
    );
  };

  const Terminal = ({ onClose, onCommand, zIndex }) => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("Введите команду...");
    // const [position, setPosition] = useState({ x: window.innerWidth / 2 - 200, y: window.innerHeight / 3 }); // Начальная позиция
    const [isDragging, setIsDragging] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });

    const [position, setPosition] = useState(() => {
      const initialX = window.innerWidth / 2 - 200;
      const initialY = window.innerHeight / 3;
      
      return {
        x: initialX < 0 ? 8 : initialX, // Если x < 0 → x = 8
        y: initialY,
      };
    });
  
    // Обработчик нажатия мыши (начало перетаскивания)
    const handleMouseDown = (e) => {
      setIsDragging(true);
      dragOffset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };
    };
  
    // Обработчик перемещения мыши (перетаскивание)
    useEffect(() => {
      const handleMouseMove = (e) => {
        if (isDragging) {
          setPosition({
            x: e.clientX - dragOffset.current.x,
            y: e.clientY - dragOffset.current.y
          });
        }
      };
  
      const handleMouseUp = () => setIsDragging(false);
  
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
  
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isDragging]);
  
    // Обработчик клавиатуры
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        const command = input.toLowerCase().trim();
        if (commands[command]) {
          setOutput(`Выполняем команду: ${command}`);
          setTimeout(() => onCommand(commands[command]), 1000);
        } else {
          setOutput(`Неизвестная команда: ${command}\nДоступные команды:\n${Object.keys(commands).join(", ")}`);
        }
        setInput("");
      }
    };
  
    return (
      <div
        style={{
          position: "absolute",
          top: `${position.y}px`,
          left: `${position.x}px`,
          width: "400px",
          maxWidth: "90%",
          padding: "10px",
          background: "black",
          color: "green",
          fontFamily: "Courier New, monospace",
          fontSize: "18px",
          border: "2px solid green",
          zIndex: zIndex,
          cursor: isDragging ? "grabbing" : "grab", // Курсор "захвата"
        }}
      >
        {/* Заголовок для перетаскивания */}
        <div
          style={{
            width: "100%",
            padding: "5px",
            background: "#0f0",
            color: "black",
            fontWeight: "bold",
            textAlign: "center",
            cursor: "grab",
          }}
          onMouseDown={handleMouseDown} // Начинаем перетаскивание
        >
          [Терминал]
        </div>
  
        {/* Основной контент терминала */}
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", overflowWrap: "break-word", maxWidth: "100%" }}>
          {output}
        </pre>
  
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            width: "100%",
            background: "black",
            color: "green",
            border: "none",
            outline: "none",
            fontFamily: "Courier New, monospace",
            fontSize: "16px",
          }}
          autoFocus
        />
  
        <button
          onClick={onClose}
          style={{
            marginTop: "10px",
            width: "100%",
            background: "black",
            color: "green",
            border: "1px solid green",
            cursor: "pointer",
            fontSize: "14px",
            padding: "5px",
          }}
        >
          [Закрыть]
        </button>
      </div>
    );
  };

// 🔹 Компонент терминала (ввод команд)
const Terminal0 = ({ onClose, onCommand, zIndex }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("Введите команду...");

  useEffect(() => {
    const timeout = setTimeout(onClose, 60000);
    return () => clearTimeout(timeout);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const command = input.toLowerCase().trim();
      if (commands[command]) {
        setOutput(`Выполняем команду: ${command}`);
        setTimeout(() => onCommand(commands[command]), 1000);
      } else {
        setOutput(`Неизвестная команда: ${command}\nДоступные команды:\n${Object.keys(commands).join(", ")}`);
      }
      setInput("");
    }
  };

  return (
    <div
      style={{
        display: "inline-block",
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "400px",
        maxWidth: "90%",
        padding: "10px",
        background: "black",
        color: "green",
        fontFamily: "Courier New, monospace",
        fontSize: "18px",
        border: "2px solid green",
        // zIndex: 10,
        zIndex: zIndex, // ✅ Используем динамический zIndex
      }}
    >
      <pre
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          overflowWrap: "break-word",
          maxWidth: "100%",
        }}
      >
        {output}
      </pre>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          width: "100%",
          background: "black",
          color: "green",
          border: "none",
          outline: "none",
          fontFamily: "Courier New, monospace",
          fontSize: "16px",
        }}
        autoFocus
      />
    </div>
  );
};

// 🔹 Главный компонент
const ParticleSpace = () => {
  const navigate = useNavigate();
  const [showTerminal, setShowTerminal] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const [terminalZIndex, setTerminalZIndex] = useState(10);
  const [helpZIndex, setHelpZIndex] = useState(10);

  const [showMenu, setShowMenu] = useState(false); // ✅ Показываем / скрываем меню
  const [highestZIndex, setHighestZIndex] = useState(10);

  // Открытие меню или терминала
  const handleNavigation = (path) => {
    setShowMenu(false);
    navigate(path);
  };

  // Функция для поднятия zIndex
  const bringToFront = (setZIndex) => {
    setHighestZIndex((prev) => prev + 1); // Обновляем главный zIndex
    setZIndex(highestZIndex + 1); // Даем новому окну наибольший zIndex
  };

  // Закрытие помощи по нажатию `Esc`
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowHelp(false);
        // setShowTerminal(false); // ✅ Закрываем и терминал тоже
        setShowMenu(false); // ✅ Закрываем меню
        setShowTerminal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 1030] }}> {/* Камера изначально далеко */}
        {/* ✅ Камера анимация */}
        <CameraAnimation />

        {/* ✅ Управление обзором */}
        <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} />

        {/* ✅ Фон со звездами */}
        <Stars radius={100} depth={50} count={5000} factor={8} saturation={0} fade />

        {/* ✅ Логотип */}
        {/* <Logo /> */}
        {/* <Logo onClick={() => setShowHelp(true)} /> */}
        <Logo onClick={() => { setShowHelp(true); bringToFront(setHelpZIndex); }} />
      </Canvas>

      {/* ✅ Меню под [навигация] */}
      <NavigationTrigger
        onOpen={handleNavigation}
        onToggleMenu={() => setShowMenu((prev) => !prev)}
        showMenu={showMenu}
      />

      {/* ✅ Терминал с простыми числами */}
      <PrimeTerminal />

      {/* ✅ Терминал-инструкция */}
      {showHelp && <HelpTerminal onClose={() => setShowHelp(false)} zIndex={helpZIndex} />}

      {/* ✅ Мигающая навигация */}
      {/* {!showTerminal && <NavigationTrigger onOpen={() => { setShowTerminal(true); bringToFront(setTerminalZIndex); }} />} */}

      {/* ✅ Терминал команд */}
      {showTerminal && (
        <Terminal
          onClose={() => setShowTerminal(false)}
          onCommand={(path) => navigate(path)}
          zIndex={terminalZIndex}
        />
      )}

      <TerminalTrigger onOpen={() => { setShowTerminal(true); bringToFront(setTerminalZIndex); }} />
    </div>
  );
};

export default ParticleSpace;