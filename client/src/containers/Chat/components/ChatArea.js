import React from "react"
import { Input, Button } from "reactstrap"

const ChatArea = ({
    messages,
    canLoadMore,
    loadMore,
    text,
    setText,
    sendMessage,
    conversationName,
}) => {
    const onKeyUp = (e) => {
        !e.shiftKey && e.key === "Enter" && sendMessage()
    }

    const renderMessage = (message) => {
        const className = !message.isCustomerMessage
            ? "message-right"
            : "message-left"

        return <div className={`d-flex ${!message.isCustomerMessage ? "flex-column" : ""} w-100 ${
            !message.isCustomerMessage
                ? "align-items-end"
                : ""
        }`}>
            {!message.isCustomerMessage && <p className="text-right mb-0 message-sender">{message.sender?.name}</p>}
            <div className={`message ${className}`}>{message.text}</div>
        </div>
    }

    return (
        <div className="h-100 d-flex flex-column">
            {conversationName && (
                <div className="text-right font-weight-bold border-bottom mb-2">
                    {conversationName}
                </div>
            )}
            {canLoadMore && (
                <div className="text-center">
                    <Button color="link" size="sm" onClick={loadMore}>
                        Load more
                    </Button>
                </div>
            )}
            <div className="flex-grow-1" id="message-list">
                {messages.map((message, index) => (
                    <div
                        key={`${message._id}-${index}`}
                        
                    >
                        {renderMessage(message)}
                    </div>
                ))}
                <div id="message-list-bottom" />
            </div>
            <Input
                type="textarea"
                rows={7}
                placeholder="Type something..."
                className="mb-3"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyUp={(e) => onKeyUp(e)}
            />
        </div>
    )
}

export default ChatArea
