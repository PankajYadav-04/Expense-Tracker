import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react";

interface ExpenseStatsProps {
  userId: string;
  refreshTrigger: number;
}

const ExpenseStats = ({ userId, refreshTrigger }: ExpenseStatsProps) => {
  const [stats, setStats] = useState({
    totalThisMonth: 0,
    totalLastMonth: 0,
    totalRecurring: 0,
    expenseCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const now = new Date();
        const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

        // This month's expenses
        const { data: thisMonthData } = await supabase
          .from("expenses")
          .select("amount")
          .eq("user_id", userId)
          .gte("expense_date", firstDayThisMonth.toISOString().split('T')[0]);

        // Last month's expenses
        const { data: lastMonthData } = await supabase
          .from("expenses")
          .select("amount")
          .eq("user_id", userId)
          .gte("expense_date", firstDayLastMonth.toISOString().split('T')[0])
          .lte("expense_date", lastDayLastMonth.toISOString().split('T')[0]);

        // Recurring expenses
        const { data: recurringData } = await supabase
          .from("expenses")
          .select("amount")
          .eq("user_id", userId)
          .eq("is_recurring", true);

        // Total count
        const { count } = await supabase
          .from("expenses")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId);

        const totalThisMonth = thisMonthData?.reduce((sum, e) => sum + Number(e.amount), 0) || 0;
        const totalLastMonth = lastMonthData?.reduce((sum, e) => sum + Number(e.amount), 0) || 0;
        const totalRecurring = recurringData?.reduce((sum, e) => sum + Number(e.amount), 0) || 0;

        setStats({
          totalThisMonth,
          totalLastMonth,
          totalRecurring,
          expenseCount: count || 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId, refreshTrigger]);

  const percentageChange = stats.totalLastMonth > 0
    ? ((stats.totalThisMonth - stats.totalLastMonth) / stats.totalLastMonth) * 100
    : 0;

  if (loading) {
    return (
      <div className="grid md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-4 gap-4">
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">${stats.totalThisMonth.toFixed(2)}</div>
              {percentageChange !== 0 && (
                <p className={`text-xs flex items-center gap-1 ${percentageChange > 0 ? 'text-danger' : 'text-success'}`}>
                  {percentageChange > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(percentageChange).toFixed(1)}% from last month
                </p>
              )}
            </div>
            <DollarSign className="w-8 h-8 text-muted-foreground/50" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-success">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Last Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">${stats.totalLastMonth.toFixed(2)}</div>
            <Calendar className="w-8 h-8 text-muted-foreground/50" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-3">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Recurring</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">${stats.totalRecurring.toFixed(2)}</div>
            <TrendingUp className="w-8 h-8 text-muted-foreground/50" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{stats.expenseCount}</div>
            <DollarSign className="w-8 h-8 text-muted-foreground/50" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseStats;
