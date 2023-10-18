import { categories } from "../utils/Categories";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
const schema = z.object({
  description: z
    .string()
    .min(3, { message: "description should be at least 3 characters" })
    .max(50),
  amount: z.number().min(0.01).max(1000000),
  category: z.enum(categories),
});

type ExpenseFormData = z.infer<typeof schema>;
export default ExpenseFormData;
interface Props {
  getFormData: (data: ExpenseFormData) => void;
}
export const Form = ({ getFormData }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(schema),
  });

  const submit = (data: ExpenseFormData) => {
    console.log(data);
    getFormData(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Description
          </label>
          <input
            {...register("description")}
            type="text"
            className="form-control"
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            type="number"
            className="form-control"
          />{" "}
          {errors.amount && (
            <p className="text-danger">{errors.amount.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="select">Category</label>
          <select {...register("category")} id="select" className="form-select">
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button className="mb-5 btn btn-primary" type="submit">
          submit
        </button>
      </form>
    </>
  );
};
