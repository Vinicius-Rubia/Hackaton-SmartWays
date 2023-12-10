import { Search, X } from "lucide-react";
import tw from "tailwind-styled-components";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const Container = tw.section`
  relative
  flex
  flex-col
  bg-[#181719]
  mt-7
  rounded-2xl
  flex-1
  border
  border-[#464646]
  md:p-7
  p-3
  gap-4
  overflow-auto
  sm:mx-3
  md:mx-9
  mx-3
`;

export const SearchContainer = tw.div`
  fixed
  top-40
  right-5
  sm:right-16
  flex
  items-center
  bg-sw-dark-medium
  border
  border-sw-dark-light
  rounded-md
  h-9
  text-sm
  pl-2
`;

export const DismissSearch = tw(Button)`
  focus:text-sw-white
  hover:text-sw-white
  cursor-pointer
  hover:bg-sw-blue
  focus:bg-sw-blue
  rounded-sm
  absolute
  -left-8
  p-1
  h-fit
`;

export const IconClose = tw(X)`
  w-5
  h-5
`;

export const IconSearch = tw(Search)`
  w-5
  h-5
`;

export const InputSearch = tw(Input)`
  bg-transparent
  h-full
  outline-none
  border-none
`;

export const ButtonSearch = tw(Button)`
  focus:text-sw-white
  hover:text-sw-white
  cursor-pointer
  hover:bg-sw-blue
  focus:bg-sw-blue
  rounded-sm
  p-1
  h-full
`;
