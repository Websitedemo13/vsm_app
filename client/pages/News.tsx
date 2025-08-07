import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Filter } from "lucide-react";

export default function News() {
  const articles = [
    {
      id: 1,
      title: "Marathon VSM 2024: Kỷ lục mới với 30,000 sinh viên tham gia",
      excerpt:
        "Sự kiện marathon lớn nhất năm đã thu hút số lượng kỷ lục sinh viên từ khắp cả nước...",
      image: "📸",
      author: "VSM Team",
      date: "2024-12-10",
      category: "Sự kiện",
      readTime: "5 phút đọc",
    },
    {
      id: 2,
      title: "5 Mẹo chạy bộ hiệu quả cho sinh viên bận rộn",
      excerpt:
        "Làm thế nào để duy trì thói quen chạy bộ khi bạn có lịch học dày đặc? Đây là những bí quyết...",
      image: "🏃‍♂️",
      author: "Coach Minh",
      date: "2024-12-08",
      category: "Tips chạy bộ",
      readTime: "7 phút đọc",
    },
    {
      id: 3,
      title: "Cộng đồng VSM Hồ Chí Minh tổ chức buổi chạy từ thiện",
      excerpt:
        "Hơn 500 sinh viên đã cùng nhau chạy bộ gây quỹ hỗ trợ trẻ em vùng cao...",
      image: "❤️",
      author: "VSM HCM",
      date: "2024-12-05",
      category: "Tin tức",
      readTime: "4 phút đọc",
    },
    {
      id: 4,
      title: "Ứng dụng VSM cập nhật tính năng theo dõi nhịp tim",
      excerpt:
        "Phiên bản mới của ứng dụng VSM đã tích hợp công nghệ AI để theo dõi nhịp tim chính xác...",
      image: "📱",
      author: "Tech Team",
      date: "2024-12-03",
      category: "Công nghệ",
      readTime: "6 phút đọc",
    },
  ];

  const categories = [
    "Tất cả",
    "Tin tức",
    "Sự kiện",
    "Tips chạy bộ",
    "Công nghệ",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-vsm-black mb-4">
              Tin tức & Sự kiện
            </h1>
            <p className="text-lg text-vsm-gray-medium max-w-2xl mx-auto">
              Cập nhật những thông tin mới nhất về cộng đồng chạy bộ sinh viên
              và các sự kiện sắp tới
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "Tất cả" ? "default" : "outline"}
                size="sm"
                className={
                  category === "Tất cả"
                    ? "bg-vsm-orange hover:bg-vsm-orange-dark"
                    : ""
                }
              >
                {category}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Bộ lọc
          </Button>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="aspect-video bg-gradient-to-br from-vsm-orange/20 to-vsm-orange/40 flex items-center justify-center text-4xl">
                {article.image}
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="secondary"
                    className="bg-vsm-orange/10 text-vsm-orange"
                  >
                    {article.category}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {article.readTime}
                  </span>
                </div>

                <CardTitle className="text-xl leading-tight group-hover:text-vsm-orange transition-colors">
                  {article.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(article.date).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  className="mt-4 p-0 h-auto text-vsm-orange hover:text-vsm-orange-dark group"
                >
                  Đọc thêm
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button className="bg-vsm-orange hover:bg-vsm-orange-dark text-white px-8">
            Xem thêm bài viết
          </Button>
        </div>
      </div>
    </div>
  );
}
