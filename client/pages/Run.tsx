import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Play,
  Pause,
  Square,
  MapPin,
  Timer,
  Zap,
  Flame,
  Target,
  TrendingUp,
  Navigation,
  Satellite,
} from "lucide-react";

interface GPSPosition {
  latitude: number;
  longitude: number;
  timestamp: number;
  accuracy?: number;
}

interface RunStats {
  distance: string;
  time: string;
  pace: string;
  calories: string;
}

export default function Run() {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentStats, setCurrentStats] = useState<RunStats>({
    distance: "0.00",
    time: "00:00",
    pace: "0:00",
    calories: "0",
  });
  const [currentPosition, setCurrentPosition] = useState<GPSPosition | null>(
    null,
  );
  const [gpsStatus, setGpsStatus] = useState<"searching" | "ready" | "error">(
    "searching",
  );
  const [runHistory, setRunHistory] = useState<any[]>([]);

  const { toast } = useToast();
  const watchId = useRef<number | null>(null);
  const startTime = useRef<number>(0);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  // Get user's current location on component mount
  useEffect(() => {
    getCurrentLocation();
    fetchRunHistory();
    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, []);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGpsStatus("error");
      toast({
        title: "GPS không khả dụng",
        description: "Trình duyệt không hỗ trợ định vị GPS",
        variant: "destructive",
      });
      return;
    }

    setGpsStatus("searching");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos: GPSPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: Date.now(),
          accuracy: position.coords.accuracy,
        };
        setCurrentPosition(pos);
        setGpsStatus("ready");
        toast({
          title: "GPS sẵn sàng",
          description: `Vị trí: ${pos.latitude.toFixed(6)}, ${pos.longitude.toFixed(6)}`,
        });
      },
      (error) => {
        setGpsStatus("error");
        toast({
          title: "Lỗi GPS",
          description:
            "Không thể lấy vị trí hiện tại. Vui lòng cho phép truy cập vị trí.",
          variant: "destructive",
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  const fetchRunHistory = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      const response = await fetch(`${apiUrl}/api/run/history/user_1`);

      if (!response.ok) {
        setRunHistory([]);
        return;
      }

      const data = await response.json();
      setRunHistory(data.sessions || []);
    } catch (error) {
      setRunHistory([]);
    }
  };

  const startRun = async () => {
    if (gpsStatus !== "ready") {
      toast({
        title: "GPS chưa sẵn sàng",
        description: "Vui lòng đợi GPS kết nối",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/run/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "user_1" }),
      });

      const data = await response.json();
      setSessionId(data.sessionId);
      setIsRunning(true);
      setIsPaused(false);
      startTime.current = Date.now();

      // Start GPS tracking
      watchId.current = navigator.geolocation.watchPosition(
        handlePositionUpdate,
        handlePositionError,
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 1000,
        },
      );

      // Start timer
      timerInterval.current = setInterval(updateTimer, 1000);

      toast({
        title: "Bắt đầu chạy",
        description: "GPS đang theo dõi hành trình của bạn",
      });
    } catch (error) {
      toast({
        title: "Lỗi khởi động",
        description: "Không thể bắt đầu session chạy",
        variant: "destructive",
      });
    }
  };

  const handlePositionUpdate = async (position: GeolocationPosition) => {
    if (!sessionId) return;

    const pos = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      altitude: position.coords.altitude,
      speed: position.coords.speed,
    };

    setCurrentPosition(pos);

    try {
      const response = await fetch("/api/run/position", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, ...pos }),
      });

      const data = await response.json();
      setCurrentStats({
        distance: data.distance,
        time: data.duration,
        pace: data.pace,
        calories: data.calories.toString(),
      });
    } catch (error) {
      console.error("Error updating position:", error);
    }
  };

  const handlePositionError = (error: GeolocationPositionError) => {
    console.error("GPS Error:", error);
    toast({
      title: "Lỗi GPS",
      description: "Mất kết nối GPS. Đang thử kết nối lại...",
      variant: "destructive",
    });
  };

  const updateTimer = () => {
    if (!isPaused && isRunning) {
      const elapsed = Date.now() - startTime.current;
      const minutes = Math.floor(elapsed / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000);
      setCurrentStats((prev) => ({
        ...prev,
        time: `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      }));
    }
  };

  const pauseResume = () => {
    setIsPaused(!isPaused);
    if (isPaused) {
      // Resume
      startTime.current = Date.now() - (Date.now() - startTime.current);
      timerInterval.current = setInterval(updateTimer, 1000);
    } else {
      // Pause
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    }
  };

  const stopRun = async () => {
    if (!sessionId) return;

    try {
      const response = await fetch("/api/run/end", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();

      // Stop GPS tracking
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }

      // Stop timer
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
        timerInterval.current = null;
      }

      setIsRunning(false);
      setIsPaused(false);
      setSessionId(null);

      // Refresh run history
      fetchRunHistory();

      toast({
        title: "Hoàn thành!",
        description: `Bạn đã chạy ${data.session.distance}km trong ${data.session.duration}`,
      });

      // Reset stats after a delay
      setTimeout(() => {
        setCurrentStats({
          distance: "0.00",
          time: "00:00",
          pace: "0:00",
          calories: "0",
        });
      }, 5000);
    } catch (error) {
      toast({
        title: "Lỗi kết thúc",
        description: "Không thể kết thúc session chạy",
        variant: "destructive",
      });
    }
  };

  const getGpsStatusColor = () => {
    switch (gpsStatus) {
      case "ready":
        return "bg-green-100 text-green-700";
      case "searching":
        return "bg-yellow-100 text-yellow-700";
      case "error":
        return "bg-red-100 text-red-700";
    }
  };

  const getGpsStatusText = () => {
    switch (gpsStatus) {
      case "ready":
        return "GPS Sẵn sàng";
      case "searching":
        return "Đang tìm GPS...";
      case "error":
        return "GPS Lỗi";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-vsm-black">
                Chạy bộ với GPS
              </h1>
              <p className="text-vsm-gray-medium">
                Theo dõi chính xác với định vị vệ tinh
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={getGpsStatusColor()}>
                <Satellite className="w-4 h-4 mr-1" />
                {getGpsStatusText()}
              </Badge>
              {currentPosition && (
                <Badge className="bg-blue-100 text-blue-700">
                  <Navigation className="w-4 h-4 mr-1" />
                  Độ chính xác: {currentPosition.accuracy?.toFixed(0)}m
                </Badge>
              )}
            </div>
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
                    <div
                      className={`w-32 h-32 ${gpsStatus === "ready" ? "bg-gradient-to-br from-vsm-orange to-vsm-orange-dark cursor-pointer hover:shadow-xl" : "bg-gray-400 cursor-not-allowed"} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg transition-shadow`}
                      onClick={gpsStatus === "ready" ? startRun : undefined}
                    >
                      <Play className="w-16 h-16 text-white fill-current ml-1" />
                    </div>
                    <h2 className="text-2xl font-bold text-vsm-black mb-2">
                      {gpsStatus === "ready"
                        ? "Sẵn sàng chạy!"
                        : "Đang chuẩn bị GPS..."}
                    </h2>
                    <p className="text-vsm-gray-medium mb-6">
                      {gpsStatus === "ready"
                        ? "Nhấn nút để bắt đầu theo dõi với GPS chính xác"
                        : "Vui lòng đợi GPS kết nối để bắt đầu"}
                    </p>
                    <Button
                      onClick={startRun}
                      disabled={gpsStatus !== "ready"}
                      className="bg-vsm-orange hover:bg-vsm-orange-dark text-white px-8 py-3 disabled:bg-gray-400"
                    >
                      {gpsStatus === "ready"
                        ? "Bắt đầu chạy"
                        : "Đang chờ GPS..."}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-vsm-orange">
                          {currentStats.distance}
                        </div>
                        <div className="text-sm text-gray-500">km</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-vsm-orange">
                          {currentStats.time}
                        </div>
                        <div className="text-sm text-gray-500">thời gian</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-vsm-orange">
                          {currentStats.pace}
                        </div>
                        <div className="text-sm text-gray-500">pace</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-vsm-orange">
                          {currentStats.calories}
                        </div>
                        <div className="text-sm text-gray-500">calo</div>
                      </div>
                    </div>

                    {currentPosition && (
                      <div className="bg-gray-100 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-600">
                          <strong>Vị trí hiện tại:</strong>{" "}
                          {currentPosition.latitude.toFixed(6)},{" "}
                          {currentPosition.longitude.toFixed(6)}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Độ chính xác:</strong>{" "}
                          {currentPosition.accuracy?.toFixed(0)}m
                        </p>
                      </div>
                    )}

                    <div className="flex justify-center space-x-4">
                      <Button
                        onClick={pauseResume}
                        size="lg"
                        className={`${isPaused ? "bg-green-600 hover:bg-green-700" : "bg-yellow-600 hover:bg-yellow-700"} text-white px-8`}
                      >
                        {isPaused ? (
                          <Play className="w-6 h-6 mr-2" />
                        ) : (
                          <Pause className="w-6 h-6 mr-2" />
                        )}
                        {isPaused ? "Tiếp tục" : "Tạm dừng"}
                      </Button>
                      <Button
                        onClick={stopRun}
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

            {/* Map Placeholder - In production, integrate with Google Maps or similar */}
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
                    {currentPosition ? (
                      <div>
                        <p className="text-gray-700 font-medium">
                          Đang theo dõi GPS
                        </p>
                        <p className="text-xs text-gray-500">
                          {currentPosition.latitude.toFixed(4)},{" "}
                          {currentPosition.longitude.toFixed(4)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500">
                        Bản đồ sẽ hiển thị khi có GPS
                      </p>
                    )}
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
                    <span className="font-semibold">
                      {currentStats.distance}/5.0 km
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-vsm-orange h-2 rounded-full"
                      style={{
                        width: `${Math.min((parseFloat(currentStats.distance) / 5.0) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Calories</span>
                    <span className="font-semibold">
                      {currentStats.calories}/400 calo
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-vsm-orange h-2 rounded-full"
                      style={{
                        width: `${Math.min((parseInt(currentStats.calories) / 400) * 100, 100)}%`,
                      }}
                    ></div>
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
                  {runHistory.slice(0, 5).map((run) => (
                    <div
                      key={run.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-semibold text-sm">
                          {run.distance} km
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(run.date).toLocaleDateString("vi-VN")}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">{run.duration}</div>
                        <div className="text-xs text-gray-500">
                          {run.pace}/km
                        </div>
                      </div>
                    </div>
                  ))}
                  {runHistory.length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      Chưa có hoạt động nào
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
