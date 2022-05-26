import { Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { addToWishlist } from "../../helpers";

function Post({ post }) {
	const [showButton, setShowButton] = useState(false);

	return (
		<Col
			xs='12'
			md='6'
			onMouseEnter={() => {
				setShowButton(true);
			}}
			onMouseLeave={() => {
				setShowButton(false);
			}}>
			<Link
				to={"/blog/" + post.id}
				style={{ textDecoration: "none", color: "black" }}>
				<img
					src={`https://picsum.photos/seed/${post.id}/600`}
					style={{
						heigth: "300px",
						objectFit: "cover",
						width: "100%",
						marginTop: "50px",
					}}
				/>
				<h2>{post.title}</h2>
				<p>{post.body}</p>
			</Link>
			<div style={{ minHeigth: "50px" }}>
				{showButton && (
					<Button
						outline
						onClick={() => {
							addToWishlist(post);
						}}>
						{" "}
						Add to Wishlist
					</Button>
				)}
			</div>
		</Col>
	);
}

export default Post;
