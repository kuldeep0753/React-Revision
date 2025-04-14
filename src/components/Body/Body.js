import { RestaurantCard } from "../RestaurantCard/RestaurantCard";
import { useEffect, useState } from "react";
import { Shimmer } from "../Shimmer/Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]); // List of all restaurants to display
  const [searchText, setSearchText] = useState(""); // State to store the search input value
  const [searchRestaurant, setSearchRestaurant] = useState([]); // Backup list for search functionality

  const onlineStatus = useOnlineStatus(true);

  const RESTAURANT_API =
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5204303&lng=73.8567437&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

  // Fetch restaurant data from API on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(RESTAURANT_API);
      const json = await data.json();
      const allRestaurantCard =
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      // Update state with fetched restaurant data
      setListOfRestaurant(allRestaurantCard);
      setSearchRestaurant(allRestaurantCard);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // Filter restaurants based on search input
  const handleSearch = () => {
    const filteredRestaurants = searchRestaurant.filter((res) =>
      res?.info?.name.toLowerCase().startsWith(searchText.toLowerCase())
    );
    setListOfRestaurant(filteredRestaurants);
  };

  // Filter top-rated restaurants (rating > 4.5)
  const handleTopRated = () => {
    const topRatedRestaurants = listOfRestaurant.filter(
      (data) => data.info.avgRating > 4.5
    );
    setListOfRestaurant(topRatedRestaurants);
  };

  if (onlineStatus === false) {
    return (
      <h1 className="text-center text-red-600 text-2xl mt-10">
        Looks like you lost internet connection
      </h1>
    );
  }
// Render loading shimmer if data is not yet available
  if (listOfRestaurant.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="p-4">
      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        {/* Search */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search Item"
            className="border border-gray-300 rounded px-4 py-2 w-64"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={handleSearch}
          >
            SEARCH
          </button>
        </div>

        {/* Top Rated Filter */}
        <div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            onClick={handleTopRated}
          >
            TOP RATED
          </button>
        </div>
      </div>

      {/* Restaurant Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {listOfRestaurant.map((rescard) => (
          <Link to={`/restaurant/${rescard.info.id}`} key={rescard.info.id}>
            <RestaurantCard resData={rescard.info} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
