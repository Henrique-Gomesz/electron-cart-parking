import { Modal } from '@mui/material';
import { FeedbackModal } from '@renderer/components/feedback-modal/feedback-modal';
import { ReactElement, useState } from 'react';
import { Icon } from '@renderer/types/icon-type';
type UseFeedbackModal = {
  openModal: () => void;
  closeModal: () => void;
  renderFeedbackModal: () => ReactElement;
};

type Props = {
  title: string;
  message: string;
  icon: Icon;
  iconColor?: 'success' | 'error' | 'primary';
};

export const useFeedbackModal = ({
  icon,
  message,
  title,
  iconColor = 'primary',
}: Props): UseFeedbackModal => {
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
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        open={open}
        onClose={closeModal}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <>
          <FeedbackModal
            iconColor={iconColor}
            title={title}
            message={message}
            onPress={closeModal}
            Icon={icon}
          />
          ;
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
