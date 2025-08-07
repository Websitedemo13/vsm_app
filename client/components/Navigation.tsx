import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "./AuthGuard";
import {
  Home,
  Newspaper,
  Play,
  ShoppingBag,
  User,
  Menu,
  X,
  Bell,
  Calendar,
  TrendingUp,
  Crown,
  LogOut,
} from "lucide-react";

export default function Navigation() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const { user, isAuthenticated, logout } = useAuth();

  const navigation = [
    { name: "Trang chủ", href: "/", icon: Home },
    { name: "Feed", href: "/feed", icon: TrendingUp },
    { name: "Chạy bộ", href: "/run", icon: Play, highlighted: true },
    { name: "Sự kiện", href: "/events", icon: Calendar },
    { name: "Cửa hàng", href: "/store", icon: ShoppingBag },
    { name: "Cá nhân", href: "/profile", icon: User },
  ];

  useEffect(() => {
    // Fetch notification count
    const fetchNotificationCount = async () => {
      try {
        const response = await fetch("/api/notifications/user_1");
        const data = await response.json();
        setNotificationCount(data.unreadCount || 0);
      } catch (error) {
        console.error("Error fetching notification count:", error);
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

              {/* Notifications */}
              <Link
                to="/notifications"
                className={`relative p-2 rounded-lg transition-colors ${
                  isActive("/notifications")
                    ? "text-vsm-orange bg-vsm-orange/10"
                    : "text-vsm-black hover:text-vsm-orange hover:bg-vsm-orange/5"
                }`}
              >
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-4 w-4 flex items-center justify-center p-0 rounded-full">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </Badge>
                )}
              </Link>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {user?.isPremium && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-vsm-orange text-white text-sm">
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="text-red-600 hover:text-red-700"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" className="px-6">
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-vsm-orange hover:bg-vsm-orange-dark text-white px-6">
                    Đăng ký ngay
                  </Button>
                </Link>
              </div>
            )}
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
                      <Badge className="bg-vsm-orange text-white text-xs">
                        Hot
                      </Badge>
                    )}
                  </Link>
                ))}

                {/* Mobile Notifications */}
                <Link
                  to="/notifications"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors relative ${
                    isActive("/notifications")
                      ? "text-vsm-orange bg-vsm-orange/10"
                      : "text-vsm-black hover:text-vsm-orange hover:bg-vsm-orange/5"
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  <span className="font-medium">Thông báo</span>
                  {notificationCount > 0 && (
                    <Badge className="bg-red-500 text-white text-xs">
                      {notificationCount > 9 ? "9+" : notificationCount}
                    </Badge>
                  )}
                </Link>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-vsm-orange text-white">
                          {user?.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-800">
                          {user?.name}
                        </p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                      {user?.isPremium && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs">
                          <Crown className="w-3 h-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>
                    <Button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full text-red-600 hover:text-red-700"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Đăng xuất
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full">
                        Đăng nhập
                      </Button>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button className="w-full bg-vsm-orange hover:bg-vsm-orange-dark text-white">
                        Đăng ký ngay
                      </Button>
                    </Link>
                  </div>
                )}
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
                isActive(item.href) ? "text-vsm-orange" : "text-gray-500"
              }`}
            >
              {item.highlighted && (
                <div className="absolute -top-1 w-8 h-8 bg-vsm-orange rounded-full flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
              )}
              {!item.highlighted && <item.icon className="w-5 h-5" />}
              <span
                className={`text-xs mt-1 ${item.highlighted ? "mt-2" : ""}`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
