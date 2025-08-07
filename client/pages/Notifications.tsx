import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Bell, 
  Calendar, 
  ShoppingBag, 
  Info, 
  Trophy,
  Check,
  CheckCheck,
  ExternalLink,
  Gift,
  Zap
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "event" | "product" | "update" | "achievement";
  timestamp: number;
  isRead: boolean;
  actionUrl?: string;
  imageUrl?: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications/user_1');
      const data = await response.json();
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await fetch('/api/notifications/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user_1', notificationId })
      });

      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId 
            ? { ...notif, isRead: true }
            : notif
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch('/api/notifications/read-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user_1' })
      });

      setNotifications(prev => 
        prev.map(notif => ({ ...notif, isRead: true }))
      );
      setUnreadCount(0);

      toast({
        title: "Đã đánh dấu tất cả",
        description: "Tất cả thông báo đã được đánh dấu là đã đọc"
      });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "event": return Calendar;
      case "product": return ShoppingBag;
      case "update": return Info;
      case "achievement": return Trophy;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "event": return "text-blue-600";
      case "product": return "text-green-600";
      case "update": return "text-purple-600";
      case "achievement": return "text-yellow-600";
      default: return "text-gray-600";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "event": return "Sự kiện";
      case "product": return "Sản phẩm";
      case "update": return "Cập nhật";
      case "achievement": return "Thành tích";
      default: return "Thông báo";
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === "all") return true;
    if (filter === "unread") return !notif.isRead;
    return notif.type === filter;
  });

  const filterOptions = [
    { value: "all", label: "Tất cả", count: notifications.length },
    { value: "unread", label: "Chưa đọc", count: unreadCount },
    { value: "event", label: "Sự kiện", count: notifications.filter(n => n.type === "event").length },
    { value: "product", label: "Sản phẩm", count: notifications.filter(n => n.type === "product").length },
    { value: "update", label: "Cập nhật", count: notifications.filter(n => n.type === "update").length },
    { value: "achievement", label: "Thành tích", count: notifications.filter(n => n.type === "achievement").length },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-vsm-black flex items-center">
                <Bell className="w-8 h-8 mr-3 text-vsm-orange" />
                Thông báo
              </h1>
              <p className="text-vsm-gray-medium">
                Cập nhật mới nhất về sự kiện, sản phẩm và hoạt động từ VSM
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {unreadCount > 0 && (
                <Badge className="bg-red-100 text-red-700">
                  {unreadCount} chưa đọc
                </Badge>
              )}
              <Button 
                onClick={markAllAsRead}
                variant="outline"
                className="flex items-center"
                disabled={unreadCount === 0}
              >
                <CheckCheck className="w-4 h-4 mr-2" />
                Đánh dấu tất cả đã đọc
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Section */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={filter === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(option.value)}
              className={filter === option.value ? "bg-vsm-orange hover:bg-vsm-orange-dark" : ""}
            >
              {option.label}
              {option.count > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {option.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => {
              const IconComponent = getNotificationIcon(notification.type);
              return (
                <Card 
                  key={notification.id} 
                  className={`transition-all hover:shadow-md cursor-pointer ${
                    !notification.isRead ? 'border-l-4 border-l-vsm-orange bg-orange-50/30' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => !notification.isRead && markAsRead(notification.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-full bg-gray-100 ${getNotificationColor(notification.type)}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className={`text-lg font-semibold ${!notification.isRead ? 'text-vsm-black' : 'text-gray-700'}`}>
                                {notification.title}
                              </h3>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-vsm-orange rounded-full"></div>
                              )}
                            </div>
                            
                            <Badge variant="outline" className="mb-2">
                              {getTypeLabel(notification.type)}
                            </Badge>
                            
                            <p className="text-gray-600 mb-3">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">
                                {new Date(notification.timestamp).toLocaleString('vi-VN')}
                              </span>
                              
                              <div className="flex items-center space-x-2">
                                {!notification.isRead && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      markAsRead(notification.id);
                                    }}
                                  >
                                    <Check className="w-4 h-4 mr-1" />
                                    Đánh dấu đã đọc
                                  </Button>
                                )}
                                
                                {notification.actionUrl && (
                                  <Button
                                    size="sm"
                                    className="bg-vsm-orange hover:bg-vsm-orange-dark text-white"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // In a real app, navigate to the URL
                                      console.log('Navigate to:', notification.actionUrl);
                                    }}
                                  >
                                    <ExternalLink className="w-4 h-4 mr-1" />
                                    Xem chi tiết
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {filter === "unread" ? "Không có thông báo chưa đọc" : "Không có thông báo"}
                </h3>
                <p className="text-gray-500">
                  {filter === "unread" 
                    ? "Tất cả thông báo đã được đọc" 
                    : "Chưa có thông báo nào trong danh mục này"
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions */}
        {filteredNotifications.length > 0 && (
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6 text-center">
                <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">Sự kiện VSM</h3>
                <p className="text-sm text-blue-600 mb-4">Theo dõi các sự kiện marathon và hoạt động</p>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Xem lịch sự kiện
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6 text-center">
                <Gift className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-800 mb-2">Ưu đãi đặc biệt</h3>
                <p className="text-sm text-green-600 mb-4">Nhận thông báo về sản phẩm và khuyến mãi</p>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                  Xem cửa hàng
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6 text-center">
                <Zap className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-purple-800 mb-2">Cập nhật ứng dụng</h3>
                <p className="text-sm text-purple-600 mb-4">Luôn cập nhật tính năng mới nhất</p>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                  Cài đặt thông báo
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
