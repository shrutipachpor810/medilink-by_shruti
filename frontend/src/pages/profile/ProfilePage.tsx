import { Link } from "react-router-dom";
import { ArrowLeft, Stethoscope, User, Save, Edit, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  emergencyContact: string;
  medicalHistory: string;
  specialty?: string;
  licenseNumber?: string;
  experience?: string;
  qualifications?: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    bloodType: "",
    emergencyContact: "",
    medicalHistory: "",
    specialty: "",
    licenseNumber: "",
    experience: "",
    qualifications: ""
  });

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setUser(userData);
      setProfileData((prev) => ({
        ...prev,
        fullName: userData.fullName || "",
        email: userData.email || ""
      }));
    }
  }, []);

  const handleSave = () => {
    const updatedUser = { ...user, ...profileData };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Full-width Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 mb-8 w-full">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to={user.role === "doctor" ? "/doctor-dashboard" : "/patient-dashboard"}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Stethoscope className="h-8 w-8 text-green-600" />
                <h1 className="text-2xl font-bold text-slate-800">MediLink</h1>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-800">
                <User className="h-5 w-5 mr-2 text-green-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                  disabled={!isEditing}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  disabled={!isEditing}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={profileData.address}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                    disabled={!isEditing}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={profileData.gender}
                    onValueChange={(value) => setProfileData({ ...profileData, gender: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical/Professional Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-800">
                <Stethoscope className="h-5 w-5 mr-2 text-green-600" />
                {user.role === "doctor" ? "Professional Information" : "Medical Information"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {user.role === "patient" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <Select
                      value={profileData.bloodType}
                      onValueChange={(value) => setProfileData({ ...profileData, bloodType: value })}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      value={profileData.emergencyContact}
                      onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                      disabled={!isEditing}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medicalHistory">Medical History</Label>
                    <Textarea
                      id="medicalHistory"
                      value={profileData.medicalHistory}
                      onChange={(e) => setProfileData({ ...profileData, medicalHistory: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                      placeholder="Any allergies, chronic conditions, medications..."
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Input
                      id="specialty"
                      value={profileData.specialty || ""}
                      onChange={(e) => setProfileData({ ...profileData, specialty: e.target.value })}
                      disabled={!isEditing}
                      className="h-11"
                      placeholder="e.g., Cardiology, Pediatrics"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">License Number</Label>
                    <Input
                      id="licenseNumber"
                      value={profileData.licenseNumber || ""}
                      onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
                      disabled={!isEditing}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      value={profileData.experience || ""}
                      onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                      disabled={!isEditing}
                      className="h-11"
                      placeholder="e.g., 5 years"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qualifications">Qualifications</Label>
                    <Textarea
                      id="qualifications"
                      value={profileData.qualifications || ""}
                      onChange={(e) => setProfileData({ ...profileData, qualifications: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                      placeholder="Education, certifications, achievements..."
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="border-0 shadow-lg bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <Info className="h-5 w-5 mr-2 text-green-600" />
                {user.role === "patient" ? "Patient Profile Tips" : "Doctor Profile Tips"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-green-900">
              <ul className="list-disc pl-5 space-y-1">
                {user.role === "patient" ? (
                  <>
                    <li>Always keep your emergency contact updated.</li>
                    <li>List any allergies or chronic conditions.</li>
                    <li>Include all current medications.</li>
                    <li>Keep your address and phone number accurate.</li>
                    <li>Review your profile every 3–6 months.</li>
                  </>
                ) : (
                  <>
                    <li>Ensure your specialty and license are correct.</li>
                    <li>Add recent certifications and achievements.</li>
                    <li>Update your years of experience annually.</li>
                    <li>Maintain a professional photo and bio.</li>
                    <li>Review patient feedback regularly.</li>
                  </>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        {isEditing && (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
