import React, { useEffect } from 'react';
import styled from 'styled-components';
import CustomContentCard from '../components/CustomContentCard';
import * as braze from "@braze/web-sdk";


// {
    
// 	"title": "Ready for the New Year?",
	
// 	"message": "Enter the code '2025' to get 25% off your next order.",
	
// 	"imageUrl": "https://cdn-staging.braze.com/appboy/communication/assets/image_assets/images/6756899b8b4b5c1f7e72688a/original.png?1733724570",
	
// 	"countdown": "2025-01-01T06:00:00.000",
	
// 	"timezone": "America/Chicago",
	
// 	"alt_text": "Happy New Year Image"
	
// }

function ContentCards({ cards }) {

    useEffect(() => {
        cards.forEach(card => {
            if (card instanceof braze.CaptionedImage) {
              console.log(`Card ID: ${card.id} is a CaptionedImage with title: ${card.title}`);
            } else if (card instanceof braze.ClassicCard) {
              console.log(`Card ID: ${card.id} is a ClassicCard with title: ${card.title}`);
            } else if (card instanceof braze.ControlCard) {
              console.log(`Card ID: ${card.id} is a ControlCard`);
            } else {
              console.log(`Card ID: ${card.id} is of unknown type`);
            }

            console.log(`dismissing card with id : ${card.id}`)
            braze.logCardDismissal(card);
          });
          
        //   const res = braze.logCardImpressions(cards)
          
          console.log("getting cached content cards")
          console.log(braze.getCachedContentCards());

          console.log("requesting refresh")
          braze.requestContentCardsRefresh();


        // braze.showContentCards(document.getElementById("standard-feed"))
    }, [])

    return (
        <ContentCardsContainer>

            <Feed>
                <div>Custom Feed</div>
                <Cards>
                    {cards.map(card => <CustomContentCard extras={card.extras} key={card.id} imageUrl={card.imageUrl} title={card.title} description={card.description}></CustomContentCard>)}
                </Cards>
            </Feed>
            

            <Feed>
                <div>Out of the Box Feed</div>
                <Cards>
                    <div id={'standard-feed'} />
                </Cards>
            </Feed>

        </ContentCardsContainer>
    )
}

const ContentCardsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

const Cards = styled.div`
    margin-top: 20px;
`;

const Feed = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 25px;
    margin-top: 60px;
    padding-top: 60px;
    min-width: 400px;
    padding: 10px;
    border: 1px solid grey;
    border-radius: 3px;
`;

export default ContentCards