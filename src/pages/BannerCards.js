import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as braze from "@braze/web-sdk";

function BannerCards({ bannerCards }) {

    useEffect(() => {

        if(!bannerCards) {
            return;

        }
        // --- Placement 1 ---
        const container1 = document.getElementById("placement-1");
        if (container1 && bannerCards["placement_1"]) {
            braze.insertBanner(bannerCards["placement_1"], container1);
        }

        // --- Placement 2 ---
        const container2 = document.getElementById("placement-2");
        if (container2 && bannerCards["placement_2"]) {
            braze.insertBanner(bannerCards["placement_2"], container2);
        }

        // --- Placement 3 ---
        const container3 = document.getElementById("placement-3");
        if (container3 && bannerCards["placement_3"]) {
            braze.insertBanner(bannerCards["placement_3"], container3);
        }

    }, [bannerCards]); // Dependency array ensures this runs if bannerCards prop changes


    return (
        <Container>
            <PlacementWrapper>
                <PlacementLabel>Placement #1</PlacementLabel>
                <BannerImage id="placement-1" />
            </PlacementWrapper>

            <PlacementWrapper>
                <PlacementLabel>Placement #2</PlacementLabel>
                <BannerImage id="placement-2" />
            </PlacementWrapper>

            <PlacementWrapper>
                <PlacementLabel>Placement #3</PlacementLabel>
                <BannerModal id="placement-3" />
            </PlacementWrapper>
        </Container>
    );
}

// --- Styled Components ---

// Main container for the entire page/section
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px; /* Adds space between each placement */
    padding: 40px 20px;
    background-color: #f4f7f6;
    min-height: 100vh;
`;

// A wrapper for each individual placement (label + banner)
const PlacementWrapper = styled.div`
    width: 35%;
    padding: 24px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    }
`;

// The label for each placement (e.g., "Placement #1")
const PlacementLabel = styled.h2`
    font-size: 1.5rem; /* 24px */
    font-weight: 600;
    color: #333;
    margin-top: 0;
    margin-bottom: 20px;
    border-bottom: 2px solid #007bff; /* A little accent color */
    padding-bottom: 10px;
`;

// The target div where Braze will inject the banner HTML.
// This container is now effectively invisible until Braze populates it.
const BannerImage = styled.div`
    width: 100%;
    height: 500px; /* Set a fixed height for the banner area */
`;

const BannerModal = styled.div`
    width: 100%;
    height: 750px; /* Set a fixed height for the banner area */
`;

export default BannerCards;