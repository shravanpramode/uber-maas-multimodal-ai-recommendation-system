import { useState } from "react";
import { ArrowLeft, MapPin, Clock, User, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTrip } from "@/contexts/TripContext";
const LocationSearch = () => {
  const navigate = useNavigate();
  const {
    setPickup,
    setDestination
  } = useTrip();
  const [pickupLocation, setPickupLocation] = useState("Connaught Place");
  const [destinationLocation, setDestinationLocation] = useState("DLF Cyber Park - The Auditorium");
  const recentPlaces = [{
    name: "Sarojini Nagar Market",
    address: "Sarojini Nagar, New Delhi, Delhi",
    distance: "8.7 km",
    icon: "clock"
  }, {
    name: "DLF Cyber Park - The Auditorium",
    address: "DLF Cyber Park, Phase II, Udyog Vihar, City:, Gur...",
    distance: "26 km",
    icon: "clock"
  }, {
    name: "Dwarka Sector 10 Park",
    address: "H3P5+P7C, Sector 10 Dwarka, Dwarka, New Del...",
    distance: "22 km",
    icon: "clock"
  }, {
    name: "Suburbian Floors, California Country",
    address: "SUBURBIAN FLOORS, Badauli Village, Sector 80,...",
    distance: "40 km",
    icon: "clock"
  }, {
    name: "The Lalit New Delhi",
    address: "Fire Brigade Lane, Barakhamba, New Delhi, Delhi",
    distance: "1.5 km",
    icon: "pin"
  }];
  const handlePlaceSelect = (place: any) => {
    if (!destinationLocation) {
      setDestinationLocation(place.name);
      setDestination({
        name: place.name,
        address: place.address,
        lat: 13.0827,
        lng: 80.2707
      });
      setPickup({
        name: pickupLocation,
        address: "Chennai",
        lat: 13.0827,
        lng: 80.2707
      });

      // Navigate to ride options
      navigate("/choose-ride");
    }
  };
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card px-4 py-4 border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="h-9 w-9">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold flex-1 text-center -mr-9">Plan your ride</h1>
        </div>

        <div className="flex gap-2 mb-4">
          <Button variant="secondary" className="rounded-full text-sm h-9 px-4">
            <Clock className="w-4 h-4 mr-2" />
            Pickup now
          </Button>
          <Button variant="secondary" className="rounded-full text-sm h-9 px-4">
            <User className="w-4 h-4 mr-2" />
            For me
          </Button>
        </div>

        {/* Location Inputs */}
        <div className="relative">
          <div className="flex items-center gap-3 p-4 bg-background border-2 border-foreground rounded-2xl">
            <div className="flex flex-col items-center gap-2 py-1">
              <div className="w-2 h-2 rounded-full bg-foreground" />
              <div className="w-0.5 h-6 bg-border" />
              <div className="w-2 h-2 border-2 border-foreground bg-background rounded-sm" />
            </div>
            <div className="flex-1 space-y-2">
              <Input value={pickupLocation} onChange={e => setPickupLocation(e.target.value)} className="border-0 p-0 text-sm font-medium focus-visible:ring-0 h-auto" />
              <Input placeholder="Where to?" value={destinationLocation} onChange={e => setDestinationLocation(e.target.value)} className="border-0 p-0 text-sm focus-visible:ring-0 h-auto" />
            </div>
            {destinationLocation}
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-muted ml-1">
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-3">
        {/* Recent Places */}
        <div className="space-y-0">
          {recentPlaces.map((place, idx) => <div key={idx} className="flex items-center gap-3 cursor-pointer hover:bg-secondary/50 py-3 transition-colors border-b border-border/50 last:border-0" onClick={() => handlePlaceSelect(place)}>
              <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                {place.icon === "clock" ? <Clock className="w-4 h-4 text-background" /> : <MapPin className="w-4 h-4 text-background" />}
              </div>
              <div className="flex-1 min-w-0 flex items-start gap-2">
                <span className="text-xs text-muted-foreground whitespace-nowrap mt-0.5 w-12">{place.distance}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">{place.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{place.address}</p>
                </div>
              </div>
            </div>)}
        </div>

        {/* Additional Options */}
        <div className="space-y-0 mt-4 pt-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start gap-3 h-auto py-3 hover:bg-secondary/50" onClick={() => {}}>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="font-medium text-sm">Search in a different city</span>
          </Button>
          
          <Button variant="ghost" className="w-full justify-start gap-3 h-auto py-3 hover:bg-secondary/50" onClick={() => {}}>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="font-medium text-sm">Set location on map</span>
          </Button>

          <Button variant="ghost" className="w-full justify-start gap-3 h-auto py-3 hover:bg-secondary/50" onClick={() => {}}>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="font-medium text-sm">Saved places</span>
          </Button>
        </div>
      </div>
    </div>;
};
export default LocationSearch;