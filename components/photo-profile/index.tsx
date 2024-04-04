import style from "./photo-profile.module.scss";

const PhotoProfile = ({
  name,
  size,
}: {
  name?: string;
  size: "xl" | "md" | "sm";
}) => {
  if (!name) return;
  return (
    <div
      className={`${style.photo_profile} photo_profile_${size}`}
      title={name}
    >
      {name[0].toUpperCase()}
    </div>
  );
};

export default PhotoProfile;
