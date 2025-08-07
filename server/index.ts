import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  startRunSession,
  updatePosition,
  endRunSession,
  getRunHistory,
} from "./routes/gps";
import {
  getUserProfile,
  upgradeToPremiUm,
  getTrainingPlans,
  getUserVouchers,
  getUserNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "./routes/premium";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // GPS & Run tracking routes
  app.post("/api/run/start", startRunSession);
  app.post("/api/run/position", updatePosition);
  app.post("/api/run/end", endRunSession);
  app.get("/api/run/history/:userId", getRunHistory);

  // Premium & User routes
  app.get("/api/user/:userId", getUserProfile);
  app.post("/api/user/upgrade", upgradeToPremiUm);
  app.get("/api/training-plans/:userId", getTrainingPlans);
  app.get("/api/vouchers/:userId", getUserVouchers);
  app.get("/api/notifications/:userId", getUserNotifications);
  app.post("/api/notifications/read", markNotificationRead);
  app.post("/api/notifications/read-all", markAllNotificationsRead);

  return app;
}
