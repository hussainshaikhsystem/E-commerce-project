import React, { useState } from 'react'
import '../styles/addproduct.css'
import axiosInstance from '../../axiosinstance'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authcontext';
const AddProduct = () => {
  const {user} = useContext(AuthContext)
  const [product, setproduct] = useState({
     name: '', description: '', price: '', category: '', stock: ''
  });
  const navigate = useNavigate()
  const [image , setimage] = useState(null)
  const [loading , setloading] = useState(false);
  if(!user || user.role !== 'admin'){
    navigate('/');
    return 
  }
   const handlesubmit = async (e) => {
    e.preventDefault();
    if(!image) return alert('please submit image first');
    setloading(true);
     const formdata = new FormData();
     formdata.append('name' , product.name);
     formdata.append('description', product.description)
     formdata.append('price', product.price)
     formdata.append('category', product.category)
     formdata.append('stock', product.stock)
     formdata.append('image', image)
    try{
     const res = await axiosInstance.post('/products', formdata, { headers: { 'Content-Type': 'multipart/form-data' } })
     alert('product created successfully with cloudinary image url');
     navigate('/shop')
    }catch(err){
      console.error(err.message)
    }finally{
      setloading(false)
    }
   
   }
  return (
    <div className='addproduct-parent'>
      <div className="add-product">
        <h1>Add New Product</h1>
        <form onSubmit={handlesubmit} action="">
          <input onChange={(e) => setproduct({...product, name: e.target.value})} type="text " placeholder='Product Name' />
          <textarea onChange={(e) => setproduct({...product, description: e.target.value})}name="" id="" placeholder='Description'></textarea>
          <input onChange={(e) => setproduct({...product, price: e.target.value})} type="number" placeholder='Price'/>
          <input onChange={(e) => setproduct({...product, category: e.target.value})}type="text" placeholder='Category'/>
          <input onChange={(e) => setproduct({...product, stock: e.target.value})} type="number" placeholder='Stock Quantity' />
          <span>Upload Product Image (Cloudinary)</span>
          <input onChange={(e) => setimage(e.target.files[0])} className='file' type="file"/>
          <button  type='submit'>{loading ? 'Uploading & Creating...' : 'Publish Product'}</button>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
