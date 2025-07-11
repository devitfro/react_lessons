import { useContext } from 'react';
import { CardContext } from '../../contexts/CardContext.jsx';
import Card from '../card/Card.jsx';
import './CardList.css'

function CardList() {

  const cards = useContext(CardContext);
   return (
    <ul className='card-list'>
    {cards.map((card, index) => (
      <li key={index}>
        <Card {...card}/>
      </li>
    ))}
    </ul>
  );
}

export default CardList;
