import { selectAuth } from "@/redux/authSlice";
import { transition } from "@/utils";
import { AlignJustify } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { DropdownMenu } from "../ui/dropdown-menu";
import * as C from "./styles";

const Menu: React.FC = () => {
  const { isLogged } = useSelector(selectAuth);

  const menu = [
    {
      url: "/welcome",
      title: "Início",
    },
    {
      url: "/chat",
      title: "Chat",
    },
    {
      url: isLogged ? "/context" : "/login",
      title: "Contexto",
    },
  ];

  const lastItem = menu.length - 1;

  return (
    <DropdownMenu>
      <C.Trigger asChild>
        <Button className="hover:bg-sw-dark-light focus:bg-sw-dark-light p-2">
          <AlignJustify />
        </Button>
      </C.Trigger>
      <C.MenuContent>
        {menu.map((menuItem, index) => (
          <Link to={menuItem.url} key={index}>
            <C.MenuItem className={`${index === lastItem && "border-none"}`}>
              {menuItem.title}
            </C.MenuItem>
          </Link>
        ))}
      </C.MenuContent>
    </DropdownMenu>
  );
};

export default transition(Menu);
