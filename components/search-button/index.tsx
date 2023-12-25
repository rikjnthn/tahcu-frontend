import { ButtonType } from "@/interface";
import style from "./search-button.module.scss";

const SearchButton = ({ onClick, fill, title }: ButtonType) => {
  return (
    <button
      onClick={onClick}
      className={`icon ${style.search_button}`}
      type="button"
      title={title}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.2814 5.52623C19.1693 8.41414 19.1693 13.0964 16.2814 15.9843C13.3935 18.8722 8.71123 18.8722 5.82332 15.9843C2.93541 13.0964 2.93541 8.41414 5.82332 5.52623C8.71123 2.63832 13.3935 2.63832 16.2814 5.52623ZM7.13058 14.677C9.29651 16.8429 12.8082 16.8429 14.9741 14.677C17.14 12.5111 17.14 8.99941 14.9741 6.83348C12.8082 4.66755 9.29651 4.66755 7.13058 6.83348C4.96465 8.99941 4.96465 12.5111 7.13058 14.677Z"
          fill={fill}
        />
        <rect
          x="14.6756"
          y="16.1112"
          width="2.21849"
          height="8.87395"
          rx="1.10924"
          transform="rotate(-45 14.6756 16.1112)"
          fill={fill}
        />
      </svg>
    </button>
  );
};

export default SearchButton;
