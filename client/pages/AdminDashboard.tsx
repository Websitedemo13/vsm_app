import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Users,
  DollarSign,
  TrendingUp,
  UserCheck,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Crown,
  Shield,
  User,
  Activity,
  Calendar,
  Package,
  Settings,
  BarChart3,
  PieChart,
} from "lucide-react";
import { api } from "../lib/api";

interface UserData {
  id: string;
  email: string;
  full_name: string;
  university?: string;
  student_id?: string;
  phone?: string;
  role: "user" | "editor" | "admin";
  is_premium: boolean;
  premium_expires_at?: string;
  created_at: string;
  total_runs: number;
  total_distance: number;
  last_activity?: string;
  orders_count: number;
  total_spent: number;
}

interface RevenueStats {
  total_revenue: number;
  monthly_revenue: number;
  premium_subscribers: number;
  total_orders: number;
  revenue_by_month: Array<{
    month: string;
    revenue: number;
    orders: number;
  }>;
  orders_by_status: Array<{
    status: string;
    count: number;
    amount: number;
  }>;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [revenueStats, setRevenueStats] = useState<RevenueStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [newRole, setNewRole] = useState<string>("");

  useEffect(() => {
    loadDashboardData();
  }, [currentPage, searchTerm, roleFilter]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load users
      const usersResponse = await api.getAllUsers({
        page: currentPage,
        limit: 20,
        search: searchTerm || undefined,
        role: roleFilter || undefined,
      });

      setUsers(usersResponse.users || []);
      setTotalPages(usersResponse.pagination?.pages || 1);

      // Load revenue stats
      const statsResponse = await api.getRevenueStats();
      setRevenueStats(statsResponse);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async () => {
    if (!selectedUser || !newRole) return;

    try {
      await api.updateUserRole(selectedUser.id, newRole);
      await loadDashboardData();
      setSelectedUser(null);
      setNewRole("");
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await api.deleteUser(userId);
      await loadDashboardData();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-red-100 text-red-800">
            <Shield className="w-3 h-3 mr-1" />
            Admin
          </Badge>
        );
      case "editor":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Edit className="w-3 h-3 mr-1" />
            Editor
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            <User className="w-3 h-3 mr-1" />
            User
          </Badge>
        );
    }
  };

  if (loading && !users.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">Quản lý toàn bộ hệ thống VSM</p>
      </div>

      {/* Stats Cards */}
      {revenueStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng Doanh Thu
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(revenueStats.total_revenue)}
              </div>
              <p className="text-xs text-muted-foreground">Tất cả thời gian</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Doanh Thu Tháng
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(revenueStats.monthly_revenue)}
              </div>
              <p className="text-xs text-muted-foreground">Tháng hiện tại</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Premium Users
              </CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {revenueStats.premium_subscribers}
              </div>
              <p className="text-xs text-muted-foreground">
                Người dùng premium
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng Đơn Hàng
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {revenueStats.total_orders}
              </div>
              <p className="text-xs text-muted-foreground">Đơn hàng đã xử lý</p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Quản Lý Users</TabsTrigger>
          <TabsTrigger value="revenue">Doanh Thu</TabsTrigger>
          <TabsTrigger value="orders">Đơn Hàng</TabsTrigger>
          <TabsTrigger value="analytics">Phân Tích</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quản Lý Người Dùng</CardTitle>
              <CardDescription>
                Quản lý vai trò và quyền hạn của tất cả người dùng trong hệ
                thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Tìm kiếm theo tên, email, trường đại học..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Lọc theo vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tất cả vai trò</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Users Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Người dùng</TableHead>
                      <TableHead>Vai trò</TableHead>
                      <TableHead>Premium</TableHead>
                      <TableHead>Hoạt động</TableHead>
                      <TableHead>Doanh thu</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{user.full_name}</div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                            {user.university && (
                              <div className="text-xs text-gray-400">
                                {user.university}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>
                          {user.is_premium ? (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Crown className="w-3 h-3 mr-1" />
                              Premium
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Free</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm space-y-1">
                            <div>{user.total_runs} lần chạy</div>
                            <div className="text-gray-500">
                              {user.total_distance.toFixed(1)} km
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm space-y-1">
                            <div className="font-medium">
                              {formatCurrency(user.total_spent)}
                            </div>
                            <div className="text-gray-500">
                              {user.orders_count} đơn
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setNewRole(user.role);
                                }}
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Chỉnh s��a người dùng</DialogTitle>
                                <DialogDescription>
                                  Thay đổi vai trò và quyền hạn của{" "}
                                  {user.full_name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium">
                                    Vai trò mới
                                  </label>
                                  <Select
                                    value={newRole}
                                    onValueChange={setNewRole}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="user">User</SelectItem>
                                      <SelectItem value="editor">
                                        Editor
                                      </SelectItem>
                                      <SelectItem value="admin">
                                        Admin
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter className="gap-2">
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                      <Trash2 className="w-4 h-4 mr-1" />
                                      Xóa
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Xác nhận xóa
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Bạn có chắc chắn muốn xóa người dùng
                                        này? Hành động này không thể hoàn tác.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                                      <AlertDialogAction
                                        className="bg-red-600 hover:bg-red-700"
                                        onClick={() =>
                                          handleDeleteUser(user.id)
                                        }
                                      >
                                        Xóa
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                                <Button onClick={handleUpdateRole}>
                                  Cập nhật vai trò
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600">
                  Trang {currentPage} / {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Trước
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Sau
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Báo Cáo Doanh Thu</CardTitle>
              <CardDescription>
                Theo dõi doanh thu và hiệu suất kinh doanh
              </CardDescription>
            </CardHeader>
            <CardContent>
              {revenueStats && (
                <div className="space-y-6">
                  {/* Revenue by Month Chart */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Doanh thu theo tháng
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {revenueStats.revenue_by_month.map((month, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="text-sm text-gray-500">
                              {month.month}
                            </div>
                            <div className="text-xl font-bold">
                              {formatCurrency(month.revenue)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {month.orders} đơn hàng
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Orders by Status */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Đơn hàng theo trạng thái
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {revenueStats.orders_by_status.map((status, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="text-sm font-medium capitalize">
                              {status.status}
                            </div>
                            <div className="text-lg font-bold">
                              {status.count} đơn
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatCurrency(status.amount)}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quản Lý Đơn Hàng</CardTitle>
              <CardDescription>
                Xem và quản lý tất cả đơn hàng trong hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                Tính năng quản lý đơn hàng đang được phát triển...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Phân Tích Hệ Thống</CardTitle>
              <CardDescription>
                Báo cáo chi tiết về hoạt động người dùng và hiệu suất hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                Dashboard phân tích đang được phát triển...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
