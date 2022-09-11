import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./components/Card";

function App() {
  const [userInput, setUserInput] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      let res = await axios.get(
        `https://dummyjson.com/products/search?q=${userInput}`
      );
      setProducts(res.data.products);
      setIsLoading(false);
    };
    getData();
  }, [userInput]);
  return (
    <>
      <div className="w-74 my-10 mx-14">
        <div className="search_bar">
          <form className="">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block p-4 shadow-lg shadow-slate-300 outline-none pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search your needs..."
                required
                value={userInput}
                onChange={(e) => {
                  setUserInput(e.target.value);
                }}
              />
            </div>
          </form>
        </div>
      </div>
      {isLoading && (
        <h1 className="text-2xl text-center font-bold">Loading...</h1>
      )}
      <div className="products w-full p-4 px-14 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {products.map((e, i) => (
          <Card
            key={i}
            name={e.title}
            desc={e.description}
            price={e.price}
            img={e.thumbnail}
          />
        ))}
      </div>
    </>
  );
}

export default App;