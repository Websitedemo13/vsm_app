import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivityHeatmap from "@/components/ActivityHeatmap";
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Target,
  Activity,
  Clock,
  Zap,
  Award,
  MapPin,
  Route,
  Heart,
  Flame
} from "lucide-react";

interface MonthlyStats {
  month: string;
  distance: number;
  runs: number;
  time: number;
  calories: number;
}

interface WeeklyProgress {
  week: string;
  distance: number;
  target: number;
}

export default function Analytics() {
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats[]>([]);
  const [weeklyProgress, setWeeklyProgress] = useState<WeeklyProgress[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("6months");

  useEffect(() => {
    loadMonthlyStats();
    loadWeeklyProgress();
  }, [selectedPeriod]);

  const loadMonthlyStats = () => {
    const mockStats: MonthlyStats[] = [
      { month: "T7", distance: 45.2, runs: 12, time: 280, calories: 2850 },
      { month: "T8", distance: 52.8, runs: 15, time: 320, calories: 3320 },
      { month: "T9", distance: 38.5, runs: 10, time: 240, calories: 2420 },
      { month: "T10", distance: 61.3, runs: 18, time: 380, calories: 3860 },
      { month: "T11", distance: 48.7, runs: 14, time: 300, calories: 3060 },
      { month: "T12", distance: 39.2, runs: 11, time: 245, calories: 2470 }
    ];
    setMonthlyStats(mockStats);
  };

  const loadWeeklyProgress = () => {
    const mockProgress: WeeklyProgress[] = [
      { week: "T2", distance: 12.5, target: 15 },
      { week: "T3", distance: 18.2, target: 15 },
      { week: "T4", distance: 14.8, target: 15 },
      { week: "T5", distance: 16.5, target: 15 },
      { week: "T6", distance: 11.3, target: 15 },
      { week: "T7", distance: 19.7, target: 15 },
      { week: "CN", distance: 8.4, target: 15 }
    ];
    setWeeklyProgress(mockProgress);
  };

  const periods = [
    { value: "1month", label: "1 tháng" },
    { value: "3months", label: "3 tháng" },
    { value: "6months", label: "6 tháng" },
    { value: "1year", label: "1 năm" }
  ];

  const currentStats = {
    totalDistance: 285.7,
    totalRuns: 80,
    totalTime: "42h 15m",
    avgPace: "5:45",
    totalCalories: 18280,
    longestRun: 21.1,
    bestPace: "4:32",
    activeStreak: 12
  };

  const maxDistance = Math.max(...monthlyStats.map(stat => stat.distance));
  const maxWeeklyDistance = Math.max(...weeklyProgress.map(week => week.distance));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-vsm-black flex items-center">
                <BarChart3 className="w-8 h-8 mr-3 text-vsm-orange" />
                Analytics
              </h1>
              <p className="text-vsm-gray-medium">
                Phân tích chi tiết hoạt động chạy bộ và theo dõi tiến độ
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
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
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <MapPin className="w-6 h-6 text-vsm-orange mx-auto mb-2" />
              <div className="text-xl font-bold text-vsm-black">{currentStats.totalDistance}</div>
              <div className="text-xs text-gray-500">Tổng KM</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Activity className="w-6 h-6 text-vsm-orange mx-auto mb-2" />
              <div className="text-xl font-bold text-vsm-black">{currentStats.totalRuns}</div>
              <div className="text-xs text-gray-500">Buổi chạy</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-vsm-orange mx-auto mb-2" />
              <div className="text-xl font-bold text-vsm-black">{currentStats.totalTime}</div>
              <div className="text-xs text-gray-500">Thời gian</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Zap className="w-6 h-6 text-vsm-orange mx-auto mb-2" />
              <div className="text-xl font-bold text-vsm-black">{currentStats.avgPace}</div>
              <div className="text-xs text-gray-500">Pace TB</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Flame className="w-6 h-6 text-vsm-orange mx-auto mb-2" />
              <div className="text-xl font-bold text-vsm-black">{currentStats.totalCalories.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Calories</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Route className="w-6 h-6 text-vsm-orange mx-auto mb-2" />
              <div className="text-xl font-bold text-vsm-black">{currentStats.longestRun}</div>
              <div className="text-xs text-gray-500">Longest Run</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="w-6 h-6 text-vsm-orange mx-auto mb-2" />
              <div className="text-xl font-bold text-vsm-black">{currentStats.bestPace}</div>
              <div className="text-xs text-gray-500">Best Pace</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 text-vsm-orange mx-auto mb-2" />
              <div className="text-xl font-bold text-vsm-black">{currentStats.activeStreak}</div>
              <div className="text-xs text-gray-500">Streak</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="charts" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3">
            <TabsTrigger value="charts">Biểu đồ</TabsTrigger>
            <TabsTrigger value="heatmap">Bản đồ</TabsTrigger>
            <TabsTrigger value="trends">Xu hướng</TabsTrigger>
          </TabsList>

          <TabsContent value="charts" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Monthly Distance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-vsm-orange" />
                    Quãng đường theo tháng
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyStats.map((stat) => (
                      <div key={stat.month} className="flex items-center space-x-4">
                        <div className="w-8 text-sm font-medium text-gray-600">{stat.month}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">{stat.distance} km</span>
                            <span className="text-xs text-gray-500">{stat.runs} buổi</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-vsm-orange h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${(stat.distance / maxDistance) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-16 text-right">
                          <div className="text-sm font-semibold text-vsm-black">{stat.distance}km</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-vsm-orange" />
                    Tiến độ tuần này
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyProgress.map((week) => (
                      <div key={week.week} className="flex items-center space-x-4">
                        <div className="w-8 text-sm font-medium text-gray-600">{week.week}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">{week.distance} km</span>
                            <span className="text-xs text-gray-500">
                              Mục tiêu: {week.target} km
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                week.distance >= week.target ? 'bg-green-500' : 'bg-vsm-orange'
                              }`}
                              style={{ width: `${Math.min((week.distance / week.target) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-16 text-right">
                          {week.distance >= week.target && (
                            <Badge className="bg-green-100 text-green-700 text-xs">
                              Hoàn thành
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-vsm-orange" />
                  Chỉ số hiệu suất
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600">142</div>
                    <div className="text-sm text-gray-600">Nhịp tim TB</div>
                    <div className="text-xs text-gray-500 mt-1">bpm</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-600">78</div>
                    <div className="text-sm text-gray-600">VO2 Max</div>
                    <div className="text-xs text-gray-500 mt-1">ml/kg/min</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Activity className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-purple-600">156</div>
                    <div className="text-sm text-gray-600">Cadence TB</div>
                    <div className="text-xs text-gray-500 mt-1">bước/phút</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-8 h-8 text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold text-orange-600">85%</div>
                    <div className="text-sm text-gray-600">Hiệu suất</div>
                    <div className="text-xs text-gray-500 mt-1">so với mục tiêu</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="heatmap" className="space-y-6">
            <ActivityHeatmap />
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Xu hướng cải thiện</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-vsm-black">Pace trung bình</div>
                        <div className="text-sm text-gray-600">So với tháng trước</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">-0:15</div>
                        <div className="text-xs text-gray-500">Cải thiện 4.3%</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-vsm-black">Quãng đường/tuần</div>
                        <div className="text-sm text-gray-600">So với tháng trước</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">+5.2km</div>
                        <div className="text-xs text-gray-500">Tăng 12.8%</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-vsm-black">Tần suất chạy</div>
                        <div className="text-sm text-gray-600">So với tháng trước</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">+2 buổi</div>
                        <div className="text-xs text-gray-500">Tăng 18.2%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mục tiêu sắp tới</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-yellow-800">VSM Marathon 2025</h3>
                        <Badge className="bg-yellow-100 text-yellow-700">92 ngày</Badge>
                      </div>
                      <div className="text-sm text-yellow-700">
                        Mục tiêu: Hoàn thành 42km dưới 4 giờ
                      </div>
                      <div className="mt-2 w-full bg-yellow-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{width: "68%"}}></div>
                      </div>
                      <div className="text-xs text-yellow-600 mt-1">68% hoàn thành kế hoạch tập luyện</div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-blue-800">Mục tiêu tháng này</h3>
                        <Badge className="bg-blue-100 text-blue-700">18 ngày</Badge>
                      </div>
                      <div className="text-sm text-blue-700">
                        Chạy 50km trong tháng 12
                      </div>
                      <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: "78%"}}></div>
                      </div>
                      <div className="text-xs text-blue-600 mt-1">39.2/50km đã hoàn thành</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
