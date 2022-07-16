import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import TableDatePicker from "./Date-picker";

function BookAppointmentPage() {
  return (
    <FormControl>
      <FormLabel htmlFor="published-date">Book an Appointment</FormLabel>
      <TableDatePicker />
      {/* <FormHelperText>Date this widget was published</FormHelperText> */}
    </FormControl>
  );
}

export default BookAppointmentPage;
