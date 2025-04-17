import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './pages/User';
import ContentCards from './pages/ContentCards';
import * as braze from "@braze/web-sdk";

console.log("api key" + process.env.REACT_APP_BRAZE_SDK_API_KEY);

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

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // once as new session happens or we call requestContentCards referesh, new cards will be update with this consumer
    braze.subscribeToContentCardsUpdates(function (event) {
      setCards(event.cards);
    });

    braze.requestContentCardsRefresh();
    braze.openSession();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<User cards={cards}/>} />
        <Route path='/contentcards' element={<ContentCards cards={cards} />} />
      </Routes>
    </Router>
  );
}


export default App;