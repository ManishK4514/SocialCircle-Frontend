import axios from "axios";

const baseUrl = "https://socialcircle-backend.onrender.com";

const getAllComment = (setComment, token, postId) => {
    axios
        .get(`${baseUrl}/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            setComment(res.data);
        })
        .catch((err) => console.log(err));
};

const handleDelete = async (_id, token, setComment) => {
    axios({
        method: "DELETE",
        url: `${baseUrl}/posts/${_id}/delete`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            id: _id,
        },
        data: {
            _id: _id,
        },
    })
        .then((data) => {
            getAllComment(setComment);
        })
        .catch((err) => console.log(err));
};

const handleUpdate = async (commentId, token, commentBody, setCommentBody, setComment, setIsUpdating) => {
    axios({
        method: "PATCH",
        url: `${baseUrl}/posts/${commentId}/update`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            id: commentId,
        },
        data: {
            _id: commentId,
            description: commentBody,
        },
    })
        .then((data) => {
            setCommentBody("");
            setIsUpdating(false);
            getAllComment(setComment);            
        })
        .catch((err) => console.log(err));
};

export { getAllComment, handleDelete, handleUpdate };
