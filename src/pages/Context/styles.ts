import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, Upload as UploadIcon } from "lucide-react";
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
  from-blue-600
  to-sky-500
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
  z-10
`;

export const Content = tw.div`
  flex
  flex-col
  justify-center
  lg:h-full
`;

export const Title = tw(motion.h1)`
  text-xl
  font-semibold
  mt-12
  sm:text-start
  sm:mt-0
  sm:ml-3
`;

export const TitleDecoration = tw.span`
  text-xl
  font-semibold
  block
  sm:inline
  w-fit
  mx-auto
  px-2
  border-l-[3px]
  border-white
  bg-gradient-to-r
  from-[#42c2f1]
  to-[#4282f151]
  my-4
  animate-pulse
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
  cursor-pointer
  hover:scale-125
  hover:rotate-[360deg]
  transition-all
  sm:ml-auto
  sm:mr-0
  lg:absolute
  lg:bottom-3
  lg:right-3
  group-focus:border
  group-focus:scale-125
  group-focus:rotate-[360deg]
  rounded-full
  w-7
  h-7
  p-1
`;

export const Context = tw(motion.form)`
  grid
  grid-cols-1
  lg:grid-cols-6
  mt-10
  mx-3
`;

export const EditContext = tw.div`
  grid
  gap-3
  col-span-2
`;

export const Upload = tw.label`
  flex
  gap-3.5
  items-center
  justify-center
  rounded-[10px]
  outline-dotted
  outline-2
  text-white/30
  bg-white/5
  outline-white/30
  hover:outline-white
  focus:outline-white
  hover:text-white
  w-full
  cursor-pointer
  py-3
  text-center
`;

export const IconUpload = tw(UploadIcon)`
  text-2xl
`;

export const ViewText = tw.textarea`
  bg-white/5
  outline-none
  border
  border-white/30
  focus:border-white
  text-white/30
  placeholder:text-white/30
  hover:border-white
  w-full
  p-4
  rounded-[10px]
  min-h-[440px]
  italic
`;

export const ViewContent = tw.div`
  col-span-4
  bg-[#23262F]
  rounded-2xl
  p-3
  shadow-[0px_-15px_0_0_rgb(40,75,150)]
  mx-auto
  flex
  flex-col
  mt-10
  w-full
  text-sm
  min-h-[440px]
  mb-20

  lg:order-first
  lg:shadow-[-25px_-20px_0_0_rgb(40,75,150)]
  lg:ml-9
  lg:mt-0
  lg:w-3/4
  lg:min-h-[auto]
  lg:mb-0
`;

export const BtnSaveContext = tw(Button)`
  bg-gradient-to-r
  from-sky-700
  to-sky-900
  hover:from-sky-600
  hover:to-sky-800
  h-14
  rounded-[10px]
  uppercase
  text-center
  font-semibold
`;

export const BallsIllutration = tw.div`
  flex
  items-center
  gap-2
  mb-3
  animate-pulse
`;

export const BallOne = tw.span`
  w-4
  h-4
  rounded-full
  bg-red-500
  transition-all
  hover:scale-150
`;

export const BallTwo = tw.span`
  w-4
  h-4
  rounded-full
  bg-yellow-500
  transition-all
  hover:scale-150
`;

export const BallThree = tw.span`
  w-4
  h-4
  rounded-full
  bg-green-500
  transition-all
  hover:scale-150
`;

export const ContentFile = tw.textarea`
  w-full
  h-full
  bg-transparent
  outline-none
  resize-none
  tracking-[1px]
`;

export const BackOriginalContext = tw(Button)`
  text-sm 
  w-fit
  mx-auto
  hover:underline
  hover:text-cyan-500
`;

export const LinkGitHub = tw.a`
  mt-5
  group
`;