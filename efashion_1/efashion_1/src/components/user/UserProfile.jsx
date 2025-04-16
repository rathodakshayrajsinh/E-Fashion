import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { get, useForm } from 'react-hook-form';
import "../../assets/style.css";

const UserProfile = () => {

  const [states,setstates] = useState([]);
  const [cities,setcities] = useState([]);
  const [areas,setareas] = useState([]);

  const getAllStates = async () => {
    const res = await axios.get("state/allstates");
    console.log(res.data);
    setstates(res.data.data);
  }

  const getAllCities = async (id) => {
    const res = await axios.get("/city/getCityByStateId/"+id);
    console.log(res.data);
    setcities(res.data.data);
  }

  const getAllArea = async (id) => {
    const res = await axios.get("/area/getAreaByCityId/"+id);
    console.log(res.data);
    setareas(res.data.data);
  }

  useEffect(() => {
    getAllStates();
    getAllCities();
    getAllArea();
  },[])

  const {register, handleSubmit, formState: { errors }} = useForm();

  const submitHandler = async (data, event) => {
    event.preventDefault();
    const userId = localStorage.getItem("id");
    data.userId = userId;
    const res = await axios.post("/address/add", data);
    console.log(data);
    alert("Address added successfully");
  }

  return (
    <div style={{textAlign: 'center'}} className="justify-content-center align-items-center vh-100 bg-light mt-5 mb-5 ">
      <br></br>
      <br></br>
      <h1>User Profile</h1>
     
      <div>
        <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label>Title</label>
          <select {...register("title", { required: "Title is required" })}>
            <option value="">Select title</option>
            <option value="home">home</option>
            <option value="office">office</option>
            <option value="other">other</option>
          </select>
          {errors.title && <span className="error">{errors.title.message}</span>}
        </div>
        <div>
          <label>Unit Name</label>
          <input type="text" {...register("unitName", { required: "Unit Name is required" })} className="medium-input"></input>
          {errors.unitName && <span className="error">{errors.unitName.message}</span>}
        </div>
        <div>
          <label>Street</label>
          <input type="text" {...register("street", { required: "Street is required" })} className="medium-input"></input>
          {errors.street && <span className="error">{errors.street.message}</span>}
        </div>
        <div>
          <label>Landmark</label>
          <input type="text" {...register("landmark", { required: "Landmark is required" })} className="medium-input"></input>
          {errors.landmark && <span className="error">{errors.landmark.message}</span>}
        </div>
        <div>
          <label>SELECT STATE</label>
          <select
            {...register("stateId", { required: "State is required" })}
            onChange={(event) => {
              getAllCities(event.target.value);
            }}
          >
            <option value="">SELECT STATE</option>
            {states?.map((state) => {
              return <option key={state._id} value={state._id}>{state.name}</option>;
            })}
          </select>
          {errors.stateId && <span className="error">{errors.stateId.message}</span>}
        </div>
        <div>
          <label>SELECT CITY</label>
          <select
            {...register("cityId", { required: "City is required" })}
            onChange={(event) => {
              getAllArea(event.target.value);
            }}
          >
            <option value="">SELECT CITY</option>
            {cities?.map((city) => {
              return <option key={city._id} value={city._id}>{city.name}</option>;
            })}
          </select>
          {errors.cityId && <span className="error">{errors.cityId.message}</span>}
        </div>
        <div>
          <label>SELECT AREA</label>
          <select {...register("areaId", { required: "Area is required" })}>
            <option value="">SELECT AREA</option>
            {areas?.map((area) => {
              return <option key={area._id} value={area._id}>{area.name}</option>;
            })}
          </select>
          {errors.areaId && <span className="error">{errors.areaId.message}</span>}
        </div>
        <div>
          <label>Pincode</label>
          <input 
            type="number" 
            {...register("pincode", { 
              required: "Pincode is required", 
              minLength: { value: 6, message: "Pincode must be 6 digits" },
              maxLength: { value: 6, message: "Pincode must be 6 digits" },
              pattern: { value: /^[0-9]{6}$/, message: "Invalid pincode" }
            })} 
            className="medium-input"
          ></input>
          {errors.pincode && <span className="error">{errors.pincode.message}</span>}
        </div> 
          <div>
            <button type="submit" value="Login" style={{width:"40%"}}>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}


export default UserProfile;
