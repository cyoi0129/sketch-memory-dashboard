import { FC, useState, useEffect } from "react";
import "../css/modal.scss";
import { ApolloError, useMutation } from "@apollo/client";
import { ADD_AUTHOR, ADD_TAG } from "../app/graphql";
import { Overlay, Error } from "./";
import { IoCloseOutline } from "react-icons/io5";

const EditModal: FC<ModalProps> = (props) => {
	const { action, type } = props;
	const [apiLoading, setApiLoading] = useState<boolean>(false);
	const [apiError, setApiError] = useState<ApolloError | undefined>(undefined);
	const [name, setName] = useState<string>("");
	const [birth, setBirth] = useState<number>(0);

	/**
	 * Reload while error
	 */
	const errorProcess = (): void => {
		location.reload();
	};

	/**
	 * Change birth year
	 * @param value 
	 */
	const changeBirth = (value: string): void => {
		const result = Number(
			value.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s: string) => {
				return String.fromCharCode(
					s.replace(/[^0-9]/g, "").charCodeAt(0) - 0xfee0
				);
			})
		);
		setBirth(result);
	};

	/**
	 * Check validation
	 * @returns 
	 */
	const checkValidation = (): boolean => {
		const current = new Date().getFullYear();
		if (type === "AUTHOR") {
			return name !== "" && birth < current && birth > current - 100;
		} else {
			return name !== "";
		}
	};

	const saveGql = type === "AUTHOR" ? ADD_AUTHOR : ADD_TAG;

	const [postProcess, { data, loading, error }] = useMutation(saveGql);

	/**
	 * Save process
	 */
	const doSave = (): void => {
		postProcess({
			variables: {
				name: name,
				birth: birth,
			},
		});
		action();
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
		}
	}, [loading, error, data]);

	return (
		<>
			<div className="modal">
				<div>
					<h3>{type === "AUTHOR" ? "Author" : "Tag"} </h3>
					<dl>
						<dt>Name</dt>
						<dd>
							<input
								name="name"
								type="text"
								autoComplete="off"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</dd>
						{type === "AUTHOR" ? (
							<>
								<dt>Birth</dt>
								<dd>
									<input
										name="name"
										type="text"
										inputMode="numeric"
										autoComplete="off"
										value={birth}
										onChange={(e) => changeBirth(e.target.value)}
									/>
								</dd>
							</>
						) : null}
					</dl>
					<button disabled={!checkValidation()} onClick={doSave}>
						Save
					</button>
				</div>
			</div>
			<div className="close_login" onClick={() => action()}>
				<IoCloseOutline />
			</div>
			<Overlay loader={apiLoading} />
			{apiError ? (
				<Error message={apiError.message} action={errorProcess} />
			) : null}
		</>
	);
};

export default EditModal;
