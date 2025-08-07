import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Trophy, 
  Clock, 
  Star,
  Heart,
  Share2,
  Camera,
  Medal,
  Flag,
  Route,
  Target,
  Zap,
  Gift,
  Crown,
  ChevronRight,
  Play,
  ExternalLink
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: "marathon" | "half-marathon" | "10k" | "5k" | "fun-run";
  difficulty: "beginner" | "intermediate" | "advanced";
  participants: number;
  maxParticipants: number;
  registrationFee: number;
  prizes: string[];
  image: string;
  isRegistered: boolean;
  isPopular: boolean;
  organizer: string;
  tags: string[];
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    const mockEvents: Event[] = [
      {
        id: "vsm-marathon-2025",
        title: "VSM Marathon 2025 - Chạy Vì Ước Mơ",
        description: "Sự kiện marathon lớn nhất năm dành cho sinh viên toàn quốc. Hành trình 42km qua những cung đường đẹp nhất Hà Nội với hàng nghìn runner cùng tham gia.",
        date: "2025-03-15T06:00:00",
        location: "Hà Nội, Việt Nam",
        category: "marathon",
        difficulty: "advanced",
        participants: 8547,
        maxParticipants: 15000,
        registrationFee: 650000,
        prizes: ["Huy chương finisher", "Áo thi đấu", "Giải thưởng 50 triệu", "Suất du học"],
        image: "🏃‍♂️",
        isRegistered: false,
        isPopular: true,
        organizer: "Vietnam Student Marathon",
        tags: ["Marathon chính thức", "Sinh viên", "Hà Nội", "Giải thưởng lớn"]
      },
      {
        id: "night-run-hcm",
        title: "VSM Night Run HCM - Thành phố về đêm",
        description: "Khám phá Sài Gòn về đêm với cung đường 10km qua những địa danh nổi tiếng. Ánh đèn lung linh, không khí mát mẻ và cộng đồng runner sôi động.",
        date: "2024-12-28T19:00:00",
        location: "TP. Hồ Chí Minh",
        category: "10k",
        difficulty: "intermediate",
        participants: 2340,
        maxParticipants: 5000,
        registrationFee: 450000,
        prizes: ["Medal glow-in-dark", "Áo thun VSM", "Voucher ăn uống"],
        image: "🌃",
        isRegistered: true,
        isPopular: true,
        organizer: "VSM Ho Chi Minh",
        tags: ["Chạy đêm", "Sài Gòn", "Phong cảnh đẹp"]
      },
      {
        id: "beach-run-danang",
        title: "VSM Beach Run Da Nang - Sunrise Marathon",
        description: "Chạy marathon đón bình minh tại bãi biển Mỹ Khê xinh đẹp. Kết hợp du lịch và thể thao trong một trải nghiệm không thể quên.",
        date: "2025-01-20T05:30:00",
        location: "Đà Nẵng, Việt Nam",
        category: "half-marathon",
        difficulty: "intermediate",
        participants: 1890,
        maxParticipants: 3000,
        registrationFee: 550000,
        prizes: ["Medal đặc biệt", "Tour du lịch Đà Nẵng", "Voucher resort"],
        image: "🏖️",
        isRegistered: false,
        isPopular: false,
        organizer: "VSM Da Nang",
        tags: ["Bãi biển", "Bình minh", "Du lịch"]
      },
      {
        id: "campus-run-series",
        title: "Campus Run Series - Đại học Quốc gia",
        description: "Giải chạy nội bộ các trường đại học với cự ly 5km thân thiện. Kết nối sinh viên các khoa, tạo tinh thần đoàn kết và sức khỏe.",
        date: "2024-12-22T07:00:00",
        location: "Đại học Quốc gia Hà Nội",
        category: "5k",
        difficulty: "beginner",
        participants: 890,
        maxParticipants: 2000,
        registrationFee: 150000,
        prizes: ["Huy chương campus", "Quà lưu niệm", "Suất ăn miễn phí"],
        image: "🎓",
        isRegistered: false,
        isPopular: false,
        organizer: "Đại học Quốc gia",
        tags: ["Sinh viên", "Campus", "Giá rẻ"]
      },
      {
        id: "charity-run-2025",
        title: "VSM Charity Run - Chạy Vì Cộng Đồng",
        description: "Sự kiện chạy từ thiện gây quỹ cho trẻ em vùng cao. Mỗi km chạy = 1000đ ủng hộ. Cùng nhau lan tỏa yêu thương và hy vọng.",
        date: "2025-02-14T06:30:00",
        location: "Công viên Thống Nhất, Hà Nội",
        category: "fun-run",
        difficulty: "beginner",
        participants: 3240,
        maxParticipants: 8000,
        registrationFee: 200000,
        prizes: ["Certificate tình nguyện", "Áo thiện nguyện", "Kỷ niệm chương"],
        image: "❤️",
        isRegistered: false,
        isPopular: true,
        organizer: "VSM Charity Foundation",
        tags: ["Từ thiện", "Cộng đồng", "Ý nghĩa"]
      }
    ];

    setEvents(mockEvents);
    setFeaturedEvent(mockEvents[0]); // Set VSM Marathon 2025 as featured
  };

  const registerForEvent = (eventId: string) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { ...event, isRegistered: true, participants: event.participants + 1 }
          : event
      )
    );

    toast({
      title: "Đăng ký thành công! 🎉",
      description: "Bạn đã đăng ký sự kiện thành công. Hãy chuẩn bị cho hành trình tuyệt vời!"
    });
  };

  const shareEvent = (event: Event) => {
    navigator.clipboard.writeText(`Tham gia cùng tôi sự kiện ${event.title} tại VSM! 🏃‍♂️`);
    toast({
      title: "Đã sao chép link chia sẻ",
      description: "Link sự kiện đã được sao chép vào clipboard"
    });
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      marathon: "Marathon (42K)",
      "half-marathon": "Half Marathon (21K)",
      "10k": "10 Kilomét",
      "5k": "5 Kilomét",
      "fun-run": "Fun Run"
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: "bg-green-100 text-green-700",
      intermediate: "bg-yellow-100 text-yellow-700",
      advanced: "bg-red-100 text-red-700"
    };
    return colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  const getDifficultyLabel = (difficulty: string) => {
    const labels = {
      beginner: "Người mới",
      intermediate: "Trung bình",
      advanced: "Nâng cao"
    };
    return labels[difficulty as keyof typeof labels] || difficulty;
  };

  const categories = [
    { value: "all", label: "Tất cả", icon: Target },
    { value: "marathon", label: "Marathon", icon: Flag },
    { value: "half-marathon", label: "Half Marathon", icon: Route },
    { value: "10k", label: "10K", icon: Zap },
    { value: "5k", label: "5K", icon: Star },
    { value: "fun-run", label: "Fun Run", icon: Heart }
  ];

  const filteredEvents = events.filter(event => 
    selectedCategory === "all" || event.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Featured Event */}
      {featuredEvent && (
        <section className="relative bg-gradient-to-br from-vsm-orange via-orange-500 to-red-500 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-white/20 text-white border-white/30">
                  <Crown className="w-4 h-4 mr-1" />
                  Sự kiện nổi bật
                </Badge>
                
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  {featuredEvent.title}
                </h1>
                
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  {featuredEvent.description}
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center text-white/90">
                    <Calendar className="w-5 h-5 mr-3" />
                    <div>
                      <div className="text-sm opacity-80">Ngày thi đấu</div>
                      <div className="font-semibold">
                        {new Date(featuredEvent.date).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-white/90">
                    <MapPin className="w-5 h-5 mr-3" />
                    <div>
                      <div className="text-sm opacity-80">Địa điểm</div>
                      <div className="font-semibold">{featuredEvent.location}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-white/90">
                    <Users className="w-5 h-5 mr-3" />
                    <div>
                      <div className="text-sm opacity-80">Đã đăng ký</div>
                      <div className="font-semibold">
                        {featuredEvent.participants.toLocaleString()} / {featuredEvent.maxParticipants.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-white/90">
                    <Trophy className="w-5 h-5 mr-3" />
                    <div>
                      <div className="text-sm opacity-80">Giải thưởng</div>
                      <div className="font-semibold">50 triệu VNĐ</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg"
                    onClick={() => registerForEvent(featuredEvent.id)}
                    disabled={featuredEvent.isRegistered}
                    className="bg-white text-vsm-orange hover:bg-gray-100 text-lg px-8 py-4"
                  >
                    {featuredEvent.isRegistered ? (
                      <>
                        <Medal className="w-5 h-5 mr-2" />
                        Đã đăng ký
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Đăng ký ngay - {featuredEvent.registrationFee.toLocaleString()}đ
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    size="lg"
                    variant="outline"
                    onClick={() => shareEvent(featuredEvent)}
                    className="border-white text-white hover:bg-white hover:text-vsm-orange text-lg px-8 py-4"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Chia sẻ
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="text-9xl text-center">
                  {featuredEvent.image}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl"></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-vsm-black mb-6">Khám phá sự kiện</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`flex items-center space-x-2 ${
                    selectedCategory === category.value 
                      ? "bg-vsm-orange hover:bg-vsm-orange-dark text-white" 
                      : ""
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-vsm-orange/20 to-orange-500/40 flex items-center justify-center text-6xl relative overflow-hidden">
                  {event.image}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                </div>
                
                {event.isPopular && (
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Nổi bật
                  </Badge>
                )}
                
                {event.isRegistered && (
                  <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                    <Medal className="w-3 h-3 mr-1" />
                    Đã đăng ký
                  </Badge>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => shareEvent(event)}
                  className="absolute bottom-3 right-3 bg-white/80 hover:bg-white text-vsm-black backdrop-blur-sm"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-vsm-orange border-vsm-orange">
                    {getCategoryLabel(event.category)}
                  </Badge>
                  <Badge className={getDifficultyColor(event.difficulty)}>
                    {getDifficultyLabel(event.difficulty)}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold text-vsm-black mb-3 group-hover:text-vsm-orange transition-colors">
                  {event.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {event.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-vsm-orange" />
                    <span>{new Date(event.date).toLocaleDateString('vi-VN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-vsm-orange" />
                    <span>{new Date(event.date).toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-vsm-orange" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2 text-vsm-orange" />
                    <span>{event.participants.toLocaleString()} / {event.maxParticipants.toLocaleString()} người</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-vsm-orange">
                      {event.registrationFee.toLocaleString()}đ
                    </div>
                    <div className="text-xs text-gray-500">Phí đăng ký</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-700">
                      {Math.round((event.participants / event.maxParticipants) * 100)}% đã đăng ký
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-vsm-orange h-2 rounded-full" 
                        style={{ width: `${Math.round((event.participants / event.maxParticipants) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {event.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-vsm-orange hover:bg-vsm-orange-dark text-white"
                    onClick={() => registerForEvent(event.id)}
                    disabled={event.isRegistered}
                  >
                    {event.isRegistered ? "Đã đăng ký" : "Đăng ký"}
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-vsm-orange/10 to-orange-500/10 border-vsm-orange/20">
            <CardContent className="p-12">
              <Trophy className="w-16 h-16 text-vsm-orange mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-vsm-black mb-4">
                Bạn muốn tổ chức sự kiện?
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Tham gia cùng VSM để tổ chức những sự kiện chạy bộ ý nghĩa, 
                kết nối cộng đồng sinh viên yêu thích thể thao trên toàn quốc.
              </p>
              <Button className="bg-vsm-orange hover:bg-vsm-orange-dark text-white px-8 py-4 text-lg">
                <Gift className="w-5 h-5 mr-2" />
                Đăng ký tổ chức sự kiện
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
