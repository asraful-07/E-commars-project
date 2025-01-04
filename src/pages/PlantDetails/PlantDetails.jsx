import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PurchaseModal from "../../components/PurchaseModal";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import { Helmet } from "react-helmet-async";

const PlantDetails = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: plant = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["plant", id],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5000/plants/${id}`);
      return data;
    },
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !plant || Object.keys(plant).length === 0) {
    return <p>Failed to load plant details. Please try again.</p>;
  }

  // Destructure the plant object and check for objects within
  const { category, description, image, price, name, seller, quantity } = plant;

  return (
    <div className="p-4">
      <Helmet>
        <title>{name || "Plant Details"}</title>
      </Helmet>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12">
        {/* Image Section */}
        <div className="flex flex-col gap-6 flex-1">
          <div className="w-full overflow-hidden rounded-xl">
            <img
              className="object-cover w-full"
              src={image}
              alt={name || "Plant Image"}
            />
          </div>
        </div>
        {/* Details Section */}
        <div className="md:gap-10 flex-1">
          <Heading
            title={name || "Plant Name"}
            subtitle={`Category: ${category || "Unknown"}`}
          />
          <hr className="my-6" />
          <div className="text-lg font-light text-neutral-500">
            {description || "No description available."}
          </div>
          <hr className="my-6" />
          <div className="text-xl font-semibold flex flex-row items-center gap-2">
            <div>Seller: {seller?.name || "Unknown"}</div>
            {seller?.image && (
              <img
                className="rounded-full"
                height="30"
                width="30"
                alt={seller?.name || "Seller Avatar"}
                referrerPolicy="no-referrer"
                src={seller?.image}
              />
            )}
          </div>
          <hr className="my-6" />
          <div>
            <p className="gap-4 font-light text-neutral-500">
              Quantity: {quantity || 0} Units Left Only!
            </p>
          </div>
          <hr className="my-6" />
          <div className="flex justify-between">
            <p className="font-bold text-3xl text-gray-500">
              Price: {price ? `${price}$` : "N/A"}
            </p>
            <div>
              <Button
                onClick={() => setIsOpen(true)}
                label={quantity > 0 ? "Purchase" : "Out Of Stock"}
                disabled={quantity <= 0}
              />
            </div>
          </div>
          <hr className="my-6" />
          <PurchaseModal
            plant={plant}
            closeModal={closeModal}
            isOpen={isOpen}
            refetch={refetch}
          />
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
