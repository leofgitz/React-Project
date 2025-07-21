const ConfirmationDialog = ({
  onCancelClick,
  showConfirm,
  onConfirmCancel,
  onCloseConfirm,
}) => {
  return (
    <>
      <button
        className="w3-small w3-button w3-border w3-border-red w3-hover-pale-red w3-right w3-red w3-round-xxlarge"
        onClick={onCancelClick}
      >
        Cancel
      </button>

      {showConfirm && (
        <div
          className="w3-modal w3-round-xlarge w3-animate-opacity"
          style={{ display: "block" }} // w3-modal needs display:block to show
        >
          <div
            className="w3-modal-content w3-card-4 w3-round-xlarge"
            style={{ maxWidth: "300px", margin: "auto", marginTop: "15%" }}
          >
            <div className="w3-container w3-center w3-padding">
              <h4>Are you sure you want to cancel and go back?</h4>
              <button
                className="w3-button w3-border w3-border-black w3-emerald w3-hover-green w3-margin-right w3-round-xlarge"
                onClick={onConfirmCancel}
              >
                Yes
              </button>
              <button
                className="w3-button w3-border w3-border-black w3-crimson w3-hover-red w3-round-xlarge"
                onClick={onCloseConfirm}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationDialog;
