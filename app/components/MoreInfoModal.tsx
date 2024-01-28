import React from "react";

const MoreInfoModal = () => {
  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="my_modal_7" className="btn">
        More info
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Experience Level Descriptions</h3>
          <h5 className="text-lg font-bold">(Click to expand)</h5>
          <p className="py-4">Beginner: 0-3 months of training</p>
          <p className="py-4">Intermediate: 6-24 months of training</p>
          <p className="py-4">Expert: 24+ months of training</p>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </div>
  );
};

export default MoreInfoModal;
