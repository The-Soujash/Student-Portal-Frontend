import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

// Components
import Login from "./components/Login";
import { StudentSidebar } from "./components/StudentSidebar";
import Dashboard from "./components/Dashboard";
import StudentProfile from "./components/StudentProfile";
import Attendance from "./components/Attendance";
import AcademicResources from "./components/AcademicResources";
import FeeReceipts from "./components/FeeReceipts";
import Marks from "./components/Marks";
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
                  <Route path="/lectures" element={<div className="p-6"><h1 className="text-3xl font-bold text-university-blue">Lecture Plan</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
                  <Route path="/documents" element={<div className="p-6"><h1 className="text-3xl font-bold text-university-blue">Documents</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
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
