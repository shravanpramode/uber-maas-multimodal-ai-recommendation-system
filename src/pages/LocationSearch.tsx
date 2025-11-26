import { useState } from "react";
import { ArrowLeft, MapPin, Clock, Star, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useTrip } from "@/contexts/TripContext";

const LocationSearch = () => {
  const navigate = useNavigate();
  const { setPickup, setDestination } = useTrip();
  const [pickupLocation, setPickupLocation] = useState("National Institute of Siddha");
  const [destinationLocation, setDestinationLocation] = useState("");

  const savedPlaces = [
    { icon: "🏠", name: "Home", address: "Sathyamala Ap...", distance: null },
    { icon: "⭐", name: "Saved places", address: "", distance: null },
  ];

  const recentPlaces = [
    { name: "Chennai Metro Line 2", address: "Nanganallur, Chennai, Tamil Nadu", distance: "12 km" },
    { name: "Aunty Home", address: "Rose Beauty Parlour", distance: "2.9 km" },
    { name: "Grand Galada Centre Mall", address: "Thirushoolam, SH 48, SH 48, Arumalai Chavadi, ...", distance: "7.9 km" },
    { name: "Pallavaram Bus Stand", address: "Chennai - Theni Hwy, Pallavaram, Sriperumbud...", distance: "5.9 km" },
    { name: "Dr Agarwals Eye Hospital", address: "No 201, 1st Floor, Bus Stop, Grand Southern Tru...", distance: "2.9 km" },
  ];

  const handlePlaceSelect = (place: any) => {
    if (!destinationLocation) {
      setDestinationLocation(place.name);
      setDestination({
        name: place.name,
        address: place.address,
        lat: 13.0827,
        lng: 80.2707,
      });
      
      setPickup({
        name: pickupLocation,
        address: "Chennai",
        lat: 13.0827,
        lng: 80.2707,
      });
      
      // Navigate to ride options
      navigate("/choose-ride");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card px-4 py-6 border-b border-border">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold">Plan your ride</h1>
        </div>

        <div className="flex gap-3 mb-4">
          <Button variant="outline" className="rounded-full">
            <Clock className="w-4 h-4 mr-2" />
            Pickup now
          </Button>
          <Button variant="outline" className="rounded-full">
            <div className="w-4 h-4 rounded-full bg-foreground text-background flex items-center justify-center text-xs mr-2">
              1
            </div>
            For me
          </Button>
        </div>

        {/* Location Inputs */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-4 bg-card border-2 border-primary rounded-xl">
            <div className="flex flex-col items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="w-0.5 h-8 bg-border" />
              <div className="w-3 h-3 border-2 border-primary bg-background" />
            </div>
            <div className="flex-1 space-y-3">
              <Input
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="border-0 p-0 text-base font-medium focus-visible:ring-0"
              />
              <Input
                placeholder="Where to?"
                value={destinationLocation}
                onChange={(e) => setDestinationLocation(e.target.value)}
                className="border-0 p-0 text-base text-muted-foreground focus-visible:ring-0"
                autoFocus
              />
            </div>
            <Button variant="ghost" size="icon" className="ml-2">
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Saved Places */}
        <div className="flex gap-4 mb-8">
          {savedPlaces.map((place, idx) => (
            <Card
              key={idx}
              className="flex-1 p-6 hover:bg-secondary transition-colors cursor-pointer"
              onClick={() => handlePlaceSelect(place)}
            >
              <div className="flex items-center gap-3">
                {idx === 0 ? (
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                ) : (
                  <Star className="w-6 h-6 text-accent" />
                )}
                <div>
                  <p className="font-semibold">{place.name}</p>
                  {place.address && (
                    <p className="text-sm text-muted-foreground">{place.address}</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Places */}
        <div className="space-y-4">
          {recentPlaces.map((place, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 cursor-pointer hover:bg-secondary p-3 -mx-3 rounded-lg transition-colors"
              onClick={() => handlePlaceSelect(place)}
            >
              <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold">{place.name}</h3>
                  {place.distance && (
                    <span className="text-sm text-muted-foreground whitespace-nowrap">{place.distance}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">{place.address}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Options */}
        <div className="space-y-4 mt-8 pt-8 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-auto py-4"
            onClick={() => {}}
          >
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <span className="font-semibold">Search in a different city</span>
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-auto py-4"
            onClick={() => {}}
          >
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="font-semibold">Set location on map</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
