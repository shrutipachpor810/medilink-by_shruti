//doesnt contain any api calls
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"; 
import { useNavigate } from "react-router-dom"; 
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  ArrowLeft,
  Stethoscope,
  Heart,
  Activity,
  Weight,
  Droplets,
  TrendingUp,
  Shield,
  Apple,
} from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const parseBP = (bp: string) => {
  const [systolic, diastolic] = bp.split("/").map(Number);
  return {
    systolic: isNaN(systolic) ? 0 : systolic,
    diastolic: isNaN(diastolic) ? 0 : diastolic,
  };
};

const PatientHealthRecordForm = () => {
  const [formData, setFormData] = useState({
    bp: "",
    sugar: "",
    weight: "",
  });

  const { toast } = useToast();
  const navigate = useNavigate(); // ✅ using correctly now

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting health record:", formData);

      // ✅ show success toast
      toast({
        title: "Success",
        description: "Health record submitted successfully!",
        variant: "default",
      });

      setFormData({ bp: "", sugar: "", weight: "" });
    } catch (error: any) {
      console.error("Error submitting health record:", error.message);

      // ✅ show error toast
      toast({
        title: "Error",
        description: "Something went wrong while submitting.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    navigate(-1); // ✅ works with react-router
  };

  const { systolic, diastolic } = parseBP(formData.bp);
  const chartData = [
    {
      metric: "Current Values",
      Sugar: Number(formData.sugar || 0),
      Weight: Number(formData.weight || 0),
      Systolic: systolic,
      Diastolic: diastolic,
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <Stethoscope className="h-8 w-8 text-green-600" />
                <h1 className="text-2xl font-bold text-slate-800">MediLink</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Track Your Health
          </h2>
          <p className="text-slate-600 text-lg">
            Monitor your vital signs and maintain a comprehensive health record
          </p>
        </div>

        {/* Main Layout - Form on Left, Tips on Right */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Form (2/3 width) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Main Form Card */}
              <Card className="border-0 shadow-lg rounded-3xl bg-white">
                <CardHeader className="text-left pb-6 pt-8 px-8">
                  <div className="flex items-center justify-left gap-3 mb-2">
                    <CardTitle className="text-2xl font-bold text-slate-800">
                      Add Health Record
                    </CardTitle>
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                      <Activity className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <p className="text-slate-600 mt-2">
                    Enter your current health measurements for tracking
                  </p>
                </CardHeader>


                <CardContent className="px-8 pb-8">
                  <div className="space-y-8">
                    {/* Input Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                            <Heart className="h-4 w-4 text-red-600" />
                          </div>
                          <label className="text-sm font-semibold text-slate-700">
                            Blood Pressure
                          </label>
                        </div>
                        <Input
                          type="text"
                          name="bp"
                          value={formData.bp}
                          onChange={handleChange}
                          placeholder="e.g. 120/80"
                          className="h-12 border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200"
                          required
                        />
                        <p className="text-xs text-slate-500">
                          Format: systolic/diastolic (mmHg)
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Droplets className="h-4 w-4 text-blue-600" />
                          </div>
                          <label className="text-sm font-semibold text-slate-700">
                            Blood Sugar
                          </label>
                        </div>
                        <Input
                          type="number"
                          name="sugar"
                          value={formData.sugar}
                          onChange={handleChange}
                          placeholder="e.g. 100"
                          className="h-12 border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200"
                          required
                        />
                        <p className="text-xs text-slate-500">
                          In mg/dL
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Weight className="h-4 w-4 text-purple-600" />
                          </div>
                          <label className="text-sm font-semibold text-slate-700">
                            Weight
                          </label>
                        </div>
                        <Input
                          type="number"
                          name="weight"
                          value={formData.weight}
                          onChange={handleChange}
                          placeholder="e.g. 70"
                          className="h-12 border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200"
                          required
                        />
                        <p className="text-xs text-slate-500">
                          In kilograms
                        </p>
                      </div>
                    </div>

                    {/* Preview Chart */}
                    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800">Live Preview</h3>
                      </div>
                      
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <ResponsiveContainer width="100%" height={280}>
                          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <XAxis 
                              dataKey="metric" 
                              stroke="#64748b"
                              fontSize={12}
                              tickLine={false}
                            />
                            <YAxis 
                              stroke="#64748b"
                              fontSize={12}
                              tickLine={false}
                              axisLine={false}
                            />
                            <Tooltip 
                              contentStyle={{
                                backgroundColor: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                              }}
                            />
                            <Legend />
                            <Bar 
                              dataKey="Sugar" 
                              fill="#3b82f6" 
                              name="Blood Sugar (mg/dL)"
                              radius={[4, 4, 0, 0]}
                            />
                            <Bar 
                              dataKey="Weight" 
                              fill="#10b981" 
                              name="Weight (kg)"
                              radius={[4, 4, 0, 0]}
                            />
                            <Bar 
                              dataKey="Systolic" 
                              fill="#ef4444" 
                              name="Systolic BP"
                              radius={[4, 4, 0, 0]}
                            />
                            <Bar 
                              dataKey="Diastolic" 
                              fill="#f97316" 
                              name="Diastolic BP"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                      <Button 
                        onClick={handleSubmit}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        <Activity className="h-4 w-4 mr-2" />
                        Save Health Record
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Prevention Tips Sidebar (1/3 width) */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Prevention Tips Section */}
                <Card className="border-0 shadow-lg rounded-3xl bg-white">
                  <CardHeader className="pb-4 pt-6 px-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                        <Shield className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-slate-800">
                          Health Tips
                        </CardTitle>
                        <p className="text-xs text-slate-600">
                          Prevention guidelines
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="px-6 pb-6 space-y-6">
                    {/* Blood Pressure Tips */}
                    <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4">
                      <div className="flex items-center mb-3">
                        <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center mr-2">
                          <Heart className="h-3 w-3 text-red-600" />
                        </div>
                        <h3 className="font-semibold text-red-700 text-sm">
                          Blood Pressure
                        </h3>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-700">
                        <li className="flex items-start">
                          <span className="w-1 h-1 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          Reduce salt intake daily
                        </li>
                        <li className="flex items-start">
                          <span className="w-1 h-1 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          Exercise 30 min regularly
                        </li>
                        <li className="flex items-start">
                          <span className="w-1 h-1 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          Avoid smoking & alcohol
                        </li>
                        <li className="flex items-start">
                          <span className="w-1 h-1 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          Manage stress levels
                        </li>
                      </ul>
                    </div>

                    {/* Blood Sugar Tips */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
                      <div className="flex items-center mb-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                          <Droplets className="h-3 w-3 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-blue-700 text-sm">
                          Blood Sugar
                        </h3>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-700">
                        <li className="flex items-start">
                          <span className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          Avoid sugary drinks
                        </li>
                        <li className="flex items-start">
                          <span className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          Control portion sizes
                        </li>
                        <li className="flex items-start">
                          <span className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          Stay physically active
                        </li>
                        <li className="flex items-start">
                          <span className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          Regular screenings
                        </li>
                      </ul>
                    </div>

                    {/* Pro Tip */}
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 bg-green-200 rounded-lg flex items-center justify-center mr-2">
                          <Apple className="h-3 w-3 text-green-700" />
                        </div>
                        <h4 className="font-semibold text-green-800 text-sm">Pro Tip</h4>
                      </div>
                      <p className="text-green-700 text-xs leading-relaxed">
                        Regular monitoring helps detect health issues early. Track consistently and share with your healthcare provider.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats Card */}
                <Card className="border-0 shadow-lg rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Stethoscope className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-1">MediLink</h3>
                      <p className="text-blue-100 text-sm opacity-90">
                        Your health companion for doctors and patients
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientHealthRecordForm;