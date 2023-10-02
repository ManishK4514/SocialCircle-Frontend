import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import "./Comment.css";

const Comment = ({ name, commentUserId, picturePath, location, comment, likes, updateMode, handleDelete}) => {
    const navigate = useNavigate();
    const { palette } = useTheme();
    const isDarkTheme = palette.mode === 'dark';
    const baseUrl = "https://socialcircle-backend.onrender.com";

    return (
        <div className="comment-container">
            <div className="comment-user-div">
                <div className="comment-user-image">
                    <img className="profile-picture" src={`${baseUrl}/assets/${picturePath}`} alt="pic" srcset="" />
                </div>
                <div
                    className={`comment-user-details ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}
                >
                    <div className="user-details-comment-accociated">
                        <div
                            className={`comment-username ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}
                            onClick={() => {
                                navigate(`/profile/${commentUserId}`);
                                navigate(0);
                            }}
                        >
                            {name}
                        </div>
                        <div className="Friend-occupation">
                            {location}
                        </div>
                    </div>

                    <div className="comment-update-icons">
                        <button className={`user-interaction-btn ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}>
                            <BiEdit onClick={updateMode} ></BiEdit>
                        </button>
                        <button className={`user-interaction-btn ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}>
                            <AiFillDelete
                                onClick={handleDelete}
                            ></AiFillDelete>
                        </button>

                    </div>

                </div>
            </div>
            <div className="user-comment-div">
                <div className="comment-user-image">
                </div>
                <div
                    className={`comment-para-details ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}
                >
                    <div>
                        <p >{comment}</p>
                    </div>

                </div>
            </div>

            <hr className="divider" />
        </div>
    );
};

export default Comment;
