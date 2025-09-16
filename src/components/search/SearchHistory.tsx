import closeIcon from "/src/assets/icons/close.svg";

interface Props {
  searchHistory: string[];
  setSearchHistory: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function SearchHistory({
  searchHistory,
  setSearchHistory,
}: Props) {
  const onClickDelete = (keyword: string) => {
    const newHistory = searchHistory.filter((item) => item !== keyword);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  return (
    <ul className="absolute w-full pl-12 pb-2 bg-lightGrey rounded-b-[22px] text-textSubtitle text-caption">
      {searchHistory.map((history, idx) => (
        <li className="flex items-center justify-between py-4 pr-6" key={idx}>
          <p className="w-5/6 truncate">{history}</p>
          <button onClick={() => onClickDelete(history)}>
            <img src={closeIcon} alt="삭제" />
          </button>
        </li>
      ))}
    </ul>
  );
}
