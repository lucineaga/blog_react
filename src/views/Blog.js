import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import { useState, UseEffet, useEffect } from "react";
import "./Blog.css";
import Footer from "../common/Footer";
import { addToWishlist } from "../helpers";

function Blog() {
	const params = useParams();

	const [post, setPost] = useState(null);
	const [user, setUser] = useState(null);
	const [comments, setComments] = useState(null);

	const getBlog = async (blogId) => {
		const responseData = await fetch(
			"https://jsonplaceholder.typicode.com/posts/" + blogId
		);
		const apiPosts = await responseData.json();
		setPost(apiPosts);
	};

	const getUser = async (userId) => {
		const responseData = await fetch(
			"https://jsonplaceholder.typicode.com/users/" + userId
		);
		const apiUser = await responseData.json();
		setUser(apiUser);
	};

	const getComments = async (userId) => {
		const responseData = await fetch(
			"https://jsonplaceholder.typicode.com/comments?postId=1" + commentsId
		);
		const apiComments = await responseData.json();
		setUser(apiComments);
	};

	useEffect(() => {
		if (post && post.userId) {
			getUser(post.userId);
		}
		if (post && post.id) {
			getComments(post.id);
		}
	}, [post]);

	useEffect(() => {
		if (params && params.blogId) {
			getBlog(params.blogId);
		}
	});

	return (
		<>
			<Container className='mb-4'>
				{post && user ? (
					<>
						<Row>
							<img
								className='post_cover'
								src={`https://picsum.photos/seed/${post.id}/2000`}
							/>
						</Row>
						<Row>
							<h1> {post.title}</h1>
							<h3 style={{ minHeight: "500px" }}> {post.body}</h3>
							<Button
								className='mt-4 mb-4'
								onClick={() => {
									addToWishlist(post);
								}}>
								Add to wish List
							</Button>
						</Row>
						<Row>
							<div className='author_container mt-4'>
								<img src={`https://robohash.org/${user.id}.png?set=set4`} />
								<div className='mt-2'>
									<h3> {user.name}</h3>
									<h4>{user.emai}</h4>
									<h4>{user.website}</h4>
								</div>
							</div>
						</Row>
					</>
				) : (
					<div>Loading...</div>
				)}
				{comments && (
					<>
						<h2>Comentarii</h2>
						{comments.map((comment) => {
							return (
								<Row className='mt-2 p-2'>
									<h4>{comments.name}</h4>
									<p>{comments.body}</p>
								</Row>
							);
						})}
						;
					</>
				)}
			</Container>
			<Footer />
		</>
	);
}

export default Blog;
