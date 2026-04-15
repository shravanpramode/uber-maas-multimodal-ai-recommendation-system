import { useState } from "react";
import { ArrowLeft, MapPin, Clock, User, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTrip } from "@/contexts/TripContext";

const LocationSearch = () => {
  const navigate = useNavigate();
  const { setPickup, setDestination, tripState, setPassengerCount } = useTrip();
  const [pickupLocation, setPickupLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [activeInput, setActiveInput] = useState<"pickup" | "destination" | null>(null);

  const allPlaces = [
    { name: "Connaught Place", address: "Connaught Place, New Delhi, Delhi", distance: "0 km", icon: "clock", lat: 28.6328, lng: 77.2197 },
    { name: "Gurgaon Cyber Hub", address: "DLF Cyber Hub, DLF City Phase II, Gurgaon", distance: "28 km", icon: "clock", lat: 28.4950, lng: 77.0886 },
    { name: "Sarojini Nagar Market", address: "Sarojini Nagar, New Delhi, Delhi", distance: "8.7 km", icon: "clock", lat: 28.5776, lng: 77.1961 },
    { name: "DLF Cyber Park - The Auditorium", address: "DLF Cyber Park, Phase II, Udyog Vihar, City:, Gur...", distance: "26 km", icon: "clock", lat: 28.5020, lng: 77.0872 },
    { name: "Dwarka Sector 10 Park", address: "H3P5+P7C, Sector 10 Dwarka, Dwarka, New Del...", distance: "22 km", icon: "clock", lat: 28.5818, lng: 77.0583 },
    { name: "India Gate", address: "Rajpath, India Gate, New Delhi, Delhi", distance: "3.5 km", icon: "clock", lat: 28.6129, lng: 77.2295 },
    { name: "Hauz Khas Village", address: "Hauz Khas, New Delhi, Delhi", distance: "12 km", icon: "clock", lat: 28.5535, lng: 77.1956 },
    { name: "Nehru Place", address: "Nehru Place, New Delhi, Delhi", distance: "9 km", icon: "clock", lat: 28.5501, lng: 77.2513 },
    { name: "Rajiv Chowk Metro Station", address: "Connaught Place, New Delhi, Delhi", distance: "0.5 km", icon: "clock", lat: 28.6331, lng: 77.2197 },
    { name: "The Lalit New Delhi", address: "Fire Brigade Lane, Barakhamba, New Delhi, Delhi", distance: "1.5 km", icon: "pin", lat: 28.6315, lng: 77.2273 },
  ];

  // Filter places based on active input and existing selection
  const displayPlaces = activeInput === "destination" 
    ? allPlaces.filter(place => place.name !== pickupLocation)
    : allPlaces;

  const handlePlaceSelect = (place: any) => {
    if (activeInput === "pickup") {
      setPickupLocation(place.name);
      setPickup({
        name: place.name,
        address: place.address,
        lat: place.lat,
        lng: place.lng,
      });
      // Auto-focus destination after pickup is selected
      setActiveInput("destination");
    } else if (activeInput === "destination") {
      setDestinationLocation(place.name);
      setDestination({
        name: place.name,
        address: place.address,
        lat: place.lat,
        lng: place.lng,
      });
      
      // Navigate if both are filled
      if (pickupLocation) {
        navigate("/choose-ride");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card px-4 py-2 border-b border-border">
        <div className="flex items-center gap-4 mb-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="h-9 w-9">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold flex-1 text-center -mr-9">Plan your ride</h1>
        </div>

        <div className="flex gap-2 mb-2">
          <Button variant="secondary" className="rounded-full text-sm h-9 px-4">
            <Clock className="w-4 h-4 mr-2" />
            Pickup now
          </Button>
          <div className="flex items-center gap-1 bg-secondary rounded-full h-9 px-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 rounded-full"
              onClick={() => setPassengerCount(Math.max(1, tripState.passengerCount - 1))}
            >
              <Minus className="w-3 h-3" />
            </Button>
            <div className="flex items-center gap-1 px-2">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium min-w-[12px] text-center">{tripState.passengerCount}</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 rounded-full"
              onClick={() => setPassengerCount(Math.min(4, tripState.passengerCount + 1))}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Location Inputs */}
        <div className="relative">
          <div className="flex items-center gap-3 p-3 bg-background border-2 border-foreground rounded-2xl">
            <div className="flex flex-col items-center gap-2 py-1">
              <div className="w-2 h-2 rounded-full bg-foreground" />
              <div className="w-0.5 h-6 bg-border" />
              <div className="w-2 h-2 border-2 border-foreground bg-background rounded-sm" />
            </div>
            <div className="flex-1 space-y-2">
              <Input
                placeholder="Pickup location"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                onFocus={() => setActiveInput("pickup")}
                className={`border-0 p-0 text-sm font-medium focus-visible:ring-0 h-auto ${activeInput === "pickup" ? "text-foreground" : ""}`}
              />
              <Input
                placeholder="Where to?"
                value={destinationLocation}
                onChange={(e) => setDestinationLocation(e.target.value)}
                onFocus={() => setActiveInput("destination")}
                className={`border-0 p-0 text-sm focus-visible:ring-0 h-auto ${activeInput === "destination" ? "text-foreground" : ""}`}
              />
            </div>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-muted ml-1">
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-1">
        {/* Recent Places */}
        <div className="space-y-0">
          {displayPlaces.slice(0, 5).map((place, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 cursor-pointer hover:bg-secondary/50 py-2 transition-colors border-b border-border/50 last:border-0"
              onClick={() => handlePlaceSelect(place)}
            >
              <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                {place.icon === "clock" ? (
                  <Clock className="w-4 h-4 text-background" />
                ) : (
                  <MapPin className="w-4 h-4 text-background" />
                )}
              </div>
              <div className="flex-1 min-w-0 flex items-start gap-2">
                <span className="text-xs text-muted-foreground whitespace-nowrap mt-0.5 w-12">{place.distance}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">{place.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{place.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Options */}
        <div className="space-y-0 mt-2 pt-2 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-auto py-2 hover:bg-gray-200 hover:text-black transition-colors"
            onClick={() => {}}
          >
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="font-medium text-sm">Search in a different city</span>
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-auto py-2 hover:bg-gray-200 hover:text-black transition-colors"
            onClick={() => {}}
          >
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="font-medium text-sm">Set location on map</span>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-auto py-2 hover:bg-gray-200 hover:text-black transition-colors"
            onClick={() => {}}
          >
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="font-medium text-sm">Saved places</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
