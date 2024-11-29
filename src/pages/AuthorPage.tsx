import { FC, useState, useEffect } from "react";
import "../css/meta.scss";
import { EditModal, Overlay, Error } from "../components/";
import { useQuery, ApolloError } from "@apollo/client";
import { GET_AUTHORS } from "../app/graphql";
import { IoAddCircle } from "react-icons/io5";

const AuthorPage: FC = () => {
	const { loading, error, data } = useQuery(GET_AUTHORS);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [apiLoading, setApiLoading] = useState<boolean>(false);
	const [apiError, setApiError] = useState<ApolloError | undefined>(undefined);
	const [authors, setAuthors] = useState<Array<AuthorType>>([]);

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
			setAuthors([]);
		} else if (error) {
			setApiLoading(false);
			setApiError(error);
			setAuthors([]);
		} else {
			setApiLoading(false);
			setApiError(undefined);
			setAuthors(data.authors);
		}
	}, [loading, error, data]);

	return (
		<section>
			<h2>Authors</h2>
			<ul className="meta_list">
				{authors.map((author) => (
					<li key={author.id}>{author.name}</li>
				))}
			</ul>
			{showModal ? (
				<EditModal action={() => setShowModal(false)} type="AUTHOR" />
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

export default AuthorPage;
