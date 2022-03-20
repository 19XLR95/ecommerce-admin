import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import '../styles/productdetails.css';
import {createProduct, updateProduct, deleteProduct} from '../api/ProductsApi';

interface PropsType {
    setCreateProduct?: Function,
    setEditProduct?: Function,
    createProduct: boolean,
    productData?: Record<string, unknown>,
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
                props.setCreateProduct && props.setCreateProduct(false);
            }
        }
        else {
            if (props.productData) {
                const res = await updateProduct(props.productData._id as string, productName, productBrand, productPrice, productInStock);

                if (res.code === 204 && props.setEditProduct) {
                    props.setEditProduct({
                        active: false,
                        productData: undefined
                    });
                }
            }
        }
    }

    const deleteButtonHandler = async () => {
        if (!props.createProduct && props.productData) {
            const res = await deleteProduct(props.productData._id as string);

            if (res.code === 204 && props.setEditProduct) {
                props.setEditProduct({
                    active: false,
                    productData: undefined
                });
            }
        }
    }

    useEffect(() => {
        if (!props.createProduct && props.productData) {
            setProductName(props.productData.name as string);
            setProductBrand(props.productData.brand as string);
            setProductPrice(props.productData.price as number);
            setProductInStock(props.productData.in_stock as number);
        }
    }, [props.createProduct, props.productData]);

    return (
        <div className='product-details-form-container'>
            <form className='product-details-form' onSubmit={productDetailsFormHandler}>
                <div className='product-details-form-title'>Product Details</div>
                <label htmlFor='name'>Name:</label>
                <input type='text' value={productName} id='name' name='name' onChange={productNameChangeHandler} />
                <label htmlFor='brand'>Brand:</label>
                <input type='text' value={productBrand} id='brand' name='brand' onChange={productBrandChangeHandler} />
                <label htmlFor='price'>Price:</label>
                <input type='number' value={productPrice} step="0.01" id='price' name='price' onChange={productPriceChangeHandler} />
                <label htmlFor='in_stock'>In Stock:</label>
                <input type='number' value={productInStock} id='in_stock' name='in_stock' onChange={productInStockChangeHandler} />
                <div className='product-details-form-button-container'>
                    <button type='submit' className='product-details-form-button'>{props.createProduct ? 'Submit' : 'Update'}</button>
                    {!props.createProduct && <span></span>}
                    {!props.createProduct && <button type='button' className='product-details-form-button-delete' onClick={deleteButtonHandler}>Delete</button>}
                </div>
            </form>
        </div>
    );
}

export default ProductDetails;