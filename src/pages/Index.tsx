import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Activity, TrendingUp, Shield, ChevronRight, CheckCircle, User, BarChart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "@/assets/health-dashboard-hero.jpg";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const navigate = useNavigate();
  
  const goToDashboard = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HealthPulse
            </span>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
              <a href="#benefits" className="text-muted-foreground hover:text-primary transition-colors">Benefits</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">Testimonials</a>
            </nav>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button asChild size="sm" variant="outline" className="hidden sm:flex">
                <Link to="#">Login</Link>
              </Button>
              {/* <Button asChild size="sm" className="bg-gradient-to-r from-primary to-accent">
                <Link to="/dashboard">Start Tracking</Link>
              </Button> */}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        {/* Simple background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background to-secondary/20 z-0"></div>
        
        {/* Subtle background element */}
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl z-0"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Monitor Your Health
                </span>
                <br />
                <span>With Smart Precision</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Track vital signs, monitor trends, and receive intelligent health alerts 
                with personalized recommendations from healthcare professionals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-accent hover:bg-primary/90 px-6"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  Start Tracking
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="group"
                >
                  Learn More
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-lg"></div>
              <img 
                src={heroImage} 
                alt="Health Dashboard Interface" 
                className="relative rounded-2xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
        
        {/* Simple wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path 
              fill="currentColor" 
              fillOpacity="0.03" 
              d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,149.3C672,149,768,171,864,176C960,181,1056,171,1152,144C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-secondary/20 to-background/90 z-0"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-40 right-[20%] w-60 h-60 bg-primary/5 rounded-full blur-3xl animate-pulse-slow z-0"></div>
        <div className="absolute bottom-40 left-[10%] w-72 h-72 bg-health-normal/5 rounded-full blur-3xl animate-pulse-slow z-0"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything You Need for Health Monitoring
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive health tracking with intelligent insights and professional guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 border-health-normal/20 bg-health-normal/5 hover:shadow-xl hover:scale-[1.03] transition-all duration-300 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-health-normal/20 to-health-normal/5 rounded-lg w-fit">
                  <Heart className="h-8 w-8 text-health-normal" />
                </div>
                <CardTitle className="text-health-normal">Vital Signs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Track blood pressure, heart rate, and blood sugar with easy logging and monitoring.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 bg-primary/5 hover:shadow-xl hover:scale-[1.03] transition-all duration-300 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg w-fit">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary">Trend Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Visualize your health progress with interactive charts and trend analysis.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-health-warning/20 bg-health-warning/5 hover:shadow-xl hover:scale-[1.03] transition-all duration-300 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-health-warning/20 to-health-warning/5 rounded-lg w-fit">
                  <Activity className="h-8 w-8 text-health-warning" />
                </div>
                <CardTitle className="text-health-warning">Smart Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Receive intelligent alerts when readings are outside normal ranges.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20 bg-accent/5 hover:shadow-xl hover:scale-[1.03] transition-all duration-300 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg w-fit">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-accent">Expert Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Get personalized recommendations and know when to consult healthcare professionals.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-tr from-background/90 via-accent/5 to-background z-0"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/3 right-[15%] w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse-slow z-0"></div>
        <div className="absolute bottom-1/4 left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow z-0"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose HealthPulse?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our health tracking platform is designed to make monitoring your health simple and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 hover:shadow-xl hover:scale-[1.03] transition-all duration-300 border border-primary/10">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Dashboard</h3>
              <p className="text-muted-foreground">Customized health metrics and goals tailored to your specific needs.</p>
            </div>

            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 hover:shadow-xl hover:scale-[1.03] transition-all duration-300 border border-health-normal/10">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-health-normal/20 to-health-normal/10 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-health-normal" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Visualization</h3>
              <p className="text-muted-foreground">Interactive charts that make it easy to understand your health patterns over time.</p>
            </div>

            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 hover:shadow-xl hover:scale-[1.03] transition-all duration-300 border border-accent/10">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proactive Monitoring</h3>
              <p className="text-muted-foreground">Early warning system that alerts you to potential health issues before they become serious.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-secondary/10 to-background/50 z-0"></div>
        <div className="absolute top-40 left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow z-0"></div>
        <div className="absolute bottom-20 right-[15%] w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse-slow z-0"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of users who have improved their health with HealthPulse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card/40 backdrop-blur-sm hover:shadow-xl hover:scale-[1.03] transition-all duration-300 border border-primary/10">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                    <span className="text-lg font-medium text-primary">JD</span>
                  </div>
                  <div>
                    <h4 className="font-medium">John Doe</h4>
                    <p className="text-sm text-muted-foreground">Health Enthusiast</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "HealthPulse has been a game-changer for managing my hypertension. The alerts help me stay on top of my blood pressure readings."
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/40 backdrop-blur-sm hover:shadow-xl hover:scale-[1.03] transition-all duration-300 border border-accent/10">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center">
                    <span className="text-lg font-medium text-accent">JS</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Jane Smith</h4>
                    <p className="text-sm text-muted-foreground">Fitness Coach</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "I recommend HealthPulse to all my clients. The trend analysis helps them see how their lifestyle changes impact their health metrics."
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/40 backdrop-blur-sm hover:shadow-xl hover:scale-[1.03] transition-all duration-300 border border-health-normal/10">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-health-normal/30 to-health-normal/10 flex items-center justify-center">
                    <span className="text-lg font-medium text-health-normal">RJ</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Robert Johnson</h4>
                    <p className="text-sm text-muted-foreground">Heart Patient</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "After my heart surgery, HealthPulse has been essential for keeping track of my recovery. My doctor loves the detailed reports I can share."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 z-0"></div>
        
        {/* Animated shapes */}
        <div className="absolute top-10 left-[30%] w-40 h-40 bg-primary/10 rounded-full blur-2xl animate-pulse-slow z-0"></div>
        <div className="absolute bottom-10 right-[20%] w-60 h-60 bg-accent/10 rounded-full blur-3xl animate-pulse-slow z-0"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-health-normal/5 rounded-full blur-3xl animate-pulse-slow z-0"></div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start monitoring your health metrics today and get insights that can help you live a healthier life.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg px-8 py-6 hover:scale-105 transition-transform duration-300"
            onClick={goToDashboard}
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12 border-t">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>


              {/* <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">HealthPulse</span>
              </div> */}

              <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HealthPulse
              </span>
              </div>
              
              <p className="text-muted-foreground text-sm">
                Your personal health monitoring dashboard for tracking vital signs and receiving intelligent alerts.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Dashboard</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Tracking</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Alerts</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Reports</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} HealthPulse. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
