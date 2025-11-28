import { X, ChevronDown, Car, Train, Bus, Footprints, Bike, Check } from "lucide-react";
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
    { id: 'faster', label: 'Faster route' },
    { id: 'affordable', label: 'Affordability' },
    { id: 'fewer-transfers', label: 'Fewer transfers' },
    { id: 'less-walking', label: 'Less walking' },
  ];

  const generateRoutes = (): Route[] => {
    const pickup = tripState.pickup?.name || "Connaught Place";
    const destination = tripState.destination?.name || "Sarojini Nagar Market";
    const passengerCount = tripState.passengerCount || 1;

    const routes: Route[] = [
      {
        id: 'route-1',
        tag: '⚡ Fastest',
        totalPrice: 124,
        totalDuration: 32,
        distance: 26.6,
        eta: '4:02 AM',
        legs: [
          { mode: 'auto', from: pickup, to: 'Rajiv Chowk Metro', duration: 8, price: 85, vehicleNumber: 'DL-1C-AB-1234' },
          { mode: 'metro', from: 'Rajiv Chowk', to: 'Sarojini Nagar', duration: 18, price: 30, lineInfo: 'Yellow Line' },
          { mode: 'walk', from: 'Sarojini Nagar Metro', to: destination, duration: 6, distance: 433 },
        ]
      },
      {
        id: 'route-2',
        tag: '💰 Affordable',
        totalPrice: 45,
        totalDuration: 55,
        distance: 22.8,
        eta: '4:25 AM',
        legs: [
          { mode: 'walk', from: pickup, to: 'Barakhamba Road Metro', duration: 8, distance: 600 },
          { mode: 'metro', from: 'Barakhamba Road', to: 'INA', duration: 22, price: 25, lineInfo: 'Blue Line' },
          { mode: 'bus', from: 'INA', to: 'Sarojini Nagar', duration: 18, price: 20, lineInfo: 'Route 153A' },
          { mode: 'walk', from: 'Bus Stop', to: destination, duration: 7, distance: 320 },
        ]
      },
      {
        id: 'route-3',
        tag: 'Hybrid',
        totalPrice: 156,
        totalDuration: 38,
        distance: 24.2,
        eta: '4:08 AM',
        legs: [
          { mode: 'uber-go', from: pickup, to: 'Green Park Metro', duration: 12, price: 110, vehicleNumber: 'DL-3C-EF-5678' },
          { mode: 'metro', from: 'Green Park', to: 'Sarojini Nagar', duration: 12, price: 20, lineInfo: 'Green Line' },
          { mode: 'auto', from: 'Sarojini Nagar Metro', to: destination, duration: 14, price: 26, vehicleNumber: 'DL-4D-GH-9012' },
        ]
      },
      {
        id: 'route-4',
        tag: 'Hybrid',
        totalPrice: 98,
        totalDuration: 48,
        distance: 28.5,
        eta: '4:18 AM',
        legs: [
          { mode: 'bike', from: pickup, to: 'New Delhi Railway', duration: 10, price: 35, vehicleNumber: 'DL-5E-IJ-3456' },
          { mode: 'suburban-train', from: 'New Delhi', to: 'Safdarjung', duration: 18, price: 15, lineInfo: 'Ring Railway' },
          { mode: 'walk', from: 'Safdarjung Station', to: 'Bus Stop', duration: 5, distance: 280 },
          { mode: 'auto', from: 'Bus Stop', to: destination, duration: 15, price: 48, vehicleNumber: 'DL-6F-KL-7890' },
        ]
      },
      {
        id: 'route-5',
        tag: '🌟 Effortless',
        totalPrice: 189,
        totalDuration: 35,
        distance: 25.1,
        eta: '4:05 AM',
        legs: [
          { mode: 'go-sedan', from: pickup, to: 'Hauz Khas Metro', duration: 15, price: 140, vehicleNumber: 'DL-7G-MN-1234' },
          { mode: 'metro', from: 'Hauz Khas', to: 'Sarojini Nagar', duration: 10, price: 20, lineInfo: 'Yellow Line' },
          { mode: 'uber-go', from: 'Sarojini Nagar Metro', to: destination, duration: 10, price: 29, vehicleNumber: 'DL-8H-OP-5678' },
        ]
      },
      {
        id: 'route-6',
        tag: 'Hybrid',
        totalPrice: 67,
        totalDuration: 50,
        distance: 21.3,
        eta: '4:20 AM',
        legs: [
          { mode: 'auto', from: pickup, to: 'Mandi House', duration: 10, price: 42, vehicleNumber: 'DL-9I-QR-9012' },
          { mode: 'bus', from: 'Mandi House', to: 'Sarojini Nagar', duration: 32, price: 20, lineInfo: 'Route 505' },
          { mode: 'walk', from: 'Bus Stop', to: destination, duration: 8, distance: 450 },
        ]
      },
      ...(passengerCount > 4 ? [{
        id: 'route-7',
        tag: '👥 Groups',
        totalPrice: 245,
        totalDuration: 30,
        distance: 24.8,
        eta: '4:00 AM',
        legs: [
          { mode: 'uber-xl' as const, from: pickup, to: 'AIIMS Metro', duration: 14, price: 195, vehicleNumber: 'DL-0J-ST-3456' },
          { mode: 'metro' as const, from: 'AIIMS', to: 'Sarojini Nagar', duration: 8, price: 30, lineInfo: 'Blue Line' },
          { mode: 'uber-go' as const, from: 'Sarojini Nagar Metro', to: destination, duration: 8, price: 20, vehicleNumber: 'DL-1K-UV-7890' },
        ]
      }] : [{
        id: 'route-7',
        tag: 'Fast & Cheap',
        totalPrice: 89,
        totalDuration: 36,
        distance: 23.2,
        eta: '4:06 AM',
        legs: [
          { mode: 'bike' as const, from: pickup, to: 'Central Secretariat', duration: 12, price: 45, vehicleNumber: 'DL-2L-WX-1234' },
          { mode: 'metro' as const, from: 'Central Secretariat', to: 'Sarojini Nagar', duration: 14, price: 25, lineInfo: 'Yellow Line' },
          { mode: 'walk' as const, from: 'Sarojini Nagar Metro', to: destination, duration: 10, distance: 650 },
        ]
      }]),
      {
        id: 'route-8',
        tag: 'Hybrid',
        totalPrice: 78,
        totalDuration: 58,
        distance: 30.2,
        eta: '4:28 AM',
        legs: [
          { mode: 'bike', from: pickup, to: 'Kashmere Gate', duration: 15, price: 38, vehicleNumber: 'DL-3M-YZ-5678' },
          { mode: 'metro', from: 'Kashmere Gate', to: 'Hauz Khas', duration: 25, price: 30, lineInfo: 'Magenta Line' },
          { mode: 'walk', from: 'Hauz Khas Metro', to: 'Ring Road', duration: 5, distance: 300 },
          { mode: 'suburban-train', from: 'Ring Road', to: 'Sarojini Nagar', duration: 8, price: 10, lineInfo: 'Ring Railway' },
          { mode: 'walk', from: 'Station', to: destination, duration: 5, distance: 280 },
        ]
      },
      {
        id: 'route-9',
        tag: '💰 Budget',
        totalPrice: 38,
        totalDuration: 62,
        distance: 20.5,
        eta: '4:32 AM',
        legs: [
          { mode: 'bus', from: pickup, to: 'CP Bus Stand', duration: 5, price: 10, lineInfo: 'Route 423' },
          { mode: 'metro', from: 'Rajiv Chowk', to: 'Sarojini Nagar', duration: 20, price: 20, lineInfo: 'Yellow Line' },
          { mode: 'walk', from: 'Sarojini Nagar Metro', to: destination, duration: 8, distance: 500 },
        ]
      },
      {
        id: 'route-10',
        tag: 'Hybrid',
        totalPrice: 112,
        totalDuration: 42,
        distance: 27.8,
        eta: '4:12 AM',
        legs: [
          { mode: 'auto', from: pickup, to: 'New Delhi Station', duration: 12, price: 55, vehicleNumber: 'DL-4N-AB-9012' },
          { mode: 'suburban-train', from: 'New Delhi', to: 'Safdarjung', duration: 15, price: 12, lineInfo: 'Ring Railway' },
          { mode: 'auto', from: 'Safdarjung', to: destination, duration: 15, price: 45, vehicleNumber: 'DL-5O-CD-3456' },
        ]
      },
    ];

    return routes;
  };

  const allRoutes = useMemo(() => generateRoutes(), [tripState.pickup, tripState.destination, tripState.passengerCount]);

  // Filter routes based on selected modes
  const filteredRoutes = useMemo(() => {
    return allRoutes.filter(route => 
      route.legs.every(leg => selectedModes.includes(leg.mode))
    );
  }, [allRoutes, selectedModes]);

  // Sort routes
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

  const getModeIcon = (mode: RouteLeg['mode']) => {
    switch (mode) {
      case 'auto':
      case 'uber-go':
      case 'go-sedan':
      case 'uber-xl':
        return <Car className="w-3 h-3" />;
      case 'bike':
        return <Bike className="w-3 h-3" />;
      case 'metro':
      case 'suburban-train':
        return <Train className="w-3 h-3" />;
      case 'bus':
        return <Bus className="w-3 h-3" />;
      case 'walk':
        return <Footprints className="w-3 h-3" />;
      default:
        return <Car className="w-3 h-3" />;
    }
  };

  const getModeName = (mode: RouteLeg['mode']) => {
    switch (mode) {
      case 'auto': return 'Auto';
      case 'bike': return 'Bike';
      case 'uber-go': return 'Uber Go';
      case 'go-sedan': return 'Sedan';
      case 'uber-xl': return 'XL';
      case 'metro': return 'Metro';
      case 'bus': return 'Bus';
      case 'suburban-train': return 'Train';
      case 'walk': return 'Walk';
      default: return mode;
    }
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
    return option ? `By ${option.label.split(' ')[0]}` : 'Sort By';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center p-3 border-b border-border">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-8 w-8">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Compact Route Summary */}
      <div className="px-3 py-2 border-b border-border">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
          <span className="font-medium truncate max-w-[40%]">{tripState.pickup?.name || "Connaught Place"}</span>
          <span className="text-muted-foreground">→</span>
          <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
          <span className="font-medium truncate max-w-[40%]">{tripState.destination?.name || "Sarojini Nagar"}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="px-3 py-2 border-b border-border">
        <div className="flex gap-2">
          {/* Mode Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 text-xs rounded-full">
                Mode <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              {allModes.map(mode => (
                <DropdownMenuCheckboxItem
                  key={mode.id}
                  checked={selectedModes.includes(mode.id)}
                  onCheckedChange={() => toggleMode(mode.id)}
                  className="text-xs"
                >
                  {mode.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 text-xs rounded-full">
                {getSortLabel()} <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                {sortOptions.map(option => (
                  <DropdownMenuRadioItem key={option.id} value={option.id} className="text-xs">
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Selected filters display */}
        {selectedModes.length < allModes.length && (
          <div className="flex flex-wrap gap-1 mt-2">
            {selectedModes.map(mode => (
              <span key={mode} className="text-[10px] bg-secondary px-1.5 py-0.5 rounded">
                {allModes.find(m => m.id === mode)?.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Routes List */}
      <div className="flex-1 overflow-y-auto pb-20">
        {sortedRoutes.map((route) => (
          <div 
            key={route.id}
            onClick={() => setSelectedRouteId(route.id)}
            className={`border-b border-border p-3 cursor-pointer transition-all ${
              selectedRouteId === route.id 
                ? 'border-2 border-foreground bg-accent/50' 
                : 'hover:bg-accent/30'
            }`}
          >
            {/* Route Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{route.distance} km</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  route.tag?.includes('Fastest') ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                  route.tag?.includes('Affordable') || route.tag?.includes('Budget') ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                  route.tag?.includes('Effortless') ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' :
                  route.tag?.includes('Groups') ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                  'bg-secondary text-muted-foreground'
                }`}>
                  {route.tag}
                </span>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm">₹{route.totalPrice}</p>
                <p className="text-[10px] text-muted-foreground">{route.eta}</p>
              </div>
            </div>

            {/* Legs Preview - Compact */}
            <div className="flex items-center gap-1 overflow-x-auto">
              {route.legs.map((leg, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="flex flex-col items-center min-w-[44px] p-1.5 bg-secondary rounded-lg">
                    <div className="w-5 h-5 rounded bg-background flex items-center justify-center mb-0.5">
                      {getModeIcon(leg.mode)}
                    </div>
                    <p className="text-[9px] text-muted-foreground">{getModeName(leg.mode)}</p>
                    <p className="text-[10px] font-medium">{leg.duration}m</p>
                    <p className="text-[9px] text-muted-foreground">
                      {leg.price ? `₹${leg.price}` : leg.distance ? `${leg.distance >= 1000 ? (leg.distance/1000).toFixed(1) + 'km' : leg.distance + 'm'}` : ''}
                    </p>
                  </div>
                  {idx < route.legs.length - 1 && (
                    <span className="text-muted-foreground mx-0.5 text-[10px]">›</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-3">
        <Button 
          onClick={handleConfirmTrip}
          disabled={!selectedRouteId}
          className="w-full h-11 text-sm font-semibold bg-foreground text-background hover:bg-foreground/90"
        >
          Confirm Trip
        </Button>
      </div>
    </div>
  );
};

export default RouteConfirmation;
