import React from "react"

import ConversationList from "./ConversationList"

const CHAT_BOX_BUTTON = "/icons/chatbox.png"

const ChatBoxButton = ({ conversations, unreadConversations, canLoadMore, loadMore, isLoading, isOpen, toggle, toggleConversation }) => {
    return <div className="position-absolute chat-box-btn-container">
        <div className="position-relative">
            <img 
                className="hover-opacity cursor-pointer chat-box-btn" 
                src={CHAT_BOX_BUTTON} 
                alt="chat-box-button" 
                onClick={toggle}
            />
            {unreadConversations > 0 && <div className="position-absolute d-flex align-items-center justify-content-center unread-conversation-count">
                {unreadConversations}    
            </div>}
            {isOpen && <div className="position-absolute conversation-list">
                <ConversationList 
                    conversations={conversations}
                    canLoadMore={canLoadMore}
                    loadMore={loadMore}
                    isLoading={isLoading}
                    toggleConversation={toggleConversation}
                />
            </div>}
        </div>
    </div>
}

export default ChatBoxButton