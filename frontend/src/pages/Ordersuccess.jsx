import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/ordersuccess.css'
const Ordersuccess = () => {
   
  return (
    <div className='order-success'>
       <h2 >Payment Successful!</h2>
      <p>
        Thank you for your order. We have securely received your payment and will process your shipment shortly.
      </p>
      <Link to="/shop" className="btn">Continue Shopping</Link>
    </div>
  )
}

export default Ordersuccess
