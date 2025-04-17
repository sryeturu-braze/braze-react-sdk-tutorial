import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { RefreshCw } from 'lucide-react'; 
import CustomContentCard from '../components/CustomContentCard';
import * as braze from "@braze/web-sdk";

function ContentCards({ cards }) {
    const [selectedThreadId, setSelectedThreadId] = useState(null);
    const [pinnedThreads, setPinnedThreads] = useState({}); // { threadId: pinnedTimestamp }

    useEffect(() => {
        const pinned = JSON.parse(localStorage.getItem('pinnedThreads')) || {};
        setPinnedThreads(pinned);
    }, []);

    const savePinnedThreads = (updatedPinned) => {
        localStorage.setItem('pinnedThreads', JSON.stringify(updatedPinned));
        setPinnedThreads(updatedPinned);
    };

    const refreshCards = () => {
        braze.requestContentCardsRefresh();
    };

    const latestCards = useMemo(() => {
        const threadMap = {};
        cards.forEach(card => {
            const threadId = card.extras.threadId;
            if (!threadMap[threadId] || new Date(card.created) > new Date(threadMap[threadId].created)) {
                threadMap[threadId] = card;
            }
        });

        const allLatestCards = Object.values(threadMap);

        const pinned = allLatestCards.filter(card => pinnedThreads[card.extras.threadId]);
        const unpinned = allLatestCards.filter(card => !pinnedThreads[card.extras.threadId]);

        pinned.sort((a, b) => pinnedThreads[b.extras.threadId] - pinnedThreads[a.extras.threadId]);
        unpinned.sort((a, b) => new Date(b.created) - new Date(a.created));

        return [...pinned, ...unpinned];
    }, [cards, pinnedThreads]);

    const threadMessages = useMemo(() => {
        if (!selectedThreadId) return [];
        return cards
            .filter(card => card.extras.threadId === selectedThreadId)
            .sort((a, b) => new Date(b.created) - new Date(a.created)); // chronological order
    }, [selectedThreadId, cards]);

    const togglePin = (threadId) => {
        const updatedPinned = { ...pinnedThreads };
        if (updatedPinned[threadId]) {
            delete updatedPinned[threadId];
        } else {
            updatedPinned[threadId] = Date.now();
        }
        savePinnedThreads(updatedPinned);
    };

    return (
        <Container>
            <Inbox>
                <Header>
                    <span>Messages</span>
                    <RefreshButton onClick={refreshCards}>
                        <RefreshCw size={20} />
                    </RefreshButton>
                </Header>
                <CardList>
                    {latestCards.map(card => (
                        <CustomContentCard
                            key={card.id}
                            title={card.title}
                            imageUrl={card.imageUrl}
                            description={card.description}
                            created={card.created}
                            isActive={card.extras.threadId === selectedThreadId}
                            isPinned={!!pinnedThreads[card.extras.threadId]}
                            onClick={() => {
                                if (selectedThreadId === card.extras.threadId) {
                                    setSelectedThreadId(null);
                                } else {
                                    setSelectedThreadId(card.extras.threadId);
                                }
                            }}
                            onPinToggle={() => togglePin(card.extras.threadId)}
                        />
                    ))}
                </CardList>
            </Inbox>
            {selectedThreadId && (
                <ThreadView>
                    <Header>Thread</Header>
                    <CardList>
                        {threadMessages.map(card => (
                            <CustomContentCard
                                key={card.id}
                                title={card.title}
                                imageUrl={card.imageUrl}
                                description={card.description}
                                created={card.created}
                                isThreadMessage
                            />
                        ))}
                    </CardList>
                </ThreadView>
            )}
        </Container>
    );
}

export default ContentCards;

// Styled Components

const Container = styled.div`
    display: flex;
    flex-direction: row;
    height: 100vh;
    background-color: #f5f5f5;
`;

const Inbox = styled.div`
    flex: 1;
    border-right: 1px solid #d6d6d6;
    overflow-y: auto;
    background-color: #fff;
`;

const ThreadView = styled.div`
    flex: 2;
    overflow-y: auto;
    background-color: #fff;
`;

const Header = styled.div`
    font-size: 24px;
    font-weight: bold;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #cc0000; /* CVS Red */
    background: #fff;
    border-bottom: 2px solid #cc0000;
`;

const CardList = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const RefreshButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: #cc0000;
    transition: transform 0.2s;

    &:hover {
        transform: rotate(90deg);
    }
`;
