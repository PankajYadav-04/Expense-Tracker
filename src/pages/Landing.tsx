import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingDown, PieChart, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-accent-foreground">Smart expense tracking made simple</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Take Control of Your{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Financial Future
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Track expenses, manage budgets, and gain insights into your spending habits with our beautiful and intuitive expense tracker.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/auth">
                <Button size="lg" className="gap-2 shadow-lg hover:shadow-glow transition-all duration-300">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="gap-2">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Everything you need to manage your money
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you understand and control your finances
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border border-border">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Every Expense</h3>
              <p className="text-muted-foreground">
                Easily log and categorize your expenses with our intuitive interface. Never lose track of where your money goes.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border border-border">
              <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center mb-4">
                <PieChart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Visual Insights</h3>
              <p className="text-muted-foreground">
                Get a clear picture of your spending patterns with beautiful charts and graphs that make data easy to understand.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border border-border">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your financial data is encrypted and secure. We take your privacy seriously with industry-standard protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-gradient-primary rounded-3xl p-12 shadow-glow">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to take control?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of users who are already managing their finances better
            </p>
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="gap-2 shadow-lg">
                Start Tracking Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
