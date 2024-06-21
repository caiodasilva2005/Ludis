import { LudisEvent } from "@/app/shared/src/types/events.type";
import React from "react";
import { useForm } from "react-hook-form";
import EventFormView from "./EventFormView";

interface EventFormProps {
  submitData: (event: LudisEvent) => void;
  setOpenModal: (modalOpen: boolean) => void;
  modalOpen: boolean;
}

const EventForm: React.FC<EventFormProps> = ({
  submitData,
  setOpenModal,
  modalOpen,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LudisEvent>({
    defaultValues: {
      date: new Date(),
    },
  });
  return (
    <EventFormView
      control={control}
      onSubmit={submitData}
      handleSubmit={handleSubmit}
      setModalOpen={setOpenModal}
      modalOpen={modalOpen}
    />
  );
};

export default EventForm;
