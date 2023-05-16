import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

/**
 * This is a React component that sends cart data to a Firebase database and displays a notification
 * based on the status of the request.
 * @returns The `App` component is being returned.
 */
let isInitial = true;

function App() {
	const dispatch = useDispatch();
	const isVisible = useSelector((state) => state.ui.cartIsVisible);
	const cart = useSelector((state) => state.cart);
	const notification = useSelector((state) => state.ui.notification);

	/**
	 * This function sends cart data to a Firebase database and displays a notification based on the
	 * success or failure of the operation.
	 */
	useEffect(() => {
		const sendCartdata = async () => {
			/* This code is dispatching an action to the Redux store to update the state of the UI slice.
			Specifically, it is calling the `showNotification` action creator from the `uiActions` object and
			passing an object with `status`, `title`, and `message` properties as its argument. This action
			will update the `notification` state in the UI slice to show a notification with the specified
			status, title, and message. In this case, it is showing a "pending" notification with the title
			"Sending..." and the message "Sending cart data!". */
			dispatch(
				uiActions.showNotification({
					status: 'pending',
					title: 'Sending...',
					message: 'Sending cart data!',
				})
			);

			/* This code is sending a PUT request to a Firebase Realtime Database API endpoint with the URL
			`'https://redux-http-1a86e-default-rtdb.europe-west1.firebasedatabase.app/cart.json'` and the
			cart data as the request body. The `fetch` function returns a Promise that resolves to the
			response of the request. The response is stored in the `response` variable using the `await`
			keyword to wait for the Promise to resolve. */
			const response = await fetch(
				'https://redux-http-1a86e-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
				{ method: 'PUT', body: JSON.stringify(cart) }
			);

			console.log(response);

			/* This code block is checking if the response from the PUT request to the Firebase Realtime
			Database API endpoint was successful or not. If the response is not ok (i.e., the status code is
			not in the range of 200-299), it throws an error with the message "Sending cart data failed!".
			This error will be caught by the `catch` block and a notification with the status "error", title
			"Error!", and message "Sending cart data failed!" will be displayed to the user. */
			if (!response.ok) {
				throw new Error('Sending cart data failed!');
			}

			// const responseData = (await response).json();

			/* This code is dispatching an action to the Redux store to update the state of the UI slice.
			Specifically, it is calling the `showNotification` action creator from the `uiActions` object and
			passing an object with `status`, `title`, and `message` properties as its argument. This action
			will update the `notification` state in the UI slice to show a notification with the specified
			status, title, and message. In this case, it is showing a "success" notification with the title
			"Success!" and the message "Sent cart data successfully!". */
			dispatch(
				uiActions.showNotification({
					status: 'success',
					title: 'Success!',
					message: 'Sent cart data successfully!',
				})
			);
		};

		/* The `if (isInitial)` block is checking if the `isInitial` variable is true. If it is true, it sets
		`isInitial` to false and returns from the `useEffect` hook without executing the `sendCartdata`
		function. This is because the `sendCartdata` function should only be executed after the initial
		render of the component, and not during the first render. The `isInitial` variable is used to
		ensure that the `sendCartdata` function is only executed after the initial render of the
		component. */
		if (isInitial) {
			isInitial = false;
			return;
		}

		/* `sendCartdata().catch((error) => {...})` is a Promise chain that handles errors that may occur
		during the execution of the `sendCartdata` function. If an error occurs, the `catch` block will be
		executed, which logs the error to the console and dispatches an action to the Redux store to
		update the state of the UI slice. Specifically, it is calling the `showNotification` action
		creator from the `uiActions` object and passing an object with `status`, `title`, and `message`
		properties as its argument. This action will update the `notification` state in the UI slice to
		show a notification with the status "error", title "Error!", and message "Sending cart data
		failed!". This notification will be displayed to the user. */
		sendCartdata().catch((error) => {
			console.log(error);
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: 'Sending cart data failed!',
				})
			);
		});
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
