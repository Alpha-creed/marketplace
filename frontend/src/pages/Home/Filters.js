import { set } from "mongoose";
import React from "react";

const categories = [
  {
    name: "Electronics",
    value: "electronics",
  },
  {
    name: "Home",
    value: "home",
  },
  {
    name: "Fashion",
    value: "fashion",
  },
  {
    name: "Sports",
    value: "sports",
  },
  {
    name: "Books",
    value: "books",
  },
];
const ages = [
  {
    name: "0-2 years old",
    value: "0-2",
  },
  {
    name: "3-5 years old",
    value: "3-5",
  },
  {
    name: "6-8 years old",
    value: "6-8",
  },
  {
    name: "9-12 years old",
    value: "9-12",
  },
  {
    name: "13+ years old",
    value: "12-20",
  },
];
function Filters({ showFilters, setShowFilters, filters, setFilters }) {
  return (
    <div style={{ width: "300px", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ color: "#470101" }}>Filters</h3>
        <i
          className="ri-close-line"
          style={{ fontSize: "30px" }}
          onClick={() => setShowFilters(!showFilters)}
        ></i>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          margin: "10px 0",
        }}
      >
        <h6 style={{ color: "#696969" }}>Categories</h6>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {categories.map((category) => {
            return (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <input
                  type="checkbox"
                  name="category"
                  className="max-width"
                  checked={filters.category.includes(category.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        category: [...filters.category, category.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        category: filters.category.filter(
                          (item) => item !== category.value
                        ),
                      });
                    }
                  }}
                />
                <label htmlFor="category">{category.name}</label>
              </div>
            );
          })}
        </div>

        <h6 style={{ color: "#696969" ,margin:"10px 0"}}>Ages</h6>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {ages.map((age) => {
            return (
              <div style={{ display: "flex", alignItems:"center", gap: 5 }}>
                <input
                  type="checkbox"
                  name="age"
                  className="max-width"
                  checked={filters.age.includes(age.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        age: [...filters.age, age.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        age: filters.age.filter((item) => item !== age.value),
                      });
                    }
                  }}
                />
                <label htmlFor="age">{age.name}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Filters;
