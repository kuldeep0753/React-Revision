import { CARD_LOGO } from "../../utils/constants"; // Importing constants for image URL
import { Link } from "react-router-dom"; // Importing Link for client-side navigation

// Functional component to display restaurant details
export const RestaurantCard = (props) => {
  // Destructuring props to extract restaurant data
  const { resData } = props;

  // Further destructuring to extract specific fields from restaurant data
  const {
    cloudinaryImageId, // Image ID for restaurant image
    aggregatedDiscountInfoV3, // Discount info object
    name, // Restaurant name
    avgRatingString, // Average rating
    sla, // Service Level Agreement object (contains delivery time)
    cuisines, // List of cuisines offered
    locality, // Location or address of the restaurant
  } = resData;

  return (
    <>
      {/* Restaurant details container */}
      <div className="w-64 p-4 bg-white rounded-xl shadow-md hover:scale-105 transition-transform duration-200">
        {/* Displaying restaurant image */}
        <img
          src={CARD_LOGO + cloudinaryImageId}
          alt="not load"
          className="w-full h-40 object-cover rounded-md"
        />

        {/* Displaying discount info */}
        <p
          className="text-sm text-red-500 font-semibold mt-2 flex justify-center items-center"
          style={{
            display: "flex", // Flexbox for alignment
            justifyContent: "center", // Center align horizontally
            alignItems: "center", // Center align vertically
          }}
        >
          {/* Discount header */}
          {aggregatedDiscountInfoV3?.header}
          <span className="pl-1">
            {/* Display subHeader if available, else show fallback text */}
            {aggregatedDiscountInfoV3?.subHeader?.trim() ||
              "No Discount Available"}
          </span>
        </p>

        {/* Display restaurant name */}
        <b className="block text-lg mt-1 font-bold restaurant-name">{name}</b>

        {/* Display rating and delivery time */}
        <b className="block text-sm text-gray-700 mt-1 rating">
          Rating: {avgRatingString}
          <span className="ml-2 text-gray-500 time">{sla.deliveryTime}min</span>
        </b>

        {/* Display cuisines */}
        <b className="block text-sm text-gray-600 mt-1 dishes-name">
          {cuisines.join(" ,")}
        </b>

        {/* Display locality/address */}
        <p className="text-sm text-gray-500 mt-1 address">{locality}</p>
      </div>
    </>
  );
};
