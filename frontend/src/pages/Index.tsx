
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Stethoscope, Shield, Clock, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Header */}
      <header className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2 animate-fade-in">
            <Stethoscope className="h-8 w-8 text-green-600 stethoscope-pulse" />
            <h1 className="text-2xl font-bold text-slate-800">MediLink</h1>
          </div>
          <div className="flex space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-slate-600 hover:text-green-600 hover-lift">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 hover-lift">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-5xl font-bold text-slate-800 mb-6 leading-tight">
            Your Health, <span className="text-green-600 animate-glow">Simplified</span>
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Connect with healthcare professionals, manage appointments, and access your medical records
            all in one secure platform.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg hover-lift animate-bounce-soft">
              Start Your Journey
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border-0 shadow-lg hover-lift animate-fade-in" style={{animationDelay: '0.1s'}}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 animate-float">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Easy Scheduling</h3>
              <p className="text-slate-600">Book appointments with your preferred doctors instantly</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover-lift animate-fade-in" style={{animationDelay: '0.2s'}}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4 animate-float">
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Secure Records</h3>
              <p className="text-slate-600">Your medical data is encrypted and protected</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover-lift animate-fade-in" style={{animationDelay: '0.3s'}}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4 animate-float">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Expert Doctors</h3>
              <p className="text-slate-600">Connect with qualified healthcare professionals</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover-lift animate-fade-in" style={{animationDelay: '0.4s'}}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center mx-auto mb-4 animate-float">
                <Stethoscope className="h-6 w-6 text-lime-600 animate-heartbeat" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Care Focused</h3>
              <p className="text-slate-600">Personalized healthcare experience just for you</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl shadow-lg p-12 animate-slide-up hover-lift">
          <h3 className="text-3xl font-bold text-slate-800 mb-4">
            Ready to Transform Your Healthcare Experience?
          </h3>
          <p className="text-slate-600 mb-8 text-lg">
            Join thousands of patients and doctors already using MediLink
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg hover-lift">
              Get Started Today
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 mt-16 border-t border-slate-200">
        <div className="text-center text-slate-600">
          <p>&copy; 2024 MediLink. Crafted with ❤️ for better healthcare.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
