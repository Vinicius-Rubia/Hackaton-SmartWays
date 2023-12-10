import tw from "tailwind-styled-components";

export const Hour = tw.span`
  text-xs
  block
  text-white/50
`;

export const MessageUser = tw.p`
  flex
  items-center
  bg-gradient-to-b
  text-[#E5E5E5]
  py-2
  px-3
  rounded-b-md
  text-start
  text-sm
  max-w-[90%]
  sm:max-w-[60%]
  sm:text-base
  bg-[#383838]
  ml-auto
  rounded-tl-md
  rounded-tr-none
`;

export const MessageIA = tw.p`
  flex
  items-center
  bg-gradient-to-b
  text-[#E5E5E5]
  py-2
  px-3
  rounded-b-md
  text-start
  text-sm
  max-w-[90%]
  sm:max-w-[60%]
  sm:text-base
  bg-sw-blue-medium
  mr-auto
  rounded-tr-md
  rounded-tl-none
`;
