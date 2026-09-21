import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosinstance';
import {addtocart} from '../redux/cartslice.js'
import "../styles/productdetail.css";
import { useDispatch } from 'react-redux';
const ProductDetail = () => {
    const dispatch = useDispatch()
    const [product, setproduct] = useState(null);
    const [loading , setloading] = useState(true)
    const {id} = useParams();
    useEffect(() => {
       const fetchproductbyid = async () => {
           try{
               const res = await axiosInstance.get(`/products/${id}`);
               setproduct(res.data)
           }catch(err){
            console.error(err.message)
           }finally{
              setloading(false)
           }
       }
       fetchproductbyid()
    }, [id])
  return (
    <div className='parent'>
        {loading ? (
            <div>Loading...</div>
        )
        :( <div className="product-box">
         <img src={product.imageurl} alt="" />
         <div className="info">
            <h1>{product.name}</h1>
            <h2>{product.price}</h2>
            <h3>{product.description}</h3>
            <p>{product.category}</p>
            <button onClick={() => {
                dispatch(addtocart(product))
            }}>Add to Shopping Cart</button>
            <h3>In Stock ({product.stock} Units available)</h3>
         </div>
       </div>)}
      
    </div>
  )
}

export default ProductDetail
