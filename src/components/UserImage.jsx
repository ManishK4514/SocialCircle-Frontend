import "./UserComponents.css";

const UserImage = ({ image }) => {
  const baseUrl = "https://socialcircle-backend.onrender.com";

  return (
    <div className="img-container">
      <img
        className="profile-pic"
        alt="user"
        src={`${baseUrl}/assets/${image}`}
      />
    </div>
  );
};

export default UserImage;
