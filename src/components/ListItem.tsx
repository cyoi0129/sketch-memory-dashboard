import { FC } from "react";
import { Link } from "react-router-dom";
import { IoPerson, IoCalendar } from "react-icons/io5";

const ListItem: FC<ItemProps> = (props) => {
	const { data } = props;

	return (
		<li>
			<Link to={`/item/${data.id}`}>
				<div className="image">
					<img src={`/images/${data.image}`} alt={data.title} />
				</div>
				<h3>{data.title}</h3>
				<div className="meta">
					<div className="author">
						<IoPerson />
						{data.author.name}
					</div>
					<div className="date">
						<IoCalendar />
						{data.date.slice(0, 10).replace(/-/g, "/")}
					</div>
				</div>
				<div className={data.status === "PUBLIC"? "status public" : "status draft"}>{data.status}</div>
			</Link>
		</li>
	);
};

export default ListItem;
