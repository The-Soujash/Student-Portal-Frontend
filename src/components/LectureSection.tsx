import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Calendar, Clock, Filter, MapPin, Search, User } from "lucide-react";
import { useState } from "react";

interface Lecture {
id: string;
courseCode: string;
courseName: string;
instructor: string;
time: string;
duration: string;
room: string;
day: string;
type: string;
semester: string;
credits: number;
}

const mockLectures: Lecture[] = [
{
id: "1",
courseCode: "CSE401",
courseName: "Software Engineering",
instructor: "Dr. Sarah Johnson",
time: "09:00 AM",
duration: "2 hours",
room: "Room 301",
day: "Monday",
type: "Lecture",
semester: "Fall 2024",
credits: 3
},
{
id: "2",
courseCode: "CSE405", 
courseName: "Database Management Systems",
instructor: "Prof. Michael Chen",
time: "11:30 AM",
duration: "1.5 hours",
room: "Lab 201",
day: "Monday",
type: "Lab",
semester: "Fall 2024",
credits: 4
},
{
id: "3",
courseCode: "CSE403",
courseName: "Computer Networks",
instructor: "Dr. Emily Rodriguez",
time: "02:00 PM",
duration: "2 hours",
room: "Room 205",
day: "Tuesday",
type: "Lecture",
semester: "Fall 2024",
credits: 3
},
{
id: "4",
courseCode: "MTH301",
courseName: "Discrete Mathematics",
instructor: "Prof. David Kumar",
time: "10:00 AM",
duration: "1 hour",
room: "Room 102",
day: "Wednesday",
type: "Tutorial",
semester: "Fall 2024",
credits: 2
},
{
id: "5",
courseCode: "CSE407",
courseName: "Machine Learning",
instructor: "Dr. Lisa Anderson",
time: "03:30 PM",
duration: "2 hours",
room: "Room 401",
day: "Thursday",
type: "Lecture",
semester: "Fall 2024",
credits: 3
},
{
id: "6",
courseCode: "CSE409",
courseName: "Web Development",
instructor: "Prof. James Wilson",
time: "01:00 PM",
duration: "3 hours",
room: "Lab 301",
day: "Friday",
type: "Lab",
semester: "Fall 2024",
credits: 4
}
];

const days = ["All Days", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const types = ["All Types", "Lecture", "Lab", "Tutorial"];

export const LectureSection = () => {
const [searchTerm, setSearchTerm] = useState("");
const [selectedDay, setSelectedDay] = useState("All Days");
const [selectedType, setSelectedType] = useState("All Types");

const filteredLectures = mockLectures.filter((lecture) => {
const matchesSearch = lecture.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        lecture.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        lecture.instructor.toLowerCase().includes(searchTerm.toLowerCase());
const matchesDay = selectedDay === "All Days" || lecture.day === selectedDay;
const matchesType = selectedType === "All Types" || lecture.type === selectedType;
return matchesSearch && matchesDay && matchesType;
});

const getTypeColor = (type: string) => {
switch (type) {
    case "Lecture":
    return "bg-primary/10 text-primary hover:bg-primary/20";
    case "Lab":
    return "bg-green-100 text-green-700 hover:bg-green-200";
    case "Tutorial":
    return "bg-orange-100 text-orange-700 hover:bg-orange-200";
    default:
    return "bg-gray-100 text-gray-700 hover:bg-gray-200";
}
};

const getDayOrder = (day: string) => {
const dayOrder = { "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5 };
return dayOrder[day as keyof typeof dayOrder] || 6;
};

const sortedLectures = [...filteredLectures].sort((a, b) => {
const dayDiff = getDayOrder(a.day) - getDayOrder(b.day);
if (dayDiff !== 0) return dayDiff;
return a.time.localeCompare(b.time);
});

return (
<div className="p-6 max-w-7xl mx-auto">
    <div className="mb-8">
    <h1 className="text-3xl font-bold text-foreground mb-2">Lecture Plan</h1>
    <p className="text-muted-foreground">View your weekly class schedule and course details</p>
    </div>

    {/* Search and Filter Controls */}
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
    <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
        placeholder="Search courses, instructors..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
        />
    </div>
    <div className="flex gap-2">
        <Select value={selectedDay} onValueChange={setSelectedDay}>
        <SelectTrigger className="w-40">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
            {days.map((day) => (
            <SelectItem key={day} value={day}>
                {day}
            </SelectItem>
            ))}
        </SelectContent>
        </Select>
        <Select value={selectedType} onValueChange={setSelectedType}>
        <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
            {types.map((type) => (
            <SelectItem key={type} value={type}>
                {type}
            </SelectItem>
            ))}
        </SelectContent>
        </Select>
    </div>
    </div>

    {/* Lectures Grid */}
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {sortedLectures.map((lecture) => (
        <Card 
        key={lecture.id} 
        className="hover:shadow-[var(--shadow-hover)] transition-all duration-200 hover:bg-document-hover border-border"
        >
        <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <Badge 
                variant="secondary" 
                className={getTypeColor(lecture.type)}
                >
                {lecture.type}
                </Badge>
            </div>
            <Badge variant="outline" className="text-xs font-mono">
                {lecture.courseCode}
            </Badge>
            </div>
            <CardTitle className="text-lg font-semibold leading-tight">
            {lecture.courseName}
            </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0 space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{lecture.instructor}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{lecture.time}</span>
            </div>
            <span>{lecture.duration}</span>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{lecture.room}</span>
            </div>
            <span>{lecture.credits} Credits</span>
            </div>

            <div className="flex items-center justify-between pt-2">
            <Badge variant="outline" className="text-xs">
                {lecture.day}
            </Badge>
            <span className="text-xs text-muted-foreground">{lecture.semester}</span>
            </div>
        </CardContent>
        </Card>
    ))}
    </div>

    {sortedLectures.length === 0 && (
    <div className="text-center py-12">
        <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No lectures found</h3>
        <p className="text-muted-foreground">
        {searchTerm || selectedDay !== "All Days" || selectedType !== "All Types"
            ? "Try adjusting your search or filter criteria" 
            : "Your lecture schedule will appear here when available"}
        </p>
    </div>
    )}
</div>
);
};