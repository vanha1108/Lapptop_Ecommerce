import React from "react"
import { Button } from "reactstrap"

const ConversationList = ({
    conversations,
    canLoadMore,
    loadMore,
    isLoading,
    toggleConversation,
}) => {
    return (
        <div>
            {conversations && conversations.length > 0 ? (
                <div>
                    {conversations.map((conversation) => (
                        <div
                            key={conversation._id}
                            className="cursor-pointer conversation-item user-select-none d-flex align-items-center justify-content-between"
                            onClick={() => toggleConversation(conversation)}
                        >
                            <span>{conversation.customer?.name}</span>
                            {conversation.unreadMessages > 0 && (
                                <span className="font-weight-bold text-danger">
                                    {conversation.unreadMessages}
                                </span>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="d-flex align-items-center justify-content-center px-3 py-2">
                            <div
                                className="spinner-border text-primary"
                                role="status"
                            >
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )}
                    {canLoadMore && (
                        <div className="text-center">
                            <Button color="link" onClick={loadMore}>
                                Load more
                            </Button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="px-3 py-2">No conversation.</div>
            )}
        </div>
    )
}

export default ConversationList
