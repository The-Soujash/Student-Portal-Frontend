import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download } from "lucide-react";

interface Notice {
  id: string;
  title: string;
  date: string;
  uploadedBy: string;
  description?: string;
}

const mockNotices: Notice[] = [
  {
    id: "1",
    title: "Coding Competition",
    date: "2024-08-20",
    uploadedBy: "CSE Department",
    description: "Annual inter-college coding competition"
  },
  {
    id: "2",
    title: "Independence Day Celebration",
    date: "2024-08-15",
    uploadedBy: "College Admin",
    description: "Flag hoisting and cultural program"
  },
  {
    id: "3",
    title: "Workshop on AI & ML",
    date: "2024-09-05",
    uploadedBy: "Tech Club",
    description: "Hands-on training with real projects"
  },
  {
    id: "4",
    title: "Sports Week",
    date: "2024-09-10",
    uploadedBy: "Sports Committee",
    description: "Cricket, football, badminton, and more"
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const NoticeSection = () => {
  const { toast } = useToast();

  const handleDownload = (notice: Notice) => {
    const content = `Notice: ${notice.title}\nDate: ${notice.date}\nUploaded by: ${notice.uploadedBy}\nDescription: ${
      notice.description || "No description"
    }`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${notice.title.replace(/\s+/g, "_")}.txt`;
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
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-3 text-sm font-medium text-muted-foreground">Subject</th>
            <th className="py-2 px-3 text-sm font-medium text-muted-foreground">Date</th>
            <th className="py-2 px-3 text-sm font-medium text-muted-foreground">Uploaded by</th>
            <th className="py-2 px-3 text-sm font-medium text-muted-foreground text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {mockNotices.map((notice) => (
            <tr key={notice.id} className="border-b hover:bg-accent/40 transition-colors">
              <td className="py-3 px-3">
                <p className="font-medium">{notice.title}</p>
                {notice.description && (
                  <p className="text-xs text-muted-foreground">{notice.description}</p>
                )}
              </td>
              <td className="py-3 px-3 text-sm text-muted-foreground">
                {formatDate(notice.date)}
              </td>
              <td className="py-3 px-3 text-sm text-muted-foreground">
                {notice.uploadedBy}
              </td>
              <td className="py-3 px-3 text-right">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDownload(notice)}
                  className="h-8 w-8 p-0 hover:bg-university-blue-light hover:text-university-blue"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
          {mockNotices.length === 0 && (
            <tr>
              <td colSpan={4} className="py-8 text-center text-muted-foreground">
                No notices available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
