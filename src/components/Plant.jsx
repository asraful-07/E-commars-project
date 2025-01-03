import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Card from "./Card";

const Plant = () => {
  const {
    data: plants = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["plants"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/plants");
      return data;
    },
  });

  if (isLoading) {
    return (
      <span className="loading loading-spinner text-primary md:loading-lg"></span>
    );
  }

  if (isError) {
    return <div>Failed to load plants. Please try again later.</div>;
  }

  return (
    <div className="pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto">
      {plants.map((plant) => (
        <Card key={plant._id} plant={plant} />
      ))}
    </div>
  );
};

export default Plant;
