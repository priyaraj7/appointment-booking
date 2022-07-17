import { createRoot } from "react-dom/client";
import { render, unmountComponentAtNode } from "react-dom";

// import userEvent from "@testing-library/user-event";
import ShallowRenderer from "react-test-renderer/shallow";

import { DoctorListPageComponent } from "../../../doctor/DoctorList";
import { DoctorDetail } from "../../../doctor/DetailDoctorPage";
describe("it renders list of doctors", () => {
  const docList = [
    {
      id: 1,
      first_name: "Melloney",
      last_name: "Buchett",
      email: "mbuchett0@canalblog.com",
      gender: "Female",
      location: "5615 4th Court",
      insurance: ["Aetna", "LifeMap"],
      days_available: ["Monday", "Tuesday", "Wednesday"],
      speciality: "Pediatriian",
      about:
        "ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu",
    },
    {
      id: 2,
      first_name: "Monte",
      last_name: "Pickersail",
      email: "mpickersail1@google.co.jp",
      gender: "Male",
      location: "07879 Scott Place",
      insurance: ["Aetna", "LifeMap"],
      days_available: ["Monday", "Tuesday", "Thursday"],
      speciality: "Gynecologist",
      about:
        "duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer",
    },
  ];

  it("should render a list of doctors", async () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <DoctorListPageComponent doctorsList={docList} deleteDoctor={() => {}} />
    );
    const result = renderer.getRenderOutput();
  });
});
