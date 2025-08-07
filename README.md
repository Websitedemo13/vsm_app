# VSM - Vietnam Student Marathon 🏃‍♂️

Ứng dụng marathon dành cho sinh viên Việt Nam với hệ thống quản lý vai trò đầy đủ.

## 🚀 Tính năng chính

### Dành cho Users
- 📱 Theo dõi GPS và ghi lại hoạt động chạy bộ
- 📊 Phân tích chi tiết hiệu suất cá nhân
- 🏆 Tham gia events và challenges
- 👥 Kết nối cộng đồng runners
- 💎 Nâng cấp Premium (299,000 VND/năm)

### Dành cho Editors
- ✍️ Quản lý blog và tin tức
- 📦 Xử lý đơn hàng
- 💬 Hỗ trợ khách hàng
- 📈 Theo dõi nội dung

### Dành cho Admins  
- 👥 Quản lý toàn bộ users và roles
- 💰 Dashboard doanh thu chi tiết
- 📊 Phân tích hệ thống
- ⚙️ Cấu hình toàn bộ platform

## 🛠 Tech Stack

### Frontend
- ⚡ **React 18** + TypeScript + Vite
- 🎨 **Tailwind CSS** + shadcn/ui components
- 🔒 **Supabase Auth** + Role-based access control
- 📱 **Responsive design** cho mobile và desktop

### Backend
- 🚀 **Go** với Gin framework
- 🗄️ **Supabase** PostgreSQL database
- 🔐 **JWT authentication** + Row Level Security
- 🌐 **RESTful API** endpoints

### Database Schema
```sql
profiles (users with roles)
├── runs (GPS tracking data)
├── orders (premium subscriptions)
├── blog_posts (CMS content)
├── user_responses (support tickets)
└── events (marathons & challenges)
```

## 📋 Cài đặt & Chạy

### 1. Frontend Setup
```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Configure Supabase credentials in .env
# VITE_SUPABASE_URL=your-supabase-url
# VITE_SUPABASE_ANON_KEY=your-anon-key

# Start development server
npm run dev
```

### 2. Go Backend Setup
```bash
cd go-backend

# Copy environment file
cp .env.example .env

# Configure Supabase credentials in .env
# Install Go dependencies
go mod tidy

# Run the server
go run .
```

### 3. Supabase Database Setup

1. **Tạo project mới trên Supabase**
2. **Chạy migration script** để tạo tables và policies
3. **Cấu hình Row Level Security** cho từng role
4. **Tạo admin user đầu tiên** với role = 'admin'

## 🔐 Hệ thống Roles

### User (Mặc định)
- Sử dụng app cơ bản
- Tạo và xem runs của bản thân
- Tham gia events miễn phí

### Premium User 
- Tất cả tính năng User
- ⭐ Phân tích nâng cao
- 🏆 Segments độc quyền  
- 💳 **299,000 VND/năm**

### Editor
- Quản lý nội dung blog/news
- Xử lý đơn hàng
- Trả lời support tickets
- Xem báo cáo cơ bản

### Admin
- **Toàn quyền** quản trị hệ thống
- Quản lý users và roles
- Dashboard doanh thu đầy đủ
- Cấu hình toàn bộ platform

## 🛡 Security Features

- 🔒 **JWT Authentication** với Supabase
- 🛡️ **Row Level Security** policies
- 🚫 **Role-based access control**
- 🔐 **API rate limiting**
- 💾 **Secure data storage**

## 📱 API Endpoints

### Authentication
```
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/me
POST /api/auth/logout
```

### Admin APIs
```
GET  /api/admin/users
PUT  /api/admin/users/:id/role
DELETE /api/admin/users/:id
GET  /api/admin/revenue
```

### CMS APIs (Editor/Admin)
```
GET  /api/cms/posts
POST /api/cms/posts
PUT  /api/cms/posts/:id
POST /api/cms/posts/:id/publish
GET  /api/cms/support
PUT  /api/cms/support/:id
```

### Public APIs
```
GET  /api/posts
GET  /api/events
POST /api/runs
POST /api/orders
```

## 🚀 Deploy Production

### Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Docker)
```bash
cd go-backend
docker build -t vsm-api .
docker run -p 8080:8080 --env-file .env vsm-api
```

### Database Migration
```sql
-- Run database migration scripts
-- Configure RLS policies
-- Create initial admin user
```

## 📞 Support

- 📧 **Email**: support@vsm.vn
- 💬 **In-app support** cho Premium users
- 📚 **Documentation**: /help, /faq

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Payment gateway integration
- [ ] Advanced analytics dashboard
- [ ] Group challenges system
- [ ] Social features expansion
- [ ] AI coaching recommendations

---

**Phát triển bởi VSM Team** 🇻🇳
