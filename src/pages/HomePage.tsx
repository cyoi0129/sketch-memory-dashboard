import { FC } from "react";

const HomePage: FC<{ login: boolean }> = (props) => {
	const { login } = props;

	return (
		<section>
			<h2>Welcome to Dashboard!</h2>
			{!login ? <p className="require_message">Please login before use</p> : null}
		</section>
	);
};
export default HomePage;
