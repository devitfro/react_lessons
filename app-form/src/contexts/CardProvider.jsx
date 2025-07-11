import { CardContext, BasicCard, StandartCard, PremiumCard } from "./CardContext";

function CardProvider({ children }) {
  const cards = [BasicCard, StandartCard, PremiumCard];

  return(
    <CardContext.Provider value={cards}>
      {children}
    </CardContext.Provider>
  );
}

export default CardProvider;