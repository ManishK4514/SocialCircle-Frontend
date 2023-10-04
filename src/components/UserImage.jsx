import "./UserComponents.css";

const UserImage = ({ image }) => {

  return (
    <div className="img-container">
      <img
        className="profile-pic"
        alt="user"
        src={image}
      />
    </div>
  );
};

export default UserImage;
