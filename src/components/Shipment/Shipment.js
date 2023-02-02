import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UseContext } from '../LogIn/Context';
import './Shipment.css';

const PlaceOrder = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [logIn, setLogIn] = useContext(UseContext);
  const onSubmit = data => {
    console.log(data);
  }
  console.log(watch("example")); // watch input value by passing the name of it

  return (

    <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue={logIn.name} placeholder="Your Name" {...register("name", { required: true })} />
      {errors.name && <span className='error'>Name is required</span>}
      <input defaultValue={logIn.email} placeholder="Your Email" {...register("email", { required: true })} />
      {errors.email && <span className='error'>Email is required</span>}
      <input placeholder="Your Phone Number" {...register("phone", { required: true })} />
      {errors.phone && <span className='error'>Phone Number is required</span>}
      <input placeholder="Your Address" {...register("address", { required: true })} />
      {errors.address  && <span className='error'>Address is required</span>}
      <input type="submit" />
    </form>
  );
};

export default PlaceOrder;