import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Lock,
  User,
  LogIn,
  Crown,
  Eye,
  UserPlus,
  AlertCircle,
} from "lucide-react";
import { supabase, Profile } from "../lib/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "editor" | "admin";
  isPremium: boolean;
  avatar?: string;
  profile?: Profile;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  supabaseUser: SupabaseUser | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSupabaseUser(session.user);
        loadUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setSupabaseUser(session.user);
        await loadUserProfile(session.user.id);
      } else {
        setSupabaseUser(null);
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;

      if (profile) {
        const userData: User = {
          id: profile.id,
          email: profile.email,
          name: profile.full_name,
          role: profile.role,
          isPremium: profile.is_premium,
          avatar: profile.avatar_url,
          profile,
        };
        setUser(userData);
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
      // Fallback for development - create basic user
      if (supabaseUser) {
        const userData: User = {
          id: supabaseUser.id,
          email: supabaseUser.email || "",
          name: supabaseUser.user_metadata?.full_name || "User",
          role: "user",
          isPremium: false,
        };
        setUser(userData);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setSupabaseUser(data.user);
        await loadUserProfile(data.user.id);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSupabaseUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    if (user && user.profile) {
      try {
        const { error } = await supabase
          .from("profiles")
          .update({
            full_name: userData.name,
            avatar_url: userData.avatar,
          })
          .eq("id", user.id);

        if (error) throw error;

        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    }
  };

  const value = {
    user,
    isAuthenticated: user !== null,
    loading,
    login,
    logout,
    updateUser,
    supabaseUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthGuardProps {
  children: ReactNode;
  requiresPremium?: boolean;
  requiresRole?: "editor" | "admin";
  fallback?: "login" | "preview";
}

export const AuthGuard = ({
  children,
  requiresPremium = false,
  requiresRole,
  fallback = "login",
}: AuthGuardProps) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  // Not authenticated at all
  if (!isAuthenticated) {
    if (fallback === "preview") {
      return <PreviewMode>{children}</PreviewMode>;
    }
    return <LoginRequired />;
  }

  // Check role requirements
  if (requiresRole && user) {
    if (requiresRole === "admin" && user.role !== "admin") {
      return <RoleRequired requiredRole="admin" />;
    }
    if (requiresRole === "editor" && !["editor", "admin"].includes(user.role)) {
      return <RoleRequired requiredRole="editor" />;
    }
  }

  // Authenticated but requires Premium (unless admin)
  if (requiresPremium && user && !user.isPremium && user.role !== "admin") {
    return <PremiumRequired />;
  }

  // All checks passed
  return <>{children}</>;
};

const PreviewMode = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      {/* Preview overlay */}
      <div className="relative">
        <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm z-10 pointer-events-none" />
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
          <Card className="shadow-lg border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Eye className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-800">Chế độ xem thử</p>
                  <p className="text-sm text-yellow-700">
                    Đăng nhập để sử dụng đầy đủ tính năng
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => (window.location.href = "/login")}
                  className="bg-vsm-orange hover:bg-vsm-orange-dark text-white"
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  Đăng nhập
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        {children}
      </div>
    </div>
  );
};

const LoginRequired = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full shadow-xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-gray-800">
            Cần đăng nhập
          </CardTitle>
          <p className="text-gray-600">
            Bạn cần đăng nhập để truy cập tính năng này
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => (window.location.href = "/login")}
            className="w-full bg-vsm-orange hover:bg-vsm-orange-dark text-white h-12"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Đăng nhập ngay
          </Button>

          <Button
            onClick={() => (window.location.href = "/register")}
            variant="outline"
            className="w-full h-12"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Đăng ký tài khoản mới
          </Button>

          <div className="text-center pt-4 border-t">
            <p className="text-sm text-gray-500">
              Hoặc{" "}
              <button
                onClick={() => window.history.back()}
                className="text-vsm-orange hover:underline"
              >
                quay lại trang trước
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const RoleRequired = ({ requiredRole }: { requiredRole: string }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full shadow-xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl text-gray-800">
            Quyền truy cập bị hạn chế
          </CardTitle>
          <p className="text-gray-600">
            Chức năng này chỉ dành cho{" "}
            {requiredRole === "admin" ? "Admin" : "Editor/Admin"}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="w-full"
          >
            Quay lại
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const PremiumRequired = () => {
  const premiumFeatures = [
    "Giáo án tập luyện chuyên nghiệp",
    "Phân tích dữ liệu nâng cao",
    "Thử thách và segments độc quyền",
    "Voucher cửa hàng đặc biệt",
    "Hỗ trợ ưu tiên 24/7",
    "Badge Premium trong cộng đồng",
  ];

  const handleUpgrade = () => {
    window.location.href = "/store?upgrade=premium";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 flex items-center justify-center py-12 px-4">
      <Card className="max-w-lg w-full shadow-2xl border-0">
        <CardHeader className="text-center pb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Cần Premium
          </CardTitle>
          <p className="text-gray-600 text-lg">
            Tính năng này chỉ dành cho thành viên Premium
          </p>

          <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border border-yellow-200">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold text-yellow-800">
                Ưu đãi đặc biệt!
              </span>
            </div>
            <div className="text-3xl font-bold text-vsm-orange">299,000đ</div>
            <div className="text-sm text-gray-600">
              một năm • không giới hạn
            </div>
            <Badge className="mt-2 bg-red-100 text-red-700">
              Tiết kiệm 60% so với gói tháng
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800 mb-3">
              ✨ Bạn sẽ được:
            </h3>
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Crown className="w-3 h-3 text-green-600" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleUpgrade}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white h-12 text-lg"
            >
              <Crown className="w-5 h-5 mr-2" />
              Nâng cấp Premium - 299,000đ
            </Button>

            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="w-full"
            >
              Quay lại
            </Button>
          </div>

          <div className="text-center text-xs text-gray-500 space-y-1">
            <p>💳 Thanh toán an toàn • 🔄 Hoàn tiền 30 ngày</p>
            <p>📞 Hỗ trợ 24/7 • 🎯 Tính năng Premium không giới hạn</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
