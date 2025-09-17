import { useEffect, useState } from "react";
import searchIcon from "/src/assets/icons/search.svg";
import SearchHistory from "./SearchHistory";
import SearchDetail from "./SearchDetail";
import type { TSearchTarget } from "../../types";
import { detailItems, storage_search } from "../../data/constants/search";

interface Props {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (isDetail: boolean) => void;
  detailKeyword: string;
  setDetailKeyword: React.Dispatch<React.SetStateAction<string>>;
  searchTarget: TSearchTarget;
  setSearchTarget: React.Dispatch<React.SetStateAction<TSearchTarget>>;
}

export default function SearchBox({
  keyword,
  setKeyword,
  handleSearch,
  detailKeyword,
  setDetailKeyword,
  searchTarget,
  setSearchTarget,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isSearchDetailOpem, setIsSearchDetailOpen] = useState(false);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setIsFocused(true);
  };

  const updateHistory = (keyword: string) => {
    setSearchHistory((prev) => {
      const newHistory = [
        keyword,
        ...prev.filter((history) => history !== keyword),
      ].slice(0, 8);
      localStorage.setItem(storage_search, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const cleanDetailKeyword = () => {
    setDetailKeyword("");
    setSearchTarget(detailItems[0].id as TSearchTarget);
  };

  const onEnterSearch = () => {
    if (!keyword) return;

    if (detailKeyword) cleanDetailKeyword();
    updateHistory(keyword);
    handleSearch(false);
    setIsFocused(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnterSearch();
    }
  };

  const onClickDetailSearch = () => {
    setIsSearchDetailOpen(true);
  };

  const onFocus = () => {
    if (searchHistory.length !== 0) setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    const history = localStorage.getItem(storage_search);
    if (history) setSearchHistory(JSON.parse(history));
  }, []);

  return (
    <div className="flex gap-[16px] items-center pb-5">
      <div onFocus={onFocus} onBlur={onBlur} className="relative">
        <img
          src={searchIcon}
          alt="검색"
          className="absolute top-1/2 -translate-y-1/2 left-2.5"
        />
        <input
          onChange={onChangeInput}
          onKeyDown={onKeyDown}
          value={keyword}
          className={`w-[480px] py-2.5 pr-2.5 pl-12 bg-lightGrey text-textSubtitle ${
            isFocused && searchHistory.length !== 0
              ? "rounded-t-[22px]"
              : "rounded-[22px]"
          } placeholder:text-caption placeholder:text-textSubtitle`}
          placeholder="검색어를 입력하세요"
        />
        {isFocused && searchHistory.length !== 0 && (
          <SearchHistory
            searchHistory={searchHistory}
            setSearchHistory={setSearchHistory}
            setKeyword={setKeyword}
          />
        )}
      </div>
      <div className="relative">
        <button
          onClick={onClickDetailSearch}
          className="p-[10px] border border-textSubtitle rounded-[8px] text-body2 text-textSubtitle"
        >
          상세검색
        </button>
        {isSearchDetailOpem && (
          <SearchDetail
            detailKeyword={detailKeyword}
            setDetailKeyword={setDetailKeyword}
            searchTarget={searchTarget}
            setSearchTarget={setSearchTarget}
            handleSearch={handleSearch}
            setKeyword={setKeyword}
            setIsSearchDetailOpen={setIsSearchDetailOpen}
          />
        )}
      </div>
    </div>
  );
}
