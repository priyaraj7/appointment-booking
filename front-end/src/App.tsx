import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import DoctorListPage from "./components/doctor/DoctorList";
import AdminProfilePage from "./components/admin/AdminProfile";
import DetailDoctorPage from "./components/doctor/DetailDoctorPage";
import DoctorForm from "./components/doctor/DoctorForm";
import EditDoctorInfo from "./components/doctor/EditDoctorInfo";
import AddNewDoctor from "./components/doctor/AddNewDoctor";
import PatientFrontPage from "./components/patient/PatientsFrontPage";
import PatientsDoctorListPage from "./components/patient/PatientsDoctorListPage";
import BookAppointmentPage from "./components/patient/BookAppointmentPage";
function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<DoctorListPage />} />
        <Route path="/add-doctor" element={<AddNewDoctor />} />

        <Route
          path="/view-doctor-details/:id/:last_name"
          element={<DetailDoctorPage />}
        />
        <Route
          path="/edit-doctor-details/:id/:last_name"
          element={<EditDoctorInfo />}
        />

        <Route path="/public-view" element={<PatientFrontPage />} ŚS/>
        <Route
          path="/public-doctor-list"
          element={<PatientsDoctorListPage />}
        />
        {/* <Route path="/book-appointment" element={<BookAppointmentPage />} /> */}
        <Route path="/book-appointment/:id" element={<BookAppointmentPage />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
