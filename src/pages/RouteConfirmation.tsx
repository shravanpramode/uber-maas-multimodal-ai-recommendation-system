import { X, ChevronDown, Car, Train, Bus, Footprints, Bike } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip, Route, RouteLeg } from "@/contexts/TripContext";
import { useState, useEffect } from "react";

const RouteConfirmation = () => {
  const navigate = useNavigate();
  const { tripState, selectRoute, setAvailableRoutes, startTrip } = useTrip();
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  // Generate 10 multimodal combinations
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
        tag: '💰 Most Affordable',
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
        tag: '+ Hybrid',
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
        tag: '+ Hybrid',
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
        tag: '+ Hybrid',
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
        tag: '👥 For Groups',
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
        tag: '⚡ Fast & Cheap',
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
        tag: '+ Hybrid',
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
          { mode: 'bus', from: pickup, to: 'Connaught Place Bus Stand', duration: 5, price: 10, lineInfo: 'Route 423' },
          { mode: 'metro', from: 'Rajiv Chowk', to: 'Sarojini Nagar', duration: 20, price: 20, lineInfo: 'Yellow Line' },
          { mode: 'walk', from: 'Sarojini Nagar Metro', to: destination, duration: 8, distance: 500 },
        ]
      },
      {
        id: 'route-10',
        tag: '+ Hybrid',
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

    // Sort by fastest then by affordable
    return routes.sort((a, b) => {
      if (a.tag?.includes('Fastest')) return -1;
      if (b.tag?.includes('Fastest')) return 1;
      if (a.tag?.includes('Affordable')) return -1;
      if (b.tag?.includes('Affordable')) return 1;
      return a.totalDuration - b.totalDuration;
    });
  };

  const routes = generateRoutes();

  useEffect(() => {
    setAvailableRoutes(routes);
    if (routes.length > 0 && !selectedRouteId) {
      setSelectedRouteId(routes[0].id);
    }
  }, []);

  const getModeIcon = (mode: RouteLeg['mode']) => {
    switch (mode) {
      case 'auto':
      case 'uber-go':
      case 'go-sedan':
      case 'uber-xl':
        return <Car className="w-4 h-4" />;
      case 'bike':
        return <Bike className="w-4 h-4" />;
      case 'metro':
      case 'suburban-train':
        return <Train className="w-4 h-4" />;
      case 'bus':
        return <Bus className="w-4 h-4" />;
      case 'walk':
        return <Footprints className="w-4 h-4" />;
      default:
        return <Car className="w-4 h-4" />;
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

  const handleConfirmTrip = () => {
    const selected = routes.find(r => r.id === selectedRouteId);
    if (selected) {
      selectRoute(selected);
      startTrip();
      navigate('/trip-search');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <X className="w-5 h-5" />
        </Button>
        <div className="flex-1" />
      </div>

      {/* Route Summary */}
      <div className="px-4 py-3 border-b border-border">
        <div className="bg-secondary rounded-xl p-4">
          <p className="font-bold text-lg">{tripState.pickup?.name || "Connaught Place"}</p>
          <div className="flex items-center gap-2 text-muted-foreground my-1">
            <span className="text-lg">↘</span>
          </div>
          <p className="font-bold text-lg">{tripState.destination?.name || "Sarojini Nagar Market"}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 px-4 py-3 border-b border-border">
        <Button variant="outline" size="sm" className="rounded-full">
          Mode <ChevronDown className="w-4 h-4 ml-1" />
        </Button>
        <Button variant="outline" size="sm" className="rounded-full">
          Sort By <ChevronDown className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Routes List */}
      <div className="flex-1 overflow-y-auto pb-24">
        {routes.map((route) => (
          <div 
            key={route.id}
            onClick={() => setSelectedRouteId(route.id)}
            className={`border-b border-border p-4 cursor-pointer transition-colors ${
              selectedRouteId === route.id ? 'bg-accent' : 'hover:bg-accent/50'
            }`}
          >
            {/* Route Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-muted-foreground">{route.distance} km Trip</p>
                <span className={`text-sm font-bold ${
                  route.tag?.includes('Fastest') ? 'text-yellow-600' :
                  route.tag?.includes('Affordable') || route.tag?.includes('Budget') ? 'text-green-600' :
                  route.tag?.includes('Effortless') ? 'text-purple-600' :
                  route.tag?.includes('Groups') ? 'text-blue-600' :
                  'text-muted-foreground'
                }`}>
                  {route.tag}
                </span>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">₹{route.totalPrice}</p>
                <p className="text-sm text-muted-foreground">ETA {route.eta}</p>
              </div>
            </div>

            {/* Legs Preview */}
            <div className="flex items-center gap-1 overflow-x-auto pb-2">
              {route.legs.map((leg, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="flex flex-col items-center min-w-[60px] p-2 bg-secondary rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center mb-1">
                      {getModeIcon(leg.mode)}
                    </div>
                    <p className="text-xs font-medium">{leg.duration}m</p>
                    <p className="text-xs text-muted-foreground">
                      {leg.price ? `₹${leg.price}` : leg.distance ? `${leg.distance}m` : ''}
                    </p>
                  </div>
                  {idx < route.legs.length - 1 && (
                    <span className="text-muted-foreground mx-1">›</span>
                  )}
                </div>
              ))}
            </div>

            {/* Selection indicator */}
            {selectedRouteId === route.id && (
              <div className="mt-2 flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-foreground flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-background" />
                </div>
                <span className="text-sm font-medium">Selected</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <Button 
          onClick={handleConfirmTrip}
          disabled={!selectedRouteId}
          className="w-full h-12 text-base font-semibold bg-foreground text-background hover:bg-foreground/90"
        >
          Confirm Trip
        </Button>
      </div>
    </div>
  );
};

export default RouteConfirmation;
