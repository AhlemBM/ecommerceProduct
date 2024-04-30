import React, { useState } from 'react';
import "./ProductItem.css"
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

function ProductItem({ product,deleteProduct, products,setProducts }) {
    const [loading, setLoading] = useState(false);

    const handleCheck = (id) => {
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])

    }
    if(loading) return <div className="product_card"><Loading/></div>
    return (
        <div className="product_card">
            {
               <input type="checkbox" checked={product.checked} onChange={()=>handleCheck(product._id)}/>
            }
            <img src={product.img.url} alt=""/>

            <div className="product_box">
                <h2>{product.nom}</h2>



            </div>
            <div className="row_btn">
                {    <>
                        <Link  id="btn_buy" to="#!" onClick={()=>deleteProduct(product._id, product.img.public_id)}>
                            DELETE
                        </Link>
                        <Link id="btn_view" to={`/edit_product/${product._id}`}>
                            EDIT
                        </Link>



                        <Link id="btn_view" to={`/detail/${product._id}`}>
                            View
                        </Link>
                    </>
                }
            </div>

        </div>
    );
}

export default ProductItem;
