import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { ChevronRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

export const Container = tw.section`
  bg-black
  h-screen
  flex
  flex-col
  gap-5
  justify-center
  items-center
`;

export const Header = tw(motion.header)`
  relative
  flex
  justify-center
  items-center
  text-white
  gap-3
`;

export const Logo = tw.img`
  w-16
  h-16
`;

export const Title = tw(motion.h1)`
  text-3xl
`;

export const TabsContainer = tw(Tabs)`
  max-w-[400px]
  mx-3
`;

export const TabsHeader = tw(TabsList)`
  grid
  grid-cols-2
  w-full
`;

export const CardContainer = tw(Card)`
  border-sw-dark-light
`;

export const CardTitleForm = tw(CardTitle)`
  text-white
`;

export const CardDescriptionForm = tw(CardDescription)`
  text-sw-white/50
`;

export const CardContentForm = tw(CardContent)`
  space-y-2
`;

export const CardField = tw.div`
  space-y-1
`;

export const LabelField = tw(Label)`
  text-white
`;

export const InputField = tw(Input)`
  px-2
  bg-transparent
  text-sw-white

  data-[error=true]:border-red-400
  data-[error=true]:outline-red-500
  data-[error=false]:border-sw-dark-light
`;

export const CardFooterForm = tw(CardFooter)`
  text-sw-white
`;

export const BtnSubmit = tw(Button)`
  bg-sw-blue-medium
  hover:bg-sw-blue
  focus:bg-sw-blue
`;

export const IconChevronRight = tw(ChevronRight)`
  w-5
  h-5
  ml-1
`;

export const IconSubmitting = tw(Loader2)`
  w-5
  h-5
  ml-1
  animate-spin
`;

export const LinkBack = tw(Link)`
  absolute
  left-3
  bg-sw-blue-medium
  hover:bg-sw-blue
  focus:bg-sw-blue
  flex
  justify-center
  items-center
  rounded-full
  w-7
  h-7
`;

export const WaveOne = tw.img`
  absolute
  bottom-0
  left-0
  right-0
  z-[5]
`;

export const WaveTwo = tw.img`
  absolute
  bottom-0
  left-0
  right-0
`;

export const Footer = tw(motion.footer)`
  text-center
  text-sw-white/50
  text-xs
  mt-4
`;
