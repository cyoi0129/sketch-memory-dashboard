import { FC, useState, useEffect } from "react";
import { UPDATE_ITEM, ADD_ITEM } from "../app/graphql";
import { ApolloError, useMutation } from "@apollo/client";
import { Overlay, Error } from ".";
import "../css/item.scss";
import { IoCloudUpload } from "react-icons/io5";
import { uploadMedia } from "../app/firebase";

const ItemEditor: FC<ItemDataProps> = (props) => {
	const { item, tagList, authorList } = props;
	const [apiLoading, setApiLoading] = useState<boolean>(false);
	const [apiError, setApiError] = useState<ApolloError | undefined>(undefined);
	const [title, setTitle] = useState<string>(item.title);
	const [date, setDate] = useState<string>(item.date);
	const [status, setStatus] = useState<string>(item.status);
	const [author, setAuthor] = useState<string>(item.author);
	const [tags, setTags] = useState<Array<string>>(item.tags);
	const [image, setImage] = useState<string>(item.image);

	/**
	 * Change tags
	 * @param target
	 */
	const changeTags = (target: string): void => {
		let tempTags = tags;
		if (tags.includes(target)) {
			tempTags = tempTags.filter((tag) => tag !== target);
		} else {
			tempTags.push(target);
		}
		setTags(tempTags.sort());
	};

	/**
	 * Upload image
	 * @param event
	 * @returns
	 */
	const uploadImage = async (
		event: React.ChangeEvent<HTMLInputElement>
	): Promise<void> => {
		const files = event.currentTarget.files;
		if (!files || files?.length === 0) return;
		const file = files[0];
		const result = await uploadMedia(file);
		setImage(result.url);
	};

	/**
	 * Reload while error
	 */
	const errorProcess = (): void => {
		location.reload();
	};

	const saveGql = item.id ? UPDATE_ITEM : ADD_ITEM;

	const [postProcess, { data, loading, error }] = useMutation(saveGql);

	/**
	 * Save process
	 */
	const doSave = (): void => {
		postProcess({
			variables: {
				id: item.id,
				title: title,
				image: image,
				date: date,
				status: status,
				author: author,
				tags: tags,
			},
		});
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

	useEffect(() => {
		setTitle(item.title);
		setDate(item.date);
		setStatus(item.status);
		setAuthor(item.author);
		setTags(item.tags);
		setImage(item.image);
	}, [item]);

	return (
		<section>
			<h2>Item</h2>
			<div className="item_edit">
				<dl>
					<dt>Title</dt>
					<dd>
						<input
							name="title"
							type="text"
							autoComplete="off"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</dd>
					<dt>Date</dt>
					<dd>
						<input
							name="date"
							type="date"
							autoComplete="off"
							value={date.slice(0, 10)}
							onChange={(e) => setDate(e.target.value)}
						/>
					</dd>
					<dt>Status</dt>
					<dd className="status_item">
						<div>
							<input
								id="public"
								name="status"
								type="radio"
								value="PUBLIC"
								checked={status === "PUBLIC"}
								onChange={(e) => setStatus(e.target.value)}
							/>
							<label htmlFor="public">Public</label>
						</div>
						<div>
							<input
								id="draft"
								name="status"
								type="radio"
								value="DRAFT"
								checked={status === "DRAFT"}
								onChange={(e) => setStatus(e.target.value)}
							/>
							<label htmlFor="draft">Draft</label>
						</div>
					</dd>
					<dt>Author</dt>
					<dd>
						<select
							name="author"
							defaultValue={author}
							onChange={(e) => setAuthor(e.target.value)}
						>
							{authorList.map((author) => (
								<option key={author.id} value={author.id}>
									{author.name}
								</option>
							))}
						</select>
					</dd>
					<dt>Tags</dt>
					<dd className="tag_item">
						{tagList.map((tag) => (
							<div key={tag.id}>
								<input
									id={`tag_${tag.id}`}
									name="tags"
									type="checkbox"
									value={tag.id}
									defaultChecked={tags.includes(tag.id)}
									onChange={(e) => changeTags(e.target.value)}
								/>
								<label htmlFor={`tag_${tag.id}`}>{tag.name}</label>
							</div>
						))}
					</dd>
					<dt>Image</dt>
					<dd className="image_edit">
						<div className="upload">
							<label htmlFor="image">
								<IoCloudUpload />
							</label>
							<input
								id="image"
								type="file"
								name="image"
								accept="image/png, image/jpeg"
								onChange={(e) => uploadImage(e)}
							/>
						</div>
						<div className="image">
							<img src={`/images/${image}`} alt={title} />
						</div>
					</dd>
				</dl>
				<button onClick={doSave}>Save</button>
			</div>
			{apiLoading ? <Overlay loader={true} /> : null}
			{apiError ? (
				<Error message={apiError.message} action={errorProcess} />
			) : null}
		</section>
	);
};

export default ItemEditor;
