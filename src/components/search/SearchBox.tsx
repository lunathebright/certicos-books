import { useState } from "react";
import searchIcon from "/src/assets/icons/search.svg";
import SearchHistory from "./SearchHistory";
import SearchDetail from "./SearchDetail";

export default function SearchBox() {
  const [hasHistory, setHasHistory] = useState(false);
  const [isSearchDetailOpem, setIsSearchDetailOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClickSearch = () => {
    if (inputValue === "") return;
    // search
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };

  return (
    <div className="flex gap-[16px] items-center pb-5">
      <div className="relative">
        <img
          src={searchIcon}
          alt="검색"
          className="absolute top-1/2 -translate-y-1/2 left-2.5"
        />
        <input
          onChange={onChangeInput}
          onKeyDown={onKeyDown}
          value={inputValue}
          className={`w-[480px] py-2.5 pr-2.5 pl-12 bg-lightGrey text-textSubtitle ${
            hasHistory ? "rounded-t-[22px]" : "rounded-[22px]"
          } placeholder:text-caption placeholder:text-textSubtitle`}
          placeholder="검색어를 입력하세요"
        />
        {hasHistory && <SearchHistory />}
      </div>
      <div className="relative">
        <button
          onClick={onClickSearch}
          className="p-[10px] border border-textSubtitle rounded-[8px] text-body2 text-textSubtitle"
        >
          상세검색
        </button>
        {isSearchDetailOpem && <SearchDetail />}
      </div>
    </div>
  );
}
