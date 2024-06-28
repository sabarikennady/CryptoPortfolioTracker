import React, {createContext, useReducer, useContext} from 'react';

const PortfolioContext = createContext();

const portfolioReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CRYPTO':
      const existingCrypto = state.find(
        crypto => crypto.id === action.payload.id,
      );
      if (existingCrypto) {
        return state.map(crypto =>
          crypto.id === action.payload.id
            ? {...crypto, quantity: crypto.quantity + 1}
            : crypto,
        );
      }
      return [...state, {...action.payload, quantity: 1}];
    default:
      return state;
  }
};

export const PortfolioProvider = ({children}) => {
  const [portfolio, dispatch] = useReducer(portfolioReducer, []);

  return (
    <PortfolioContext.Provider value={{portfolio, dispatch}}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
