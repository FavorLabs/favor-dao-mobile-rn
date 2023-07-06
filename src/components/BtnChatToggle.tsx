import * as React from "react";
import ChatIcon from '../assets/svg/toChatIcon.svg';
import UnionIcon from '../assets/svg/toUnionIcon.svg';
import SvgIcon from "./SvgIcon";

type Props = {
  isChat: boolean;
};

const BtnChatToggle: React.FC<Props> = (props) => {
  const { isChat } = props
  return <SvgIcon svg={ isChat ? <UnionIcon/> : <ChatIcon/> } width={30} height={30}/>
};

export default BtnChatToggle;
