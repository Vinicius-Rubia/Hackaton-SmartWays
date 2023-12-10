import tw from "tailwind-styled-components";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const Trigger = tw(DropdownMenuTrigger)`
  absolute
  top-3
  right-3
  outline-none
  bg-transparent
  rounded-md
  p-2
  focus:bg-[#383838]
`;

export const MenuContent = tw(DropdownMenuContent)`
  absolute
  -right-3
  top-3
  rounded-md
  z-20
  overflow-hidden
  min-w-[270px]
  bg-[#222222]
  text-[#E5E5E5]
  border
  border-white/30
`;

export const MenuItem = tw(DropdownMenuItem)`
  outline-none
  focus:bg-[#383838]
  cursor-pointer
  h-12
  pl-4
  flex
  items-center
  border-b
  border-white/30
`;
