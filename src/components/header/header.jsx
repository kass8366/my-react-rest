import '../header/header.css'
import { Link } from 'react-router-dom';

function Header(props) {

    function logout() {
        sessionStorage.clear();
        window.location.href = '/';
    }

    return (
        <>
            <header className='header'>
                <Link to={-1} 
                className={props.flagBackBtn ? 'hidden' : 'cart-header__back-btn'}
                >
                </Link>
                <h1 className='header-title'>{props.title}</h1>
                <div className='cart'>
                    <div className={props.flagCartVisHid?'hidden':'cartVis'}>
                    <p className='count-products'>{props.countProducts} товара на сумму {props.totalPrice} ₽</p>
                    <Link to={'/cart'} className='cart__btn'></Link>
                    </div>
                    <Link className='logout__btn' onClick={logout}>Выйти</Link>
                </div>
            </header>
        </>
    );

}

export default Header;