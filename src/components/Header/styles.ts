import { motion } from "framer-motion";
import tw from "tailwind-styled-components";
import { Button } from "../ui/button";

export const Header = tw(motion.header)`
  flex
  items-center
  justify-between
  bg-white/5
  backdrop-blur-lg]
  border
  border-white/5
  md:px-9
  px-3
  py-7
`;

export const Head = tw.div`
  flex
  items-center
  gap-2.5
`;

export const ImgLogo = tw.img`
  w-10
  h-10
`;

export const TitleChat = tw.h2`
  text-start
  font-medium
`;

export const Status = tw.p`
  text-xs
  text-start
  text-sw-blue
  font-medium
`;

export const ButtonSearch = tw(Button)`
  flex
  items-center
  mr-14
  hover:bg-sw-dark-light
  focus:bg-sw-dark-light
  p-2
`;

export const Menu = tw(motion.div)`
  absolute
  right-3
  md:right-9
  top-[18px]
`;
