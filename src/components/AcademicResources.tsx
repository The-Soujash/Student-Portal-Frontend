import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Download,
  FileText,
  Video,
  Link2,
  Search,
  Clock,
  Eye,
  Star,
} from "lucide-react";
import { useState } from "react";

const AcademicResources = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock resources data
  const resources = {
    notes: [
      {
        id: 1,
        title: "Data Structures and Algorithms - Complete Notes",
        subject: "Data Structures",
        type: "PDF",
        size: "2.5 MB",
        uploadDate: "2024-01-10",
        downloads: 245,
        rating: 4.8,
        description: "Comprehensive notes covering all topics"
      },
      {
        id: 2,
        title: "Database Management Systems - Lecture Notes",
        subject: "DBMS",
        type: "PDF",
        size: "1.8 MB",
        uploadDate: "2024-01-08",
        downloads: 189,
        rating: 4.6,
        description: "Complete lecture notes with examples"
      },
      {
        id: 3,
        title: "Software Engineering - Project Guidelines",
        subject: "Software Engineering",
        type: "DOCX",
        size: "0.9 MB",
        uploadDate: "2024-01-05",
        downloads: 156,
        rating: 4.7,
        description: "Guidelines for semester project"
      }
    ],
    videos: [
      {
        id: 1,
        title: "Machine Learning Basics - Introduction",
        subject: "Machine Learning",
        duration: "45:30",
        uploadDate: "2024-01-12",
        views: 1230,
        rating: 4.9,
        thumbnail: "/placeholder-video.jpg"
      },
      {
        id: 2,
        title: "Web Development - React Components",
        subject: "Web Development",
        duration: "32:15",
        uploadDate: "2024-01-10",
        views: 892,
        rating: 4.7,
        thumbnail: "/placeholder-video.jpg"
      }
    ],
    links: [
      {
        id: 1,
        title: "GeeksforGeeks - Data Structures",
        url: "https://geeksforgeeks.org/data-structures",
        subject: "Data Structures",
        description: "Comprehensive tutorials and practice problems",
        category: "Tutorial"
      },
      {
        id: 2,
        title: "MDN Web Docs - JavaScript",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        subject: "Web Development",
        description: "Official JavaScript documentation",
        category: "Documentation"
      },
      {
        id: 3,
        title: "Coursera - Machine Learning Course",
        url: "https://coursera.org/learn/machine-learning",
        subject: "Machine Learning",
        description: "Andrew Ng's famous ML course",
        category: "Course"
      }
    ]
  };

  const filteredResources = (items: any[]) => {
    if (!searchQuery) return items;
    return items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const downloadResource = (resourceId: number, title: string) => {
    console.log(`Downloading: ${title}`);
    // Implement download logic
  };

  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-university-blue mb-2">Academic Resources</h1>
        <p className="text-muted-foreground">Access study materials, videos, and useful links</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Resources Tabs */}
      <Tabs defaultValue="notes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notes" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Notes & Documents</span>
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center space-x-2">
            <Video className="h-4 w-4" />
            <span>Video Lectures</span>
          </TabsTrigger>
          <TabsTrigger value="links" className="flex items-center space-x-2">
            <Link2 className="h-4 w-4" />
            <span>External Links</span>
          </TabsTrigger>
        </TabsList>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources(resources.notes).map((note) => (
              <Card key={note.id} className="shadow-card hover:shadow-elevated transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <FileText className="h-8 w-8 text-university-blue" />
                    <Badge variant="outline">{note.type}</Badge>
                  </div>
                  <CardTitle className="text-lg">{note.title}</CardTitle>
                  <CardDescription>{note.subject}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{note.description}</p>
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Size: {note.size}</span>
                    <span>Downloads: {note.downloads}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="text-sm font-medium">{note.rating}</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => downloadResource(note.id, note.title)}
                      className="flex items-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </Button>
                  </div>
                  
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Uploaded: {note.uploadDate}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Videos Tab */}
        <TabsContent value="videos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources(resources.videos).map((video) => (
              <Card key={video.id} className="shadow-card hover:shadow-elevated transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Video className="h-8 w-8 text-university-blue" />
                    <Badge variant="outline">{video.duration}</Badge>
                  </div>
                  <CardTitle className="text-lg">{video.title}</CardTitle>
                  <CardDescription>{video.subject}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted-foreground" />
                  </div>
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Views: {video.views}</span>
                    <span>Duration: {video.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="text-sm font-medium">{video.rating}</span>
                    </div>
                    <Button size="sm" className="flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span>Watch</span>
                    </Button>
                  </div>
                  
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Uploaded: {video.uploadDate}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Links Tab */}
        <TabsContent value="links" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResources(resources.links).map((link) => (
              <Card key={link.id} className="shadow-card hover:shadow-elevated transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Link2 className="h-8 w-8 text-university-blue" />
                    <Badge variant="outline">{link.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{link.title}</CardTitle>
                  <CardDescription>{link.subject}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <code className="text-xs bg-muted px-2 py-1 rounded truncate max-w-[200px]">
                      {link.url}
                    </code>
                    <Button
                      size="sm"
                      onClick={() => openLink(link.url)}
                      className="flex items-center space-x-2"
                    >
                      <Link2 className="h-4 w-4" />
                      <span>Open</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AcademicResources;