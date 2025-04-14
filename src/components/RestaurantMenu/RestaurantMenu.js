import { CUISINES_LOGO } from "../../utils/constants";
import { Shimmer } from "../Shimmer/Shimmer";
import { useParams } from "react-router-dom"; // To get dynamic params from URL
import useRestaurantMenu from "../../utils/useRestaurantMenu.js"; // Custom hook to fetch restaurant data

const RestaurantMenu = () => {
  // Getting restaurant ID from the route parameters
  const { resId } = useParams();
  console.log(resId); // Logging restaurantId

  // Fetching restaurant menu using custom hook
  const restaurantItemList = useRestaurantMenu(resId);
  console.log(restaurantItemList); // Logging fetched data

  // console.log("1");

  // Extracting regular menu cards from deeply nested response
  const regularCards =
    restaurantItemList[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  // find() method: Extracting the first card that contains itemCards
  const selectedCard = regularCards?.find(
    (card) => card?.card?.card?.itemCards
  );

  // Extracting actual menu items array
  const arrayItem = selectedCard?.card?.card?.itemCards;
  console.log(arrayItem); // Logging extracted menu items

  // Extracting restaurant name from API response
  const restaurantName = restaurantItemList[0]?.card?.card?.text;
  console.log(restaurantName); // Logging restaurant name

  // console.log("2");

  // Show loading shimmer if data is not yet available
  if (restaurantItemList === null) return <Shimmer />;

  // Rendering restaurant name and menu
  return (
    <div className="max-w-4xl mx-auto p-4">
      {" "}
      {/* {console.log("5")} */}
      <h1 className="text-3xl font-bold mb-4 text-center">{restaurantName}</h1>
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Menu</h2>
      <ul className="space-y-6">
        {" "}
        {/* Loop through each menu item and render */}
        {arrayItem?.map((res, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white shadow-md p-4 rounded-lg"
          >
            <li className="text-lg font-medium list-none flex-1">
              {res?.card?.info?.name}
            </li>
            {res?.card?.info?.imageId && (
              <img
                src={CUISINES_LOGO + res.card.info.imageId}
                alt={res.card.info.name}
                className="w-24 h-24 object-cover rounded-md"
              />
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
