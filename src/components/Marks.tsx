import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  BarChart3,
  Calendar,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
            gradePoint: 9.0,
          },
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
            gradePoint: 8.5,
          },
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
            gradePoint: 9.0,
          },
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
            gradePoint: 9.5,
          },
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
            gradePoint: 8.0,
          },
        },
      ],
    },
    semesterHistory: [
      { semester: "5th Semester", sgpa: 8.5, cgpa: 8.6 },
      { semester: "4th Semester", sgpa: 8.8, cgpa: 8.5 },
      { semester: "3rd Semester", sgpa: 8.2, cgpa: 8.3 },
      { semester: "2nd Semester", sgpa: 8.6, cgpa: 8.4 },
      { semester: "1st Semester", sgpa: 8.4, cgpa: 8.4 },
    ],
  };

  // Linear regression to predict next semester SGPA
  // Using semesters as X: 1,2,3,... and SGPA as Y
  const X = marksData.semesterHistory
    .map((s, idx) => idx + 1)
    .reverse(); // Semesters 1..5 (oldest first)
  const Y = marksData.semesterHistory.map((s) => s.sgpa).reverse();

  // Include current semester as well
  X.push(X.length + 1); // 6th semester
  Y.push(marksData.currentSemester.sgpa);

  // Calculate linear regression coefficients (slope, intercept)
  const n = X.length;
  const sumX = X.reduce((a, b) => a + b, 0);
  const sumY = Y.reduce((a, b) => a + b, 0);
  const sumXY = X.reduce((acc, x, i) => acc + x * Y[i], 0);
  const sumXX = X.reduce((acc, x) => acc + x * x, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Predict next semester SGPA (7th semester)
  const nextSemesterNumber = X.length + 1;
  const predictedSGPA = parseFloat((slope * nextSemesterNumber + intercept).toFixed(2));

  // Chart setup
  const labels = [...marksData.semesterHistory]
    .reverse()
    .map((s) => s.semester)
    .concat([marksData.currentSemester.semester, "Next Semester"]);

  const sgpaTrend = [...marksData.semesterHistory]
    .reverse()
    .map((s) => s.sgpa)
    .concat([marksData.currentSemester.sgpa, predictedSGPA]);

  const data = {
    labels,
    datasets: [
      {
        label: "SGPA Trend",
        data: sgpaTrend,
        fill: false,
        borderColor: "blue",
        backgroundColor: "blue",
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "SGPA Trend and Prediction",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  // Rest of your functions untouched
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
        return "text-success";
      case "A":
        return "text-info";
      case "B+":
        return "text-warning";
      case "B":
        return "text-warning";
      default:
        return "text-muted-foreground";
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
            <div className="text-2xl font-bold text-university-blue">{marksData.currentSemester.cgpa}</div>
            <p className="text-xs text-muted-foreground">Out of 10.0</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current SGPA</CardTitle>
            <Award className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{marksData.currentSemester.sgpa}</div>
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
              {Math.max(...marksData.semesterHistory.map((s) => s.sgpa), marksData.currentSemester.sgpa)}
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



      {/* Detailed Marks and Tabs (rest of your untouched code) */}
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
                        <p className="text-sm text-muted-foreground mt-1">GP: {subject.marks.gradePoint}</p>
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
                          value={parseFloat(
                            getPercentage(subject.marks.internal.obtained, subject.marks.internal.total)
                          )}
                          className="h-4"
                          variant="blue"
                        />
                      </div>

                      {/* External Marks */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">External Assessment</span>
                          <span className="text-sm">
                            {subject.marks.external.obtained}/{subject.marks.external.total}
                          </span>
                        </div>
                        <Progress
                          value={parseFloat(
                            getPercentage(subject.marks.external.obtained, subject.marks.external.total)
                          )}
                          className="h-4"
                          variant="cyan"
                        />
                      </div>

                      {/* Total Marks */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Total Marks</span>
                          <span className="text-sm">
                            {subject.marks.total.obtained}/{subject.marks.total.total}
                          </span>
                        </div>
                        <Progress
                          value={parseFloat(
                            getPercentage(subject.marks.total.obtained, subject.marks.total.total)
                          )}
                          className="h-4"
                          variant="success"
                        />
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
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Academic History Overview</CardTitle>
              <CardDescription>SGPA and CGPA across previous semesters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marksData.semesterHistory.map((sem, idx) => (
                  <div key={idx} className="p-3 border rounded-lg flex justify-between">
                    <span>{sem.semester}</span>
                    <span>SGPA: {sem.sgpa}</span>
                    <span>CGPA: {sem.cgpa}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* Chart for SGPA Trend */}
      <div className="my-6 p-4 border rounded-lg shadow-card bg-white">
        <Line options={options} data={data} />
      </div>
      {/* Prediction Card */}
      <Card className="shadow-card border-blue-400 border mt-6 p-4">
        <CardHeader>
          <CardTitle>Next Semester SGPA Prediction</CardTitle>
          <CardDescription>Based on your SGPA trend over semesters using linear regression</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-blue-600 font-semibold text-center text-lg">
            Predicted SGPA for next semester: {predictedSGPA}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Marks;