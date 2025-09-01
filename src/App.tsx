import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Components
import AcademicResources from "./components/AcademicResources";
import Attendance from "./components/Attendance";
import Dashboard from "./components/Dashboard";
import { DocumentsSection } from "./components/DocumentSection";
import FeeReceipts from "./components/FeeReceipts";
import { LectureSection } from "./components/LectureSection";
import Login from "./components/Login";
import Marks from "./components/Marks";
import StudentProfile from "./components/StudentProfile";
import { StudentSidebar } from "./components/StudentSidebar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentCode, setStudentCode] = useState("");

  const handleLogin = (code: string) => {
    setStudentCode(code);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setStudentCode("");
  };

  if (!isLoggedIn) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Login onLogin={handleLogin} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <StudentSidebar onLogout={handleLogout} />
              <main className="flex-1 overflow-auto">
                {/* Global Header */}
                <header className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                  <div className="flex items-center h-full px-4">
                    <SidebarTrigger className="mr-4" />
                    <div className="flex-1" />
                    <div className="text-sm text-muted-foreground">
                      Welcome, Student ID: {studentCode}
                    </div>
                  </div>
                </header>
                
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard studentCode={studentCode} />} />
                  <Route path="/profile" element={<StudentProfile studentCode={studentCode} />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/resources" element={<AcademicResources />} />
                  <Route path="/receipts" element={<FeeReceipts />} />
                  <Route path="/marks" element={<Marks />} />
                  <Route path="/lectures" element={<LectureSection />} />
                  <Route path="/documents" element={<DocumentsSection />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
