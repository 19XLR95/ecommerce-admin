import NavBar from './NavBar';
import ProductDetails from './ProductDetails';

interface PropsType {
    setUserData: Function,
    userData: Record<string, unknown>,
    setCreateProduct: Function,
};

function CreateProduct(props: PropsType) {
    return (
        <>
            <NavBar setUserData={props.setUserData} userData={props.userData} page='Create Product' />
            <ProductDetails setCreateProduct={props.setCreateProduct} createProduct={true} />
        </>
    );
}

export default CreateProduct;
