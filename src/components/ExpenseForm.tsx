import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2 } from "lucide-react";

const categories = ["Food", "Transportation", "Shopping", "Entertainment", "Bills", "Healthcare", "Education", "Other"] as const;

const expenseSchema = z.object({
  description: z.string().min(1, "Description is required").max(200, "Description too long"),
  amount: z.number().positive("Amount must be positive"),
  category: z.enum(categories),
});

interface ExpenseFormProps {
  userId: string;
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: {
    id: string;
    description: string;
    amount: number;
    category: string;
    is_recurring: boolean;
    expense_date: string;
  };
}

const ExpenseForm = ({ userId, onSuccess, onCancel, initialData }: ExpenseFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: initialData?.description || "",
    amount: initialData?.amount?.toString() || "",
    category: initialData?.category || "",
    isRecurring: initialData?.is_recurring || false,
    expenseDate: initialData?.expense_date || new Date().toISOString().split('T')[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = expenseSchema.parse({
        description: formData.description,
        amount: parseFloat(formData.amount),
        category: formData.category,
      });

      setLoading(true);

      if (initialData) {
        // Update existing expense
        const { error } = await supabase
          .from("expenses")
          .update({
            description: validatedData.description,
            amount: validatedData.amount,
            category: validatedData.category,
            is_recurring: formData.isRecurring,
            expense_date: formData.expenseDate,
          })
          .eq("id", initialData.id)
          .eq("user_id", userId);

        if (error) throw error;
      } else {
        // Create new expense
        const { error } = await supabase
          .from("expenses")
          .insert({
            user_id: userId,
            description: validatedData.description,
            amount: validatedData.amount,
            category: validatedData.category,
            is_recurring: formData.isRecurring,
            expense_date: formData.expenseDate,
          });

        if (error) throw error;
      }

      onSuccess();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Failed to save expense");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Edit Expense" : "Add New Expense"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="e.g., Lunch at cafe"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expense-date">Date</Label>
              <Input
                id="expense-date"
                type="date"
                value={formData.expenseDate}
                onChange={(e) => setFormData({ ...formData, expenseDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="recurring"
              checked={formData.isRecurring}
              onCheckedChange={(checked) => setFormData({ ...formData, isRecurring: checked as boolean })}
            />
            <Label htmlFor="recurring" className="cursor-pointer">
              This is a recurring expense
            </Label>
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : initialData ? "Update" : "Add Expense"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;
