import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import Notification from './components/UI/Notification';
import { sendCartData } from './store/cart-actions';
import { fetchCartData } from './store/cart-actions';

let isInitial = true;

function App() {
	const dispatch = useDispatch();
	const isVisible = useSelector((state) => state.ui.cartIsVisible);
	const cart = useSelector((state) => state.cart);
	const notification = useSelector((state) => state.ui.notification);

	useEffect(() => {
		dispatch(fetchCartData());
	}, [dispatch]);

	useEffect(() => {
		if (isInitial) {
			isInitial = false;
			return;
		}

		if (cart.changed) {
			dispatch(sendCartData(cart));
		}
	}, [cart, dispatch]);

	return (
		<>
			<Notification
				status={notification?.status}
				title={notification?.title}
				message={notification?.message}
			/>
			<Layout>
				{isVisible && <Cart />}
				<Products />
			</Layout>
		</>
	);
}

export default App;