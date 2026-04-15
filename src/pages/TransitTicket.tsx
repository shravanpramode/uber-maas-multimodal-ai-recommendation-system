import { X, HelpCircle, Bike, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/contexts/TripContext";
import { Progress } from "@/components/ui/progress";
import { useMemo, useState } from "react";
import useEmblaCarousel from 'embla-carousel-react';

const TransitTicket = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const viewMode = searchParams.get('viewMode') === 'true';
  
  const { tripState, setTransitTicketConfirmed, transitExitMode, setTransitExitMode, nextLeg, setTransitProgress, setTransitEta, setTransitRideStarted } = useTrip();
  
  const [currentTicketIndex, setCurrentTicketIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel();
  
  const currentLeg = tripState.selectedRoute?.legs[tripState.currentLeg];
  const nextLegData = tripState.selectedRoute?.legs[tripState.currentLeg + 1];
  const hasMoreLegs = tripState.selectedRoute && tripState.currentLeg < tripState.selectedRoute.legs.length - 1;
  const isNextLegBike = nextLegData?.mode === 'bike';
  const passengerCount = tripState.passengerCount || 1;
  
  const baseTicketNumber = useMemo(() => Date.now().toString().slice(-9), []);
  
  // Generate unique QR patterns for each passenger
  const qrPatterns = useMemo(() => {
    return Array.from({ length: passengerCount }, (_, passengerIndex) => {
      const pattern: boolean[] = [];
      for (let i = 0; i < 64; i++) {
        pattern.push(((i * 17 + 11 + passengerIndex * 7) % 7) > 2);
      }
      return pattern;
    });
  }, [passengerCount]);

  // Update current ticket index when carousel scrolls
  useMemo(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setCurrentTicketIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const getStationType = () => {
    switch (currentLeg?.mode) {
      case 'metro': return 'metro station';
      case 'bus': return 'bus stop';
      case 'suburban-train': return 'train station';
      default: return 'station';
    }
  };

  const handleButtonClick = () => {
    if (viewMode) {
      // Close button - go back to tracking
      navigate('/tracking-leg2');
      return;
    }
    
    if (transitExitMode) {
      // Scan & Exit mode - calculate next leg target before updating state
      const targetLegIndex = tripState.currentLeg + 1;
      const nextLegAfterCurrent = tripState.selectedRoute?.legs[targetLegIndex];
      
      // Update state
      setTransitExitMode(false);
      nextLeg();
      
      // Reset transit progress for next transit leg
      setTransitProgress(0);
      setTransitEta(12);
      setTransitRideStarted(false);
      
      if (nextLegAfterCurrent) {
        const { mode } = nextLegAfterCurrent;
        if (mode === 'bus') {
          navigate('/tracking-bus');
        } else if (['metro', 'suburban-train'].includes(mode)) {
          navigate('/tracking-leg2');
        } else if (mode === 'walk') {
          navigate('/tracking-walk');
        } else {
          // Ride leg (auto, bike, uber, etc.)
          navigate('/tracking-leg3');
        }
      } else {
        navigate('/trip-complete');
      }
    }
  };

  const handleBack = () => {
    if (viewMode) {
      const returnTo = searchParams.get('returnTo');
      if (returnTo === 'tracking-bus') {
        navigate('/tracking-bus');
      } else {
        navigate('/tracking-leg2');
      }
    } else {
      navigate(-1);
    }
  };

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <Button variant="ghost" size="icon" onClick={handleBack} className="h-9 w-9">
          <X className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-full">
            <Users className="w-3 h-3" />
            <span className="text-xs font-medium">{passengerCount}</span>
          </div>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <HelpCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Ticket Content */}
      <div className="flex-1 px-4 py-3">
        {/* Route Info */}
        <div className="mb-3">
          <h1 className="text-lg font-bold">
            {currentLeg?.from} → {currentLeg?.to}
          </h1>
          <p className="text-sm text-foreground/60">
            ₹{(currentLeg?.price || 9) * passengerCount}.00 • {passengerCount} ticket{passengerCount > 1 ? 's' : ''}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-6">
          <Progress value={transitExitMode ? 100 : (viewMode ? tripState.transitProgress : 30)} className="h-1" />
        </div>

        {/* QR Code Carousel */}
        <div className="flex flex-col items-center mb-6">
          {passengerCount > 1 ? (
            <>
              <div className="relative w-full max-w-[200px]">
                {/* Carousel navigation */}
                {currentTicketIndex > 0 && (
                  <button 
                    onClick={scrollPrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 z-10 w-6 h-6 bg-secondary rounded-full flex items-center justify-center"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}
                {currentTicketIndex < passengerCount - 1 && (
                  <button 
                    onClick={scrollNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 z-10 w-6 h-6 bg-secondary rounded-full flex items-center justify-center"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
                
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex">
                    {qrPatterns.map((pattern, idx) => (
                      <div key={idx} className="flex-[0_0_100%] min-w-0 flex flex-col items-center">
                        <div className="w-44 h-44 bg-white rounded-lg flex items-center justify-center mb-2 border-2 border-border shadow-sm">
                          <div className="grid grid-cols-8 gap-[2px] w-32 h-32 p-2">
                            {pattern.map((filled, i) => (
                              <div 
                                key={i} 
                                className={`w-full aspect-square rounded-[1px] ${filled ? 'bg-foreground' : 'bg-transparent'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs font-medium text-foreground/80">
                          Passenger {idx + 1} of {passengerCount}
                        </p>
                        <p className="text-xs text-foreground/60">
                          Ticket # - 2117999943{baseTicketNumber}{idx}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Dot indicators */}
              <div className="flex justify-center gap-1.5 mt-3">
                {Array.from({ length: passengerCount }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full transition-colors ${i === currentTicketIndex ? 'bg-foreground' : 'bg-muted'}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="w-44 h-44 bg-white rounded-lg flex items-center justify-center mb-3 border-2 border-border shadow-sm">
                <div className="grid grid-cols-8 gap-[2px] w-32 h-32 p-2">
                  {qrPatterns[0].map((filled, i) => (
                    <div 
                      key={i} 
                      className={`w-full aspect-square rounded-[1px] ${filled ? 'bg-foreground' : 'bg-transparent'}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-foreground/60">
                Ticket # - 2117999943{baseTicketNumber}
              </p>
              <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-2" />
            </>
          )}
        </div>

        {/* Bike Promo Card - Only show if next leg is bike */}
        {isNextLegBike && (
          <div className="bg-secondary rounded-xl p-3 flex items-center gap-3 mb-4">
            <div className="flex-1">
              <p className="text-xs font-medium">
                Enjoy discounted bike ride to/from {getStationType()}
              </p>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Bike className="w-5 h-5 text-primary" />
            </div>
          </div>
        )}

        {/* ONDC Badge */}
        <div className="text-center py-3 border-t border-border">
          <p className="text-xs text-foreground/60 font-medium tracking-wider">
            ONDC NETWORK
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-4 border-t border-border">
        <Button 
          onClick={handleButtonClick} 
          className="w-full h-11 text-sm font-semibold bg-foreground text-background hover:bg-foreground/90"
        >
          {viewMode ? 'Close' : (transitExitMode ? 'Scan & Exit' : 'Close')}
        </Button>
      </div>
    </div>
  );
};

export default TransitTicket;
