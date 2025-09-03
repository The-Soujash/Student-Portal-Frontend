import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  CheckCircle,
  Calendar,
  DollarSign,
  Trophy,
  UserCheck,
  Users
} from "lucide-react";
import { NoticeSection } from "./NoticeSection";

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
    activityPoint: 3,
  };

  // Mock for today's attendance
  const todaysAttendance = [
    { subject: "Machine Learning", status: "present" },
    { subject: "Web Development", status: "absent" },
    { subject: "Database Systems", status: "present" },
  ];

  // Mock for total attendance breakdown
  const totalAttendance = [
    { subject: "Machine Learning", percentage: 90 },
    { subject: "Web Development", percentage: 82 },
    { subject: "Database Systems", percentage: 88 },
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
            <CardTitle className="text-sm font-medium">Activity Points</CardTitle>
            <Users className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-university-blue">{studentData.activityPoint}</div>
            <p className="text-xs text-muted-foreground">In this semester</p>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Attendance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCheck className="h-5 w-5 mr-2 text-university-blue" />
              Today's Attendance
            </CardTitle>
            <CardDescription>Subjects marked for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaysAttendance.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <p className="font-medium">{item.subject}</p>
                  <Badge variant={item.status === "present" ? "default" : "secondary"}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Total Attendance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-university-blue" />
              Total Attendance
            </CardTitle>
            <CardDescription>Overall subject-wise attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {totalAttendance.map((item, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded-lg">
                  <p className="font-medium">{item.subject}</p>
                  <Progress value={item.percentage} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">{item.percentage}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notices - full width at bottom */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-university-blue" />
            Notices
          </CardTitle>
          <CardDescription>Important announcements for you</CardDescription>
        </CardHeader>
        <CardContent>
          <NoticeSection />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
