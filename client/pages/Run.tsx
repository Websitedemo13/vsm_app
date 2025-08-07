import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  Square, 
  MapPin, 
  Timer, 
  Zap, 
  Flame,
  Target,
  TrendingUp
} from "lucide-react";

export default function Run() {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentStats = {
    distance: "2.45",
    time: "18:32",
    pace: "7:35",
    calories: "156"
  };

  const recentRuns = [
    {
      id: 1,
      date: "2024-12-10",
      distance: "5.2 km",
      time: "28:15",
      pace: "5:25/km",
      calories: 280
    },
    {
      id: 2,
      date: "2024-12-08",
      distance: "3.8 km",
      time: "22:45",
      pace: "5:59/km",
      calories: 205
    },
    {
      id: 3,
      date: "2024-12-06",
      distance: "7.1 km",
      time: "42:18",
      pace: "5:57/km",
      calories: 385
    }
  ];

  const handleStartPause = () => {
    if (isRunning) {
      setIsPaused(!isPaused);
    } else {
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-vsm-black">Chạy bộ</h1>
              <p className="text-vsm-gray-medium">Theo dõi hoạt động chạy bộ của bạn</p>
            </div>
            <Badge className="bg-green-100 text-green-700">
              GPS Sẵn sàng
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Run Control */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-8">
                {!isRunning ? (
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-vsm-orange to-vsm-orange-dark rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                         onClick={handleStartPause}>
                      <Play className="w-16 h-16 text-white fill-current ml-1" />
                    </div>
                    <h2 className="text-2xl font-bold text-vsm-black mb-2">Sẵn sàng chạy?</h2>
                    <p className="text-vsm-gray-medium mb-6">Nhấn nút để bắt đầu theo dõi chạy bộ với GPS</p>
                    <Button 
                      onClick={handleStartPause}
                      className="bg-vsm-orange hover:bg-vsm-orange-dark text-white px-8 py-3"
                    >
                      Bắt đầu chạy
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-vsm-orange">{currentStats.distance}</div>
                        <div className="text-sm text-gray-500">km</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-vsm-orange">{currentStats.time}</div>
                        <div className="text-sm text-gray-500">thời gian</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-vsm-orange">{currentStats.pace}</div>
                        <div className="text-sm text-gray-500">pace</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-vsm-orange">{currentStats.calories}</div>
                        <div className="text-sm text-gray-500">calo</div>
                      </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                      <Button
                        onClick={handleStartPause}
                        size="lg"
                        className={`${isPaused ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-600 hover:bg-yellow-700'} text-white px-8`}
                      >
                        {isPaused ? <Play className="w-6 h-6 mr-2" /> : <Pause className="w-6 h-6 mr-2" />}
                        {isPaused ? 'Tiếp tục' : 'Tạm dừng'}
                      </Button>
                      <Button
                        onClick={handleStop}
                        size="lg"
                        variant="destructive"
                        className="px-8"
                      >
                        <Square className="w-6 h-6 mr-2" />
                        Kết thúc
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-vsm-orange" />
                  Bản đồ GPS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Bản đồ sẽ hiển th�� khi bắt đầu chạy</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Goal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-vsm-orange" />
                  Mục tiêu hôm nay
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Quãng đường</span>
                    <span className="font-semibold">2.45/5.0 km</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-vsm-orange h-2 rounded-full" style={{width: '49%'}}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Calories</span>
                    <span className="font-semibold">156/400 calo</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-vsm-orange h-2 rounded-full" style={{width: '39%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-vsm-orange" />
                  Thống kê tuần này
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Timer className="w-4 h-4 text-vsm-orange mr-2" />
                      <span className="text-sm">Tổng thời gian</span>
                    </div>
                    <span className="font-semibold">2h 15m</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-vsm-orange mr-2" />
                      <span className="text-sm">Tổng quãng đường</span>
                    </div>
                    <span className="font-semibold">18.2 km</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Zap className="w-4 h-4 text-vsm-orange mr-2" />
                      <span className="text-sm">Pace trung bình</span>
                    </div>
                    <span className="font-semibold">5:45/km</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Flame className="w-4 h-4 text-vsm-orange mr-2" />
                      <span className="text-sm">Calories đã đốt</span>
                    </div>
                    <span className="font-semibold">892 calo</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Runs */}
            <Card>
              <CardHeader>
                <CardTitle>Hoạt động gần đây</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentRuns.map((run) => (
                    <div key={run.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-semibold text-sm">{run.distance}</div>
                        <div className="text-xs text-gray-500">{new Date(run.date).toLocaleDateString('vi-VN')}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">{run.time}</div>
                        <div className="text-xs text-gray-500">{run.pace}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
