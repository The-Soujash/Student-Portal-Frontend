import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  BookOpen,
  Trophy,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
} from "lucide-react";

interface DashboardProps {
  studentCode: string;
}

const Dashboard = ({ studentCode }: DashboardProps) => {
  // Mock data - in real app this would come from API
  const studentData = {
    name: "Alex Johnson",
    semester: "6th Semester",
    course: "Computer Science Engineering",
    cgpa: 8.7,
    attendance: 87,
    pendingFees: 15000,
    upcomingExams: 3,
  };

  const recentActivities = [
    { title: "Data Structures Assignment", type: "assignment", dueDate: "2024-01-15", status: "pending" },
    { title: "Software Engineering Quiz", type: "quiz", dueDate: "2024-01-12", status: "completed" },
    { title: "Database Lab Report", type: "lab", dueDate: "2024-01-18", status: "pending" },
  ];

  const upcomingClasses = [
    { subject: "Machine Learning", time: "10:00 AM", room: "CS-301" },
    { subject: "Web Development", time: "2:00 PM", room: "CS-205" },
    { subject: "Database Systems", time: "4:00 PM", room: "CS-102" },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6 rounded-lg shadow-card">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {studentData.name}!</h1>
        <p className="text-blue-100">Student ID: {studentCode}</p>
        <p className="text-blue-100">{studentData.course} • {studentData.semester}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card hover:shadow-elevated transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CGPA</CardTitle>
            <Trophy className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-university-blue">{studentData.cgpa}</div>
            <p className="text-xs text-muted-foreground">Out of 10.0</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elevated transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-university-blue">{studentData.attendance}%</div>
            <Progress value={studentData.attendance} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elevated transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
            <DollarSign className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-university-blue">₹{studentData.pendingFees.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Due this semester</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elevated transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <BookOpen className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-university-blue">{studentData.upcomingExams}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-university-blue" />
              Recent Activities
            </CardTitle>
            <CardDescription>Your latest assignments and tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {activity.status === "completed" ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-warning" />
                    )}
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">Due: {activity.dueDate}</p>
                    </div>
                  </div>
                  <Badge variant={activity.status === "completed" ? "default" : "secondary"}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-university-blue" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((classItem, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">{classItem.subject}</p>
                    <p className="text-sm text-muted-foreground">Room: {classItem.room}</p>
                  </div>
                  <Badge variant="outline">{classItem.time}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;