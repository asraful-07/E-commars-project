import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { useState } from "react";
import UseAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import MenuItem from "../../components/MenuItem";
import BecomeSellerModal from "../../components/BecomeSellerModal";
import toast from "react-hot-toast";

const CustomerMenu = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const requestHandler = async () => {
    try {
      // send a request to server
      const { data } = await axiosSecure.patch(`/users/${user?.email}`);
      console.log(data);
      toast.success("Successfully Applied to become a seller👍");
    } catch (err) {
      console.log(err.response.data);
      toast.error(err.response.data + "👊");
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <MenuItem icon={BsFingerprint} label="My Orders" address="my-orders" />

      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer"
      >
        <GrUserAdmin className="w-5 h-5" />

        <span className="mx-4 font-medium">Become A Seller</span>
      </button>

      <BecomeSellerModal
        requestHandler={requestHandler}
        closeModal={closeModal}
        isOpen={isOpen}
      />
    </>
  );
};

export default CustomerMenu;
