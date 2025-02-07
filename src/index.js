import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa Bootstrap
import "./index.css"; // Importa estilos personalizados
import '@fortawesome/fontawesome-free/css/all.min.css'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



