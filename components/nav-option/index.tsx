import Image from "next/image";
import style from "./nav-option.module.scss";

const NavOption = ({
  icon,
  name,
  onClick,
}: {
  icon: string;
  name: string;
  onClick?: React.MouseEventHandler;
}) => {
  return (
    <div onClick={onClick} className={style.nav_option}>
      <Image src={`/${icon}`} alt={name} width={15} height={15} />
      <span>{name}</span>
    </div>
  );
};

export default NavOption;
