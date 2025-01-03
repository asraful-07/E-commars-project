import { Link } from "react-router-dom";

const Card = ({ plant }) => {
  const { name, category, quantity, price, image, _id } = plant || {};
  //   const placeholderImage = "https://via.placeholder.com/150";

  return (
    <Link
      to={`/plant/${_id}`}
      className="col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <img
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={image || placeholderImage}
            alt={name || "Plant Image"}
          />
        </div>
        <div className="font-semibold text-lg">{name || "Unknown Plant"}</div>
        <div className="font-semibold text-lg">
          Category: {category || "N/A"}
        </div>
        <div className="font-semibold text-lg">
          Quantity: {quantity || "N/A"}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            Price: {price ? `${price}$` : "N/A"}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
