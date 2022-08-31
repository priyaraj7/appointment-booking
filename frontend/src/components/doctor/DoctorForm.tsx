import {
  FormControl,
  FormLabel,
  Select,
  Input,
  Checkbox,
  Container,
  Button,
} from "@chakra-ui/react";

import { useState } from "react";
import type { Doctor } from "./DoctorControl";

type Props = {
  individualDoctorDetail?: Doctor;
  onSave: (details: Doctor) => void;
};

const initialValue: Doctor = {
  doctorId: Math.round(Math.random() * 1000), // need to work on these 3"
  fkUserId: Math.round(Math.random() * 1000),
  userId: Math.round(Math.random() * 1000),
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  location: "",
  status: true,
  specialty: "",
  about: "",
};

function DoctorForm({ individualDoctorDetail = initialValue, onSave }: Props) {
  const [prevIndividualDoctorDetail, setPrevIndividualDoctorDetail] = useState(
    individualDoctorDetail
  );
  let [inputValues, setInputValues] = useState(individualDoctorDetail);
  // const navigate = useNavigate();

  // ?? means if individualDoctorDetail is undefined or null use initialValue
  if (individualDoctorDetail) {
    console.log("using the value from parent component");
  } else {
    console.log("using the default values");
  }

  // force the state to be updated when the prop changes
  // https://beta.reactjs.org/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes

  if (individualDoctorDetail !== prevIndividualDoctorDetail) {
    setPrevIndividualDoctorDetail(individualDoctorDetail);
    setInputValues(individualDoctorDetail);
  }

  function handleChange(
    // < means generic in typescript
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const existingValue = (inputValues as any)[event.target.name];
    let newValue;
    if (event.target.type === "checkbox") {
      if ((event.target as any).checked) {
        // add value to the list
        if (Array.isArray(existingValue)) {
          newValue = [...existingValue, event.target.value];
        } else {
          newValue = event.target.value;
        }
      } else {
        if (Array.isArray(existingValue)) {
          newValue = existingValue.filter(
            (v: string) => v !== event.target.value
          );
        } else {
          newValue = false;
        }
      }
    } else {
      newValue = event.target.value;
    }
    setInputValues({
      ...inputValues,
      [event.target.name]: newValue,
    });
  }

  return (
    <>
      <Container>
        <FormControl isRequired>
          <FormLabel htmlFor="first-name">First name</FormLabel>
          <Input
            id="firstName"
            placeholder="First name"
            name="firstName"
            value={inputValues.firstName}
            onChange={handleChange}
          />

          <FormLabel htmlFor="last-name">Last name</FormLabel>
          <Input
            id="lastName"
            placeholder="Last name"
            name="lastName"
            value={inputValues.lastName}
            onChange={handleChange}
          />

          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            id="email"
            placeholder="abcd@gmail.com"
            name="email"
            value={inputValues.email}
            onChange={handleChange}
          />

          <FormLabel htmlFor="specialty">specialty</FormLabel>
          <Input
            id="specialty"
            placeholder="specialty"
            name="specialty"
            value={inputValues.specialty}
            onChange={handleChange}
          />

          {/* <FormLabel htmlFor="days-available">
            Select the available days of the week
          </FormLabel> */}
          {/* <CheckboxGroup
            defaultValue={inputValues.days_available}
            colorScheme="green"
          >
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                (day) => {
                  const isChecked = inputValues.days_available?.includes(day);
                  console.log(`day => ${day} isChecked => ${isChecked}`);
                  return (
                    <Checkbox
                      key={day}
                      value={day}
                      name="days_available"
                      onChange={handleChange}
                      isChecked={isChecked}
                    >
                      {day}
                    </Checkbox>
                  );
                }
              )}
            </Stack>
          </CheckboxGroup> */}

          <FormLabel htmlFor="location">Location</FormLabel>
          <Input
            id="location"
            placeholder="Location"
            name="location"
            value={inputValues.location}
            onChange={handleChange}
          />

          <FormLabel htmlFor="gender">Gender</FormLabel>
          <Select
            id="gender"
            placeholder="Select gender"
            name="gender"
            value={inputValues.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option>Female</option>
            <option>Others</option>
          </Select>

          <FormLabel htmlFor="status">Check the status</FormLabel>
          <Checkbox
            colorScheme="green"
            value="status"
            name="status"
            isChecked={inputValues.status}
            onChange={handleChange}
          >
            Active
          </Checkbox>

          {/* <FormLabel htmlFor="insurance">Insurance accepted</FormLabel> */}
          {/* <CheckboxGroup
            colorScheme="green"
            defaultValue={inputValues.insurance}
          >
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              {[
                "Aetna",
                "Asuris",
                "Cigna",
                "Envision",
                "LifeMap",
                "Metlife",
                "Other",
              ].map((item) => {
                const isChecked = inputValues.insurance?.includes(item);
                console.log(`insurence => ${item} isChecked => ${isChecked}`);
                return (
                  <Checkbox
                    key={item}
                    value={item}
                    name="insurance"
                    onChange={handleChange}
                    isChecked={isChecked}
                  >
                    {item}
                  </Checkbox>
                );
              })}
            </Stack>
          </CheckboxGroup> */}

          <FormLabel htmlFor="email">About</FormLabel>
          <Input
            id="about"
            placeholder="About"
            name="about"
            value={inputValues.about}
            onChange={handleChange}
          />

          <Button
            colorScheme="blue"
            onClick={() => {
              onSave(inputValues);
            }}
          >
            Submit
          </Button>
        </FormControl>
      </Container>
    </>
  );
}

export default DoctorForm;
