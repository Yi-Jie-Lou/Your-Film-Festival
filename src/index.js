import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";

const root = createRoot(document.getElementById("root"));

function App() {
  return <div className="App">Hello</div>;
}

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
