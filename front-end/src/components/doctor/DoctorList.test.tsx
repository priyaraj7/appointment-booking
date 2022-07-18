import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { DoctorListPageComponent } from "./DoctorList";

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

  it("should render a list of doctor information", async () => {
    render(
      <DoctorListPageComponent doctorsList={docList} deleteDoctor={() => {}} />,
      { wrapper: Router }
    );
    expect(screen.getByText("Monte")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("07879 Scott Place")).toBeInTheDocument();

    expect(screen.getByText("Melloney")).toBeInTheDocument();
    expect(screen.getByText("Female")).toBeInTheDocument();
    expect(screen.getByText("5615 4th Court")).toBeInTheDocument();
  });
  it("should goes to details page when clicks", () => {
    render(
      <DoctorListPageComponent doctorsList={docList} deleteDoctor={() => {}} />,
      { wrapper: Router }
    );
    fireEvent.click(screen.getAllByRole("link", { name: "Detail" })[0]);
    expect(document.location.pathname).toBe("/view-doctor-details/1/Buchett");
    //
  });
});
