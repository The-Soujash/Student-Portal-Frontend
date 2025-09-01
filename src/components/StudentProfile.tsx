import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  Edit,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
} from "lucide-react";
import { useState } from "react";

interface StudentProfileProps {
  studentCode: string;
}

const StudentProfile = ({ studentCode }: StudentProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);

  // Mock student data
  const [studentData, setStudentData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@brainware.ac.in",
    phone: "+91 9876543210",
    address: "123 Park Street, Kolkata, West Bengal 700016",
    dateOfBirth: "1998-05-15",
    bloodGroup: "O+",
    fatherName: "Robert Johnson",
    motherName: "Sarah Johnson",
    emergencyContact: "+91 9876543211",
    course: "Computer Science Engineering",
    semester: "6th Semester",
    section: "A",
    rollNumber: "CSE20210123",
    admissionYear: "2021",
    expectedGraduation: "2025",
    mentor: "Dr. Priya Sharma",
    bio: "Passionate computer science student with interests in machine learning and web development.",
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, save data to backend
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-university-blue">Student Profile</h1>
        <Button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          variant={isEditing ? "default" : "outline"}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card - Fixed */}
        <Card className="lg:col-span-1 shadow-card sticky top-6 self-start h-fit">
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src="/placeholder-avatar.jpg" alt={studentData.name} />
              <AvatarFallback className="text-lg bg-university-light-blue text-university-dark-blue">
                {studentData.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">{studentData.name}</CardTitle>
            <CardDescription>Student ID: {studentCode}</CardDescription>
            <Badge className="mx-auto w-fit">{studentData.course}</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{studentData.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{studentData.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{studentData.address}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              <span>Mentor: {studentData.mentor}</span>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information - Scrollable */}
        <Card className="lg:col-span-2 shadow-card max-h-[80vh] overflow-y-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-university-blue" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={studentData.name}
                  onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={studentData.dateOfBirth}
                  onChange={(e) => setStudentData({ ...studentData, dateOfBirth: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="blood">Blood Group</Label>
                <Input
                  id="blood"
                  value={studentData.bloodGroup}
                  onChange={(e) => setStudentData({ ...studentData, bloodGroup: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergency">Emergency Contact</Label>
                <Input
                  id="emergency"
                  value={studentData.emergencyContact}
                  onChange={(e) =>
                    setStudentData({ ...studentData, emergencyContact: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="father">Father's Name</Label>
                <Input
                  id="father"
                  value={studentData.fatherName}
                  onChange={(e) => setStudentData({ ...studentData, fatherName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mother">Mother's Name</Label>
                <Input
                  id="mother"
                  value={studentData.motherName}
                  onChange={(e) => setStudentData({ ...studentData, motherName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={studentData.address}
                onChange={(e) => setStudentData({ ...studentData, address: e.target.value })}
                disabled={!isEditing}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={studentData.bio}
                onChange={(e) => setStudentData({ ...studentData, bio: e.target.value })}
                disabled={!isEditing}
                rows={3}
              />
            </div>

            <Separator />

            {/* Academic Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-university-blue" />
                Academic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Course</Label>
                  <Input value={studentData.course} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Roll Number</Label>
                  <Input value={studentData.rollNumber} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Current Semester</Label>
                  <Input value={studentData.semester} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Section</Label>
                  <Input value={studentData.section} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Admission Year</Label>
                  <Input value={studentData.admissionYear} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Expected Graduation</Label>
                  <Input value={studentData.expectedGraduation} disabled />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;