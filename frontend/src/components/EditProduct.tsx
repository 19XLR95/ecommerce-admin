import NavBar from './NavBar';
import ProductDetails from './ProductDetails';

interface PropsType {
    setUserData: Function,
    userData: Record<string, unknown>,
    setEditProduct: Function,
    productData: Record<string, unknown>,
};

function EditProduct(props: PropsType) {
    return (
        <>
            <NavBar setUserData={props.setUserData} userData={props.userData} page='Edit Product' />
            <ProductDetails setEditProduct={props.setEditProduct} createProduct={false} productData={props.productData} />
        </>
    );
}

export default EditProduct;

