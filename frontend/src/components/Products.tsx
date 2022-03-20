import { useEffect, useState } from 'react';

import ProductCard from './ProductCard';
import NavBar from './NavBar';
import {getProducts} from '../api/ProductsApi';
import '../styles/products.css'

interface PropsType {
    setUserData: Function,
    userData: Record<string, unknown>,
    setCreateProduct: Function,
};

function Products(props: PropsType) {
    const productDataState: Array<Record<string, unknown>> = [];
    const [productsData, setProductsData] = useState(productDataState);

    useEffect(() => {
        (async () => {
            const res = await getProducts();

            if (res.code === 200 && Array.isArray(res.data)) {
                setProductsData(res.data);
            }
        })();
    }, []);

    const productAddButtonHandler = () => {
        props.setCreateProduct(true);
    }

    return (
        <>
            <NavBar setUserData={props.setUserData} userData={props.userData} page='All Products' />
            <button className='add-product-button' onClick={productAddButtonHandler}>+</button>
            <div className='products-container'>
                {
                    productsData.map((product) => {
                        return <ProductCard productData={product} key={product._id as string} />
                    })
                }
            </div>
        </>
    );
}

export default Products;
