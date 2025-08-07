import { RequestHandler } from "express";

export interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  premiumExpiry?: number;
  totalDistance: number;
  totalRuns: number;
  joinedDate: number;
}

export interface TrainingPlan {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  weeks: number;
  sessions: TrainingSession[];
  isPremium: boolean;
}

export interface TrainingSession {
  id: string;
  week: number;
  day: number;
  title: string;
  description: string;
  distance?: string;
  duration?: string;
  type: "Easy Run" | "Interval" | "Long Run" | "Rest" | "Cross Training";
  completed: boolean;
}

export interface Voucher {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minimumAmount?: number;
  expiryDate: number;
  isUsed: boolean;
  category?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "event" | "product" | "update" | "achievement";
  timestamp: number;
  isRead: boolean;
  actionUrl?: string;
  imageUrl?: string;
}

// Mock data storage
const users: Map<string, User> = new Map();
const userVouchers: Map<string, Voucher[]> = new Map();
const userNotifications: Map<string, Notification[]> = new Map();

// Initialize mock user
const mockUser: User = {
  id: "user_1",
  name: "Thành Long Nguyen",
  email: "thanhlong@student.com",
  isPremium: false,
  totalDistance: 284.5,
  totalRuns: 47,
  joinedDate: Date.now() - 60 * 24 * 60 * 60 * 1000, // 60 days ago
};
users.set("user_1", mockUser);

// Training plans
const trainingPlans: TrainingPlan[] = [
  {
    id: "plan_1",
    title: "5K Runner - Người mới bắt đầu",
    description: "Chương trình 8 tuần giúp bạn hoàn thành 5km đầu tiên",
    duration: "8 tuần",
    difficulty: "Beginner",
    weeks: 8,
    sessions: [
      {
        id: "s1",
        week: 1,
        day: 1,
        title: "Chạy bộ kết hợp đi bộ",
        description: "30 phút: Chạy 1 phút, đi bộ 2 phút (lặp lại 10 lần)",
        duration: "30 phút",
        type: "Easy Run",
        completed: false,
      },
      {
        id: "s2",
        week: 1,
        day: 3,
        title: "Cross Training",
        description: "Tập yoga hoặc bơi lội nhẹ nhàng",
        duration: "30 phút",
        type: "Cross Training",
        completed: false,
      },
    ],
    isPremium: false,
  },
  {
    id: "plan_2",
    title: "10K Advanced - Nâng cao",
    description: "Chương trình 12 tuần cho runner có kinh nghiệm",
    duration: "12 tuần",
    difficulty: "Advanced",
    weeks: 12,
    sessions: [
      {
        id: "s3",
        week: 1,
        day: 1,
        title: "Base Run",
        description: "Chạy đều 6km với pace thoải mái",
        distance: "6km",
        type: "Easy Run",
        completed: false,
      },
    ],
    isPremium: true,
  },
  {
    id: "plan_3",
    title: "Marathon Preparation - Chuẩn bị Marathon",
    description: "Chương trình 16 tuần chuẩn bị cho cuộc đua marathon",
    duration: "16 tuần",
    difficulty: "Advanced",
    weeks: 16,
    sessions: [],
    isPremium: true,
  },
];

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: "notif_1",
    title: "🎉 VSM Marathon 2025 đã mở đăng ký!",
    message: "Đăng ký ngay để nhận early bird discount 30%",
    type: "event",
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    isRead: false,
    actionUrl: "/events/marathon-2025",
  },
  {
    id: "notif_2",
    title: "🆕 Sản phẩm mới: Giày VSM Speed Pro",
    message: "Giày chạy bộ thế hệ mới với công nghệ đệm air",
    type: "product",
    timestamp: Date.now() - 6 * 60 * 60 * 1000,
    isRead: false,
    actionUrl: "/store/product/vsm-speed-pro",
  },
  {
    id: "notif_3",
    title: "🏆 Bạn đã đạt thành tích mới!",
    message: "Chúc mừng! Bạn đã chạy được tổng cộng 250km",
    type: "achievement",
    timestamp: Date.now() - 12 * 60 * 60 * 1000,
    isRead: true,
  },
];

