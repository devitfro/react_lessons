import { useState } from 'react'
import './App.css'
import CardList from './components/cardlist/CardList.jsx'
import CardProvider from './contexts/CardProvider.jsx';

function App() {
  return (
    <CardProvider>
      <CardList />
    </CardProvider>
  )
}

export default App;
