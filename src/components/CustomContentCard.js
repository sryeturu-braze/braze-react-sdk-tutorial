import React from 'react';
import styled from 'styled-components';
import { DateTime } from "luxon"; // Import Luxon for timezone calculations.
import { useState, useEffect } from "react";



function CustomContentCard({ imageUrl, title, description, extras }) {
    const [countdown, setCountdown] = useState("");
    const isCountdownCard = extras?.timezone && extras?.countdown;

    useEffect(() => {
        if (!isCountdownCard) {
            return;
        }

        const updateCountdown = () => {
            const now = DateTime.now().setZone(extras.timezone);
            const targetDateTime = DateTime.fromISO(extras.countdown, { zone: "utc" });
            const diff = targetDateTime.diff(now, ["hours", "minutes", "seconds"]).toObject();

            setCountdown(`${(Math.floor(diff.hours))}h ${Math.abs(Math.floor(diff.minutes))}m ${Math.abs(Math.floor(diff.seconds))}s`);

            //setCountdown(`${Math.max(0, Math.floor(diff.hours))}h ${Math.max(0, Math.floor(diff.minutes))}m ${Math.max(0, Math.floor(diff.seconds))}s`);
        };

        const interval = setInterval(updateCountdown, 1000);

        updateCountdown();

        return () => clearInterval(interval);
    }, [extras.countdown, extras.timezone]);

    if (isCountdownCard) {
        return (
            <CustomCountDownCardContainer>
            <Image src={imageUrl} alt={extras?.alt_text || "Image"} />
            <Title>{title}</Title>
                <Description>{description}</Description>
                <TimeInfo>{countdown}</TimeInfo>
            </CustomCountDownCardContainer>
        );
    }

    return (
        <CustomContentCardContainer>
            <Image src={imageUrl} alt={extras?.alt_text || "Image"} />
            <Title>{title}</Title>
            <Description>{description}</Description>
        </CustomContentCardContainer>
    );
}

// Styled components for the default content card
const CustomContentCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 300px;
    padding: 20px;
    border: 1px solid #d0d0d0;
    border-radius: 3px;
    background-color: #eee;
    margin-bottom: 10px;
`;

// Styled components for the countdown card
const CustomCountDownCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 300px;
    padding: 20px;
    border: 2px solid #007bff;
    border-radius: 5px;
    background-color: #f0f8ff;
    margin-bottom: 10px;
`;

const Image = styled.img`
    max-height: 176px;
    max-width: 358px;
`;

const Title = styled.div`
    margin-top: 15px;
    font-weight: bold;
    font-size: 16px;
`;

const Description = styled.div`
    margin-top: 10px;
    font-size: 13px;
`;

const TimeInfo = styled.div`
    margin-top: 15px;
    font-size: 14px;
    color: #007bff;
`;

export default CustomContentCard;