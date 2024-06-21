import { Box, FormControl, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import { FormLabel } from "react-bootstrap";
import { Control, Controller, UseFormHandleSubmit } from "react-hook-form";
import CustomButton from "../../../components/CustomButton";
import { LudisEvent } from "@/app/shared/src/types/events.type";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface EventFormViewProps {
  control: Control<LudisEvent, any>;
  onSubmit: (event: LudisEvent) => void;
  handleSubmit: UseFormHandleSubmit<LudisEvent>;
  setModalOpen: (modalOpen: boolean) => void;
  modalOpen: boolean;
}

const EventFormView: React.FC<EventFormViewProps> = ({
  control,
  onSubmit,
  handleSubmit,
  modalOpen,
  setModalOpen,
}) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 4,
        }}
      >
        <form
          id={"event-form"}
          onSubmit={(e) => {
            e.stopPropagation();
            handleSubmit(onSubmit)(e);
            setModalOpen(false);
          }}
        >
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Controller
              name="date"
              control={control}
              render={({ field: { onChange, value } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={value}
                    open={datePickerOpen}
                    onClose={() => setDatePickerOpen(false)}
                    onOpen={() => setDatePickerOpen(true)}
                    onChange={(newValue) => {
                      onChange(newValue ?? new Date());
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          </FormControl>
          <CustomButton label="Submit" submitForm={true} />
        </form>
      </Box>
    </Modal>
  );
};

export default EventFormView;
