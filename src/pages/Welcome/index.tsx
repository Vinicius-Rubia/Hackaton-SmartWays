import Menu from "@/components/Menu";
import { InitChat, MessageResponse } from "@/interfaces";
import { setMessages, setStatusMessage, setStatusResponse } from "@/redux/chatSlice";
import { BotService } from "@/services/BotService";
import { images, transition } from "@/utils";
import { motion } from "framer-motion";
import { SendHorizontal, Sparkles, Target, TrendingUp } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as C from "./styles";

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

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [focusForm, setFocusForm] = useState<boolean>(false);
  const [characters, setCharacters] = useState<number>(100);
  const maxCharacters = 100;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InitChat>();

  const onSubmit: SubmitHandler<InitChat> = async ({ message }) => {
    navigate("/chat");
    dispatch(setMessages({ author: "user", message: message }));
    dispatch(setStatusResponse(true));
    dispatch(setStatusMessage(true));

    const responseMessage = await BotService.post<MessageResponse>("completions");
    dispatch(setMessages({ author: "IA", message: responseMessage.choices[0].message.content }));
    dispatch(setStatusResponse(false));
  };
  
  return (
    <C.Container>
      <motion.div variants={container} initial="hidden" animate="visible" className="h-full">
        <C.RoundedBlur />
        <C.Layout id="layout">
          <C.Content>
            {Menu}
            <C.Title variants={item}>
              Bem vindo a <C.TitleDecoration>SmartWays</C.TitleDecoration>
            </C.Title>
            <C.SubTitle variants={item}>O seu assistente de negociação virtual</C.SubTitle>

            <motion.div variants={item} className="mb-16">
              <C.InputInit onFocus={() => setFocusForm(true)} onBlur={() => setFocusForm(false)} className={`${focusForm && "border-sw-blue"} hover:border-sw-blue`} onSubmit={handleSubmit(onSubmit)}>
                <C.InputChat
                  type="text"
                  placeholder="Comece por aqui..."
                  maxLength={maxCharacters}
                  {...register("message", {
                    required: "Digite uma mensagem para começar",
                    onChange(event) {
                      const newValue = event.target.value;

                      const numberOfCaracters = maxCharacters - newValue.length;

                      newValue.length <= maxCharacters && setCharacters(numberOfCaracters);
                    },
                  })}
                />
                <span className="pl-2">{characters}/100</span>
                <C.Send>
                  <SendHorizontal className="text-white w-5 h-5 group-hover:scale-125 group-hover:rotate-[360deg] duration-300 transition-all" />
                </C.Send>
              </C.InputInit>
              <span className="text-red-500 text-sm flex mt-1">{errors.message?.message}</span>
            </motion.div>

            <C.Comments variants={item}>
              <C.BoxComment>
                <Target className="mx-auto group-hover:scale-150 group-hover:text-sw-blue transition-all" />
                <C.BoxTitle>Assertivo</C.BoxTitle>
                <C.BoxDescription>
                  Respostas fluentes e decisões rápidas
                </C.BoxDescription>
              </C.BoxComment>
              <C.BoxComment>
                <Sparkles className="mx-auto group-hover:scale-150 group-hover:text-sw-blue transition-all" />
                <C.BoxTitle>Preciso</C.BoxTitle>
                <C.BoxDescription>
                  Agilidade e eficiência na negociação online
                </C.BoxDescription>
              </C.BoxComment>
              <C.BoxComment>
                <TrendingUp className="mx-auto group-hover:scale-150 group-hover:text-sw-blue transition-all" />
                <C.BoxTitle>Eficiente</C.BoxTitle>
                <C.BoxDescription>
                  O caminho ideal para resultados certeiros
                </C.BoxDescription>
              </C.BoxComment>
            </C.Comments>

            <a href="https://github.com/Vinicius-Rubia/Hackaton-SmartWays" target="_blank">
              <C.IconGitHub />
            </a>
          </C.Content>
        </C.Layout>

        <C.WaveOne src={images.waveOne} />
        <C.WaveTwo src={images.waveTwo} />
      </motion.div>
    </C.Container>
  )
}

export default transition(Welcome);