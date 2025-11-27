import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Location {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

interface RouteLeg {
  mode: 'auto' | 'bike' | 'uber-go' | 'go-sedan' | 'uber-xl' | 'metro' | 'bus' | 'suburban-train' | 'walk';
  from: string;
  to: string;
  duration: number;
  price?: number;
  distance?: number;
  prebooked?: boolean;
  lineInfo?: string;
  vehicleNumber?: string;
}

interface Route {
  id: string;
  totalPrice: number;
  totalDuration: number;
  legs: RouteLeg[];
  savings?: number;
  isRecommended?: boolean;
  carbonSaved?: number;
  tag?: string;
  distance?: number;
  eta?: string;
}

interface TripState {
  tripId: string | null;
  pickup: Location | null;
  destination: Location | null;
  selectedRoute: Route | null;
  availableRoutes: Route[];
  currentLeg: number;
  driverId: string | null;
  metroTicket: string | null;
  paymentMethod: string;
  passengerCount: number;
  transitTicketConfirmed: boolean;
}

interface TripContextType {
  tripState: TripState;
  setPickup: (location: Location) => void;
  setDestination: (location: Location) => void;
  selectRoute: (route: Route) => void;
  setAvailableRoutes: (routes: Route[]) => void;
  startTrip: () => void;
  nextLeg: () => void;
  setMetroTicket: (ticketId: string) => void;
  setPaymentMethod: (method: string) => void;
  setPassengerCount: (count: number) => void;
  setTransitTicketConfirmed: (confirmed: boolean) => void;
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
    availableRoutes: [],
    currentLeg: 0,
    driverId: null,
    metroTicket: null,
    paymentMethod: 'upi',
    passengerCount: 1,
    transitTicketConfirmed: false,
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

  const setAvailableRoutes = (routes: Route[]) => {
    setTripState(prev => ({ ...prev, availableRoutes: routes }));
  };

  const startTrip = () => {
    const tripId = `TRIP-${Date.now()}`;
    setTripState(prev => ({ ...prev, tripId, currentLeg: 0, transitTicketConfirmed: false }));
  };

  const nextLeg = () => {
    setTripState(prev => ({ ...prev, currentLeg: prev.currentLeg + 1, transitTicketConfirmed: false }));
  };

  const setMetroTicket = (ticketId: string) => {
    setTripState(prev => ({ ...prev, metroTicket: ticketId }));
  };

  const setPaymentMethod = (method: string) => {
    setTripState(prev => ({ ...prev, paymentMethod: method }));
  };

  const setPassengerCount = (count: number) => {
    setTripState(prev => ({ ...prev, passengerCount: count }));
  };

  const setTransitTicketConfirmed = (confirmed: boolean) => {
    setTripState(prev => ({ ...prev, transitTicketConfirmed: confirmed }));
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
      availableRoutes: [],
      currentLeg: 0,
      driverId: null,
      metroTicket: null,
      paymentMethod: 'upi',
      passengerCount: 1,
      transitTicketConfirmed: false,
    });
  };

  return (
    <TripContext.Provider
      value={{
        tripState,
        setPickup,
        setDestination,
        selectRoute,
        setAvailableRoutes,
        startTrip,
        nextLeg,
        setMetroTicket,
        setPaymentMethod,
        setPassengerCount,
        setTransitTicketConfirmed,
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
