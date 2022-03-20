import '../styles/productcard.css';

interface PropsType {
    productData: Record<string, unknown>,
    setEditProduct: Function,
};

function ProductCard(props: PropsType) {
    const editButtonHandler = () => {
        props.setEditProduct({
            active: true,
            productData: props.productData
        });
    }

    return (
        <div className="product-card-container">
            <div>
                <img src="https://picsum.photos/200" alt="Placeholder" />
            </div>
            <div>
                <div><span>Name:</span> {props.productData.name}</div>
                <div><span>Brand:</span> {props.productData.brand}</div>
                <div><span>Price:</span> {props.productData.price}</div>
                <div><span>In Stock:</span> {props.productData.in_stock}</div>
                <div>
                    <button onClick={editButtonHandler}>Edit</button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
