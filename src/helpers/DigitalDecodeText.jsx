import { useState, useEffect } from "react";

export default function DigitalDecodeText({ text, speed = 50 }) {
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
}
