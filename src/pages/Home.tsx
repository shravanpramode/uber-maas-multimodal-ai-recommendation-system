import { Search, Calendar, Car, Bike, Package, Train, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Home = () => {
  const navigate = useNavigate();

  const services = [
    { icon: Car, label: "Trip", discount: "25%", color: "success" },
    { icon: Car, label: "Rentals", discount: null },
    { icon: Calendar, label: "Reserve", promo: true },
    { icon: Bike, label: "Bike", discount: "15%" },
    { icon: Car, label: "Auto", discount: "15%" },
    { icon: Package, label: "Send items", discount: null },
    { icon: Train, label: "Metro tickets", discount: null },
    { icon: Car, label: "Intercity", discount: null },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card px-4 py-4 border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
            <Car className="w-5 h-5" />
            <span className="font-semibold">Uber</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border">
            <Package className="w-5 h-5 text-warning" />
            <span className="font-semibold">Courier</span>
          </div>
        </div>

        {/* Search Bar */}
        <Button
          onClick={() => navigate("/location-search")}
          variant="outline"
          className="w-full justify-start gap-3 h-14 text-lg bg-card hover:bg-secondary border-2"
        >
          <Search className="w-5 h-5" />
          <span className="text-muted-foreground">Where to?</span>
          <Calendar className="w-5 h-5 ml-auto" />
          <span className="text-sm">Later</span>
        </Button>
      </header>

      {/* Recent Location */}
      <div className="px-4 py-4">
        <Card className="p-4 flex items-center gap-4 hover:bg-secondary transition-colors cursor-pointer">
          <div className="bg-secondary rounded-lg p-3">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Chennai International Airport</h3>
            <p className="text-sm text-muted-foreground">Chennai - Trichy Hwy, Tambaram, Meenam...</p>
          </div>
        </Card>
      </div>

      {/* Suggestions Section */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Suggestions</h2>
          <Button variant="ghost" className="text-accent hover:text-accent">
            See all
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Card
                key={idx}
                className="relative p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-accent"
                onClick={() => navigate("/location-search")}
              >
                {service.discount && (
                  <div className="absolute top-2 left-2 bg-success text-success-foreground text-xs font-bold px-2 py-1 rounded">
                    <span className="text-sm">⚡</span> {service.discount}
                  </div>
                )}
                {service.promo && (
                  <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
                    Promo
                  </div>
                )}
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-secondary rounded-xl p-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-semibold text-center">{service.label}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="px-4 pb-20">
        <Card className="relative overflow-hidden bg-gradient-to-br from-promo-light to-promo/20 border-0">
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2">Enjoy 25% off select trips</h3>
            <Button variant="secondary" className="mt-4 font-semibold">
              Book now
            </Button>
          </div>
          <div className="absolute right-0 bottom-0 w-48 h-48 opacity-50">
            <Car className="w-full h-full text-accent" />
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex items-center justify-around py-3">
          <Button variant="ghost" className="flex-col h-auto gap-1">
            <Car className="w-6 h-6" />
            <span className="text-xs font-semibold">Home</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto gap-1 text-muted-foreground">
            <div className="grid grid-cols-3 gap-0.5 w-6 h-6">
              <div className="bg-muted rounded-sm" />
              <div className="bg-muted rounded-sm" />
              <div className="bg-muted rounded-sm" />
              <div className="bg-muted rounded-sm" />
              <div className="bg-muted rounded-sm" />
              <div className="bg-muted rounded-sm" />
            </div>
            <span className="text-xs">Services</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto gap-1 text-muted-foreground">
            <Package className="w-6 h-6" />
            <span className="text-xs">Activity</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto gap-1 text-muted-foreground relative">
            <div className="absolute top-0 right-3 w-2 h-2 bg-accent rounded-full" />
            <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-sm font-semibold">A</span>
            </div>
            <span className="text-xs">Account</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Home;
