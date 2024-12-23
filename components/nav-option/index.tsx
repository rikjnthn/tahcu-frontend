import Image from "next/image";
import clsx from "clsx";

import style from "./nav-option.module.scss";

const NavOption = ({
  className,
  icon,
  name,
  onClick,
}: {
  className?: string;
  icon: string;
  name: string;
  onClick?: React.MouseEventHandler;
}) => {
  return (
    <div onClick={onClick} className={clsx(style.nav_option, className)}>
      <Image src={`/${icon}`} alt={name} width={15} height={15} />
      <span>{name}</span>
    </div>
  );
};

export default NavOption;
