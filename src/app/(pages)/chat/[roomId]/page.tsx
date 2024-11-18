"use client";

import ChatRoomMessageSection from "@/_components/chat/ChatRoomMessageSection";
import ChatRoomTitleSection from "@/_components/chat/ChatRoomTitleSection";
import { useChatSubscriptionMessageList } from "@/_components/chat/hooks/useChatSubscriptionMessageList";
import {
  useChatRoomMessage,
  useChatRoomTitle
} from "@/_components/chat/hooks/useChatRoom";
import useUser from "@/_hooks/useUser";
import PageTitle from "@/_components/common/PageTitle";

type Props = {
  params: {
    roomId: string;
  };
};

const ChatRoom = ({ params }: Props) => {
  // 미들웨어에서 접근 차단 및 roomId NaN 같은거 나와도 차단
  const roomId = Number(params.roomId);
  const user = useUser();
  const { chatRoomTitle } = useChatRoomTitle(roomId);
  const { messagesByDate, lastMessage } = useChatRoomMessage(roomId);
  const { messageListRef, lastMessageRef } = useChatSubscriptionMessageList({
    userId: user?.id || "",
    roomId,
    type: "meet"
  });

  if (!user) return <></>;

  return (
    <div className="mb-[60px] mt-[40px]">
      <div className="inner m-auto w-full max-w-[1360px] px-[30px] max-989:px-[15px]">
        <PageTitle text={"대화 모아보기"} />
        <div className="mt-[50px] flex items-center justify-between border-b-2 border-b-[#BFBFBF] pb-[16px] max-767:mt-[20px]"></div>
        <div className="mt-[30px] overflow-hidden rounded-[12px] bg-[#FFEFE5]">
          <ChatRoomTitleSection chatRoomTitle={chatRoomTitle} />
          <ChatRoomMessageSection
            loginUserId={user.id}
            roomId={roomId}
            messagesByDate={messagesByDate}
            messageListRef={messageListRef}
            lastMessage={lastMessage}
            lastMessageRef={lastMessageRef}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
