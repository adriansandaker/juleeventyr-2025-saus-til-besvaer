import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "@/pages/home";
import KomfyrenPage from "./pages/komfyren/Komfyren";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/komfyren" element={<KomfyrenPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
