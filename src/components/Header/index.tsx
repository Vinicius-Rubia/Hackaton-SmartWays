import { motion } from "framer-motion";
import { Search } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectChat, setSearch } from "../../redux/chatSlice";
import { images } from "../../utils/images";
import Menu from "../Menu";
import * as C from "./styles";

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const Header: React.FC = () => {
  const { status } = useSelector(selectChat);
  const dispatch = useDispatch();

  return (
    <C.Header variants={item}>
      <C.Head>
        <C.ImgLogo src={images.smartWaysLogo} alt="Logo" />
        <motion.div variants={item}>
          <C.TitleChat>SMARTWAYS</C.TitleChat>
          <C.Status>{status ? "Digitando..." : "Online"}</C.Status>
        </motion.div>
      </C.Head>
      <motion.div variants={item}>
        <C.ButtonSearch onClick={() => dispatch(setSearch(true))}>
          <Search />
        </C.ButtonSearch>
      </motion.div>
      <C.Menu variants={item}>{Menu}</C.Menu>
    </C.Header>
  );
};
