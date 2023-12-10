import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectChat } from "../../redux/chatSlice";
import * as C from "./styles";

export const Message: React.FC = () => {
  const { messages, searchMessage } = useSelector(selectChat);
  const messageRefs = useRef<any>([]);

  const scrollToMessage = (index: any) => {
    if (messageRefs.current[index]) {
      messageRefs.current[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const findMessageIndex = (searchText: string | undefined) => {
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i].message.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      
      if (searchText && message.includes(searchText)) {
        scrollToMessage(i);
      }
    }
  
    return null;
  };

  useEffect(() => {
    findMessageIndex(searchMessage?.[0]?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
  }, [searchMessage])

  return messages.map((message, index) => (
    <React.Fragment key={message.id}>
      {message.author === "user" ? (
        <motion.div
          ref={(el) => (messageRefs.current[index] = el)}
          className="flex flex-col items-end gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <C.MessageUser>
            {message.message}
          </C.MessageUser>
          <C.Hour className="ml-auto mr-1">
            {message.createdAt?.toString()}
          </C.Hour>
        </motion.div>
      ) : (
        <motion.div
          ref={(el) => (messageRefs.current[index] = el)}
          className="flex flex-col items-start gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <C.MessageIA>
            {message.message}
          </C.MessageIA>
          <C.Hour className="mr-auto ml-1">
            {message.createdAt?.toString()}
          </C.Hour>
        </motion.div>
      )}
    </React.Fragment>
  ));
};
