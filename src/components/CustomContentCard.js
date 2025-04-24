import React from 'react';
import styled from 'styled-components';
import { Pin, PinOff, X } from 'lucide-react';


function CustomContentCard({ title, description, imageUrl, created, isActive, isPinned, onClick, onPinToggle, isThreadMessage, card, handleDismiss }) {
    const handlePinToggle = (e) => {
        e.stopPropagation();
        if (onPinToggle) {
            onPinToggle();
        }
    };

    return (
        <CardContainer isActive={isActive} isThreadMessage={isThreadMessage} onClick={onClick}>
            {!isThreadMessage && (
                <DismissButton onClick={handleDismiss}>
                    <X size={16} color="#f5a1a1" />
                </DismissButton>
            )}
            <Content>
                <TextContent>
                    <TitleRow>
                        <Title>{title}</Title>
                        {isPinned && !isThreadMessage && <Badge>Pinned</Badge>}
                    </TitleRow>
                    {description && <Description>{description}</Description>}
                    <MetaRow>
                        {!isThreadMessage && (
                            <PinButton onClick={handlePinToggle}>
                                {isPinned ? (
                                    <Pin size={18} color="#cc0000" fill="#cc0000" />
                                ) : (
                                    <PinOff size={18} color="#ccc" />
                                )}
                            </PinButton>
                        )}
                        {created && <CreatedDate>{formatDate(created)}</CreatedDate>}
                    </MetaRow>
                </TextContent>
            </Content>
        </CardContainer>
    );
}

export default CustomContentCard;

// Utilities
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isYesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toDateString() === date.toDateString();
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

    if (isToday) {
        return `Today at ${date.toLocaleTimeString(undefined, timeOptions)}`;
    } else if (isYesterday) {
        return `Yesterday at ${date.toLocaleTimeString(undefined, timeOptions)}`;
    } else {
        return `${date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} at ${date.toLocaleTimeString(undefined, timeOptions)}`;
    }
}

// Styled Components

const CardContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 15px;
    border: 2px solid ${({ isActive }) => (isActive ? '#cc0000' : '#eee')};
    border-radius: 12px;
    background-color: ${({ isActive }) => (isActive ? '#fff8f8' : '#fff')};
    box-shadow: ${({ isActive }) => (isActive ? '0 0 12px rgba(204, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.05)')};
    transition: all 0.3s ease;
    cursor: pointer;

    max-width:850px;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
    }
`;

const Content = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    margin-top: 10px;
`;

const TextContent = styled.div`
    display: flex;
    flex-direction: column;
`;

const TitleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Title = styled.div`
    font-weight: 600;
    font-size: 16px;
    color: #333;
`;

const Description = styled.div`
    font-size: 14px;
    color: #666;
    margin-top: 4px;
    line-height: 1.4;
`;

const MetaRow = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 15px;
`;

const CreatedDate = styled.div`
    font-size: 12px;
    color: #999;
`;

const PinButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 2px;
    opacity: 0.7;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.2);
        opacity: 1;
    }
`;

const DismissButton = styled.button`
    position: absolute;
    top: 8px;
    right: 8px;
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s;

    &:hover {
        opacity: 1;
    }
`;

const Badge = styled.div`
    background-color: #cc0000;
    color: white;
    padding: 2px 8px;
    font-size: 10px;
    font-weight: 600;
    border-radius: 999px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;