import '../auth/auth.css';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth() {

    let dataA = {
        login: null,
        passw: null,
        update: false
    }

    const navigate = useNavigate();
    const fReset = useRef(null);
    const rLogin = useRef(null);
    const rPassw = useRef(null);
    const rAuth = useRef(null);
    const [authStep, setAuthStep] = useState(false);
    const [loginEmpty, setLoginEmpty] = useState("");
    const [passwEmpty, setPasswEmpty] = useState("");
    const [update, setUpdate] = useState(false);

    let authStore = false;
    if (sessionStorage.getItem('authUser') !== null) {
        authStore = true;
    }

    const [showAuth, setShowAuth] = useState(!authStore);

    function getValidation(field, error) {
        if (field.length >= 4) {
            error.current.textContent = "";
            return field;
        }

        if (field.length === 0) {
            error.current.textContent = "Поле не должно быть пустым!";
            rAuth.current.textContent = "";
        }
        else if (field.length <= 4) {
            error.current.textContent = "Поле должно содержать не менее 4-х символов!";
            rAuth.current.textContent = "";
        }
        return false;
    }

    function submitHundler(e) {
        e.preventDefault();

        dataA.login = getValidation(loginEmpty, rLogin);
        dataA.passw = getValidation(passwEmpty, rPassw);

        if (dataA.login && dataA.passw) {
            authStore ? setShowAuth(showAuth) : setShowAuth(!showAuth);
            if (!authStep) {
                sessionStorage.setItem('authUser', JSON.stringify(dataA));
                rAuth.current.textContent = "Вы зарегистрированы!";
            }
            else {
                let getAuth = JSON.parse(sessionStorage.getItem('authUser'));
                if (getAuth !== null && loginEmpty === getAuth.login && passwEmpty === getAuth.passw) {
                    rAuth.current.textContent = "";
                      navigate('/main');
                }
                else {
                    rAuth.current.textContent = "Неверный логин или пароль!";
                }
            }
        }
        return false;
    }

    function getCurrentStep() {
        fReset.current.reset();
        setLoginEmpty("");
        setPasswEmpty("");
        rAuth.current.textContent = "";
        rLogin.current.textContent = "";
        rPassw.current.textContent = "";

        return setAuthStep(!authStep);
    }

    return (
        <>
            <div className="authUser">
                <div className="authUser__popup">
                    <p className='authUser__popup-step'
                        onClick={getCurrentStep}>
                        {authStep ? "Зарегистрироваться" : "Авторизоваться"}
                    </p>
                    <h1 className='authUser__popup-title'>{authStep ? "Вход" : "Регистрация"}</h1>
                    <form action="#" method='GET' className='authUser__form' ref={fReset}>
                        <input type="text"
                            className='authUser__form-field'
                            placeholder='Логин'
                            onInput={(e) => setLoginEmpty(e.target.value)} />
                        <p className="authUser__form-field-err" ref={rLogin}></p>
                        <input type="password"
                            className='authUser__form-field'
                            placeholder='Пароль'
                            onInput={(e) => setPasswEmpty(e.target.value)} />
                        <p className="authUser__form-field-err" ref={rPassw}></p>
                        <div className="authUser__form-checkbox-block">
                            <input type="checkbox" id='update' aria-hidden />
                            <label htmlFor="update"
                                className='authUser__form-checkbox-label'
                                onClick={() => setUpdate(!update)}>
                                Я согласен получать обновления на почту
                                {update ? dataA.update = true : dataA.update = false}
                            </label>
                            <p className={authStep ? "field-err" : "field-succ"} ref={rAuth}
                            ></p>
                            <button className='submit-form'
                                type='submit'
                                onClick={submitHundler}>
                                {authStep ? "Войти" : "Зарегистрироваться"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Auth;