import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Download,
  Eye,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Calendar,
  Receipt,
} from "lucide-react";

const FeeReceipts = () => {
  const [openSemesters, setOpenSemesters] = useState<{ [key: string]: boolean }>({
    "semester-6": true,
  });

  // Mock fee data
  const feeData = [
    {
      semester: "6th Semester",
      semesterId: "semester-6",
      academicYear: "2023-24",
      totalFees: 75000,
      paidAmount: 60000,
      pendingAmount: 15000,
      status: "partially_paid",
      dueDate: "2024-02-15",
      payments: [
        {
          id: "REC001",
          description: "Semester Fee - Installment 1",
          amount: 35000,
          paidDate: "2023-12-15",
          paymentMethod: "Online Banking",
          status: "paid",
          receiptNumber: "BU2023/S6/001"
        },
        {
          id: "REC002",
          description: "Semester Fee - Installment 2",
          amount: 25000,
          paidDate: "2024-01-10",
          paymentMethod: "UPI",
          status: "paid",
          receiptNumber: "BU2023/S6/002"
        },
        {
          id: "REC003",
          description: "Semester Fee - Final Installment",
          amount: 15000,
          dueDate: "2024-02-15",
          status: "pending"
        }
      ]
    },
    {
      semester: "5th Semester",
      semesterId: "semester-5",
      academicYear: "2023-24",
      totalFees: 75000,
      paidAmount: 75000,
      pendingAmount: 0,
      status: "paid",
      payments: [
        {
          id: "REC004",
          description: "Semester Fee - Full Payment",
          amount: 75000,
          paidDate: "2023-08-20",
          paymentMethod: "Bank Transfer",
          status: "paid",
          receiptNumber: "BU2023/S5/001"
        }
      ]
    },
    {
      semester: "4th Semester",
      semesterId: "semester-4",
      academicYear: "2022-23",
      totalFees: 70000,
      paidAmount: 70000,
      pendingAmount: 0,
      status: "paid",
      payments: [
        {
          id: "REC005",
          description: "Semester Fee - Installment 1",
          amount: 40000,
          paidDate: "2023-01-15",
          paymentMethod: "Cash",
          status: "paid",
          receiptNumber: "BU2022/S4/001"
        },
        {
          id: "REC006",
          description: "Semester Fee - Installment 2",
          amount: 30000,
          paidDate: "2023-03-10",
          paymentMethod: "Online Banking",
          status: "paid",
          receiptNumber: "BU2022/S4/002"
        }
      ]
    }
  ];

  const toggleSemester = (semesterId: string) => {
    setOpenSemesters(prev => ({
      ...prev,
      [semesterId]: !prev[semesterId]
    }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-success text-white">Paid</Badge>;
      case "pending":
        return <Badge variant="destructive">Pending</Badge>;
      case "partially_paid":
        return <Badge className="bg-warning text-white">Partially Paid</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    return status === "paid" ? (
      <CheckCircle className="h-4 w-4 text-success" />
    ) : (
      <AlertCircle className="h-4 w-4 text-warning" />
    );
  };

  const downloadReceipt = (receiptNumber: string) => {
    // Simulate receipt download
    console.log(`Downloading receipt: ${receiptNumber}`);
  };

  const viewReceipt = (receiptNumber: string) => {
    // Simulate receipt view
    console.log(`Viewing receipt: ${receiptNumber}`);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-university-blue mb-2">Fee Receipts</h1>
        <p className="text-muted-foreground">View and download your fee payment receipts</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              ₹{feeData.reduce((total, semester) => total + semester.paidAmount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Across all semesters</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              ₹{feeData.reduce((total, semester) => total + semester.pendingAmount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Due this semester</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Receipts</CardTitle>
            <Receipt className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-university-blue">
              {feeData.reduce((total, semester) => 
                total + semester.payments.filter(p => p.status === "paid").length, 0
              )}
            </div>
            <p className="text-xs text-muted-foreground">Available for download</p>
          </CardContent>
        </Card>
      </div>

      {/* Semester-wise Fee Details */}
      <div className="space-y-4">
        {feeData.map((semester) => (
          <Card key={semester.semesterId} className="shadow-card">
            <Collapsible
              open={openSemesters[semester.semesterId]}
              onOpenChange={() => toggleSemester(semester.semesterId)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {openSemesters[semester.semesterId] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      <div>
                        <CardTitle className="text-lg">{semester.semester}</CardTitle>
                        <CardDescription>Academic Year: {semester.academicYear}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(semester.status)}
                      {getStatusBadge(semester.status)}
                      <div className="text-right">
                        <p className="font-semibold">₹{semester.paidAmount.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          of ₹{semester.totalFees.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <Separator className="mb-4" />
                  
                  {/* Fee Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Fees</p>
                      <p className="text-lg font-bold">₹{semester.totalFees.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-success/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">Paid Amount</p>
                      <p className="text-lg font-bold text-success">₹{semester.paidAmount.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-warning/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">Pending Amount</p>
                      <p className="text-lg font-bold text-warning">₹{semester.pendingAmount.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Payment History</h4>
                    {semester.payments.map((payment) => (
                      <div key={payment.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(payment.status)}
                            <div>
                              <p className="font-medium">{payment.description}</p>
                              <p className="text-sm text-muted-foreground">
                                {payment.status === "paid" ? (
                                  <>Paid on {payment.paidDate} via {payment.paymentMethod}</>
                                ) : (
                                  <>Due on {payment.dueDate}</>
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="text-right">
                              <p className="font-bold text-lg">₹{payment.amount.toLocaleString()}</p>
                              {payment.receiptNumber && (
                                <p className="text-xs text-muted-foreground">{payment.receiptNumber}</p>
                              )}
                            </div>
                            {payment.status === "paid" && (
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => viewReceipt(payment.receiptNumber!)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => downloadReceipt(payment.receiptNumber!)}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeeReceipts;