import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './pages/User';
import ContentCards from './pages/ContentCards';
import * as braze from "@braze/web-sdk";

// sandeepy
braze.initialize(process.env.REACT_APP_BRAZE_SDK_API_KEY, {
  baseUrl: "sondheim.braze.com",
  enableLogging: true,
  allowUserSuppliedJavascript: true,
  minimumIntervalBetweenTriggerActionsInSeconds: 1,
  appVersion: "1",
  appVersionNumber: "1"
});

function App() {
  // 1) initialize state with cached cards
  const [cards, setCards] = useState(braze.getCachedContentCards().cards);

  function removeCard(card) {
    braze.logCardDismissal(card);

    const updatedCards = cards.filter(item => item.id !== card.id);
    setCards(updatedCards);
  }

  useEffect(() => {
    // Define callback that will get fired after a Content Card refresh
    braze.subscribeToContentCardsUpdates(function (event) {
      setCards(event.cards);
    });
    
    braze.changeUser("sy-1")
    braze.openSession();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<User cards={cards}/>} />
        <Route path='/contentcards' element={<ContentCards cards={cards} setCards={setCards} removeCard={removeCard} />} />
      </Routes>
    </Router>
  );
}

export default App;
