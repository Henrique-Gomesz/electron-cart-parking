import { Modal } from "@mui/material";
import { FeedbackModal } from "@renderer/components/feedback-modal/feedback-modal";
import { ReactElement, useState } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
type UseFeedbackModal = {
  openModal: () => void;
  closeModal: () => void;
  renderFeedbackModal: () => ReactElement;
};

export const useFeedbackModal = (): UseFeedbackModal => {
  const [open, setOpen] = useState(false);

  function openModal(): void {
    setOpen(true);
  }

  function closeModal(): void {
    setOpen(false);
  }

  function renderFeedbackModal(): ReactElement {
    return (
      <Modal
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={closeModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <>
          <FeedbackModal onPress={closeModal} Icon={CheckCircleRoundedIcon} />;
        </>
      </Modal>
    );
  }

  return {
    openModal,
    closeModal,
    renderFeedbackModal,
  };
};
