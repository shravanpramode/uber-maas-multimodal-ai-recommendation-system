import { Search, Calendar, Car, Bike, Package, Train, MapPin, Home as HomeIcon, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
const Home = () => {
  const navigate = useNavigate();
  const services = [{
    icon: Car,
    label: "Trip",
    discount: "25%",
    color: "success"
  }, {
    icon: Car,
    label: "Rentals",
    discount: null
  }, {
    icon: Calendar,
    label: "Reserve",
    promo: true
  }, {
    icon: Bike,
    label: "Bike",
    discount: "15%"
  }, {
    icon: Car,
    label: "Auto",
    discount: "15%"
  }, {
    icon: Package,
    label: "Send items",
    discount: null
  }, {
    icon: Train,
    label: "Metro tickets",
    discount: null
  }, {
    icon: Car,
    label: "Intercity",
    discount: null
  }];
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card px-4 py-2 border-b border-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full">
            <Car className="w-4 h-4" />
            <span className="font-semibold text-sm">Uber</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border">
            <Package className="w-4 h-4 text-warning" />
            <span className="font-semibold text-sm">Courier</span>
          </div>
        </div>

        {/* Search Bar */}
        <Button onClick={() => navigate("/location-search")} variant="outline" className="w-full justify-start gap-2 h-10 text-base bg-card hover:bg-secondary border-2">
          <Search className="w-4 h-4" />
          <span className="text-muted-foreground">Where to?</span>
          <Calendar className="w-4 h-4 ml-auto" />
          <span className="text-xs">Later</span>
        </Button>
      </header>

      {/* Recent Location */}
      <div className="px-4 py-2">
        <Card className="p-2 flex items-center gap-3 hover:bg-secondary transition-colors cursor-pointer">
          <div className="bg-secondary rounded-lg p-2">
            <MapPin className="w-4 h-4 bg-black/0 text-black opacity-100" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">Connaught Place</h3>
            <p className="text-xs text-muted-foreground">New Delhi, Delhi, India</p>
          </div>
        </Card>
      </div>

      {/* Suggestions Section */}
      <div className="px-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold">Suggestions</h2>
          <Button variant="ghost" className="text-accent hover:text-accent text-sm h-auto py-1">
            See all
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {services.map((service, idx) => {
          const Icon = service.icon;
          return <Card key={idx} className="relative p-2 hover:shadow-lg transition-all cursor-pointer border hover:border-accent" onClick={() => navigate("/location-search")}>
                {service.discount && <div className="absolute top-1 left-1 bg-success text-success-foreground text-[10px] font-bold px-1 py-0.5 rounded">
                    ⚡{service.discount}
                  </div>}
                {service.promo && <div className="absolute top-1 left-1 bg-accent text-accent-foreground text-[10px] font-bold px-1 py-0.5 rounded">
                    Promo
                  </div>}
                <div className="flex flex-col items-center gap-1">
                  <div className="bg-secondary rounded-lg p-2">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-[11px] font-semibold text-center">{service.label}</p>
                </div>
              </Card>;
        })}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="px-4 pb-16">
        <Card className="relative overflow-hidden bg-gradient-to-br from-promo-light to-promo/20 border-0">
          <div className="p-3">
            <h3 className="text-base font-bold mb-1">Enjoy 25% off select trips</h3>
            <Button variant="secondary" className="mt-2 font-semibold text-xs h-8">
              Book now
            </Button>
          </div>
          <div className="absolute right-0 bottom-0 w-24 h-24 opacity-50">
            <Car className="w-full h-full text-accent" />
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex items-center justify-around py-2">
          <Button variant="ghost" className="flex-col h-auto gap-1">
            <HomeIcon className="w-5 h-5" />
            <span className="text-xs font-semibold">Home</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto gap-1 text-muted-foreground">
            <div className="grid grid-cols-3 gap-0.5 w-5 h-5">
              <div className="bg-muted-foreground/40 rounded-sm" />
              <div className="bg-muted-foreground/40 rounded-sm" />
              <div className="bg-muted-foreground/40 rounded-sm" />
              <div className="bg-muted-foreground/40 rounded-sm" />
              <div className="bg-muted-foreground/40 rounded-sm" />
              <div className="bg-muted-foreground/40 rounded-sm" />
            </div>
            <span className="text-xs">Services</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto gap-1 text-muted-foreground">
            <Package className="w-5 h-5" />
            <span className="text-xs">Activity</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto gap-1 text-muted-foreground relative">
            <div className="absolute top-0 right-3 w-2 h-2 bg-accent rounded-full" />
            <User className="w-5 h-5" />
            <span className="text-xs">Account</span>
          </Button>
        </div>
      </nav>
    </div>;
};
export default Home;