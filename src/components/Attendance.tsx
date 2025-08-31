import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, CheckCircle, XCircle, Clock, Users } from "lucide-react";

const Attendance = () => {
  // Mock attendance data
  const attendanceData = {
    overallPercentage: 87,
    totalClasses: 120,
    attended: 104,
    absent: 16,
    subjects: [
      { name: "Data Structures", attended: 18, total: 20, percentage: 90 },
      { name: "Database Management", attended: 16, total: 18, percentage: 89 },
      { name: "Software Engineering", attended: 15, total: 19, percentage: 79 },
      { name: "Web Development", attended: 22, total: 24, percentage: 92 },
      { name: "Machine Learning", attended: 14, total: 16, percentage: 88 },
      { name: "Computer Networks", attended: 19, total: 23, percentage: 83 },
    ]
  };

  const recentAttendance = [
    { date: "2024-01-10", subject: "Data Structures", status: "present" },
    { date: "2024-01-10", subject: "Web Development", status: "present" },
    { date: "2024-01-09", subject: "Machine Learning", status: "absent" },
    { date: "2024-01-09", subject: "Database Management", status: "present" },
    { date: "2024-01-08", subject: "Software Engineering", status: "present" },
    { date: "2024-01-08", subject: "Computer Networks", status: "present" },
  ];

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 85) return "text-success";
    if (percentage >= 75) return "text-warning";
    return "text-destructive";
  };

  const getStatusIcon = (status: string) => {
    return status === "present" ? (
      <CheckCircle className="h-4 w-4 text-success" />
    ) : (
      <XCircle className="h-4 w-4 text-destructive" />
    );
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-university-blue mb-2">Attendance Tracker</h1>
        <p className="text-muted-foreground">Monitor your class attendance and performance</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall</CardTitle>
            <Users className="h-4 w-4 text-university-blue" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getAttendanceColor(attendanceData.overallPercentage)}`}>
              {attendanceData.overallPercentage}%
            </div>
            <Progress value={attendanceData.overallPercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <Calendar className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-university-blue">{attendanceData.totalClasses}</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes Attended</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{attendanceData.attended}</div>
            <p className="text-xs text-muted-foreground">Out of {attendanceData.totalClasses}</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missed Classes</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{attendanceData.absent}</div>
            <p className="text-xs text-muted-foreground">Classes missed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject-wise Attendance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-university-blue" />
              Subject-wise Attendance
            </CardTitle>
            <CardDescription>Attendance breakdown by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceData.subjects.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{subject.name}</span>
                    <span className={`font-bold ${getAttendanceColor(subject.percentage)}`}>
                      {subject.percentage}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{subject.attended}/{subject.total} classes</span>
                    <span>{subject.total - subject.attended} missed</span>
                  </div>
                  <Progress value={subject.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Attendance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-university-blue" />
              Recent Attendance
            </CardTitle>
            <CardDescription>Your attendance history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAttendance.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(record.status)}
                    <div>
                      <p className="font-medium">{record.subject}</p>
                      <p className="text-sm text-muted-foreground">{record.date}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={record.status === "present" ? "default" : "destructive"}
                    className="capitalize"
                  >
                    {record.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Guidelines */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-university-blue">Attendance Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span><strong>85%+:</strong> Excellent attendance</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <span><strong>75-84%:</strong> Good attendance</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <span><strong>Below 75%:</strong> Action required</span>
            </div>
          </div>
          <p className="mt-4 text-muted-foreground">
            Minimum 75% attendance is required to be eligible for semester examinations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;