import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Download, FileText, Filter, Search } from "lucide-react";
import { useState } from "react";

interface Document {
id: string;
title: string;
category: string;
uploadDate: string;
fileSize: string;
fileType: string;
description: string;
}

const mockDocuments: Document[] = [
{
id: "1",
title: "Academic Transcript - Fall 2024",
category: "Academic Records",
uploadDate: "2024-12-15",
fileSize: "245 KB",
fileType: "PDF",
description: "Official transcript for Fall semester 2024"
},
{
id: "2",
title: "Fee Receipt - Semester 1",
category: "Financial",
uploadDate: "2024-12-10",
fileSize: "128 KB",
fileType: "PDF",
description: "Payment receipt for semester fee"
},
{
id: "3",
title: "ID Card Application Form",
category: "Administrative",
uploadDate: "2024-12-08",
fileSize: "89 KB",
fileType: "PDF",
description: "Student ID card application and guidelines"
},
{
id: "4",
title: "Course Registration Confirmation",
category: "Academic Records",
uploadDate: "2024-12-05",
fileSize: "156 KB",
fileType: "PDF",
description: "Confirmation of course registration for current semester"
},
{
id: "5",
title: "Library Access Guidelines",
category: "Resources",
uploadDate: "2024-11-28",
fileSize: "302 KB",
fileType: "PDF",
description: "Digital library access and usage guidelines"
},
{
id: "6",
title: "Hostel Accommodation Letter",
category: "Administrative",
uploadDate: "2024-11-25",
fileSize: "198 KB",
fileType: "PDF",
description: "Hostel room allocation and terms"
}
];

const categories = ["All Categories", "Academic Records", "Financial", "Administrative", "Resources"];

export const DocumentsSection = () => {
const [searchTerm, setSearchTerm] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All Categories");

const filteredDocuments = mockDocuments.filter((doc) => {
const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        doc.description.toLowerCase().includes(searchTerm.toLowerCase());
const matchesCategory = selectedCategory === "All Categories" || doc.category === selectedCategory;
return matchesSearch && matchesCategory;
});

const handleDownload = (document: Document) => {
// Simulate document download
console.log(`Downloading: ${document.title}`);
// In a real app, this would trigger an actual download
alert(`Downloading ${document.title}...`);
};

const formatDate = (dateString: string) => {
return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
});
};

const getCategoryColor = (category: string) => {
switch (category) {
    case "Academic Records":
    return "bg-primary/10 text-primary hover:bg-primary/20";
    case "Financial":
    return "bg-green-100 text-green-700 hover:bg-green-200";
    case "Administrative":
    return "bg-orange-100 text-orange-700 hover:bg-orange-200";
    case "Resources":
    return "bg-purple-100 text-purple-700 hover:bg-purple-200";
    default:
    return "bg-gray-100 text-gray-700 hover:bg-gray-200";
}
};

return (
<div className="p-6 max-w-7xl mx-auto">
    <div className="mb-8">
    <h1 className="text-3xl font-bold text-foreground mb-2">Documents</h1>
    <p className="text-muted-foreground">Access and download your academic documents</p>
    </div>

    {/* Search and Filter Controls */}
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
    <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
        placeholder="Search documents..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
        />
    </div>
    <div className="flex gap-2">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
            {categories.map((category) => (
            <SelectItem key={category} value={category}>
                {category}
            </SelectItem>
            ))}
        </SelectContent>
        </Select>
    </div>
    </div>

    {/* Documents Grid */}
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {filteredDocuments.map((document) => (
        <Card 
        key={document.id} 
        className="hover:shadow-[var(--shadow-hover)] transition-all duration-200 hover:bg-document-hover border-border"
        >
        <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <Badge 
                variant="secondary" 
                className={getCategoryColor(document.category)}
                >
                {document.category}
                </Badge>
            </div>
            <Badge variant="outline" className="text-xs">
                {document.fileType}
            </Badge>
            </div>
            <CardTitle className="text-lg font-semibold leading-tight">
            {document.title}
            </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {document.description}
            </p>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(document.uploadDate)}</span>
            </div>
            <span>{document.fileSize}</span>
            </div>
            
            <Button 
            onClick={() => handleDownload(document)}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="sm"
            >
            <Download className="h-4 w-4 mr-2" />
            Download
            </Button>
        </CardContent>
        </Card>
    ))}
    </div>

    {filteredDocuments.length === 0 && (
    <div className="text-center py-12">
        <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No documents found</h3>
        <p className="text-muted-foreground">
        {searchTerm || selectedCategory !== "All Categories" 
            ? "Try adjusting your search or filter criteria" 
            : "Your documents will appear here when uploaded"}
        </p>
    </div>
    )}
</div>
);
};