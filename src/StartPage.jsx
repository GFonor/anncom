import React, { useState } from "react";
import NeuralNetwork from "./components/NeuralNetwork";
import ParticleSpace from "./components/ParticleSpace";

const StartPage = () => {
  const [view] = useState("particles"); // Состояние: "neural" или "particles"

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", background: "black" }}>
        {view === "neural" ? <NeuralNetwork /> : <ParticleSpace />}
    </div>
  );
};

export default StartPage;