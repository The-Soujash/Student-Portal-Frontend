import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  TrendingUp,
  Target,
  Award,
  BarChart3,
  Calendar,
} from "lucide-react";

const Marks = () => {
  // Mock marks data
  const marksData = {
    currentSemester: {
      semester: "6th Semester",
      cgpa: 8.7,
      sgpa: 8.9,
      subjects: [
        {
          name: "Data Structures and Algorithms",
          code: "CS301",
          credits: 4,
          marks: {
            internal: { obtained: 18, total: 20 },
            external: { obtained: 76, total: 80 },
            total: { obtained: 94, total: 100 },
            grade: "A+",
            gradePoint: 9.0
          }
        },
        {
          name: "Database Management Systems",
          code: "CS302",
          credits: 4,
          marks: {
            internal: { obtained: 17, total: 20 },
            external: { obtained: 72, total: 80 },
            total: { obtained: 89, total: 100 },
            grade: "A",
            gradePoint: 8.5
          }
        },
        {
          name: "Software Engineering",
          code: "CS303",
          credits: 3,
          marks: {
            internal: { obtained: 19, total: 20 },
            external: { obtained: 74, total: 80 },
            total: { obtained: 93, total: 100 },
            grade: "A+",
            gradePoint: 9.0
          }
        },
        {
          name: "Web Development",
          code: "CS304",
          credits: 3,
          marks: {
            internal: { obtained: 20, total: 20 },
            external: { obtained: 78, total: 80 },
            total: { obtained: 98, total: 100 },
            grade: "A+",
            gradePoint: 9.5
          }
        },
        {
          name: "Machine Learning",
          code: "CS305",
          credits: 4,
          marks: {
            internal: { obtained: 16, total: 20 },
            external: { obtained: 68, total: 80 },
            total: { obtained: 84, total: 100 },
            grade: "A",
            gradePoint: 8.0
          }
        }
      ]
    },
    semesterHistory: [
      { semester: "5th Semester", sgpa: 8.5, cgpa: 8.6 },
      { semester: "4th Semester", sgpa: 8.8, cgpa: 8.5 },
      { semester: "3rd Semester", sgpa: 8.2, cgpa: 8.3 },
      { semester: "2nd Semester", sgpa: 8.6, cgpa: 8.4 },
      { semester: "1st Semester", sgpa: 8.4, cgpa: 8.4 }
    ]
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+": return "text-success";
      case "A": return "text-info";
      case "B+": return "text-warning";
      case "B": return "text-warning";
      default: return "text-muted-foreground";
    }
  };

  const getPercentage = (obtained: number, total: number) => {
    return ((obtained / total) * 100).toFixed(1);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-university-blue mb-2">Academic Performance</h1>
        <p className="text-muted-foreground">View your marks, grades, and academic progress</p>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current CGPA</CardTitle>
            <Trophy className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-university-blue">
              {marksData.currentSemester.cgpa}
            </div>
            <p className="text-xs text-muted-foreground">Out of 10.0</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current SGPA</CardTitle>
            <Award className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {marksData.currentSemester.sgpa}
            </div>
            <p className="text-xs text-muted-foreground">{marksData.currentSemester.semester}</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">
              {Math.max(...marksData.semesterHistory.map(s => s.sgpa), marksData.currentSemester.sgpa)}
            </div>
            <p className="text-xs text-muted-foreground">Highest SGPA</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            <Target className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {marksData.currentSemester.subjects.reduce((total, subject) => total + subject.credits, 0)}
            </div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Marks */}
      <Tabs defaultValue="current" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="current" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Current Semester</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Academic History</span>
          </TabsTrigger>
        </TabsList>

        {/* Current Semester Marks */}
        <TabsContent value="current" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-university-blue" />
                {marksData.currentSemester.semester} Performance
              </CardTitle>
              <CardDescription>Detailed marks breakdown for current semester</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {marksData.currentSemester.subjects.map((subject, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{subject.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {subject.code} • {subject.credits} Credits
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge 
                          className={`text-lg px-3 py-1 ${getGradeColor(subject.marks.grade)}`}
                          variant="outline"
                        >
                          {subject.marks.grade}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          GP: {subject.marks.gradePoint}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Internal Marks */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Internal Assessment</span>
                          <span className="text-sm">
                            {subject.marks.internal.obtained}/{subject.marks.internal.total}
                          </span>
                        </div>
                        <Progress 
                          value={(subject.marks.internal.obtained / subject.marks.internal.total) * 100} 
                          className="h-2" 
                        />
                        <p className="text-xs text-muted-foreground">
                          {getPercentage(subject.marks.internal.obtained, subject.marks.internal.total)}%
                        </p>
                      </div>

                      {/* External Marks */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">External Exam</span>
                          <span className="text-sm">
                            {subject.marks.external.obtained}/{subject.marks.external.total}
                          </span>
                        </div>
                        <Progress 
                          value={(subject.marks.external.obtained / subject.marks.external.total) * 100} 
                          className="h-2" 
                        />
                        <p className="text-xs text-muted-foreground">
                          {getPercentage(subject.marks.external.obtained, subject.marks.external.total)}%
                        </p>
                      </div>

                      {/* Total Marks */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Total Marks</span>
                          <span className="text-sm font-bold">
                            {subject.marks.total.obtained}/{subject.marks.total.total}
                          </span>
                        </div>
                        <Progress 
                          value={(subject.marks.total.obtained / subject.marks.total.total) * 100} 
                          className="h-2" 
                        />
                        <p className="text-xs text-muted-foreground">
                          {getPercentage(subject.marks.total.obtained, subject.marks.total.total)}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic History */}
        <TabsContent value="history" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SGPA Trend */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-university-blue" />
                  SGPA Progression
                </CardTitle>
                <CardDescription>Semester-wise performance trend</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...marksData.semesterHistory].reverse().map((semester, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium">{semester.semester}</span>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="font-bold text-university-blue">SGPA: {semester.sgpa}</p>
                          <p className="text-sm text-muted-foreground">CGPA: {semester.cgpa}</p>
                        </div>
                        <div className="w-16">
                          <Progress value={(semester.sgpa / 10) * 100} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Current Semester */}
                  <div className="flex items-center justify-between p-3 bg-university-light-blue/30 rounded-lg border-2 border-university-blue">
                    <span className="font-medium">{marksData.currentSemester.semester}</span>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="font-bold text-university-blue">SGPA: {marksData.currentSemester.sgpa}</p>
                        <p className="text-sm text-muted-foreground">CGPA: {marksData.currentSemester.cgpa}</p>
                      </div>
                      <div className="w-16">
                        <Progress value={(marksData.currentSemester.sgpa / 10) * 100} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Analytics */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-university-blue" />
                  Performance Analytics
                </CardTitle>
                <CardDescription>Your academic achievements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-success/10 rounded-lg">
                  <p className="text-sm font-medium text-success">Best Performance</p>
                  <p className="text-lg font-bold">
                    SGPA: {Math.max(...marksData.semesterHistory.map(s => s.sgpa), marksData.currentSemester.sgpa)}
                  </p>
                </div>
                
                <div className="p-3 bg-info/10 rounded-lg">
                  <p className="text-sm font-medium text-info">Current Rank</p>
                  <p className="text-lg font-bold">Top 15%</p>
                  <p className="text-xs text-muted-foreground">Based on CGPA</p>
                </div>
                
                <div className="p-3 bg-warning/10 rounded-lg">
                  <p className="text-sm font-medium text-warning">Consistency</p>
                  <p className="text-lg font-bold">Excellent</p>
                  <p className="text-xs text-muted-foreground">Steady improvement trend</p>
                </div>
                
                <div className="p-3 bg-university-light-blue/30 rounded-lg">
                  <p className="text-sm font-medium text-university-dark-blue">Target Achievement</p>
                  <p className="text-lg font-bold">87%</p>
                  <p className="text-xs text-muted-foreground">Towards graduation goal</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Marks;