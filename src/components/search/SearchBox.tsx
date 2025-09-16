import { useEffect, useRef, useState } from "react";
import searchIcon from "/src/assets/icons/search.svg";
import SearchHistory from "./SearchHistory";
import SearchDetail from "./SearchDetail";
import type { TSearchTarget } from "../../types";
import { detailItems, historyStorage } from "../../data/constants/search";

interface Props {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
  detailKeyword: string;
  setDetailKeyword: React.Dispatch<React.SetStateAction<string>>;
  searchTarget: TSearchTarget;
  setSearchTarget: React.Dispatch<React.SetStateAction<TSearchTarget>>;
  refetchDetail: () => void;
}

export default function SearchBox({
  keyword,
  setKeyword,
  handleSearch,
  detailKeyword,
  setDetailKeyword,
  searchTarget,
  setSearchTarget,
  refetchDetail,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isSearchDetailOpem, setIsSearchDetailOpen] = useState(false);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleHistory = () => {
    const history = [
      keyword,
      ...searchHistory.filter((history) => history !== keyword),
    ].slice(0, 8);
    localStorage.setItem("searchHistory", JSON.stringify(history));

    return history;
  };

  const onEnterSearch = () => {
    if (!keyword) return;
    if (detailKeyword) {
      setDetailKeyword("");
      setSearchTarget(detailItems[0].id as TSearchTarget);
    }

    const updatedHistory = handleHistory();
    handleSearch();

    setSearchHistory(updatedHistory);
    localStorage.setItem(historyStorage, JSON.stringify(updatedHistory));

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

  const handleBlurHistory = (event: MouseEvent) => {
    if (
      inputContainerRef.current &&
      !inputContainerRef.current.contains(event.target as Node)
    ) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    const history = localStorage.getItem(historyStorage);
    if (history) setSearchHistory(JSON.parse(history));

    document.addEventListener("mousedown", handleBlurHistory);

    return () => document.removeEventListener("mousedown", handleBlurHistory);
  }, []);

  return (
    <div className="flex gap-[16px] items-center pb-5">
      <div ref={inputContainerRef} className="relative">
        <img
          src={searchIcon}
          alt="검색"
          className="absolute top-1/2 -translate-y-1/2 left-2.5"
        />
        <input
          onChange={onChangeInput}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
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
            refetchDetail={refetchDetail}
            setKeyword={setKeyword}
            setIsSearchDetailOpen={setIsSearchDetailOpen}
          />
        )}
      </div>
    </div>
  );
}
