import { Link } from "react-router-dom";
import BusinessCard from "../../components/Admin/BusinessCard";
import useGetData from "../../hooks/useGetData";
import { Category } from "../../models/Business";
import { FaArrowCircleRight } from "react-icons/fa";

const CategoriesBusinesses = () => {
  const { isLoading, error, data } = useGetData<{ data: Category[] }>(
    "categories/businesses"
  );
  return (
    <main className="p-page">
      {isLoading ? (
        <span>Loading...</span>
      ) : error ? (
        <span>{error}</span>
      ) : data ? (
        data.data.map(
          (category) =>
            category.businesses.length !== 0 && (
              <div key={category.id}>
                <Link to={`/page02/${category.id}`} state={category}>
                  <div className="flex gap-4 items-baseline">
                    <h2 className="text-2xl font-bold">{category.name}</h2>
                    <FaArrowCircleRight />
                  </div>
                </Link>
                <div className="scroll-hr gap-8 hide-scrollbar my-4">
                  {category.businesses.map((business) => (
                    <Link to={business.id}>
                      <BusinessCard
                        key={business.id}
                        business={business}
                        onClick={() => {}}
                        selected={false}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )
        )
      ) : null}
    </main>
  );
};

export default CategoriesBusinesses;
