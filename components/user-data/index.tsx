import style from "./user-data.module.scss";

const UserData = ({ name, value }: { name: string; value: string }) => {
  return (
    <div className={style.user_data}>
      <div>{name}</div>
      <div>{value}</div>
    </div>
  );
};

export default UserData;