userNotifications.set("user_1", mockNotifications);

export const getUserProfile: RequestHandler = (req, res) => {
  const { userId } = req.params;
  const user = users.get(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ user });
};

export const upgradeToPremiUm: RequestHandler = (req, res) => {
  const { userId } = req.body;
  const user = users.get(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Simulate premium upgrade
  user.isPremium = true;
  user.premiumExpiry = Date.now() + 365 * 24 * 60 * 60 * 1000; // 1 year

  // Give welcome vouchers
  const welcomeVouchers: Voucher[] = [
    {
      id: `voucher_${Date.now()}_1`,
      code: "PREMIUM20",
      title: "Premium Welcome 20%",
      description: "Giảm 20% cho đơn hàng đầu tiên",
      discountType: "percentage",
      discountValue: 20,
      minimumAmount: 200000,
      expiryDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
      isUsed: false,
      category: "welcome",
    },
    {
      id: `voucher_${Date.now()}_2`,
      code: "FREESHIP",
      title: "Miễn phí vận chuyển",
      description: "Miễn phí vận chuyển cho đơn hàng trên 500k",
      discountType: "fixed",
      discountValue: 50000,
      minimumAmount: 500000,
      expiryDate: Date.now() + 60 * 24 * 60 * 60 * 1000,
      isUsed: false,
      category: "shipping",
    },
  ];

  userVouchers.set(userId, welcomeVouchers);

  // Add notification
  const upgradeNotification: Notification = {
    id: `notif_${Date.now()}`,
    title: "🎉 Chào mừng đến Premium!",
    message:
      "Bạn đã unlock thành công tài khoản Premium. Nhận ngay 2 voucher khuyến mãi!",
    type: "achievement",
    timestamp: Date.now(),
    isRead: false,
  };

  const notifications = userNotifications.get(userId) || [];
  notifications.unshift(upgradeNotification);
  userNotifications.set(userId, notifications);

  res.json({
    message: "Premium upgrade successful!",
    user,
    vouchers: welcomeVouchers,
  });
};

export const getTrainingPlans: RequestHandler = (req, res) => {
  const { userId } = req.params;
  const user = users.get(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Filter plans based on premium status
  const availablePlans = trainingPlans.filter(
    (plan) => !plan.isPremium || user.isPremium,
  );

  res.json({
    plans: availablePlans,
    userPremium: user.isPremium,
  });
};

export const getUserVouchers: RequestHandler = (req, res) => {
  const { userId } = req.params;
  const vouchers = userVouchers.get(userId) || [];

  // Filter active vouchers
  const activeVouchers = vouchers.filter(
    (v) => !v.isUsed && v.expiryDate > Date.now(),
  );

  res.json({ vouchers: activeVouchers });
};

export const getUserNotifications: RequestHandler = (req, res) => {
  const { userId } = req.params;
  const notifications = userNotifications.get(userId) || [];

  res.json({
    notifications: notifications.sort((a, b) => b.timestamp - a.timestamp),
    unreadCount: notifications.filter((n) => !n.isRead).length,
  });
};

export const markNotificationRead: RequestHandler = (req, res) => {
  const { userId, notificationId } = req.body;
  const notifications = userNotifications.get(userId) || [];

  const notification = notifications.find((n) => n.id === notificationId);
  if (notification) {
    notification.isRead = true;
    userNotifications.set(userId, notifications);
  }

  res.json({ success: true });
};

export const markAllNotificationsRead: RequestHandler = (req, res) => {
  const { userId } = req.body;
  const notifications = userNotifications.get(userId) || [];

  notifications.forEach((n) => (n.isRead = true));
  userNotifications.set(userId, notifications);

  res.json({ success: true });
};
