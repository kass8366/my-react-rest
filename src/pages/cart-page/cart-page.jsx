import './cart-page.css';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import CartItem from '../../components/cart-item/cart-item';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function CartPage() {
    const totalPrice = useSelector(store => store.totalPrice);
    const countProducts = useSelector(store => store.countProducts);
    const basketProducts = useSelector(store => store.basketProducts);
    const dispatch = useDispatch();
    const title = 'КОРЗИНА С ВЫБРАННЫМИ ТОВАРАМИ';
    const flagCartVisHid = true;

    function RemoveProduct(e, price) {
        dispatch({
            type: 'REMOVE_PRODUCT',
            id: parseInt(e.target.id),
            price: price
        });
    }

    let productList = basketProducts.map((elem, index) => {
        return <CartItem
            key={index}
            id={elem.id}
            name={elem.name}
            img={elem.img}
            price={elem.price}
            remove={RemoveProduct}
        />
    });

    return (
        <>
             <Header 
                countProducts = {countProducts}
                totalPrice = {totalPrice}
                title = {title}
                flagCartVisHid = {flagCartVisHid}
            />
            <main className='cart-main'>{productList}</main>
            <footer className='cart-footer'>
                <p className='cart-footer_descr-summ'>ЗАКАЗ НА СУММУ: <span className='cart-footer_summ'>{totalPrice} ₽</span></p>
                <button className='cart-footer__order-btn'>Оформить заказ</button>
            </footer>
        </>
    );
}

export default CartPage;
