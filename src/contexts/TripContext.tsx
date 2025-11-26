import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Location {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

interface RouteLeg {
  mode: 'uber' | 'metro' | 'walk' | 'bus';
  from: string;
  to: string;
  duration: number;
  price?: number;
  distance?: number;
  prebooked?: boolean;
}

interface Route {
  id: string;
  totalPrice: number;
  totalDuration: number;
  legs: RouteLeg[];
  savings?: number;
  isRecommended?: boolean;
  carbonSaved?: number;
}

interface TripState {
  tripId: string | null;
  pickup: Location | null;
  destination: Location | null;
  selectedRoute: Route | null;
  currentLeg: number;
  driverId: string | null;
  metroTicket: string | null;
  paymentMethod: string;
}

interface TripContextType {
  tripState: TripState;
  setPickup: (location: Location) => void;
  setDestination: (location: Location) => void;
  selectRoute: (route: Route) => void;
  startTrip: () => void;
  nextLeg: () => void;
  setMetroTicket: (ticketId: string) => void;
  setPaymentMethod: (method: string) => void;
  completeTrip: () => void;
  resetTrip: () => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider = ({ children }: { children: ReactNode }) => {
  const [tripState, setTripState] = useState<TripState>({
    tripId: null,
    pickup: null,
    destination: null,
    selectedRoute: null,
    currentLeg: 0,
    driverId: null,
    metroTicket: null,
    paymentMethod: 'upi',
  });

  const setPickup = (location: Location) => {
    setTripState(prev => ({ ...prev, pickup: location }));
  };

  const setDestination = (location: Location) => {
    setTripState(prev => ({ ...prev, destination: location }));
  };

  const selectRoute = (route: Route) => {
    setTripState(prev => ({ ...prev, selectedRoute: route }));
  };

  const startTrip = () => {
    const tripId = `TRIP-${Date.now()}`;
    setTripState(prev => ({ ...prev, tripId, currentLeg: 0 }));
  };

  const nextLeg = () => {
    setTripState(prev => ({ ...prev, currentLeg: prev.currentLeg + 1 }));
  };

  const setMetroTicket = (ticketId: string) => {
    setTripState(prev => ({ ...prev, metroTicket: ticketId }));
  };

  const setPaymentMethod = (method: string) => {
    setTripState(prev => ({ ...prev, paymentMethod: method }));
  };

  const completeTrip = () => {
    setTripState(prev => ({ ...prev, tripId: null }));
  };

  const resetTrip = () => {
    setTripState({
      tripId: null,
      pickup: null,
      destination: null,
      selectedRoute: null,
      currentLeg: 0,
      driverId: null,
      metroTicket: null,
      paymentMethod: 'upi',
    });
  };

  return (
    <TripContext.Provider
      value={{
        tripState,
        setPickup,
        setDestination,
        selectRoute,
        startTrip,
        nextLeg,
        setMetroTicket,
        setPaymentMethod,
        completeTrip,
        resetTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};

export type { Location, Route, RouteLeg, TripState };
