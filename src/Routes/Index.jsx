import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import PassengerProfile from "../Components/Cards/PassengerProfile";
import PageTransition from "./PageTransition";

const Index = () => {
  return (
    <BrowserRouter>
      <PageTransition>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/passenger/:id" element={<PassengerProfile />} />
        </Routes>
      </PageTransition>
    </BrowserRouter>
  );
};

export default Index;
