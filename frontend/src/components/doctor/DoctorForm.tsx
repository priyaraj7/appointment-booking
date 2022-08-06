import {
  FormControl,
  FormLabel,
  Select,
  Input,
  CheckboxGroup,
  Checkbox,
  Stack,
  Container,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

import { DoctorDetail } from "./DetailDoctorPage";

type Props = {
  individualDoctorDetail?: DoctorDetail;
  onSave: (details: DoctorDetail) => void;
};

function DoctorForm({ individualDoctorDetail, onSave }: Props) {
  const navigate = useNavigate();

  const initialValue: DoctorDetail = {
    id: Math.round(Math.random() * 1000),
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    location: "",
    insurance: [],
    days_available: [],
    speciality: "",
    about: "",
  };

  let [inputValues, setInputValues] = useState(
    individualDoctorDetail || initialValue
  );

  function handleChange(
    // < means generic in typescript
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const existingValue = (inputValues as any)[event.target.name];
    let newValue;
    if (event.target.type === "checkbox") {
      if ((event.target as any).checked) {
        // add value to the list
        newValue = [...existingValue, event.target.value];
      } else {
        newValue = existingValue.filter(
          (v: string) => v !== event.target.value
        );
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
            id="first-name"
            placeholder="First name"
            name="first_name"
            value={inputValues.first_name}
            onChange={handleChange}
          />

          <FormLabel htmlFor="last-name">Last name</FormLabel>
          <Input
            id="last-name"
            placeholder="Last name"
            name="last_name"
            value={inputValues.last_name}
            onChange={handleChange}
          />

          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            placeholder="abcd@gmail.com"
            name="email"
            value={inputValues.email}
            onChange={handleChange}
          />

          <FormLabel htmlFor="speciality">Speciality</FormLabel>
          <Input
            id="speciality"
            placeholder="Speciality"
            name="speciality"
            value={inputValues.speciality}
            onChange={handleChange}
          />

          <FormLabel htmlFor="days-available">
            Select the available days of the week
          </FormLabel>
          <CheckboxGroup
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
          </CheckboxGroup>

          <FormLabel htmlFor="location">Location</FormLabel>
          <Input
            id="location"
            placeholder="Location"
            name="location"
            value={inputValues.location}
            onChange={handleChange}
          />

          <FormLabel htmlFor="country">Gender</FormLabel>
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

          <FormLabel htmlFor="insurance">Insurance accepted</FormLabel>
          <CheckboxGroup
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
          </CheckboxGroup>

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

{
  /* <FormLabel htmlFor="id">id</FormLabel>
          <Input
            id="id"
            placeholder="Id"
            name="id"
            value={inputValues.id.toString()}
            onChange={handleChange}
          /> */
}
