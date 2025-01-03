import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Button, Col, Image, Nav, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ProfilePostCard from "./ProfilePostCard";
import { fetchPostsByUser } from "../features/posts/postsSlice";

export default function ProfileMidBody() {
    const url =
        "https://pbs.twimg.com/profile_banners/778858153597218816/1642245520/1500x500";
    const pic =
        "https://scontent.fkul15-1.fna.fbcdn.net/v/t39.30808-6/467872696_10234665840285759_3352548463293303266_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=A0GZteeyM2EQ7kNvgHv4u_D&_nc_zt=23&_nc_ht=scontent.fkul15-1.fna&_nc_gid=AVVwolhxl_V_yTD6oT6pnTr&oh=00_AYABOKo2Em8TFiq1b1eRmn9B1dcK-GhWaD-j_WTsViK8eA&oe=677BDF68";

    const posts = useSelector((state) => state.posts.posts);
    const loading = useSelector((state) => state.posts.loading);

    //useEffect(() => {
    //    const token = localStorage.getItem("authToken");
    //    if (token) {
    //        const decodedToken = jwtDecode(token);
    //        const userId = decodedToken.id;
    //        dispatch(fetchPostsByUser(userId));
    //    }
    //}, [dispatch]);

    return (
        <Col sm={6} className="bg-light" style={{ border: "1px solid lightgrey" }}>
            <Image src={url} fluid />
            <br />
            <Image
                src={pic}
                roundedCircle
                style={{
                    width: 150,
                    position: "absolute",
                    top: "140px",
                    border: "4px solid #F8F9FA",
                    marginLeft: 15,
                }}
            />

            <Row className="justify-content-end">
                <Col xs="auto">
                    <Button className="rounded-pill mt-2" variant="outline-secondary">
                        Edit Profile
                    </Button>
                </Col>
            </Row>

            <p
                className="mt-5"
                style={{ margin: 0, fontWeight: "bold", fontSize: "15px" }}
            >
                Shauqi
            </p>
            <p style={{ marginBottom: "2px" }}>@ahmad.shauqi</p>
            <p>
                I help people switch careers to be a software developer at
                sigmaschool.co
            </p>
            <p>Entrepreneur</p>
            <p>
                <strong>271</strong> Following <strong>610</strong> Followers
            </p>
            <Nav variant="underline" defaultActiveKey="/home" justify>
                <Nav.Item>
                    <Nav.Link eventKey="/home">Tweets</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Replies</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Highlights</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3">Media</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-4">Likes</Nav.Link>
                </Nav.Item>
            </Nav>
            {loading && (
                <Spinner animation="border" className="ms-3 mt-3" variant="primary" />
            )}
            {posts.map((post) => (
                <ProfilePostCard
                    key={post.id}
                    content={post.content}
                    postId={post.id}
                />
            ))}
        </Col>
    );
}
