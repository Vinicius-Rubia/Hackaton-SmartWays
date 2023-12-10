import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
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
  text-[#e5e5e5]
  m-3
  md:m-9
  bg-white/10
  rounded-2xl
  border
  border-white/10
  backdrop-blur-[30px]
  text-center
  px-3
  pb-3
  pt-12
  overflow-auto
  h-[calc(100%-24px)]
  md:h-[calc(100%-72px)]
  flex
  flex-1
  z-10
`;

export const Content = tw.div`
  max-w-2xl
  m-auto
  flex
  flex-col
  justify-center
`;

export const Title = tw(motion.h1)`
  text-3xl
  font-semibold
  sm:text-5xl
`;

export const TitleDecoration = tw.span`
  text-3xl
  sm:text-5xl
  font-semibold
  block
  sm:inline
  w-fit
  mx-auto
  px-2
  border-l-[3px]
  border-sw-blue
  bg-gradient-to-r
  from-[#4282f180]
  to-[#4282f100]
  my-4
  animate-pulse
`;

export const SubTitle = tw(motion.h2)`
  text-sm
  px-4
  sm:mt-6
  sm:text-base
`;

export const InputInit = tw.form`
  rounded-[10px]
  h-14
  bg-[#252525]
  flex
  items-center
  gap-2
  pl-3
  pr-1.5
  py-1.5
  mt-10
  border
  border-white/10
`;

export const InputChat = tw(Input)`
  w-full
  h-full
  bg-transparent
  border-none
  outline-none
  placeholder:text-white/30
  text-ellipsis overflow-hidden
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

export const Comments = tw(motion.div)`
  flex
  items-center
  justify-center
  flex-wrap
  lg:flex-nowrap
  gap-12
  mb-20
`;

export const BoxComment = tw(motion.div)`
  text-center
  grid
  gap-1
  transition-all
  hover:scale-105
  group
`;

export const BoxTitle = tw.h3`
  mt-2
  font-medium
  text-white
`;

export const BoxDescription = tw.p`
  text-sm
  text-[#E5E5E5]
  font-light
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

export const IconGitHub = tw(Github)`
  mx-auto
  text-2xl
  cursor-pointer
  hover:scale-125
  hover:rotate-[360deg]
  transition-all
  lg:absolute
  lg:bottom-3
  lg:right-3
`;