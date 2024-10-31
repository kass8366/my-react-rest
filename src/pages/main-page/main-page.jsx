import './main-page.css';
import Header from '../../components/header/header';
import DescrProducts from '../../components/descr-products/descr-products';
import data from '../../components/app/data';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function MainPage() {
    const countProducts = useSelector(store => store.countProducts);
    const totalPrice = useSelector(store => store.totalPrice);
    const basketProducts = useSelector(store => store.basketProducts);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const title = 'НАША ПРОДУКЦИЯ';
    const flagBackBtn = true;

    function addProduct(data) {
        dispatch({
            type: 'ADD_PRODUCT',
            id: data.id,
            data: data,
            price: data.price
        });
    }
    function getProduct(elem) {   
             
      return  navigate('/descrP', {state:{elem}}); 
       
    }
    

    let productSection = data.map((elem, index) => {
        return <section key={index} className='product-section'>
            <img className='product-img'
                src={elem.img}
                alt={elem.name}
                onClick={() => getProduct(elem)}>
            </img>
            <p className='product-name'>{elem.name}</p>
            <p className='product-descr'>{elem.descr}</p>
            <div className='price-block'>
                <p className='price'>{elem.price} ₽<span className='wt'> / {elem.wt}</span></p>
                <button onClick={() => addProduct(elem)} className='add-product'>+</button>
            </div>
        </section>
    });



    return (
        <>
            <Header
                countProducts={countProducts}
                totalPrice={totalPrice}
                title = {title}
                flagBackBtn = {flagBackBtn}
            />
            <main className='main'>{productSection}</main>
        </>
    );
}

export default MainPage;
