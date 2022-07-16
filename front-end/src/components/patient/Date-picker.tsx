import React, { useState } from "react";

import DatePicker from "react-datepicker";
import { addDays, addMinutes, setHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import appointment from "../../Mocks/Appointments";

export default function TableDatePicker() {
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );
  let excludeTimes: Array<Date> = [];
  appointment.forEach((time) => {
    let startTime = new Date(time.start_time);
    console.log(startTime);
    let endTime = new Date(time.end_time);

    while (startTime.getTime() < endTime.getTime()) {
      excludeTimes.push(startTime);
      startTime = addMinutes(startTime, 30);
    }
  });
  return (
    <div>
      <DatePicker
        placeholderText="Select Date"
        showTimeSelect
        excludeTimes={excludeTimes}
        dateFormat="MMMM d, yyyy h:mmaa"
        selected={startDate}
        selectsStart // tells this DatePicker that it is part of a range*
        startDate={startDate}
        onChange={(date: Date) => setStartDate(date)}
        minDate={new Date()}
        maxDate={addDays(new Date(), 90)}
      />
    </div>
  );
}

// excludeDates={[new Date(), subDays(new Date(), 1)]}
