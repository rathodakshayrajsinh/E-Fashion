import axios from "axios";
import React, { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/category/allcategories"); // Update API URL if needed
        setCategories(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load categories");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Categories</h2>
      {loading && <p>Loading categories...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="row">
        {/* {categories.map((category) => {
            return <div key={category._id} className="col-md-4 mb-3">
            <div className="card p-3 text-center shadow-sm">
              <h5>{category.name}</h5>
            </div>
          </div>
        })} */}
      </div>
    </div>
  );
};

export default Categories;
