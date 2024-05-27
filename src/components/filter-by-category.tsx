import { categories } from "../data/categories"
import { useBudget } from "../hooks/use-budget"
const FilterByCategory = () => {

  const { dispatch } = useBudget()

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    dispatch({ type: "add-filter-category", payload: { id: value } })
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-10">
      <form >
        <div className="flex flex-col md:flex-row items-center gap-2">
          <label htmlFor="category" className="text-xl">Category</label>
          <select
            name="category"
            id="category"
            onChange={handleChange}
            className="w-full border-2 bg-slate-200 outline-none p-2 rounded-lg focus:border-blue-600"
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  )
}

export default FilterByCategory