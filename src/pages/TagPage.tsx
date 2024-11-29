import { FC, useState, useEffect } from "react";
import "../css/meta.scss";
import { EditModal, Overlay, Error } from "../components/";
import { useQuery, ApolloError } from "@apollo/client";
import { GET_TAGS } from "../app/graphql";
import { IoAddCircle } from "react-icons/io5";

const TagPage: FC = () => {
	const { loading, error, data } = useQuery(GET_TAGS);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [apiLoading, setApiLoading] = useState<boolean>(false);
	const [apiError, setApiError] = useState<ApolloError | undefined>(undefined);
	const [tags, setTags] = useState<Array<TagType>>([]);

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
			setTags([]);
		} else if (error) {
			setApiLoading(false);
			setApiError(error);
			setTags([]);
		} else {
			setApiLoading(false);
			setApiError(undefined);
			setTags(data.tags);
		}
	}, [loading, error, data]);

	return (
		<section>
			<h2>Tags</h2>
			<ul className="meta_list">
				{tags.map((tag) => (
					<li key={tag.id}>{tag.name}</li>
				))}
			</ul>
			{showModal ? (
				<EditModal action={() => setShowModal(false)} type="TAG" />
			) : null}
			{apiLoading ? <Overlay loader={true} /> : null}
			{apiError ? (
				<Error message={apiError.message} action={errorProcess} />
			) : null}
			<div className="float_btn" onClick={() => setShowModal(true)}>
				<IoAddCircle />
			</div>
		</section>
	);
};

export default TagPage;
