import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CaptainSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userData, setUserData] = useState({});

  const [vehicleColor, setVehicleColor] = useState('')
  const [vehicleNnumber, setVehicleNumber] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const submitHandler = (e) => {
    e.preventDefault();

    setUserData({
      fullName,
      email,
      password,
      vehicle:{
        vehicleColor,
        vehicleNnumber,
        vehicleCapacity,
        vehicleType,
      }
    });

    console.log(userData);

    
    setEmail('');
    setPassword('');
    setFullName('');
    setVehicleColor('');
    setVehicleNumber('');
    setVehicleCapacity('');
    setVehicleType('');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-7">
      <div>
        <img
          className="w-16 mt-2"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Uber Driver"
        />

        <form onSubmit={submitHandler}>
          {/* Full Name */}
          <h3 className="text-sm font-medium mb-2">What's your name</h3>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="bg-[#eeeeee] rounded mb-3 px-4 py-2 border w-full text-sm placeholder:text-sm"
            type="text"
            placeholder="First name"
          />

          {/* Email */}
          <h3 className="text-sm font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] rounded mb-3 px-4 py-2 border w-full text-sm placeholder:text-sm"
            type="email"
            placeholder="email@example.com"
          />

          {/* Password */}
          <h3 className="text-sm font-medium mb-2">Enter password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] rounded mb-3 px-4 py-2 border w-full text-sm placeholder:text-sm"
            type="password"
            placeholder="Password"
          />

          <h3 className='text-sm font-medium mb-2'>Vehicle Information</h3>

          {/* Grid Section */}
          <div className="grid grid-cols-2 gap-2">
            {/* Vehicle Color */}
            <div>
              {/* <h3 className="text-sm font-medium mb-2">Vehicle Color</h3> */}
              <input
                required
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                className="bg-[#eeeeee] rounded mb-3 px-4 py-2 border w-full text-sm placeholder:text-sm"
                type="text"
                placeholder="Vehicle Color"
              />
            </div>

            {/* Vehicle Number */}
            <div>
              {/* <h3 className="text-sm font-medium mb-2">Vehicle Number</h3> */}
              <input
                required
                value={vehicleNnumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                className="bg-[#eeeeee] rounded mb-3 px-4 py-2 border w-full text-sm placeholder:text-sm"
                type="text"
                placeholder="Vehicle Number"
              />
            </div>

            {/* Capacity */}
            <div>
              {/* <h3 className="text-sm font-medium mb-2">Capacity</h3> */}
              <input
                required
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                className="bg-[#eeeeee] rounded mb-3 px-4 py-2 border w-full text-sm placeholder:text-sm"
                type="number"
                placeholder="Capacity"
              />
            </div>

            {/* Vehicle Type */}
            <div>
              {/* <h3 className="text-sm font-medium mb-2">Vehicle Type</h3> */}
              <select required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="bg-[#eeeeee] rounded mb-3 px-4 py-2 border w-full text-sm placeholder:text-sm">
                <option  value="" disabled selected>
                  Select a vehicle type
                </option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="bus">Bus</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button className="bg-[#111] text-white font-semibold px-4 py-2 w-full text-lg">Create a Captain account</button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-2">
          Already have an account?{' '}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>

      <footer className="text-center mt-5 text-xs text-gray-500">
        <p>
          This site is protected by reCAPTCHA and the
          <span className="underline"> Google Privacy Policy </span>
          and
          <span className="underline"> Terms of Service </span>
          apply.
        </p>
      </footer>
    </div>
  );
};

export default CaptainSignUp;


