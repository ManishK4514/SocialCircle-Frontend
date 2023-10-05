import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { getAllComment, handleDelete } from "utlis/HandleCommentApi";
import MyComment from "./MyComment"
import Comment from "./Comment"
import "./PostWidget.css"

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  userProfilePicture,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [comment, setComment] = useState([]);
  const [commentId, setCommentId] = useState("");
  const { palette } = useTheme();
  const isDarkTheme = palette.mode === 'dark';
  const baseUrl = process.env.REACT_APP_SOCIAL_CIRCLE_BACKEND;

  const primary = palette.primary.main

  const patchLike = async () => {
    const response = await fetch(`${baseUrl}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getAllComment(setComment, token, postId);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const updateMode = (_id, commentBody) => {
    setIsUpdating(true);
    setCommentBody(commentBody);    
    setCommentId(_id);
  }

  return (
    <WidgetWrapper mb="2rem">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      {description && (
        <p>{description}</p>
      )}
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={picturePath}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <button className={`user-interaction-btn ${isDarkTheme ? 'dark-mode' : 'light-mode'}`} onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </button>
            <span>{likeCount}</span>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <button className={`user-interaction-btn ${isDarkTheme ? 'dark-mode' : 'light-mode'}`} onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </button>
            <span>{comment.length}</span>
          </FlexBetween>
        </FlexBetween>

        <button className={`user-interaction-btn ${isDarkTheme ? 'dark-mode' : 'light-mode'}`} >
          <ShareOutlined />
        </button>
      </FlexBetween>

      {isComments && (
        <div className="comment-div">
          <div className="user-comment-input">
            <MyComment 
              location={location} 
              picturePath={userProfilePicture} 
              postId={postId}  
              commentBody={commentBody}
              setCommentBody={setCommentBody}
              isUpdating={isUpdating}
              setIsUpdating={setIsUpdating}
              commentId={commentId}
              setComment={setComment}
            />
          </div>
          <hr className="divider" />
          <div>
            <div mt="0.5rem">
              {comment.map(({
                _id,
                postId,
                userId,
                firstName,
                lastName,
                location,
                description,
                userPicturePath,
                likes,
              }) => (
                <Comment
                  key={_id}
                  commentUserId={userId}
                  picturePath={userPicturePath}
                  location={location}
                  comment={description}
                  name={`${firstName} ${lastName}`}
                  likes={likes}
                  handleDelete={() => handleDelete(_id, token, setComment)}
                  updateMode={() => updateMode(_id, description)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
