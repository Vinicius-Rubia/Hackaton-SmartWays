import { Input } from "@/components/ui/input";
import { toast, transition } from "@/utils";
import { motion } from "framer-motion";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Menu from "../../components/Menu";
import { environment } from "../../environment/environments";
import { selectChat, setContext } from "../../redux/chatSlice";
import { images } from "../../utils/images";
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

const Context: React.FC = () => {
  const [fileContent, setFileContent] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const dispatch = useDispatch();
  const { context } = useSelector(selectChat);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile && selectedFile.type === "text/plain") {
      setFileName(selectedFile.name);
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          const fileText = e.target.result as string;
          setFileContent(fileText);
        }
      };
      reader.readAsText(selectedFile);

      toast({
        title: "Arquivo Carregado com Sucesso! ✅",
        description: "Arquivo carregado com êxito. Pronto para seguir em frente.",
      });
      
    } else {
      toast({
        title: "Ops! Arquivo Incompatível 🚫",
        description: "Por favor, carregue um arquivo .txt válido e tente novamente.",
      });
    }
  };

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setFileContent(newText);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (fileContent) {
      dispatch(setContext(fileContent));
      toast({
        title: "Contexto Atualizado! ✅",
        description: "Seu contexto foi salvo com sucesso. Sinta-se à vontade para continuar a conversa ou explorar novas possibilidades!",
      });
    } else {
      toast({
      title: "Já Estamos no Ponto Certo! 🎉",
      description: "Não se preocupe, o contexto já está salvo! Nada mais a mudar por aqui.",
    });
    }
  }

  const backOriginalContext = () => {
    setFileContent("");
    setFileName("");
    if (context !== environment.INITIAL_CONTEXT) {
      dispatch(setContext(environment.INITIAL_CONTEXT));
      toast({
        title: "Contexto Restaurado! 🔄",
        description: "Ufaa! Recuperamos a versão original do seu contexto. Não se preocupe.",
      });
    } else {
      toast({
        title: "Já Estamos no Ponto Certo! 🎉",
        description: "Não se preocupe, você já está no contexto original! Nada mais a mudar por aqui.",
      });
    }
  }

  return (
    <C.Container>
      <motion.div variants={container} initial="hidden" animate="visible" className="h-full">
        <C.RoundedBlur />
        <C.Layout id="layout">
          <C.Content>
            {Menu}
            <C.Title variants={item}>
              Escolha um arquivo para o{" "}
              <C.TitleDecoration>Contexto</C.TitleDecoration>
            </C.Title>

            <C.Context onSubmit={onSubmit} variants={item}>
              <C.EditContext>
                <C.Upload>
                  <C.IconUpload />
                  <p>
                    <strong>{fileName ? fileName : "Procurar arquivo"}</strong>
                  </p>
                  <Input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </C.Upload>

                <C.ViewText
                  value={fileContent ? fileContent : context}
                  onChange={handleTextareaChange}
                  placeholder="Carregue um arquivo para visualizar aqui o conteúdo..."
                />

                <C.BackOriginalContext type="button" onClick={backOriginalContext}>Voltar para versão original</C.BackOriginalContext>

                <C.BtnSaveContext>Salvar contexto</C.BtnSaveContext>
              </C.EditContext>

              <C.ViewContent>
                  <C.BallsIllutration>
                    <C.BallOne></C.BallOne>
                    <C.BallTwo></C.BallTwo>
                    <C.BallThree></C.BallThree>
                  </C.BallsIllutration>
                  {fileContent && <C.ContentFile readOnly value={fileContent.replace(/(\d+)\./g, "\n\n$1.")} />}
                  {(context && !fileContent) && <C.ContentFile readOnly value={context.replace(/(\d+)\./g, "\n\n$1.")} />}
              </C.ViewContent>
            </C.Context>

            <C.LinkGitHub href="https://github.com/Vinicius-Rubia/Hackaton-SmartWays" target="_blank">
              <C.IconGitHub />
            </C.LinkGitHub>
          </C.Content>
        </C.Layout>

        <C.WaveOne src={images.waveOne} />
        <C.WaveTwo src={images.waveTwo} />
      </motion.div>
    </C.Container>
  );
};

export default transition(Context);
