import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Calendar, CheckCircle, Clock, Download, FileText, Users } from "lucide-react";

interface Notice {
id: string;
title: string;
type: "assignment" | "quiz" | "report" | "meeting" | "announcement";
status: "pending" | "completed" | "overdue";
dueDate: string;
description?: string;
}

const mockNotices: Notice[] = [
{
id: "1",
title: "Data Structures Assignment",
type: "assignment",
status: "pending",
dueDate: "2024-01-15",
description: "Complete the binary tree implementation"
},
{
id: "2",
title: "Software Engineering Quiz",
type: "quiz",
status: "completed",
dueDate: "2024-01-12",
description: "Object-oriented programming concepts"
},
{
id: "3",
title: "Database Lab Report",
type: "report",
status: "pending",
dueDate: "2024-01-18",
description: "SQL queries and normalization"
},
{
id: "4",
title: "Project Meeting",
type: "meeting",
status: "pending",
dueDate: "2024-01-16",
description: "Final year project discussion"
},
{
id: "5",
title: "Exam Schedule Released",
type: "announcement",
status: "completed",
dueDate: "2024-01-10",
description: "Mid-semester examination timetable"
}
];

const getIconByType = (type: Notice["type"]) => {
switch (type) {
case "assignment":
    return <FileText className="h-4 w-4" />;
case "quiz":
    return <CheckCircle className="h-4 w-4" />;
case "report":
    return <FileText className="h-4 w-4" />;
case "meeting":
    return <Users className="h-4 w-4" />;
case "announcement":
    return <AlertCircle className="h-4 w-4" />;
default:
    return <Clock className="h-4 w-4" />;
}
};

const getStatusBadge = (status: Notice["status"]) => {
switch (status) {
case "pending":
    return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">pending</Badge>;
case "completed":
    return <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">completed</Badge>;
case "overdue":
    return <Badge variant="destructive">overdue</Badge>;
default:
    return <Badge variant="outline">{status}</Badge>;
}
};

const formatDate = (dateString: string) => {
const date = new Date(dateString);
return date.toLocaleDateString('en-US', {
year: 'numeric',
month: '2-digit',
day: '2-digit'
});
};

export const NoticeSection = () => {
const { toast } = useToast();

const handleDownload = (notice: Notice) => {
// Create a mock file content
const content = `Notice: ${notice.title}\nType: ${notice.type}\nDue Date: ${notice.dueDate}\nStatus: ${notice.status}\nDescription: ${notice.description || 'No description'}`;

// Create blob and download
const blob = new Blob([content], { type: 'text/plain' });
const url = URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = `${notice.title.replace(/\s+/g, '_')}.txt`;
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
URL.revokeObjectURL(url);

toast({
    title: "Download Started",
    description: `"${notice.title}" has been downloaded.`,
});
};
return (
<div className="min-h-screen bg-background p-6">
    <div className="max-w-4xl mx-auto">
    <Card className="shadow-sm border-0 bg-card">
        <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg font-semibold text-foreground">
            Recent Activities
            </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
            Your latest assignments and tasks
        </p>
        </CardHeader>
        <CardContent className="space-y-3">
        {mockNotices.map((notice) => (
            <div
            key={notice.id}
            className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors duration-200"
            >
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-university-blue-light text-university-blue">
                {getIconByType(notice.type)}
                </div>
                <div className="flex-1">
                <h3 className="font-medium text-foreground text-sm">
                    {notice.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                    Due: {formatDate(notice.dueDate)}
                    </span>
                </div>
                {notice.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                    {notice.description}
                    </p>
                )}
                </div>
            </div>
            <div className="flex items-center gap-2">
                {getStatusBadge(notice.status)}
                <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDownload(notice)}
                className="h-8 w-8 p-0 hover:bg-university-blue-light hover:text-university-blue"
                >
                <Download className="h-4 w-4" />
                </Button>
            </div>
            </div>
        ))}
        
        {mockNotices.length === 0 && (
            <div className="text-center py-8">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
                No Recent Activities
            </h3>
            <p className="text-sm text-muted-foreground">
                Your recent activities will appear here
            </p>
            </div>
        )}
        </CardContent>
    </Card>
    </div>
</div>
);
};