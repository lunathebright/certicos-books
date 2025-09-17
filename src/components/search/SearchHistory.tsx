import { storage_search } from "../../data/constants/search";
import closeIcon from "/src/assets/icons/close.svg";

interface Props {
  searchHistory: string[];
  setSearchHistory: React.Dispatch<React.SetStateAction<string[]>>;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchHistory({
  searchHistory,
  setSearchHistory,
  setKeyword,
}: Props) {
  const onClickDelete = (keyword: string) => {
    const newHistory = searchHistory.filter((item) => item !== keyword);
    setSearchHistory(newHistory);
    localStorage.setItem(storage_search, JSON.stringify(newHistory));
  };

  const onClickHistory = (keyword: string) => {
    setKeyword(keyword);
  };

  return (
    <ul
      onMouseDown={(e) => e.preventDefault()}
      className="absolute w-full z-10 pl-12 pb-2 bg-lightGrey rounded-b-[22px] text-textSubtitle text-caption"
    >
      {searchHistory.map((history, idx) => (
        <li className="flex items-center justify-between py-4 pr-6" key={idx}>
          <p onClick={() => onClickHistory(history)} className="w-5/6 truncate">
            {history}
          </p>
          <button onClick={() => onClickDelete(history)}>
            <img src={closeIcon} alt="삭제" />
          </button>
        </li>
      ))}
    </ul>
  );
}
