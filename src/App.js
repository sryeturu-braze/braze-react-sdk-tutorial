import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './pages/User';
import ContentCards from './pages/ContentCards';
import * as braze from "@braze/web-sdk";
import BannerCards from './pages/BannerCards';

console.log("her eit is" + process.env.REACT_APP_BRAZE_SDK_API_KEY);

// sandeepy
braze.initialize(process.env.REACT_APP_BRAZE_SDK_API_KEY, {
  baseUrl: "sondheim.braze.com",
  enableLogging: true,
  allowUserSuppliedJavascript: true,
  minimumIntervalBetweenTriggerActionsInSeconds: 1,
  appVersion: "1",
  appVersionNumber: "1"
});

braze.changeUser("sy-1");
console.log(braze.getDeviceId())

function App() {
  const [cards, setCards] = useState([]);
  const [bannerCards, setBannerCards] = useState([]);

  const [isPushPromptEligible, setIsPushPromptEligible] = useState(false);

  const requestPushPermission = () => {
    braze.requestPushPermission();
    setIsPushPromptEligible(false);
  }

  useEffect(() => {
    // once as new session happens or we call requestContentCards referesh, new cards will be update with this consumer
    braze.subscribeToContentCardsUpdates(function (event) {
      setCards(event.cards);
    });

    braze.subscribeToBannersUpdates((_) => {
      console.log("called subscribeToBannersUpdates()")

      const banners = braze.getAllBanners();

      console.log(banners)
      if(!banners) {
        return;
      }

      setBannerCards(banners)
    });
    


    braze.subscribeToInAppMessage(function (inAppMessage) {
      if(inAppMessage instanceof braze.InAppMessage) {
        const extras = inAppMessage.extras;

        if(extras) {
          for(const key in extras) {
            if(key === 'display' && extras[key] === 'homepage') {
                braze.showInAppMessage(inAppMessage);
            }
          }
        }
      }
    })

    if(braze.isPushPermissionGranted() === false && braze.isPushBlocked() == false ) {
      setIsPushPromptEligible(true);
    }

    braze.requestBannersRefresh(["placement_1", "placement_2", "placement_3"]);
    braze.openSession();
  }, []);

  return (
    <Router>
      <Navbar />
      <PushPermissionContainer>
        <PushPermissionButton onClick={requestPushPermission} disabled={!isPushPromptEligible}>Request Push Permission</PushPermissionButton>
      </PushPermissionContainer>
      <Routes>
        <Route path='/' element={<User cards={cards}/>} />
        <Route path='/contentcards' element={<ContentCards cards={cards} />} />
        <Route path='/bannercards' element={<BannerCards bannerCards={bannerCards} />} />
      </Routes>
    </Router>
  );
}

const PushPermissionContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
`;

const PushPermissionButton = styled.button`
    margin-top: 20px;
    margin-right: 20px;
`;

export default App;