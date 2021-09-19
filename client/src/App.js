import { fecthRefreshToken } from 'app/refreshToken';
import Footer from 'components/Footer';
import Header from 'components/Header';
import LoadingPage from 'components/LoadingPage';
import PageNotFound from 'components/PageNotFound';
import Admin from 'features/Admin';
import Auth from 'features/Auth';
import Cart from 'features/Cart';
import ProductStore from 'features/Product';
import ProductDetail from 'features/ProductDetail';
// import HomePage from 'features/HomePage';
import $ from 'jquery';
import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import './responsive.scss';

const HomePage = React.lazy(() => import('features/HomePage')); 

function App() {
	const [modalCart, setModalCart] = useState(false);
	let accessToken = localStorage.getItem('accessToken');
	const [isLogin, setisLogin] = useState(accessToken ? true : false);
	const [intervals, setIntervals] = useState();

	const handleShowCart = () => {
		$('.md').addClass('animated');
		setModalCart(!modalCart);
	}

	const handleHideCart = () => {
		$('.md').removeClass('animated');
		setModalCart(!modalCart);
	}

	useEffect(() => {
		var prevScrollpos = window.pageYOffset;
		$(window).scroll(function() {
			var currentScrollPos = window.pageYOffset;
			if (prevScrollpos > currentScrollPos) {
				$('.header').css('top','0%');
			} else {
				$('.header').css('top','-100%');
			}
			prevScrollpos = currentScrollPos;

			if(window.pageYOffset === 0)
			{
				$('.header').css('top','0%');
			}
		})
	
	});

	const handleisLogin = (values) => {
		setisLogin(values.isLogin);
	}

	const handleisLogout = (values) => {
		setisLogin(values);
	}

	useEffect(() => {
		if (isLogin)
		{
			let intervalId = setInterval(() => fecthRefreshToken() , 30000);
			setIntervals(intervalId);
		}
		else {
			clearInterval(intervals);
		}
	}, [isLogin]);

	return (
		<div className="shopee-app">
			<ToastContainer />
			<Suspense fallback={<LoadingPage />} >
				<BrowserRouter>
					<Switch>
					
						<Route exact path="/">
							<Cart isShowModal={modalCart} handleCart={handleHideCart} setModalCart={setModalCart} />
							<Header handleCart={handleShowCart} status={isLogin} handleisLogout={handleisLogout} />
							<HomePage />
							<Footer />
						</Route>

						<Route exact path="/shop-all">
							<Cart isShowModal={modalCart} handleCart={handleHideCart} setModalCart={setModalCart} />
							<Header handleCart={handleShowCart} status={isLogin} handleisLogout={handleisLogout} />
							<ProductStore />
							<Footer />
						</Route>

						<Route path="/product-page">
							<Cart isShowModal={modalCart} handleCart={handleHideCart} setModalCart={setModalCart} />
							<Header handleCart={handleShowCart} status={isLogin} handleisLogout={handleisLogout} />
							<ProductDetail />
							<Footer />
						</Route>
						
						<Route path="/auth">
							<Auth isLogin={isLogin} handleisLogin={handleisLogin}/>
						</Route>

						<Route path="/admin">
							<Admin />
						</Route>
						<Route component={PageNotFound}/>
					</Switch>
				</BrowserRouter>
			</Suspense>
		</div>
	);
}

export default App;
