import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Pet = {
  id: string;
  name: string;
  info: string;
  src: any;
};

type FavoriteContextType = {
  favorites: Pet[];
  toggleFavorite: (pet: Pet) => void;
  removeFavorite: (petId: string) => void;
  clearFavorites: () => void;
  isFavorite: (petId: string) => boolean;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [favorites, setFavorites] = useState<Pet[]>([]);

  const toggleFavorite = (pet: Pet) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(p => p.id === pet.id);
      if (isAlreadyFavorite) {
        return prev.filter(p => p.id !== pet.id);
      } else {
        return [...prev, pet];
      }
    });
  };

  const removeFavorite = (petId: string) => {
    setFavorites(prev => prev.filter(p => p.id !== petId));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const isFavorite = (petId: string) => {
    return favorites.some(pet => pet.id === petId);
  };

  return (
    <FavoriteContext.Provider value={{
      favorites,
      toggleFavorite,
      removeFavorite,
      clearFavorites,
      isFavorite
    }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
};