import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectChat, setSearch, setSearchMessage } from "../../redux/chatSlice";
import { Message } from "../Message";
import * as C from "./styles";

export const WindowChat: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { status, messages, search } = useSelector(selectChat);
  const [searchMessageInput, setSearchMessageInput] = useState<string>("");
  const dispatch = useDispatch();

  const handleScrollDown = () => {
    const { current } = scrollRef;
    current!.scrollTop = current!.scrollHeight;
  };

  const handleInputKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const message = messages
      .filter((m) =>
        m.message
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(
            searchMessageInput
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
          )
      )
      .map((e) => e.message);
    dispatch(setSearchMessage(message));
  };

  const dismissSearch = () => {
    dispatch(setSearch(false));
    setSearchMessageInput("");
  };

  useEffect(() => {
    handleScrollDown();
  }, [status]);
  return (
    <C.Container ref={scrollRef}>
      <Message />

      {search && (
        <C.SearchContainer>
          <C.DismissSearch onClick={dismissSearch}>
            <C.IconClose />
          </C.DismissSearch>

          <C.InputSearch
            type="text"
            onChange={(e) => setSearchMessageInput(e.target.value)}
            value={searchMessageInput}
            onKeyDown={handleInputKeyPress}
          />

          <C.ButtonSearch onClick={handleSearch}>
            <C.IconSearch />
          </C.ButtonSearch>
        </C.SearchContainer>
      )}
    </C.Container>
  );
};
