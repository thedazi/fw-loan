import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/index.tsx";
import Customer from "./pages/customers.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/:id" element={<Customer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
