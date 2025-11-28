import { ArrowLeft, ChevronDown, Car, Train, Bus, Footprints, Bike, Check, Users, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip, Route, RouteLeg } from "@/contexts/TripContext";
import { useState, useEffect, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

const RouteConfirmation = () => {
  const navigate = useNavigate();
  const { tripState, selectRoute, setAvailableRoutes, startTrip } = useTrip();
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [selectedModes, setSelectedModes] = useState<string[]>(['auto', 'bike', 'uber-go', 'go-sedan', 'uber-xl', 'metro', 'bus', 'suburban-train', 'walk']);
  const [sortBy, setSortBy] = useState<string>('faster');
  const passengerCount = tripState.passengerCount || 1;

  const allModes = [
    { id: 'auto', label: 'Auto' },
    { id: 'bike', label: 'Bike' },
    { id: 'uber-go', label: 'Uber Go' },
    { id: 'go-sedan', label: 'Go Sedan' },
    { id: 'uber-xl', label: 'Uber XL' },
    { id: 'metro', label: 'Metro' },
    { id: 'bus', label: 'Bus' },
    { id: 'suburban-train', label: 'Train' },
    { id: 'walk', label: 'Walk' },
  ];

  const sortOptions = [
    { id: 'faster', label: 'Fastest' },
    { id: 'affordable', label: 'Cheapest' },
    { id: 'fewer-transfers', label: 'Fewer transfers' },
    { id: 'less-walking', label: 'Less walking' },
  ];

  const generateRoutes = (): Route[] => {
    const pickup = tripState.pickup?.name || "Connaught Place";
    const destination = tripState.destination?.name || "Sarojini Nagar Market";

    const routes: Route[] = [
      {
        id: 'route-1',
        tag: 'Fastest',
        totalPrice: 85 + (30 * passengerCount),
        totalDuration: 32,
        distance: 26.6,
        eta: '4:02 AM',
        legs: [
          { mode: 'auto', from: pickup, to: 'Rajiv Chowk Metro', duration: 8, price: 85, distance: 3200, vehicleNumber: 'DL-1C-AB-1234' },
          { mode: 'metro', from: 'Rajiv Chowk', to: 'Sarojini Nagar', duration: 18, price: 30, distance: 8500, lineInfo: 'Yellow Line' },
          { mode: 'walk', from: 'Sarojini Nagar Metro', to: destination, duration: 6, distance: 433 },
        ]
      },
      {
        id: 'route-2',
        tag: 'Cheapest',
        totalPrice: (25 + 20) * passengerCount,
        totalDuration: 55,
        distance: 22.8,
        eta: '4:25 AM',
        legs: [
          { mode: 'walk', from: pickup, to: 'Barakhamba Road Metro', duration: 8, distance: 600 },
          { mode: 'metro', from: 'Barakhamba Road', to: 'INA', duration: 22, price: 25, distance: 9200, lineInfo: 'Blue Line' },
          { mode: 'bus', from: 'INA', to: 'Sarojini Nagar', duration: 18, price: 20, distance: 4500, lineInfo: 'Route 153A' },
          { mode: 'walk', from: 'Bus Stop', to: destination, duration: 7, distance: 320 },
        ]
      },
      {
        id: 'route-3',
        tag: 'Balanced',
        totalPrice: 110 + 26 + (20 * passengerCount),
        totalDuration: 38,
        distance: 24.2,
        eta: '4:08 AM',
        legs: [
          { mode: 'uber-go', from: pickup, to: 'Green Park Metro', duration: 12, price: 110, distance: 5800, vehicleNumber: 'DL-3C-EF-5678' },
          { mode: 'metro', from: 'Green Park', to: 'Sarojini Nagar', duration: 12, price: 20, distance: 4200, lineInfo: 'Green Line' },
          { mode: 'auto', from: 'Sarojini Nagar Metro', to: destination, duration: 14, price: 26, distance: 2100, vehicleNumber: 'DL-4D-GH-9012' },
        ]
      },
      {
        id: 'route-4',
        tag: 'Mixed',
        totalPrice: 35 + 48 + (15 * passengerCount),
        totalDuration: 48,
        distance: 28.5,
        eta: '4:18 AM',
        legs: [
          { mode: 'bike', from: pickup, to: 'New Delhi Railway', duration: 10, price: 35, distance: 4100, vehicleNumber: 'DL-5E-IJ-3456' },
          { mode: 'suburban-train', from: 'New Delhi', to: 'Safdarjung', duration: 18, price: 15, distance: 7800, lineInfo: 'Ring Railway' },
          { mode: 'walk', from: 'Safdarjung Station', to: 'Bus Stop', duration: 5, distance: 280 },
          { mode: 'auto', from: 'Bus Stop', to: destination, duration: 15, price: 48, distance: 3500, vehicleNumber: 'DL-6F-KL-7890' },
        ]
      },
      {
        id: 'route-5',
        tag: 'Premium',
        totalPrice: 140 + 29 + (20 * passengerCount),
        totalDuration: 35,
        distance: 25.1,
        eta: '4:05 AM',
        legs: [
          { mode: 'go-sedan', from: pickup, to: 'Hauz Khas Metro', duration: 15, price: 140, distance: 7200, vehicleNumber: 'DL-7G-MN-1234' },
          { mode: 'metro', from: 'Hauz Khas', to: 'Sarojini Nagar', duration: 10, price: 20, distance: 3800, lineInfo: 'Yellow Line' },
          { mode: 'uber-go', from: 'Sarojini Nagar Metro', to: destination, duration: 10, price: 29, distance: 1800, vehicleNumber: 'DL-8H-OP-5678' },
        ]
      },
      {
        id: 'route-6',
        tag: 'Budget',
        totalPrice: 42 + (20 * passengerCount),
        totalDuration: 50,
        distance: 21.3,
        eta: '4:20 AM',
        legs: [
          { mode: 'auto', from: pickup, to: 'Mandi House', duration: 10, price: 42, distance: 2800, vehicleNumber: 'DL-9I-QR-9012' },
          { mode: 'bus', from: 'Mandi House', to: 'Sarojini Nagar', duration: 32, price: 20, distance: 8900, lineInfo: 'Route 505' },
          { mode: 'walk', from: 'Bus Stop', to: destination, duration: 8, distance: 450 },
        ]
      },
      ...(passengerCount > 4 ? [{
        id: 'route-7',
        tag: 'Groups',
        totalPrice: 195 + 20 + (30 * passengerCount),
        totalDuration: 30,
        distance: 24.8,
        eta: '4:00 AM',
        legs: [
          { mode: 'uber-xl' as const, from: pickup, to: 'AIIMS Metro', duration: 14, price: 195, distance: 6500, vehicleNumber: 'DL-0J-ST-3456' },
          { mode: 'metro' as const, from: 'AIIMS', to: 'Sarojini Nagar', duration: 8, price: 30, distance: 3200, lineInfo: 'Blue Line' },
          { mode: 'uber-go' as const, from: 'Sarojini Nagar Metro', to: destination, duration: 8, price: 20, distance: 1500, vehicleNumber: 'DL-1K-UV-7890' },
        ]
      }] : [{
        id: 'route-7',
        tag: 'Quick & Cheap',
        totalPrice: 45 + (25 * passengerCount),
        totalDuration: 36,
        distance: 23.2,
        eta: '4:06 AM',
        legs: [
          { mode: 'bike' as const, from: pickup, to: 'Central Secretariat', duration: 12, price: 45, distance: 4800, vehicleNumber: 'DL-2L-WX-1234' },
          { mode: 'metro' as const, from: 'Central Secretariat', to: 'Sarojini Nagar', duration: 14, price: 25, distance: 5200, lineInfo: 'Yellow Line' },
          { mode: 'walk' as const, from: 'Sarojini Nagar Metro', to: destination, duration: 10, distance: 650 },
        ]
      }]),
      {
        id: 'route-8',
        tag: 'Scenic',
        totalPrice: 38 + (30 + 10) * passengerCount,
        totalDuration: 58,
        distance: 30.2,
        eta: '4:28 AM',
        legs: [
          { mode: 'bike', from: pickup, to: 'Kashmere Gate', duration: 15, price: 38, distance: 5500, vehicleNumber: 'DL-3M-YZ-5678' },
          { mode: 'metro', from: 'Kashmere Gate', to: 'Hauz Khas', duration: 25, price: 30, distance: 12000, lineInfo: 'Magenta Line' },
          { mode: 'walk', from: 'Hauz Khas Metro', to: 'Ring Road', duration: 5, distance: 300 },
          { mode: 'suburban-train', from: 'Ring Road', to: 'Sarojini Nagar', duration: 8, price: 10, distance: 3800, lineInfo: 'Ring Railway' },
          { mode: 'walk', from: 'Station', to: destination, duration: 5, distance: 280 },
        ]
      },
      {
        id: 'route-9',
        tag: 'Most Affordable',
        totalPrice: (10 + 20) * passengerCount,
        totalDuration: 62,
        distance: 20.5,
        eta: '4:32 AM',
        legs: [
          { mode: 'bus', from: pickup, to: 'CP Bus Stand', duration: 5, price: 10, distance: 800, lineInfo: 'Route 423' },
          { mode: 'metro', from: 'Rajiv Chowk', to: 'Sarojini Nagar', duration: 20, price: 20, distance: 8500, lineInfo: 'Yellow Line' },
          { mode: 'walk', from: 'Sarojini Nagar Metro', to: destination, duration: 8, distance: 500 },
        ]
      },
      {
        id: 'route-10',
        tag: 'Rail Focus',
        totalPrice: 55 + 45 + (12 * passengerCount),
        totalDuration: 42,
        distance: 27.8,
        eta: '4:12 AM',
        legs: [
          { mode: 'auto', from: pickup, to: 'New Delhi Station', duration: 12, price: 55, distance: 3800, vehicleNumber: 'DL-4N-AB-9012' },
          { mode: 'suburban-train', from: 'New Delhi', to: 'Safdarjung', duration: 15, price: 12, distance: 7800, lineInfo: 'Ring Railway' },
          { mode: 'auto', from: 'Safdarjung', to: destination, duration: 15, price: 45, distance: 3200, vehicleNumber: 'DL-5O-CD-3456' },
        ]
      },
    ];

    return routes;
  };

  const allRoutes = useMemo(() => generateRoutes(), [tripState.pickup, tripState.destination, passengerCount]);

  const filteredRoutes = useMemo(() => {
    return allRoutes.filter(route => 
      route.legs.every(leg => selectedModes.includes(leg.mode))
    );
  }, [allRoutes, selectedModes]);

  const sortedRoutes = useMemo(() => {
    const routes = [...filteredRoutes];
    switch (sortBy) {
      case 'faster':
        return routes.sort((a, b) => a.totalDuration - b.totalDuration);
      case 'affordable':
        return routes.sort((a, b) => a.totalPrice - b.totalPrice);
      case 'fewer-transfers':
        return routes.sort((a, b) => a.legs.length - b.legs.length);
      case 'less-walking':
        const getWalkDistance = (route: Route) => 
          route.legs.filter(l => l.mode === 'walk').reduce((sum, l) => sum + (l.distance || 0), 0);
        return routes.sort((a, b) => getWalkDistance(a) - getWalkDistance(b));
      default:
        return routes;
    }
  }, [filteredRoutes, sortBy]);

  useEffect(() => {
    setAvailableRoutes(sortedRoutes);
    if (sortedRoutes.length > 0 && !selectedRouteId) {
      setSelectedRouteId(sortedRoutes[0].id);
    }
  }, [sortedRoutes]);

  const getModeIcon = (mode: RouteLeg['mode'], size: string = "w-4 h-4") => {
    switch (mode) {
      case 'auto':
      case 'uber-go':
      case 'go-sedan':
      case 'uber-xl':
        return <Car className={size} />;
      case 'bike':
        return <Bike className={size} />;
      case 'metro':
      case 'suburban-train':
        return <Train className={size} />;
      case 'bus':
        return <Bus className={size} />;
      case 'walk':
        return <Footprints className={size} />;
      default:
        return <Car className={size} />;
    }
  };

  const getModeName = (mode: RouteLeg['mode']) => {
    switch (mode) {
      case 'auto': return 'Auto';
      case 'bike': return 'Bike';
      case 'uber-go': return 'Uber Go';
      case 'go-sedan': return 'Go Sedan';
      case 'uber-xl': return 'Uber XL';
      case 'metro': return 'Metro';
      case 'bus': return 'Bus';
      case 'suburban-train': return 'Train';
      case 'walk': return 'Walk';
      default: return mode;
    }
  };

  const isTransitMode = (mode: RouteLeg['mode']) => {
    return ['metro', 'bus', 'suburban-train'].includes(mode);
  };

  const formatDistance = (meters?: number) => {
    if (!meters) return '';
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)}km`;
    }
    return `${meters}m`;
  };

  const toggleMode = (modeId: string) => {
    setSelectedModes(prev => 
      prev.includes(modeId) 
        ? prev.filter(m => m !== modeId)
        : [...prev, modeId]
    );
  };

  const handleConfirmTrip = () => {
    const selected = sortedRoutes.find(r => r.id === selectedRouteId);
    if (selected) {
      selectRoute(selected);
      startTrip();
      navigate('/trip-search');
    }
  };

  const getSortLabel = () => {
    const option = sortOptions.find(o => o.id === sortBy);
    return option?.label || 'Sort';
  };

  const getTagStyle = (tag: string) => {
    if (tag === 'Fastest') return 'bg-foreground text-background';
    if (tag === 'Cheapest' || tag === 'Most Affordable' || tag === 'Budget') return 'bg-accent text-accent-foreground';
    if (tag === 'Premium') return 'bg-foreground/10 text-foreground';
    return 'bg-secondary text-foreground/70';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header - Uber style */}
      <header className="sticky top-0 z-10 bg-background">
        <div className="flex items-center h-14 px-4">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold ml-2">Choose a route</h1>
        </div>
      </header>

      {/* Route Summary - Uber style location display */}
      <div className="px-4 pb-4">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center pt-1">
            <div className="w-2 h-2 bg-foreground rounded-full" />
            <div className="w-0.5 h-8 bg-foreground/30 my-1" />
            <div className="w-2 h-2 bg-foreground rounded-sm" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{tripState.pickup?.name || "Connaught Place"}</p>
            <div className="h-6" />
            <p className="text-sm font-medium truncate">{tripState.destination?.name || "Sarojini Nagar"}</p>
          </div>
          {/* Passenger count badge */}
          <div className="flex items-center gap-1 bg-secondary px-2.5 py-1 rounded-full">
            <Users className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">{passengerCount}</span>
          </div>
        </div>
      </div>

      {/* Filter Pills - Uber style */}
      <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1.5 h-9 px-4 bg-secondary rounded-full text-sm font-medium whitespace-nowrap hover:bg-secondary/80 transition-colors">
              Mode
              <ChevronDown className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-44">
            {allModes.map(mode => (
              <DropdownMenuCheckboxItem
                key={mode.id}
                checked={selectedModes.includes(mode.id)}
                onCheckedChange={() => toggleMode(mode.id)}
                className="text-sm"
              >
                {mode.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1.5 h-9 px-4 bg-secondary rounded-full text-sm font-medium whitespace-nowrap hover:bg-secondary/80 transition-colors">
              {getSortLabel()}
              <ChevronDown className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
              {sortOptions.map(option => (
                <DropdownMenuRadioItem key={option.id} value={option.id} className="text-sm">
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {selectedModes.length < allModes.length && (
          <button 
            onClick={() => setSelectedModes(allModes.map(m => m.id))}
            className="h-9 px-4 text-sm font-medium text-foreground/60 whitespace-nowrap"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Routes List - Uber style cards */}
      <div className="flex-1 overflow-y-auto pb-24">
        {sortedRoutes.map((route, index) => {
          const isSelected = selectedRouteId === route.id;
          
          return (
            <div 
              key={route.id}
              onClick={() => setSelectedRouteId(route.id)}
              className={`relative cursor-pointer transition-all mx-4 my-2 rounded-2xl ${
                isSelected 
                  ? 'border-2 border-foreground bg-secondary' 
                  : 'border border-border hover:border-foreground/30'
              }`}
            >
              <div className="p-4">
                {/* Top row: Price and Duration */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">₹{route.totalPrice}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getTagStyle(route.tag || '')}`}>
                        {route.tag}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/60 mt-0.5">
                      {route.totalDuration} min · {route.distance} km
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Arrive {route.eta}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/route-detail/${route.id}`);
                      }}
                      className="text-xs font-semibold text-foreground hover:underline flex items-center gap-0.5 mt-1 ml-auto"
                    >
                      View details
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Journey timeline - Square leg cards with mode names */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {route.legs.map((leg, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="flex flex-col items-center p-2 bg-background rounded-xl border border-border min-w-[72px]">
                        {/* Line 1: Icon + Mode name */}
                        <div className="flex items-center gap-1 mb-1">
                          <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                            {getModeIcon(leg.mode, "w-3 h-3")}
                          </div>
                          <span className="text-[10px] font-semibold">{getModeName(leg.mode)}</span>
                        </div>
                        {/* Line 2: Duration + Distance/Passengers */}
                        <div className="text-[10px] text-foreground/60 text-center">
                          <span>{leg.duration} mins</span>
                          {leg.distance && (
                            <span className="ml-1">· {formatDistance(leg.distance)}</span>
                          )}
                        </div>
                        {/* Line 3: Passenger count for transit */}
                        {isTransitMode(leg.mode) && passengerCount > 1 && (
                          <div className="flex items-center gap-0.5 mt-0.5 text-[9px] text-foreground/50">
                            <Users className="w-2.5 h-2.5" />
                            <span>×{passengerCount}</span>
                          </div>
                        )}
                      </div>
                      {idx < route.legs.length - 1 && (
                        <div className="w-3 h-0.5 bg-border mx-0.5" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button 
          onClick={handleConfirmTrip}
          disabled={!selectedRouteId}
          className="w-full h-12 text-base font-semibold rounded-xl bg-foreground text-background hover:bg-foreground/90"
        >
          Confirm route
        </Button>
      </div>
    </div>
  );
};

export default RouteConfirmation;
