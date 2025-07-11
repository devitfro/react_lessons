import { createContext } from "react";
import DoneImg from '../image/done.svg'
import CloseImg from '../image/close.svg'

export const CardContext = createContext();

export const BasicCard = {
  title: 'Basic',
  price: '$ 2.99',
  color: '#03A6A1',
  selectFunc: () => alert('You choose basic package!'),
  itemList: [
    { img: DoneImg, text: 'Sample Text Here' },
    { img: CloseImg, text: 'Other Text Title' },
    { img: CloseImg, text: 'Text Space Goes Here' },
    { img: CloseImg, text: 'Description Space' }
]};

export const StandartCard = {
  title: 'Standart',
  price: '$ 5.99',
  color: '#3674B5',
  selectFunc: () => alert('You choose standart package!'),
  itemList: [
    { img: DoneImg, text: 'Sample Text Here' },
    { img: DoneImg, text: 'Other Text Title' },
    { img: DoneImg, text: 'Text Space Goes Here' },
    { img: CloseImg, text: 'Description Space' }
]};

export const PremiumCard = {
  title: 'Premium',
  price: '$ 10.99',
  color: '#090040',
  selectFunc: () => alert('You choose premium package!'),
  itemList: [
    { img: DoneImg, text: 'Sample Text Here' },
    { img: DoneImg, text: 'Other Text Title' },
    { img: DoneImg, text: 'Text Space Goes Here' },
    { img: DoneImg, text: 'Description Space' }
]};

