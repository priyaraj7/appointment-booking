function AdminProfilePage() {
    let adminData = {
        firstName: "Chandra",
        lastName: "Soorya",
        email:"abcd@gmail.com",
        password:"abcd$",
        hospitalName: "Evergreen",
        hospitalAddress: "xyskddjsaj",
        hospitalContactNumber: 123456789


    }
    return ( <>
    <h1>Admin Profile</h1>
    <p>{adminData.firstName}</p>
    <p>{adminData.lastName}</p>
    
    </> );
}

export default AdminProfilePage; 
