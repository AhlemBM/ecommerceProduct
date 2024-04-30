// ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./DetailProduct.css"
function ProductDetail() {
    const [product, setProduct] = useState(null);
    const { id } = useParams(); // Obtient l'identifiant du produit de l'URL

    useEffect(() => {
        const getProductDetail = async () => {
            try {
                const res = await axios.get(`/api/article/get/${id}`); // Appel à l'API pour obtenir les détails du produit
                setProduct(res.data.product);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };
        getProductDetail();
    }, [id]); // Exécute l'effet à chaque changement d'identifiant de produit

    // Affichage pendant le chargement
    if (!product) {
        return <p>Chargement des détails du produit...</p>;
    }

    return (
        <div className="detail">
            <img src={product.img.url} alt=""/>
            <div className="box-detail">
                <div className="row">
                    <h2>{product.nom}</h2>

                </div>
                <h4 style={{textDecoration:'underline' , color:'whitesmoke'}}>Content:</h4>
                <p>{product.video}</p>
                <h4 style={{textDecoration:'underline' , color:'whitesmoke'}}>Description:</h4>
                <p>{product.caracteristiques}</p>
            </div>
        </div>
    );

}

export default ProductDetail;
