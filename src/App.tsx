import { useState } from "react";
import { Table } from "./components/Table";
import { ExpenseFilter } from "./components/ExpenseFilter";
import ExpenseFormData, { Form } from "./components/Form";
export const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "dont", amount: 23, category: "Utilites" },
    { id: 2, description: "hello", amount: 233, category: "Groceries" },
    { id: 3, description: "another", amount: 123, category: "Entertainment" },
    { id: 4, description: "one", amount: 234, category: "Utilities" },
  ]);
  const handleDelete = (id: number) => {
    setExpenses(expenses.filter((obj) => obj.id !== id));
  };

  const abstraction =
    selectedCategory === "All Categories"
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory);

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
  };
  const handleGetFormData = (data: ExpenseFormData) => {
    setExpenses([...expenses, { ...data, id: data.amount / 100 }]);
  };
  return (
    <div className="app-div">
      <Form getFormData={handleGetFormData} />
      <ExpenseFilter onSelected={handleSelect} />
      <Table expenses={abstraction} onDelete={handleDelete} />
    </div>
  );
};
