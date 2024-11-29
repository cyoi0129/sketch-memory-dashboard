import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ListItem, Overlay, Error } from "../components";
import { useQuery, ApolloError } from "@apollo/client";
import { GET_ITEMS } from "../app/graphql";
import "../css/list.scss";
import { IoAddCircle } from "react-icons/io5";

const ListPage: FC = () => {
	const { loading, error, data } = useQuery(GET_ITEMS);

	const [apiLoading, setApiLoading] = useState<boolean>(false);
	const [apiError, setApiError] = useState<ApolloError | undefined>(undefined);
	const [items, setItems] = useState<Array<ItemType>>([]);

	/**
	 * Reload while error
	 */
	const errorProcess = (): void => {
		location.reload();
	};

	useEffect(() => {
		if (loading) {
			setApiLoading(true);
			setApiError(undefined);
			setItems([]);
		} else if (error) {
			setApiLoading(false);
			setApiError(error);
			setItems([]);
		} else {
			setApiLoading(false);
			setApiError(undefined);
			setItems(data.userItems);
		}
	}, [loading, error, data]);

	return (
		<section>
			<h2>Item List</h2>
			{data && !apiLoading && !apiError ? (
				<ul className="item_list">
					{items.map((item) => (
						<ListItem key={item.id} data={item} />
					))}
				</ul>
			) : null}
			{apiLoading ? <Overlay loader={true} /> : null}
			{apiError ? (
				<Error message={apiError.message} action={errorProcess} />
			) : null}
			<div className="float_btn">
				<Link to="/item/new">
					<IoAddCircle />
				</Link>
			</div>
		</section>
	);
};

export default ListPage;
