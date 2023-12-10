import { MessageResponse } from "@/interfaces";
import {
  selectChat,
  setMessages,
  setStatusMessage,
  setStatusResponse,
} from "@/redux/chatSlice";
import { BotService } from "@/services/BotService";
import { PopoverClose } from "@radix-ui/react-popover";
import { CreditCard, GanttChartSquare, Plus, X } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popover, PopoverTrigger } from "../ui/popover";
import * as C from "./styles";

export const ActionsChat: React.FC = () => {
  const dispatch = useDispatch();
  const { statusMessage } = useSelector(selectChat);

  const selectOption = async (option: number) => {
    dispatch(setStatusResponse(true));
    dispatch(setStatusMessage(true));

    switch (option) {
      case 1:
        dispatch(setMessages({ author: "user", message: "Gostaria de saber sobre minhas faturas" }));
        break;
      case 2:
        dispatch(setMessages({ author: "user", message: "Gostaria de pagar minhas faturas" }));
        break;
    }

    const responseMessage = await BotService.post<MessageResponse>("completions");
    dispatch(setMessages({ author: "IA", message: responseMessage.choices[0].message.content }));
    dispatch(setStatusResponse(false));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <C.ButtonActions disabled={statusMessage}>
          <Plus />
        </C.ButtonActions>
      </PopoverTrigger>
      <C.ActionsContainer>
        <C.ActionsHeader>
          <h3>O que quer fazer?</h3>
          <PopoverClose aria-label="Close">
            <X />
          </PopoverClose>
        </C.ActionsHeader>
        <C.ActionsContent>
          <PopoverClose aria-label="Close">
            <C.ActionsItem onClick={() => selectOption(1)}>
              <GanttChartSquare />
              Consultar faturas
            </C.ActionsItem>
          </PopoverClose>
          <PopoverClose aria-label="Close">
            <C.ActionsItem onClick={() => selectOption(2)}>
              <CreditCard /> Pagar faturas
            </C.ActionsItem>
          </PopoverClose>
        </C.ActionsContent>
      </C.ActionsContainer>
    </Popover>
  );
};
