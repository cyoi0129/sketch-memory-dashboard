import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET_METAS } from "../app/graphql";
import { useQuery, ApolloError } from "@apollo/client";
import { Overlay, Error, ItemEditor, ItemDetail } from "../components/";
import { INIT_ITEM } from "../app/util";

const ItemPage: FC = () => {
	const { id } = useParams();
	const { loading, error, data } = useQuery(GET_METAS);
	const [apiLoading, setApiLoading] = useState<boolean>(false);
	const [apiError, setApiError] = useState<ApolloError | undefined>(undefined);
	const [tagList, setTagList] = useState<Array<TagType>>([]);
	const [authorList, setAuthorList] = useState<Array<AuthorType>>([]);

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
			setTagList([]);
			setAuthorList([]);
		} else if (error) {
			setApiLoading(false);
			setApiError(error);
			setTagList([]);
			setAuthorList([]);
		} else {
			setApiLoading(false);
			setApiError(undefined);
			setTagList(data.tags);
			setAuthorList(data.authors);
		}
	}, [loading, error, data]);

	return (
		<>
			{data && !apiLoading && !apiError ? (
				id && id === "new" ? (
					<ItemEditor
						item={INIT_ITEM}
						tagList={tagList}
						authorList={authorList}
					/>
				) : (
					<ItemDetail
						id={String(id)}
						tagList={tagList}
						authorList={authorList}
					/>
				)
			) : null}
			{apiLoading ? <Overlay loader={true} /> : null}
			{apiError ? (
				<Error message={apiError.message} action={errorProcess} />
			) : null}
		</>
	);
};

export default ItemPage;
