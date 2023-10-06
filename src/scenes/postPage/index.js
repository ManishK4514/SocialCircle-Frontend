import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import PostWidget from "scenes/widgets/PostWidget";
import UserWidget from "scenes/widgets/UserWidget";

const PostPage = () => {
    const [user, setUser] = useState(null);    
    const token = useSelector((state) => state.token);
    const { _id, picturePath } = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const loggedInUserId = useSelector((state) => state.user._id);
    const baseUrl = process.env.REACT_APP_SOCIAL_CIRCLE_BACKEND;
    const post = JSON.parse(localStorage.getItem("singlePost"));

    const getUser = async () => {
        const response = await fetch(`${baseUrl}/users/${post.userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) return null;

    return (
        <div>
            <Navbar />
            <div
                className="profile-container"
                style={{
                    display: isNonMobileScreens ? "flex" : "block",
                }}
            >
                {isNonMobileScreens && (
                    <div style={{ flexBasis: "26%" }}>
                        <UserWidget
                            userId={post.userId}
                            picturePath={user.picturePath}
                        />
                        <div style={{ margin: "2rem 0" }} />
                        <FriendListWidget userId={post.userId} />
                    </div>
                )}
                <div
                    style={{
                        flexBasis: isNonMobileScreens ? "42%" : undefined,
                        marginTop: isNonMobileScreens ? undefined : "2rem",
                    }}
                >
                    <PostWidget
                        key={post._id}
                        postId={post._id}
                        postUserId={post.userId}
                        name={`${post.firstName} ${post.lastName}`}
                        description={post.description}
                        location={post.location}
                        picturePath={post.picturePath}
                        userPicturePath={post.userPicturePath}
                        likes={post.likes}
                        comments={post.comments}
                        userProfilePicture={post.userProfilePicture}
                        loggedUserId={loggedInUserId}
                    />
                </div>
            </div>
        </div>
    );
};

export default PostPage;
