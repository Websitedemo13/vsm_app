import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Edit,
  Plus,
  Search,
  Eye,
  Trash2,
  Send,
  Package,
  MessageSquare,
  Calendar,
  FileText,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { api } from '../lib/api';
import { BlogPost, Order, SupportTicket } from '../lib/supabase';

interface CreatePostData {
  title: string;
  content: string;
  excerpt: string;
  featured_image: string;
  category: string;
  tags: string[];
}

export default function EditorDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');
  
  // Post management
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [postForm, setPostForm] = useState<CreatePostData>({
    title: '',
    content: '',
    excerpt: '',
    featured_image: '',
    category: 'general',
    tags: [],
  });

  // Support management
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, [activeTab]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      if (activeTab === 'posts') {
        const postsResponse = await api.getBlogPosts({ limit: 50 });
        setPosts(postsResponse.posts || []);
      } else if (activeTab === 'orders') {
        const ordersResponse = await api.getOrders({ limit: 50 });
        setOrders(ordersResponse.orders || []);
      } else if (activeTab === 'support') {
        const ticketsResponse = await api.getSupportTickets({ limit: 50 });
        setTickets(ticketsResponse.tickets || []);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    try {
      await api.createBlogPost(postForm);
      setShowCreatePost(false);
      setPostForm({
        title: '',
        content: '',
        excerpt: '',
        featured_image: '',
        category: 'general',
        tags: [],
      });
      loadDashboardData();
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleUpdatePost = async () => {
    if (!selectedPost) return;
    
    try {
      await api.updateBlogPost(selectedPost.id, postForm);
      setSelectedPost(null);
      loadDashboardData();
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const handlePublishPost = async (postId: string) => {
    try {
      await api.publishBlogPost(postId);
      loadDashboardData();
    } catch (error) {
      console.error('Failed to publish post:', error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await api.deleteBlogPost(postId);
      loadDashboardData();
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await api.updateOrderStatus(orderId, status);
      loadDashboardData();
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const handleRespondToTicket = async () => {
    if (!selectedTicket || !response.trim()) return;

    try {
      await api.respondToTicket(selectedTicket.id, response);
      setSelectedTicket(null);
      setResponse('');
      loadDashboardData();
    } catch (error) {
      console.error('Failed to respond to ticket:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: { variant: any; icon: React.ReactNode } } = {
      published: { variant: 'default', icon: <CheckCircle className="w-3 h-3 mr-1" /> },
      draft: { variant: 'secondary', icon: <Clock className="w-3 h-3 mr-1" /> },
      pending: { variant: 'secondary', icon: <Clock className="w-3 h-3 mr-1" /> },
      paid: { variant: 'default', icon: <CheckCircle className="w-3 h-3 mr-1" /> },
      failed: { variant: 'destructive', icon: <AlertCircle className="w-3 h-3 mr-1" /> },
      open: { variant: 'secondary', icon: <MessageSquare className="w-3 h-3 mr-1" /> },
      resolved: { variant: 'default', icon: <CheckCircle className="w-3 h-3 mr-1" /> },
    };

    const config = variants[status] || { variant: 'outline', icon: null };
    
    return (
      <Badge variant={config.variant}>
        {config.icon}
        {status}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Editor Dashboard</h1>
        <p className="text-gray-600">Quản lý nội dung, đơn hàng và hỗ trợ khách hàng</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Quản Lý Blog</TabsTrigger>
          <TabsTrigger value="orders">Đơn Hàng</TabsTrigger>
          <TabsTrigger value="support">Hỗ Trợ KH</TabsTrigger>
        </TabsList>

        {/* Blog Management */}
        <TabsContent value="posts" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Quản Lý Blog & Tin Tức</CardTitle>
                  <CardDescription>
                    Tạo, chỉnh sửa và quản lý nội dung blog
                  </CardDescription>
                </div>
                <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Tạo bài viết mới
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Tạo bài viết mới</DialogTitle>
                      <DialogDescription>
                        Điền thông tin để tạo bài viết blog mới
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Tiêu đề</Label>
                        <Input
                          id="title"
                          value={postForm.title}
                          onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                          placeholder="Nhập tiêu đề bài viết..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="excerpt">Tóm tắt</Label>
                        <Textarea
                          id="excerpt"
                          value={postForm.excerpt}
                          onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                          placeholder="Tóm tắt ngắn gọn về bài viết..."
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="content">Nội dung</Label>
                        <Textarea
                          id="content"
                          value={postForm.content}
                          onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                          placeholder="Viết nội dung đầy đủ của bài viết..."
                          rows={10}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">Danh mục</Label>
                          <Select value={postForm.category} onValueChange={(value) => setPostForm({ ...postForm, category: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">Tổng quát</SelectItem>
                              <SelectItem value="training">Tập luyện</SelectItem>
                              <SelectItem value="nutrition">Dinh dưỡng</SelectItem>
                              <SelectItem value="gear">Thiết bị</SelectItem>
                              <SelectItem value="events">Sự kiện</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="featured_image">URL hình ảnh</Label>
                          <Input
                            id="featured_image"
                            value={postForm.featured_image}
                            onChange={(e) => setPostForm({ ...postForm, featured_image: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowCreatePost(false)}>
                        Hủy
                      </Button>
                      <Button onClick={handleCreatePost}>
                        Tạo bài viết
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bài viết</TableHead>
                      <TableHead>Danh mục</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Ngày tạo</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{post.title}</div>
                            <div className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{post.category}</Badge>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(post.published ? 'published' : 'draft')}
                        </TableCell>
                        <TableCell>{formatDate(post.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedPost(post);
                                setPostForm({
                                  title: post.title,
                                  content: post.content,
                                  excerpt: post.excerpt || '',
                                  featured_image: post.featured_image || '',
                                  category: post.category,
                                  tags: post.tags,
                                });
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            {!post.published && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handlePublishPost(post.id)}
                              >
                                <Send className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Order Management */}
        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quản Lý Đơn Hàng</CardTitle>
              <CardDescription>
                Theo dõi và xử lý đơn hàng từ khách hàng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã đơn</TableHead>
                      <TableHead>Khách hàng</TableHead>
                      <TableHead>Sản phẩm</TableHead>
                      <TableHead>Số tiền</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Ngày tạo</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <div className="font-mono text-sm">{order.order_number}</div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{order.profiles?.full_name}</div>
                            <div className="text-sm text-gray-500">{order.profiles?.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{order.product_type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{formatCurrency(order.amount)}</div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(order.status)}
                        </TableCell>
                        <TableCell>{formatDate(order.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <Select
                            value={order.status}
                            onValueChange={(status) => handleUpdateOrderStatus(order.id, status)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="paid">Paid</SelectItem>
                              <SelectItem value="failed">Failed</SelectItem>
                              <SelectItem value="refunded">Refunded</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Support Management */}
        <TabsContent value="support" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hỗ Trợ Khách Hàng</CardTitle>
              <CardDescription>
                Trả lời và xử lý các yêu cầu hỗ trợ từ người dùng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Chủ đề</TableHead>
                      <TableHead>Người gửi</TableHead>
                      <TableHead>Ưu tiên</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Ngày tạo</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{ticket.subject}</div>
                            <div className="text-sm text-gray-500 line-clamp-2">{ticket.message}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{ticket.profiles?.full_name}</div>
                            <div className="text-sm text-gray-500">{ticket.profiles?.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={ticket.priority === 'high' ? 'destructive' : 
                                   ticket.priority === 'urgent' ? 'destructive' :
                                   'secondary'}
                          >
                            {ticket.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(ticket.status)}
                        </TableCell>
                        <TableCell>{formatDate(ticket.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedTicket(ticket)}
                              >
                                <MessageSquare className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Trả lời hỗ trợ</DialogTitle>
                                <DialogDescription>
                                  Phản hồi yêu cầu từ {ticket.profiles?.full_name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                  <div className="font-medium mb-2">{ticket.subject}</div>
                                  <div className="text-sm text-gray-700">{ticket.message}</div>
                                </div>
                                <div>
                                  <Label htmlFor="response">Phản hồi của bạn</Label>
                                  <Textarea
                                    id="response"
                                    value={response}
                                    onChange={(e) => setResponse(e.target.value)}
                                    placeholder="Nhập phản hồi cho khách hàng..."
                                    rows={5}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setSelectedTicket(null)}>
                                  Hủy
                                </Button>
                                <Button onClick={handleRespondToTicket}>
                                  <Send className="w-4 h-4 mr-2" />
                                  Gửi phản hồi
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Post Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa bài viết</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin bài viết
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Tiêu đề</Label>
              <Input
                id="edit-title"
                value={postForm.title}
                onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-excerpt">Tóm tắt</Label>
              <Textarea
                id="edit-excerpt"
                value={postForm.excerpt}
                onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="edit-content">Nội dung</Label>
              <Textarea
                id="edit-content"
                value={postForm.content}
                onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                rows={10}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedPost(null)}>
              Hủy
            </Button>
            <Button onClick={handleUpdatePost}>
              Cập nhật
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
