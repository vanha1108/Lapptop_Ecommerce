import React from "react"
import { Row, Col } from "reactstrap"

import ChatArea from "../components/ChatArea"
import ChatBoxButton from "../components/ChatBoxButton"

import useConversationList from "../hooks/useConversationList"
import useChat from "../hooks/useChat"

const ChatContainer = () => {
    const {
        conversations,
        unreadConversations,
        canLoadMore,
        loadMore,
        isLoading,
        isOpen,
        toggle,
        activeConversation,
        toggleConversation,
    } = useConversationList()

    const {
        messages,
        canLoadMore: canLoadMoreMessages,
        loadMore: loadMoreMessages,
        text,
        setText,
        sendMessage,
    } = useChat(activeConversation)

    return (
        <div className="animated fadeIn h-100 d-flex flex-column position-relative">
            <ChatBoxButton
                conversations={conversations}
                unreadConversations={unreadConversations}
                canLoadMore={canLoadMore}
                loadMore={loadMore}
                isLoading={isLoading}
                isOpen={isOpen}
                toggle={toggle}
                toggleConversation={toggleConversation}
            />
            <Row className="mb-2 flex-grow-1">
                <Col md={12} className="pl-5">
                    <ChatArea
                        conversationName={activeConversation?.customer?.name}
                        messages={messages}
                        canLoadMore={canLoadMoreMessages}
                        loadMore={loadMoreMessages}
                        text={text}
                        setText={setText}
                        sendMessage={sendMessage}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default ChatContainer
