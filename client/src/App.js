import Footer from 'components/Footer';
import Header from 'components/Header';
import LoadingPage from 'components/LoadingPage';
import PageNotFound from 'components/PageNotFound';
import ToastMessage from 'components/ToastMessage';
import { setIsLogin } from 'constants/isLoginSlice';
import Auth from 'features/Auth';
import Cart from 'features/Cart';
import ProductStore from 'features/Product';
import ProductDetail from 'features/ProductDetail';
import React, { Suspense, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import './responsive.scss';


const HomePage = React.lazy(() => import('features/HomePage')); 

function App() {
	const btnScrollRef = useRef(null);
	const stateLogin = useSelector((state) => state.isLogin);
	const accessToken = localStorage.getItem('accessToken');
	const dispatch = useDispatch();

	useEffect(() => {
		if(accessToken) {
			dispatch(setIsLogin());
		}
	}, [dispatch, accessToken]);

	useEffect(() => {
		window.onscroll = function () {
			if(window.scrollY >= 1000)
			{
				btnScrollRef.current.classList.remove('hide');
			}
			else
				btnScrollRef.current.classList.add('hide');
		};
    }, []);

	const handleScrollTop = () => {
		window.scrollTo(0, 0);
	}

	return (
		<>
			<Suspense fallback={<LoadingPage />} >
				<ToastMessage autoDeleteInterval={3500}/>
				<BrowserRouter>
					<Switch>
						<Route exact path="/">
							<Header status={stateLogin.isLogin}/>
							<Cart />
							<HomePage />
							<Footer />
						</Route>

						<Route exact path="/shop-all">
							<Header status={stateLogin.isLogin} />
							<Cart />
							<ProductStore />
							<Footer />
						</Route>

						<Route path="/product-page">
							<Header status={stateLogin.isLogin} />
							<Cart />
							<ProductDetail />
							<Footer />
						</Route>
						
						<Route path="/auth">
							<Auth isLogin={stateLogin.isLogin}/>
						</Route>
						
						<Route component={PageNotFound}/>
					</Switch>
				</BrowserRouter>
			</Suspense>
			<div 
				ref={btnScrollRef} className="btn-scroll-top hide"
				onClick={() => handleScrollTop()}
			>
				<i className="fas fa-arrow-alt-up"></i>
			</div>
		</>
	
	);
}

export default App;
