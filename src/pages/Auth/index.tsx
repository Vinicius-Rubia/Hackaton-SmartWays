import { CardHeader } from "@/components/ui/card";
import { TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { AuthResponse } from "@/interfaces";
import { AuthSignIn } from "@/interfaces/requests/auth";
import { selectAuth, setLogin } from "@/redux/authSlice";
import { HelperTextError } from "@/shared/HelperTextError";
import { images, toast, transition } from "@/utils";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as C from "./styles";

const containerLogo = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

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

const nameLogo = ["S", "m", "a", "r", "t", "w", "a", "y", "s"];

const url = import.meta.env.VITE_API_BASE_URL_LOGIN;

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogged } = useSelector(selectAuth);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSignIn>();

  const onSubmit: SubmitHandler<AuthSignIn> = async (data) => {
    setIsSubmitting(true);

    const authRS = await axios.post<AuthResponse>(url, data);

    if (authRS.data.isLogged) {
      dispatch(setLogin(true));
      navigate("/context");
    } else {
      toast({
        title: "Ops! Algo deu errado... 😬",
        description: "Houve uma falha em autenticar. Tente novamente mais tarde.",
      });
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    if (isLogged) {
      navigate("/context");
    }
  }, [isLogged]);

  return (
    <C.Container>
      <motion.div variants={container} initial="hidden" animate="visible">
        <C.Header variants={item}>
          <C.LinkBack to="/welcome">
            <C.IconChevronRight className="rotate-180 m-0" />
          </C.LinkBack>

          <C.Logo src={images.smartWaysLogo} alt="SmartWays" />
          <C.Title variants={containerLogo} initial="hidden" animate="visible">
            {nameLogo.map((letter, index) => (
              <motion.span key={index} variants={item}>
                {letter}
              </motion.span>
            ))}
          </C.Title>
        </C.Header>

        <C.TabsContainer defaultValue="signIn">
          <motion.div variants={item}>
            <C.TabsHeader>
              <TabsTrigger value="signIn">Entrar</TabsTrigger>
              <TabsTrigger value="about">Sobre</TabsTrigger>
            </C.TabsHeader>
          </motion.div>

          <motion.div variants={item}>
            <TabsContent value="signIn">
              <form onSubmit={handleSubmit(onSubmit)}>
                <C.CardContainer>
                  <CardHeader>
                    <C.CardTitleForm>Acesse sua Conta</C.CardTitleForm>
                    <C.CardDescriptionForm>
                      Faça o login para explorar e aproveitar ao máximo nossos
                      serviços.
                    </C.CardDescriptionForm>
                  </CardHeader>
                  <C.CardContentForm>
                    <C.CardField>
                      <C.LabelField htmlFor="email">Email</C.LabelField>
                      <C.InputField
                        id="email"
                        placeholder="Digite seu email"
                        data-error={!!errors.username?.message}
                        {...register("username", {
                          required: "Campo é obrigatório",
                          pattern: {
                            value: /\S+@\S+.\S+/,
                            message: "Insira um endereço de email válido",
                          },
                        })}
                      />
                      <HelperTextError validation={errors.username?.message} />
                    </C.CardField>

                    <C.CardField>
                      <C.LabelField htmlFor="password">Senha</C.LabelField>
                      <C.InputField
                        id="password"
                        type="password"
                        placeholder="Digite sua senha"
                        data-error={!!errors.password?.message}
                        {...register("password", {
                          required: "Campo é obrigatório",
                          maxLength: {
                            value: 8,
                            message: "Digite no máximo 8 digitos",
                          },
                          minLength: {
                            value: 4,
                            message: "Digite no mínimo 4 digitos",
                          },
                        })}
                      />

                      <HelperTextError validation={errors.password?.message} />
                    </C.CardField>
                  </C.CardContentForm>
                  <C.CardFooterForm>
                    <C.BtnSubmit disabled={isSubmitting}>
                      Entrar
                      {isSubmitting ? (
                        <C.IconSubmitting />
                      ) : (
                        <C.IconChevronRight />
                      )}
                    </C.BtnSubmit>
                  </C.CardFooterForm>
                </C.CardContainer>
              </form>
            </TabsContent>

            <TabsContent value="about">
              <C.CardContainer>
                <CardHeader>
                  <C.CardTitleForm>Área Restrita</C.CardTitleForm>
                  <C.CardDescriptionForm>
                    Bem-vindo à "Área Restrita para Administradores",
                  </C.CardDescriptionForm>
                </CardHeader>
                <C.CardContentForm>
                  <C.CardDescriptionForm>
                    Esse é um espaço especialmente dedicado aos líderes. Essa
                    seção é estritamente reservada aos administradores
                    autorizados, representando o controle e a gestão do projeto.
                  </C.CardDescriptionForm>
                </C.CardContentForm>
                <C.CardFooterForm>
                  <C.BtnSubmit>
                    <Link to="welcome" className="flex items-center">
                      <C.IconChevronRight className="rotate-180 m-0" />
                      Voltar para o chat
                    </Link>
                  </C.BtnSubmit>
                </C.CardFooterForm>
              </C.CardContainer>
            </TabsContent>
          </motion.div>
        </C.TabsContainer>
        <C.Footer variants={item}>
          <p>Copyright &copy; SmartWays</p>
        </C.Footer>
      </motion.div>
    </C.Container>
  );
};

export default transition(Auth);
