import React from 'react'
import { useState,useEffect } from 'react';
import Loader from './../../../../components/loaderComponent/loaderComponent';
import { API_Get_Products,API_Upload_Videos } from './../../../../constants/contant';
const Shop = () => {
  const [getProducts, setProducts] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart,setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [points, setPoints] = useState(0);
  const userPoints = localStorage.getItem('userPoints');
  
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let result = await fetch(API_Get_Products);
    result = await result.json();
    console.log(result);
    if(result<0){
      result.send("<h1>No Data!</h1>")
    }
    console.log("Result from API Members list", result);
    setPoints(userPoints);
    setProducts(result);
    console.log(result._id)
    setLoading(false)
  };

  const addToCart = (product) => {
    setPoints(points-product.points);
    setCart([...cart,product]);
    setShowCart(true);
  }

  const canRedeem = (product) => {
    return product.points <= points;
  }
  const removeFromCart = (productId) => {
    // setPoints(points+ product.points)
    const updatedCart = cart.filter(product => product.id !== productId);
    setCart(updatedCart);
  }
  
  return (
    <>
     {isloading?(
      <Loader />
    ):( 
      <div className='shop_parent_div'>
      <div className='position-absolute' style={{marginLeft:'20%',width:"80%"}}>
       <div className='container  shop_container for_common_Top_margin shop_remove_border shop_container_height' style={{width:'95%'}} >
         <div className='row'>
            <div className='col-md-6'>
                <div className='row '>
                    <h3>Shop</h3>
                </div>
            </div>
            <div className='col-md-6'>
                <div className='row justify-content-end'>
                   <dic className="col-4" id='shopSearch'>
                      <input type='serch ' id='shop_serch' />
                   </dic>
                </div>
            </div>
        </div>
        {/* Filter Buttons Row */}
        <div className='row'>
    <div className='col-md-12'>
        <div className='d-flex justify-content-between'>
        <button
          className={`btn common_button font_family_common btn_equal ${selectedCategory === 'All' ? 'activeShop' : ''}`}
          onClick={() => setSelectedCategory('All')}>
          All
        </button>
        {/* 2nd button */}
        <button
          className={`btn common_button font_family_common btn_equal ${selectedCategory === 'Products' ? 'activeShop' : ''}`}
          onClick={() => setSelectedCategory('Products')}>
          Products
        </button>
            {/*3rd Button  */}
            <button
              className={`btn common_button font_family_common btn_equal ${selectedCategory === 'Food' ? 'activeShop' : ''}`}
              onClick={() => setSelectedCategory('Food')}>
              Food
            </button>
            {/* 4th Button */}
            <button
            className={`btn common_button font_family_common btn_equal ${selectedCategory === 'Gift' ? 'activeShop' : ''}`}
            onClick={() => setSelectedCategory('Gift')}>
            Gifts
          </button>
          {/* 5th Button */}
          {/*  */}
          <button
            className={`btn common_button font_family_common btn_equal ${selectedCategory === 'Electronics' ? 'activeShop' : ''}`}
            onClick={() => setSelectedCategory('Electronics')}>
            Electronics
          </button>
          {/*  */}
          <button
            className={`btn common_button font_family_common btn_equal ${selectedCategory === 'Clothing' ? 'activeShop' : ''}`}
            onClick={() => setSelectedCategory('Clothing')}>
            Clothing
          </button>
          {/* 6th Button */}
          <button
            className={`btn common_button font_family_common btn_equal ${selectedCategory === 'Dessert' ? 'activeShop' : ''}`}
            onClick={() => setSelectedCategory('Dessert')}>
            Dessert
          </button>
        </div>
    </div>
</div>

    </div>
     {/* </div> */}
   
     <div className={`cart-container ${showCart ? 'show' : ''}`}>
  <div className="cart">
    <h3>Cart</h3>
    {cart.map((product) => (
      <div key={product.id} className="cart-item">
        {product.title} - {product.points} points &nbsp;&nbsp;
        <button onClick={() => removeFromCart(product.id)}>Remove</button>
      </div>
    ))}
  </div>
</div>

{/* Products Cards */}
{/* <div className="c" id="admin_user"> */}

<div className='container shop_container'>
<div className="row">
{getProducts.filter(product => selectedCategory === 'All' || product.category === selectedCategory).map((product) =>{
  const disableRedeem = !canRedeem(product);
  return(
    <div className='col-md-3 col-sm-6 col-xs-12 mb-5 set_card_showdow'>
            <div className="card product_card border-0" >
                <img src={`${API_Upload_Videos}${product.image}`} height="277px" width="306px" className="card-img-top img-fluid" alt="..."/>
                <div className="card-body">
                  <div className='product_details font_family_common d-flex justify-content-between align-items-center h-50'>
                  <h5 className="card-title font_family_common">{product.title}</h5>
                  <div className="ms-5">
                    <img className='' width="50px" header="50px" src="/FullStar.png" alt='' />
                    
                  </div>
                  <h5 className="card-title font_family_common">{product.points}</h5>
                  </div>
                  <p className="card-text">{product.description}</p>
                  <button href="#" className="btn radeem font_family_common common_button w-100"
                  onClick={()=> addToCart(product)} disabled={disableRedeem}>
                    Radeem
                  </button>
                  {disableRedeem && <span className="text-danger">Not enough points</span>}
                </div>
              </div>
             </div>
  )
}
 )}
      </div>
    </div>
      </div>
      </div>
      )}
    </>
  )
}

export default Shop