import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Calendar, 
  Filter, 
  Download,
  Share2,
  Maximize2,
  RotateCcw,
  Eye,
  Activity,
  TrendingUp,
  Clock,
  Route
} from "lucide-react";

interface HeatmapData {
  lat: number;
  lng: number;
  intensity: number;
  activities: number;
}

interface RouteData {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number }[];
  distance: number;
  frequency: number;
  lastRun: string;
  avgPace: string;
  color: string;
}

export default function ActivityHeatmap() {
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);
  const [popularRoutes, setPopularRoutes] = useState<RouteData[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("year");
  const [showRoutes, setShowRoutes] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);

  useEffect(() => {
    loadHeatmapData();
    loadPopularRoutes();
  }, [selectedPeriod]);

  const loadHeatmapData = () => {
    // Mock heatmap data for Hanoi area
    const mockData: HeatmapData[] = [
      { lat: 21.0285, lng: 105.8542, intensity: 0.9, activities: 45 }, // Hoan Kiem Lake
      { lat: 21.0245, lng: 105.8412, intensity: 0.7, activities: 32 }, // Ba Dinh area
      { lat: 21.0365, lng: 105.8345, intensity: 0.8, activities: 38 }, // West Lake
      { lat: 21.0167, lng: 105.7834, intensity: 0.6, activities: 25 }, // My Dinh
      { lat: 21.0524, lng: 105.8186, intensity: 0.5, activities: 18 }, // Dong Da
      { lat: 20.9955, lng: 105.8455, intensity: 0.4, activities: 15 }, // Thanh Xuan
      { lat: 21.0415, lng: 105.8634, intensity: 0.7, activities: 29 }, // Long Bien
      { lat: 21.0076, lng: 105.8425, intensity: 0.6, activities: 22 }, // Hai Ba Trung
    ];
    setHeatmapData(mockData);
  };

  const loadPopularRoutes = () => {
    const mockRoutes: RouteData[] = [
      {
        id: "hoan-kiem-circuit",
        name: "Hồ Gươm Circuit",
        coordinates: [
          { lat: 21.0285, lng: 105.8542 },
          { lat: 21.0295, lng: 105.8555 },
          { lat: 21.0275, lng: 105.8565 },
          { lat: 21.0265, lng: 105.8545 },
          { lat: 21.0285, lng: 105.8542 }
        ],
        distance: 1.8,
        frequency: 23,
        lastRun: "2024-12-12",
        avgPace: "5:15",
        color: "#FF6B00"
      },
      {
        id: "west-lake-loop",
        name: "Tây Hồ Loop",
        coordinates: [
          { lat: 21.0365, lng: 105.8345 },
          { lat: 21.0385, lng: 105.8365 },
          { lat: 21.0405, lng: 105.8385 },
          { lat: 21.0395, lng: 105.8425 },
          { lat: 21.0375, lng: 105.8445 },
          { lat: 21.0345, lng: 105.8425 },
          { lat: 21.0325, lng: 105.8385 },
          { lat: 21.0345, lng: 105.8345 },
          { lat: 21.0365, lng: 105.8345 }
        ],
        distance: 13.2,
        frequency: 15,
        lastRun: "2024-12-10",
        avgPace: "5:45",
        color: "#4285F4"
      },
      {
        id: "bach-khoa-campus",
        name: "Bách Khoa Campus",
        coordinates: [
          { lat: 21.0067, lng: 105.8433 },
          { lat: 21.0077, lng: 105.8443 },
          { lat: 21.0087, lng: 105.8453 },
          { lat: 21.0077, lng: 105.8463 },
          { lat: 21.0067, lng: 105.8453 },
          { lat: 21.0067, lng: 105.8433 }
        ],
        distance: 2.1,
        frequency: 18,
        lastRun: "2024-12-11",
        avgPace: "5:30",
        color: "#34A853"
      }
    ];
    setPopularRoutes(mockRoutes);
  };

  const periods = [
    { value: "week", label: "Tuần này" },
    { value: "month", label: "Tháng này" },
    { value: "year", label: "Năm này" },
    { value: "all", label: "Tất cả" }
  ];

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 0.8) return "bg-red-500";
    if (intensity >= 0.6) return "bg-orange-500";
    if (intensity >= 0.4) return "bg-yellow-500";
    if (intensity >= 0.2) return "bg-green-500";
    return "bg-blue-500";
  };

  const exportHeatmap = () => {
    // Mock export functionality
    const blob = new Blob(['Mock heatmap data export'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vsm-heatmap-${selectedPeriod}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-vsm-orange" />
              Bản đồ hoạt động
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant={showHeatmap ? "default" : "outline"}
                size="sm"
                onClick={() => setShowHeatmap(!showHeatmap)}
                className={showHeatmap ? "bg-vsm-orange hover:bg-vsm-orange-dark" : ""}
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                Heatmap
              </Button>
              <Button
                variant={showRoutes ? "default" : "outline"}
                size="sm"
                onClick={() => setShowRoutes(!showRoutes)}
                className={showRoutes ? "bg-vsm-orange hover:bg-vsm-orange-dark" : ""}
              >
                <Route className="w-4 h-4 mr-1" />
                Routes
              </Button>
              <Button variant="outline" size="sm" onClick={exportHeatmap}>
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-vsm-orange" />
              <span className="text-sm font-medium">Thời gian:</span>
            </div>
            {periods.map((period) => (
              <Button
                key={period.value}
                variant={selectedPeriod === period.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period.value)}
                className={selectedPeriod === period.value ? "bg-vsm-orange hover:bg-vsm-orange-dark" : ""}
              >
                {period.label}
              </Button>
            ))}
          </div>

          {/* Map Container */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: "500px" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-100 to-purple-100">
              {/* Simulated Map Background */}
              <div className="absolute inset-0 opacity-30">
                <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border border-gray-200"></div>
                  ))}
                </div>
              </div>

              {/* Heatmap Points */}
              {showHeatmap && heatmapData.map((point, index) => (
                <div
                  key={index}
                  className={`absolute w-6 h-6 rounded-full ${getIntensityColor(point.intensity)} opacity-70 -translate-x-1/2 -translate-y-1/2 animate-pulse`}
                  style={{
                    left: `${((point.lng - 105.7) / 0.2) * 100}%`,
                    top: `${((21.1 - point.lat) / 0.15) * 100}%`,
                    transform: `translate(-50%, -50%) scale(${0.5 + point.intensity})`
                  }}
                  title={`${point.activities} hoạt động`}
                />
              ))}

              {/* Route Lines */}
              {showRoutes && popularRoutes.map((route) => (
                <svg
                  key={route.id}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d={`M ${route.coordinates.map(coord => 
                      `${((coord.lng - 105.7) / 0.2) * 100},${((21.1 - coord.lat) / 0.15) * 100}`
                    ).join(' L ')}`}
                    stroke={route.color}
                    strokeWidth="0.5"
                    fill="none"
                    opacity="0.8"
                  />
                </svg>
              ))}

              {/* Map Labels */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <h3 className="font-semibold text-vsm-black mb-1">Hà Nội, Việt Nam</h3>
                <p className="text-sm text-gray-600">Khu vực hoạt động chính</p>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <h4 className="font-medium text-sm text-vsm-black mb-2">Cường độ hoạt động</h4>
                <div className="flex items-center space-x-2">
                  {[
                    { intensity: 0.9, label: "Rất cao", color: "bg-red-500" },
                    { intensity: 0.7, label: "Cao", color: "bg-orange-500" },
                    { intensity: 0.5, label: "Trung bình", color: "bg-yellow-500" },
                    { intensity: 0.3, label: "Thấp", color: "bg-green-500" }
                  ].map((item) => (
                    <div key={item.intensity} className="flex items-center space-x-1">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-xs text-gray-600">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Zoom Controls */}
              <div className="absolute top-4 right-4 flex flex-col space-y-1">
                <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
                  <Maximize2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Popular Routes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Route className="w-5 h-5 mr-2 text-vsm-orange" />
            Routes phổ biến
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {popularRoutes.map((route) => (
              <Card key={route.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-vsm-black">{route.name}</h3>
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: route.color }}
                    ></div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quãng đường:</span>
                      <span className="font-medium">{route.distance} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tần suất:</span>
                      <span className="font-medium">{route.frequency} lần chạy</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pace TB:</span>
                      <span className="font-medium">{route.avgPace}/km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lần cuối:</span>
                      <span className="font-medium">
                        {new Date(route.lastRun).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Share2 className="w-4 h-4 mr-1" />
                      Chia sẻ
                    </Button>
                    <Button size="sm" className="flex-1 bg-vsm-orange hover:bg-vsm-orange-dark text-white">
                      <MapPin className="w-4 h-4 mr-1" />
                      Chạy lại
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <MapPin className="w-8 h-8 text-vsm-orange mx-auto mb-2" />
            <div className="text-2xl font-bold text-vsm-black">156</div>
            <div className="text-sm text-gray-500">Địa điểm đã chạy</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Route className="w-8 h-8 text-vsm-orange mx-auto mb-2" />
            <div className="text-2xl font-bold text-vsm-black">28</div>
            <div className="text-sm text-gray-500">Routes yêu thích</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-vsm-orange mx-auto mb-2" />
            <div className="text-2xl font-bold text-vsm-black">67h</div>
            <div className="text-sm text-gray-500">Tổng thời gian</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Activity className="w-8 h-8 text-vsm-orange mx-auto mb-2" />
            <div className="text-2xl font-bold text-vsm-black">284</div>
            <div className="text-sm text-gray-500">Hoạt động</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
