import '../cart-item/cart-item.css';

function CartItem(props) {
    return (
        <>
            <section className='cart-product'>
                <div className='cart-product-left'>
                    <img className='cart-product-img' src={props.img} alt={props.name}></img>
                    <p className='cart-product-left__descr'>{props.name}</p>
                </div>
                <div className='cart-product-right'>
                    <p className='cart-product-right__price'>{props.price} ₽</p>
                    <button id = {props.id} onClick={(e)=>props.remove(e, props.price)} className='cart-product-right__deleteProduct'></button>
                </div>
            </section>
        </>
    );
}

export default CartItem