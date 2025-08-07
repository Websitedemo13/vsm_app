import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Newspaper,
  Play,
  ShoppingBag,
  User,
  Menu,
  X,
  Bell
} from "lucide-react";

export default function Navigation() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const navigation = [
    { name: "Trang chủ", href: "/", icon: Home },
    { name: "Tin tức", href: "/news", icon: Newspaper },
    { name: "Chạy bộ", href: "/run", icon: Play, highlighted: true },
    { name: "Cửa hàng", href: "/store", icon: ShoppingBag },
    { name: "Cá nhân", href: "/profile", icon: User },
  ];

  useEffect(() => {
    // Fetch notification count
    const fetchNotificationCount = async () => {
      try {
        const response = await fetch('/api/notifications/user_1');
        const data = await response.json();
        setNotificationCount(data.unreadCount || 0);
      } catch (error) {
        console.error('Error fetching notification count:', error);
      }
    };

    fetchNotificationCount();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchNotificationCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-vsm-orange rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="text-xl font-bold text-vsm-black">VSM</span>
            </Link>
            
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "text-vsm-orange bg-vsm-orange/10"
                      : "text-vsm-black hover:text-vsm-orange hover:bg-vsm-orange/5"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
            
            <Button className="bg-vsm-orange hover:bg-vsm-orange-dark text-white px-6">
              Đăng ký ngay
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-vsm-orange rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="text-xl font-bold text-vsm-black">VSM</span>
            </Link>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="border-t border-gray-100 py-4">
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "text-vsm-orange bg-vsm-orange/10"
                        : "text-vsm-black hover:text-vsm-orange hover:bg-vsm-orange/5"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                    {item.highlighted && (
                      <Badge className="bg-vsm-orange text-white text-xs">Hot</Badge>
                    )}
                  </Link>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Button className="w-full bg-vsm-orange hover:bg-vsm-orange-dark text-white">
                  Đăng ký ngay
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Bottom Tab Navigation (Mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="grid grid-cols-5">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center p-3 relative ${
                isActive(item.href)
                  ? "text-vsm-orange"
                  : "text-gray-500"
              }`}
            >
              {item.highlighted && (
                <div className="absolute -top-1 w-8 h-8 bg-vsm-orange rounded-full flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
              )}
              {!item.highlighted && <item.icon className="w-5 h-5" />}
              <span className={`text-xs mt-1 ${item.highlighted ? "mt-2" : ""}`}>
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
