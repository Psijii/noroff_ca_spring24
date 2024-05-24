import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import needed to navigate
import { updateAvatar } from "./updateAvatar.mjs";
import { ToastContainer, toast } from "react-toastify"; // For better user notifications
import "react-toastify/dist/ReactToastify.css";

export default function AvatarModal() {
  const [showModal, setShowModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  const navigate = useNavigate(); // Create an instance of navigate

  const handleUpdateAvatar = async () => {
    try {
      const newUrl = await updateAvatar(avatarUrl);
      console.log("new url", newUrl);
      toast.success("Avatar updated successfully");
      setShowModal(false);
      navigate("/profile");  // Navigate to profile page
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <>
      <button
        className="bg-primary text-white hover:bg-primary-lighter font-bold uppercase text-sm px-6 py-3 mt-4 rounded-sm shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Update Avatar
      </button>

      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/* content */}
              <div className="border-0 rounded-sm shadow-sm relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* header */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">Change avatar</h3>
                </div>
                {/* body */}
                <div className="relative p-6 flex-auto">
                  <input
                    placeholder="Enter avatar URL"
                    className="px-3 py-4 placeholder-slate-300 text-slate-600 relative bg-white rounded-sm text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    onChange={(e) => setAvatarUrl(e.target.value)}
                  />
                </div>
                {/* footer */}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-secondary background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-primary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleUpdateAvatar}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}

      <ToastContainer />
    </>
  );
}