import { Button } from "@/components/ui/button";
import tw from "tailwind-styled-components";

export const Container = tw.section`
  bg-black
  h-screen
  relative
  overflow-hidden
`;

export const RoundedBlur = tw.span`
  absolute
  w-full
  h-[250px]
  blur-[20px]
  right-0
  left-0
  rounded-b-full
  -top-10
  sm:w-[534px]
  sm:h-[534px]
  bg-gradient-to-tr
  from-[#4282f1cc]
  to-[#4282f183]
  sm:rounded-full
  sm:blur-[50px]
  sm:-right-44
  sm:-top-44
  sm:left-auto
`;

export const Layout = tw.div`
  relative
  text-[#E5E5E5]
  m-3
  md:m-9
  bg-[#ffffff1a]
  rounded-2xl
  border
  border-white/10
  backdrop-blur-[30px]
  text-center
  pb-3
  overflow-auto
  h-[calc(100%-24px)]
  md:h-[calc(100%-72px)]
  flex
  flex-1
  z-10
`;

export const Content = tw.div`
  w-full
  flex
  flex-col
`;

export const InputInit = tw.form`
  h-14
  bg-[#181719]
  flex
  items-center
  gap-2
  pl-3
  pr-1.5
  py-1.5
  mt-3.5
  border
  md:mt-10
  md:mx-9
  mx-3
  rounded-lg
  border-white/10
`;

export const Input = tw.input`
  w-full
  h-full
  bg-transparent
  outline-none
  text-white
  placeholder:text-white/30
  text-ellipsis
  overflow-hidden
  border-l
  border-l-white/30
  pl-2
`;

export const Send = tw(Button)`
  bg-gradient-to-r
  from-sw-blue/80
  to-sw-blue-medium/80
  border
  border-sw-blue
  px-3
  my-1.5
  h-full
  grid
  place-items-center
  rounded-xl
  hover:from-sw-blue
  hover:to-sw-blue-medium
  transition-all
  group
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