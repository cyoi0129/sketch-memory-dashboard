import { FC, useState, useEffect } from "react";
import { getItemDetail } from "../app/graphql";
import { useQuery, ApolloError } from "@apollo/client";
import { Overlay, Error, ItemEditor } from "../components/";
import { INIT_ITEM } from "../app/util";

const ItemDetail: FC<ItemDetailProps> = (props) => {
	const { id, tagList, authorList } = props;
	const { loading, error, data } = useQuery(getItemDetail(id));
	const [apiLoading, setApiLoading] = useState<boolean>(false);
	const [apiError, setApiError] = useState<ApolloError | undefined>(undefined);
	const [item, setItem] = useState<ItemDataType>(INIT_ITEM);

	/**
	 * Reload while error
	 */
	const errorProcess = (): void => {
		location.reload();
	};

	/**
	 * Convert Item data format
	 * @param item
	 * @returns
	 */
	const convertItemType = (item: ItemType): ItemDataType => {
		return {
			id: item.id,
			title: item.title,
			image: item.image,
			date: item.date,
			author: item.author.id,
			status: item.status,
			tags: item.tags.map((tag) => tag.id),
		};
	};

	useEffect(() => {
		if (loading) {
			setApiLoading(true);
			setApiError(undefined);
		} else if (error) {
			setApiLoading(false);
			setApiError(error);
		} else {
			setApiLoading(false);
			setApiError(undefined);
			setItem(convertItemType(data.item));
		}
	}, [loading, error, data]);

	return (
		<>
			{data && !apiLoading && !apiError ? (
				<ItemEditor item={item} tagList={tagList} authorList={authorList} />
			) : null}
			{apiLoading ? <Overlay loader={true} /> : null}
			{apiError ? (
				<Error message={apiError.message} action={errorProcess} />
			) : null}
		</>
	);
};

export default ItemDetail;
