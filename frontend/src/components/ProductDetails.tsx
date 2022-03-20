import { ChangeEvent, FormEvent, useState } from 'react';

import '../styles/productdetails.css';
import {createProduct} from '../api/ProductsApi';

interface PropsType {
    setCreateProduct: Function,
    createProduct: boolean
};

function ProductDetails(props: PropsType) {
    const [productName, setProductName] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productInStock, setProductInStock] = useState(0);

    const productNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setProductName(event.target.value);
    }

    const productBrandChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setProductBrand(event.target.value);
    }

    const productPriceChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setProductPrice(parseFloat(event.target.value));
    }

    const productInStockChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setProductInStock(parseInt(event.target.value));
    }

    const productDetailsFormHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (productName === '' || productBrand === '' || productPrice === 0 || productInStock === 0) {
            return;
        }

        if (props.createProduct) {
            const res = await createProduct(productName, productBrand, productPrice, productInStock);

            if (res.code === 201) {
                props.setCreateProduct(false);
            }
        }
    }

    return (
        <div className='product-details-form-container'>
            <form className='product-details-form' onSubmit={productDetailsFormHandler}>
                <div className='product-details-form-title'>Product Details</div>
                <label htmlFor='name'>Name:</label>
                <input type='text' id='name' name='name' onChange={productNameChangeHandler} />
                <label htmlFor='brand'>Brand:</label>
                <input type='text' id='brand' name='brand' onChange={productBrandChangeHandler} />
                <label htmlFor='price'>Price:</label>
                <input type='number' step="0.01" id='price' name='price' onChange={productPriceChangeHandler} />
                <label htmlFor='in_stock'>In Stock:</label>
                <input type='number' id='in_stock' name='in_stock' onChange={productInStockChangeHandler} />
                <div className='product-details-form-button-container'>
                    <button type='submit' className='product-details-form-button'>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default ProductDetails;