import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/UserProfile.css";

const SellerProfileDetails = () => {
  const userId = localStorage.getItem("id"); // Get logged-in user ID
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    title: "home",
    unitName: "",
    street: "",
    landmark: "",
    stateId: "",
    cityId: "",
    areaId: "",
    pincode: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isAddressEditing, setIsAddressEditing] = useState(false);

  // Fetch user details & addresses
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`/user/userprofile/${userId}`);
        setUser(userResponse.data.data);

        const addressResponse = await axios.get(`/address/getaddress/${userId}`);
        setAddresses(addressResponse.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // Handle form input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle address input changes
  const handleAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  // Update user details
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/user/profile/${userId}`, user);
      alert("Profile updated successfully!");
      setUser(response.data.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Add or update address
  const handleAddressUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/address/updateaddress/${userId}`, newAddress);
      alert("Address updated successfully!");
      setAddresses((prev) => [...prev.filter(addr => addr.title !== newAddress.title), response.data.data]);
      setIsAddressEditing(false);
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    
     <div className="user-profile-container">
  <h2>Seller Profile</h2>

  <form onSubmit={handleUpdate}>

    {/* First Name & Last Name Inline */}
    <div className="inline-group">
      <div className="form-group">
        <label>First Name</label>
        <input type="text" name="firstName" value={user.firstName} onChange={handleChange} disabled={!isEditing} />
      </div>
      
      <div className="form-group">
        <label>Last Name</label>
        <input type="text" name="lastName" value={user.lastName} onChange={handleChange} disabled={!isEditing} />
      </div>
    </div>

    {/* Email & Phone Inline */}
    <div className="inline-group">
      <div className="form-group">
        <label>BusinessEmail</label>
        <input type="email" name="email" value={user.email} disabled />
      </div>

      <div className="form-group">
        <label>BusinessPhone</label>
        <input type="text" name="phone" value={user.phone} onChange={handleChange} disabled={!isEditing} />
      </div>
    </div>

    {/* Gender & DOB Inline */}
    <div className="inline-group">
      <div className="form-group">
        <label>Gender</label>
        <select name="gender" value={user.gender} onChange={handleChange} disabled={!isEditing}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="form-group">
        <label>Date of Birth</label>
        <input type="date" name="dob" value={user.dob ? user.dob.split("T")[0] : ""} onChange={handleChange} disabled={!isEditing} />
      </div>
    </div>



 

        {isEditing ? (
          <button type="submit" className="save-btn">Save Changes</button>
        ) : (
          <button type="button" onClick={() => setIsEditing(true)} className="edit-btn">Edit Profile</button>
        )}
      </form>

   
      {addresses.map((address) => (
        <div key={address._id} className="address-card">
          <h4>{address.title.toUpperCase()}</h4>
          <p>{address.unitName}, {address.street}, {address.landmark}</p>
          <p>Pincode: {address.pincode}</p>
          <button className="edit-btn" onClick={() => { setIsAddressEditing(true); setNewAddress(address); }}>Edit</button>
        </div>
      ))}

      {isAddressEditing && (
        <form onSubmit={handleAddressUpdate}>
          <div className="form-group">
            <label>Title</label>
            <select name="title" value={newAddress.title} onChange={handleAddressChange}>
              <option value="home">Home</option>
              <option value="office">Office</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Unit Name</label>
            <input type="text" name="unitName" value={newAddress.unitName} onChange={handleAddressChange} />
          </div>

          <div className="form-group">
            <label>Street</label>
            <input type="text" name="street" value={newAddress.street} onChange={handleAddressChange} />
          </div>

          <div className="form-group">
            <label>Landmark</label>
            <input type="text" name="landmark" value={newAddress.landmark} onChange={handleAddressChange} />
          </div>

          <div className="form-group">
            <label>Pincode</label>
            <input type="number" name="pincode" value={newAddress.pincode} onChange={handleAddressChange} />
          </div>

          <button type="submit" className="save-btn">Save Address</button>
        </form>
      )}
    </div>
  );
};

export default SellerProfileDetails;
