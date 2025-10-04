import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, Plus } from "lucide-react";
import { toast } from "sonner";
import { Session } from "@supabase/supabase-js";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import ExpenseStats from "@/components/ExpenseStats";
import ExpenseChart from "@/components/ExpenseChart";

const Dashboard = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    // Check session and set up auth listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  const handleExpenseAdded = () => {
    setShowForm(false);
    setRefreshTrigger(prev => prev + 1);
    toast.success("Expense added successfully");
  };

  const handleExpenseUpdated = () => {
    setRefreshTrigger(prev => prev + 1);
    toast.success("Expense updated successfully");
  };

  const handleExpenseDeleted = () => {
    setRefreshTrigger(prev => prev + 1);
    toast.success("Expense deleted successfully");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Expense Tracker
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome back, {session.user.user_metadata.full_name || session.user.email}
              </p>
            </div>
            <Button variant="outline" onClick={handleSignOut} className="gap-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Section */}
        <ExpenseStats userId={session.user.id} refreshTrigger={refreshTrigger} />

        {/* Chart Section */}
        <ExpenseChart userId={session.user.id} refreshTrigger={refreshTrigger} />

        {/* Add Expense Button */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Recent Expenses</h2>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="w-4 h-4" />
            {showForm ? "Cancel" : "Add Expense"}
          </Button>
        </div>

        {/* Expense Form */}
        {showForm && (
          <ExpenseForm
            userId={session.user.id}
            onSuccess={handleExpenseAdded}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Expenses List */}
        <ExpenseList
          userId={session.user.id}
          refreshTrigger={refreshTrigger}
          onUpdate={handleExpenseUpdated}
          onDelete={handleExpenseDeleted}
        />
      </main>
    </div>
  );
};

export default Dashboard;
