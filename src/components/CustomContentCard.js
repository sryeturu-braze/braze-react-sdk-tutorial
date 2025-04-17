import React from 'react';
import styled from 'styled-components';
import { Pin, PinOff } from 'lucide-react';

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();
    const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === date.toDateString();

    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

    if (isToday) {
        return `Today at ${date.toLocaleTimeString(undefined, timeOptions)}`;
    } else if (isYesterday) {
        return `Yesterday at ${date.toLocaleTimeString(undefined, timeOptions)}`;
    } else {
        return `${date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} at ${date.toLocaleTimeString(undefined, timeOptions)}`;
    }
}


function CustomContentCard({
    title,
    description,
    imageUrl,
    isActive,
    isPinned,
    onClick,
    onPinToggle,
    isThreadMessage,
    created,
}) {
    const formattedDate = formatDate(new Date(created));

    return (
        <CardContainer isActive={isActive} isThreadMessage={isThreadMessage} onClick={onClick}>
            <Content>
                <TextContent>
                    <TitleRow>
                        <Title>{title}</Title>
                        {isPinned && !isThreadMessage && <Badge>Pinned</Badge>}
                    </TitleRow>
                    {description && <Description>{description}</Description>}
                    {/* Display human-readable created date */}
                    {created && <CreatedDate>{formattedDate}</CreatedDate>}
                </TextContent>
            </Content>
            {!isThreadMessage && (
                <PinButton onClick={(e) => { 
                    e.stopPropagation(); 
                    onPinToggle(); 
                }}>
                    {isPinned ? <Pin fill="#cc0000" color="#cc0000" size={18} /> : <PinOff color="#999" size={18} />}
                </PinButton>
            )}
        </CardContainer>
    );
}

export default CustomContentCard;

// Styled Components

const CardContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border: 2px solid ${({ isActive }) => (isActive ? '#cc0000' : '#eee')};
    border-radius: 12px;
    background-color: ${({ isActive }) => (isActive ? '#fff8f8' : '#fff')};
    box-shadow: ${({ isActive }) => (isActive ? '0 0 12px rgba(204, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.05)')};
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
    }
`;

const Content = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
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

const CreatedDate = styled.div`
    font-size: 12px;
    color: #999;
    margin-top: 40px;
    font-style: italic;
`;

const PinButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        transform: scale(1.2);
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
