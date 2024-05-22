import { useState } from "react";
import UpdateVenueForm from "./UpdateVenueForm";

//eslint-disable-next-line
export default function VenueUpdateModal({ specificVenue }) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        className="bg-primary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-primary-darker  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Edit Venue
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

          <div className="modal-container bg-white w-11/12 md:max-w-xl mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div
              className="modal-content py-4 text-left px-6"
              style={{ maxHeight: "80vh" }}
            >
              {/* Close button */}
              <div className="flex justify-end items-center">
                <button
                  className="text-gray-500 hover:text-gray-600"
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    className="h-6 w-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="heroicon-ui"
                      d="M6.293 6.293a1 1 0 011.414 0L12 10.586l4.293-4.293a1 1 0 111.414 1.414L13.414 12l4.293 4.293a1 1 0 01-1.414 1.414L12 13.414l-4.293 4.293a1 1 0 01-1.414-1.414L10.586 12 6.293 7.707a1 1 0 010-1.414z"
                    />
                  </svg>
                </button>
              </div>

              {/* Update Venue Form */}
              <UpdateVenueForm
                specificVenue={specificVenue}
                closeModal={closeModal}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
