import Auth from "@/pages/Auth";
import Chat from "@/pages/Chat";
import Context from "@/pages/Context";
import Loading from "@/pages/Loading";
import Welcome from "@/pages/Welcome";
import { selectAuth } from "@/redux/authSlice";
import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export const Router: React.FC = () => {
  const { isLogged } = useSelector(selectAuth);

  useEffect(() => {
    
  }, [isLogged]);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index path="/" element={<Loading />} />
          <Route path="/welcome" element={Welcome} />
          <Route path="/chat" element={Chat} />
          {isLogged && <Route path="/context" element={Context} />}
          <Route path="/login" element={Auth} />
          <Route path="/*" element={<Navigate replace to="/welcome" />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
};
