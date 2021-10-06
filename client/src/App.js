import { fecthRefreshToken } from 'app/refreshToken';
import Footer from 'components/Footer';
import Header from 'components/Header';
import LoadingPage from 'components/LoadingPage';
import PageNotFound from 'components/PageNotFound';
import ToastMessage from 'components/ToastMessage';
import Auth from 'features/Auth';
import Cart from 'features/Cart';
import ProductStore from 'features/Product';
import ProductDetail from 'features/ProductDetail';
// import HomePage from 'features/HomePage';
import $ from 'jquery';
import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import './responsive.scss';

const HomePage = React.lazy(() => import('features/HomePage')); 

function App() {
	let accessToken = localStorage.getItem('accessToken');
	const [isLogin, setisLogin] = useState(accessToken ? true : false);
	const [intervals, setIntervals] = useState();
	const [resizeWindow, setresizeWindow] = useState(window.innerWidth);

	useEffect(() => {
        window.addEventListener('resize', reportWindowSize);

        function reportWindowSize() {
            setresizeWindow(window.innerWidth);
        }
    }, []);

	useEffect(() => {
		// if(resizeWindow < 600) 
		// {
		// 	$('.header').css('top','0%');
		// }
		// else {
		// 	var prevScrollpos = window.pageYOffset;
		// 	$(window).scroll(function() {
		// 		var currentScrollPos = window.pageYOffset;
		// 		if (prevScrollpos > currentScrollPos) {
		// 			$('.header').css('top','0%');
		// 		} else {
		// 			$('.header').css('top','-100%');
		// 		}
		// 		prevScrollpos = currentScrollPos;
		// 		if(window.pageYOffset === 0)
		// 		{
		// 			$('.header').css('top','0%');
		// 		}
		// 	})
		// }
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
		else
			clearInterval(intervals);

		return (intervals) => {
			clearInterval(intervals)
		}
	}, [isLogin]);

	return (
		<Suspense fallback={<LoadingPage />} >
			<ToastMessage autoDeleteInterval={3500}/>
			<BrowserRouter>
				<Switch>
					
					<Route exact path="/">
						<Header status={isLogin} handleisLogout={handleisLogout} />
						<Cart />
						<HomePage />
						<Footer />
					</Route>

					<Route exact path="/shop-all">
						<Header status={isLogin} handleisLogout={handleisLogout} />
						<Cart />
						<ProductStore />
						<Footer />
					</Route>

					<Route path="/product-page">
						<Header status={isLogin} handleisLogout={handleisLogout} />
						<Cart />
						<ProductDetail />
						<Footer />
					</Route>
					
					<Route path="/auth">
						<Auth isLogin={isLogin} handleisLogin={handleisLogin}/>
					</Route>
					
					<Route component={PageNotFound}/>
				</Switch>
			</BrowserRouter>
		</Suspense>
	);
}

export default App;
