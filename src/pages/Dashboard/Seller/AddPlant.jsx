import { Helmet } from "react-helmet-async";
// import { imageUpload } from "../../../api/utils";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";
import toast from "react-hot-toast";

const AddPlant = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  // const [uploadImage, setUploadImage] = useState({
  //   image: { name: "Upload Button" },
  // });
  // console.log(uploadImage);
  const [loading, setLoading] = useState(false);
  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const category = form.category.value;
    const price = parseFloat(form.price.value);
    const quantity = parseInt(form.quantity.value);
    // const image = form.image.files[0];
    // const imageUrl = await imageUpload(image);
    const image = form.image.value;

    // seller info
    const seller = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    // Create plant data object
    const plantData = {
      name,
      category,
      description,
      price,
      quantity,
      // image: imageUrl,
      image,
      seller,
    };

    // console.table(plantData);
    // save plant in db
    try {
      // post req
      await axiosSecure.post("/plants", plantData);
      toast.success("Data Added Successfully!");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              {/* Name */}
              <div className="space-y-1 text-sm">
                <label htmlFor="name" className="block text-gray-600">
                  Name
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Plant Name"
                  required
                />
              </div>
              {/* Category */}
              <div className="space-y-1 text-sm">
                <label htmlFor="category" className="block text-gray-600 ">
                  Category
                </label>
                <select
                  required
                  className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="category"
                >
                  <option value="Indoor">Indoor</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Succulent">Succulent</option>
                  <option value="Flowering">Flowering</option>
                </select>
              </div>
              {/* Description */}
              <div className="space-y-1 text-sm">
                <label htmlFor="description" className="block text-gray-600">
                  Description
                </label>

                <textarea
                  id="description"
                  placeholder="Write plant description here..."
                  className="block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-lime-300 bg-white focus:outline-lime-500 "
                  name="description"
                ></textarea>
              </div>
            </div>
            <div className="space-y-6 flex flex-col">
              {/* Price & Quantity */}
              <div className="flex justify-between gap-2">
                {/* Price */}
                <div className="space-y-1 text-sm">
                  <label htmlFor="price" className="block text-gray-600 ">
                    Price
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                    name="price"
                    id="price"
                    type="number"
                    placeholder="Price per unit"
                    required
                  />
                </div>

                {/* Quantity */}
                <div className="space-y-1 text-sm">
                  <label htmlFor="quantity" className="block text-gray-600">
                    Quantity
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                    name="quantity"
                    id="quantity"
                    type="number"
                    placeholder="Available quantity"
                    required
                  />
                </div>
              </div>
              {/* Image */}
              {/* <div className=" p-4  w-full  m-auto rounded-lg flex-grow">
                  <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                    <div className="flex flex-col w-max mx-auto text-center">
                      <label>
                        <input
                          onChange={(e) =>
                            setUploadImage({
                              image: e.target.files[0],
                              url: URL.createObjectURL(e.target.files[0]),
                            })
                          }
                          className="text-sm cursor-pointer w-36 hidden"
                          type="file"
                          name="image"
                          id="image"
                          accept="image/*"
                          hidden
                        />
                        <div className="bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500">
                          {uploadImage?.image?.name}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                {uploadImage && uploadImage?.image?.size && (
                  <div className="flex gap-5 items-center">
                    <img className="w-20" src={uploadImage?.url} alt="" />
                    <p>Image Size: {uploadImage?.image?.size} Bytes</p>
                  </div>
                )} */}
              <div className="mb-4">
                <label className="block text-lg font-medium">Plant Image</label>
                <input
                  type="text"
                  name="image"
                  placeholder="Company Image URL"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 "
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Save & Continue"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlant;
