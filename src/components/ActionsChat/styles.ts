import tw from "tailwind-styled-components";
import { Button } from "../ui/button";
import { PopoverContent } from "../ui/popover";

export const ButtonActions = tw(Button)`
  text-white
  w-10
  h-10
  border
  border-transparent
  focus:border-sw-white
  outline-none
  hover:border-sw-white
  rounded-md
  p-2
  bg-sw-blue
`;

export const ActionsContainer = tw(PopoverContent)`
  bg-sw-dark
  border
  border-sw-dark-light
  p-3
  z-50
  w-[250px]
  rounded-md
  absolute
  bottom-10
`;

export const ActionsHeader = tw.div`
  flex
  items-center
  justify-between
  text-sw-white
  border-b
  border-b-sw-dark-light
  pb-2
  mb-3
`;

export const ActionsContent = tw.div`
  text-sw-white
  flex
  flex-col
  gap-2
`;

export const ActionsItem = tw.div`
  h-10
  rounded-md
  flex
  items-center
  justify-start
  gap-2
  pl-3
  cursor-pointer
  w-full
  bg-sw-dark-medium
  hover:bg-sw-dark-light
`;
