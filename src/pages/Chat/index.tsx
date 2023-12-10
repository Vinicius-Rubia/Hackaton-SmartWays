import { ActionsChat } from "@/components/ActionsChat";
import { Header } from "@/components/Header";
import { WindowChat } from "@/components/WindowChat";
import { MessageResponse } from "@/interfaces";
import { BotService } from "@/services/BotService";
import { transition } from "@/utils";
import { motion } from "framer-motion";
import { SendHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectChat, setMessages, setStatusMessage, setStatusResponse } from "../../redux/chatSlice";
import { images } from "../../utils/images";
import * as C from "./styles";

interface InitChat {
  message: string;
}

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const { statusMessage } = useSelector(selectChat);

  const [countdown, setCountdown] = useState(20);
  const [focusForm, setFocusForm] = useState<boolean>(false);
  const [characters, setCharacters] = useState<number>(100);
  const maxCharacters = 100;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<InitChat>();

  const onSubmit: SubmitHandler<InitChat> = async ({ message }) => {
    dispatch(setStatusMessage(true));

    dispatch(setMessages({ author: "user", message: message }));
    setValue("message", "");

    dispatch(setStatusResponse(true));

    const responseMessage = await BotService.post<MessageResponse>("completions");
    dispatch(setMessages({ author: "IA", message: responseMessage.choices[0].message.content }));
    dispatch(setStatusResponse(false));
  };

  useEffect(() => {
    let timer: any;

    if (statusMessage) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [statusMessage]);

  useEffect(() => {
    if (countdown === 0) {
      dispatch(setStatusMessage(false));
    }
  }, [countdown]);

  useEffect(() => {
    setCountdown(20);
    setCharacters(100);
    setFocusForm(false);
  }, [statusMessage]);

  return (
    <C.Container>
      <motion.div variants={container} initial="hidden" animate="visible" className="h-full">
        <C.RoundedBlur />
        <C.Layout>
          <C.Content>
            <Header />

            <WindowChat />

            <motion.div variants={item}>
              <C.InputInit onFocus={() => setFocusForm(true)} onBlur={() => setFocusForm(false)} className={`${focusForm && !statusMessage && "border-sw-blue"} ${!statusMessage && "hover:border-sw-blue"}`} onSubmit={handleSubmit(onSubmit)}>
                <ActionsChat />
                <C.Input
                  disabled={statusMessage}
                  type="text"
                  maxLength={maxCharacters}
                  placeholder={statusMessage ? `${countdown > 0 && `Aguarde ${countdown} segundos para continuar`}` : "Digite sua mensagem"}
                  {...register("message", {
                    required: "Mensagem é necessária",
                    onChange(event) {
                      const newValue = event.target.value;

                      const numberOfCaracters = maxCharacters - newValue.length;

                      newValue.length <= maxCharacters && setCharacters(numberOfCaracters);
                    },
                  })}
                />
                <span className="pl-2">{characters}/100</span>
                <C.Send
                  disabled={statusMessage}
                  className="disabled:cursor-not-allowed"
                  onClick={handleSubmit(onSubmit)}
                >
                  <SendHorizontal className="text-white w-5 h-5 group-hover:scale-125 group-hover:rotate-[360deg] duration-300 transition-all" />
                </C.Send>
              </C.InputInit>
              <span className="text-red-500 text-sm flex mt-1 ml-3 md:ml-9">{errors.message?.message}</span>
            </motion.div>
          </C.Content>
        </C.Layout>

        <C.WaveOne src={images.waveOne} />
        <C.WaveTwo src={images.waveTwo} />
      </motion.div>
    </C.Container>
  );
};

export default transition(Chat);
