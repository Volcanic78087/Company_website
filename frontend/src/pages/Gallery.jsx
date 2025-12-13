import { useState } from "react";
import Header from "../components/public/Header";
import Footer from "../components/public/Footer";
import {
  Search,
  Filter,
  Image as ImageIcon,
  Video,
  Users,
  Building,
  Calendar,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { id: "all", label: "All", count: 24 },
    { id: "office", label: "Office", count: 8 },
    { id: "team", label: "Team Events", count: 6 },
    { id: "projects", label: "Projects", count: 5 },
    { id: "awards", label: "Awards", count: 3 },
    { id: "events", label: "Events", count: 2 },
  ];

  const galleryItems = [
    {
      id: 1,
      type: "image",
      category: "office",
      title: "Modern Workspace",
      description: "Our state-of-the-art development center",
      date: "2024-01-15",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      type: "image",
      category: "team",
      title: "Team Building",
      description: "Annual team retreat 2024",
      date: "2024-02-10",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w-800&auto=format&fit=crop",
    },
    {
      id: 3,
      type: "image",
      category: "projects",
      title: "Project Launch",
      description: "Successfully launching our flagship product",
      date: "2024-03-05",
      image:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop",
    },
    {
      id: 4,
      type: "image",
      category: "awards",
      title: "Innovation Award 2024",
      description: "Receiving the Best Tech Innovation Award",
      date: "2024-03-20",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop",
    },
    {
      id: 5,
      type: "image",
      category: "events",
      title: "Tech Conference",
      description: "Speaking at Global Tech Summit 2024",
      date: "2024-04-12",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
    },
    {
      id: 6,
      type: "image",
      category: "office",
      title: "Collaboration Space",
      description: "Innovative spaces for creative thinking",
      date: "2024-04-25",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop",
    },
    {
      id: 7,
      type: "image",
      category: "team",
      title: "Hackathon 2024",
      description: "48-hour innovation hackathon",
      date: "2024-05-08",
      image:
        "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=800&auto=format&fit=crop",
    },
    {
      id: 8,
      type: "image",
      category: "projects",
      title: "Client Meeting",
      description: "Presenting solutions to enterprise client",
      date: "2024-05-20",
      image:
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&auto=format&fit=crop",
    },
  ];

  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const stats = [
    { icon: ImageIcon, label: "Photos", value: "100+" },
    { icon: Video, label: "Videos", value: "15+" },
    { icon: Users, label: "Team Members", value: "25+" },
    { icon: Building, label: "Offices", value: "3" },
    { icon: Calendar, label: "Events", value: "10+" },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main className="page-container">
        {/* Hero */}
        <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Gallery</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Take a visual tour through our journey, culture, and achievements.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="text-primary-600" size={28} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search gallery..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-600" />
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        selectedCategory === category.id
                          ? "bg-primary-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100 border"
                      }`}
                    >
                      {category.label}
                      <span className="ml-2 text-sm opacity-75">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {filteredItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">📷</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No images found
                </h3>
                <p className="text-gray-600">
                  Try a different search term or category
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-primary-600 rounded text-xs font-medium">
                            {item.category}
                          </span>
                          <span className="text-sm">{item.date}</span>
                        </div>
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-200">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-6xl max-h-[90vh]">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300"
              >
                <X size={32} />
              </button>

              <div className="flex gap-4">
                <div className="flex-1">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="rounded-lg max-h-[70vh] w-auto mx-auto"
                  />
                </div>

                <div className="w-80 bg-white rounded-lg p-6">
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                      {selectedImage.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {selectedImage.title}
                  </h3>

                  <p className="text-gray-600 mb-6">
                    {selectedImage.description}
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={18} className="mr-3" />
                      <span>Date: {selectedImage.date}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <ImageIcon size={18} className="mr-3" />
                      <span>Category: {selectedImage.category}</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t">
                    <button className="w-full btn-primary flex items-center justify-center">
                      <Download className="mr-2" size={18} />
                      Download Image
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <button className="text-white hover:text-gray-300 flex items-center">
                  <ChevronLeft size={24} className="mr-2" />
                  Previous
                </button>
                <button className="text-white hover:text-gray-300 flex items-center">
                  Next
                  <ChevronRight size={24} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Video Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Video Highlights
              </h2>
              <p className="text-gray-600">
                Watch our journey, events, and achievements in motion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <div className="h-full w-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <Video size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Company Culture</h3>
                    <p>Watch our team in action</p>
                  </div>
                </div>
              </div>

              <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <div className="h-full w-full bg-gradient-to-br from-secondary-500 to-secondary-700 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <Video size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Office Tour</h3>
                    <p>Virtual tour of our workspace</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
