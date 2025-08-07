import { RequestHandler } from "express";

export interface GPSPosition {
  latitude: number;
  longitude: number;
  timestamp: number;
  accuracy?: number;
  altitude?: number;
  speed?: number;
}

export interface RunSession {
  id: string;
  userId: string;
  startTime: number;
  endTime?: number;
  positions: GPSPosition[];
  distance: number;
  duration: number;
  averagePace: string;
  calories: number;
  isActive: boolean;
}

// In-memory storage for demo (in production, use a database)
const runSessions: Map<string, RunSession> = new Map();
const activePositions: Map<string, GPSPosition[]> = new Map();

export const startRunSession: RequestHandler = (req, res) => {
  const { userId } = req.body;
  
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const sessionId = Date.now().toString();
  const newSession: RunSession = {
    id: sessionId,
    userId,
    startTime: Date.now(),
    positions: [],
    distance: 0,
    duration: 0,
    averagePace: "0:00",
    calories: 0,
    isActive: true
  };

  runSessions.set(sessionId, newSession);
  activePositions.set(sessionId, []);

  res.json({ 
    sessionId,
    message: "Run session started successfully" 
  });
};

export const updatePosition: RequestHandler = (req, res) => {
  const { sessionId, latitude, longitude, accuracy, altitude, speed } = req.body;
  
  if (!sessionId || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: "Session ID, latitude, and longitude are required" });
  }

  const session = runSessions.get(sessionId);
  if (!session || !session.isActive) {
    return res.status(404).json({ error: "Active session not found" });
  }

  const position: GPSPosition = {
    latitude,
    longitude,
    timestamp: Date.now(),
    accuracy,
    altitude,
    speed
  };

  const positions = activePositions.get(sessionId) || [];
  positions.push(position);
  activePositions.set(sessionId, positions);

  // Calculate distance if we have previous positions
  let totalDistance = 0;
  if (positions.length > 1) {
    for (let i = 1; i < positions.length; i++) {
      const prev = positions[i - 1];
      const curr = positions[i];
      totalDistance += calculateDistance(prev.latitude, prev.longitude, curr.latitude, curr.longitude);
    }
  }

  // Update session
  session.positions = positions;
  session.distance = totalDistance;
  session.duration = Date.now() - session.startTime;
  session.averagePace = calculatePace(totalDistance, session.duration);
  session.calories = Math.round(totalDistance * 65); // Rough estimate: 65 calories per km

  res.json({ 
    distance: totalDistance.toFixed(2),
    duration: formatDuration(session.duration),
    pace: session.averagePace,
    calories: session.calories,
    currentPosition: position
  });
};

export const endRunSession: RequestHandler = (req, res) => {
  const { sessionId } = req.body;
  
  if (!sessionId) {
    return res.status(400).json({ error: "Session ID is required" });
  }

  const session = runSessions.get(sessionId);
  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }

  session.isActive = false;
  session.endTime = Date.now();
  session.duration = session.endTime - session.startTime;

  // Clean up active positions
  activePositions.delete(sessionId);

  res.json({
    session: {
      id: session.id,
      distance: session.distance.toFixed(2),
      duration: formatDuration(session.duration),
      pace: session.averagePace,
      calories: session.calories,
      startTime: new Date(session.startTime).toISOString(),
      endTime: new Date(session.endTime!).toISOString()
    },
    message: "Run session completed successfully"
  });
};

export const getRunHistory: RequestHandler = (req, res) => {
  const { userId } = req.params;
  
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const userSessions = Array.from(runSessions.values())
    .filter(session => session.userId === userId && !session.isActive)
    .sort((a, b) => (b.endTime || 0) - (a.endTime || 0))
    .slice(0, 20) // Return last 20 sessions
    .map(session => ({
      id: session.id,
      distance: session.distance.toFixed(2),
      duration: formatDuration(session.duration),
      pace: session.averagePace,
      calories: session.calories,
      date: new Date(session.endTime || session.startTime).toISOString(),
      startTime: new Date(session.startTime).toISOString(),
      endTime: session.endTime ? new Date(session.endTime).toISOString() : null
    }));

  res.json({ sessions: userSessions });
};

// Helper functions
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function calculatePace(distance: number, duration: number): string {
  if (distance === 0) return "0:00";
  const paceInSeconds = (duration / 1000) / distance;
  const minutes = Math.floor(paceInSeconds / 60);
  const seconds = Math.floor(paceInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function formatDuration(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
