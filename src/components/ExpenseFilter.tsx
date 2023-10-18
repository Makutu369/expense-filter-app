import { categories } from "../utils/Categories";
interface Props {
  onSelected: (category: string) => void;
}

export const ExpenseFilter = ({ onSelected }: Props) => {
  return (
    <select
      onChange={(e) => onSelected(e.target.value)}
      className="mb-3 form-select"
    >
      {categories.map((category) => (
        <option value={category} key={category}>
          {category}
        </option>
      ))}
    </select>
  );
};
