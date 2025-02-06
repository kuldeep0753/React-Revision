import { RestaurantCard } from "../RestaurantCard/RestaurantCard";
import { restaurantData } from "../../utils/mockData";
import { useEffect, useState } from "react";
import { Shimmer } from "../Shimmer/Shimmer";

// let AllRestaurantCard = restaurantData.data.cards[0].groupedCard.cardGroupMap.RESTAURANT.cards;

const Body = () => {
  // console.log(AllRestaurantCard);
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/search/v3?lat=18.5204303&lng=73.8567437&str=Vegan&trackingId=undefined&submitAction=ENTER&queryUniqueId=4636b9b5-9963-d273-79db-c9b6b1afd5ff&selectedPLTab=RESTAURANT"
    );
    const json = await data.json();
    let AllRestaurantCard =
      json?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards;
      console.log(AllRestaurantCard)

    // const originalCard = AllRestaurantCard[0]?.card?.card?.info;
    // console.log(originalCard);
    // setListOfRestaurant(originalCard);
    setListOfRestaurant(AllRestaurantCard);
  };
  return listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        {/* Search Functionality */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Item"
            className="item-input"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="search-btn"
            onClick={() => {
              // let alphaMatch = /^[a-zA-Z]+$/;


              console.log(searchText);
            }}
          >
            SEARCH
          </button>
        </div>
        <div className="filter-top-rated">
          {/* Top Rated Cards */}
          <button
            className="filter-btn"
            onClick={() => {
              let filterRatingCard = listOfRestaurant.filter(
                (data) => data.card?.card?.info.avgRating > 4.5
              );
              setListOfRestaurant(filterRatingCard);
              console.log(filterRatingCard.length);
            }}
          >
            TOP RATED
          </button>
        </div>
      </div>
      <div className="restaurant-card">
        {listOfRestaurant.map((rescard, index) => (
          <RestaurantCard resData={rescard.card?.card?.info} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Body;
