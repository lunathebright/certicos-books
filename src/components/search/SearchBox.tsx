import { useState } from "react";
import searchIcon from "/src/assets/icons/search.svg";
import SearchHistory from "./SearchHistory";
import SearchDetail from "./SearchDetail";
import type { TSearchTarget } from "../../types";
import { detailItems } from "../../data/constants/search";

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
  const [hasHistory, setHasHistory] = useState(false);
  const [isSearchDetailOpem, setIsSearchDetailOpen] = useState(false);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onEnterSearch = () => {
    if (!keyword) return;
    if (detailKeyword) {
      setDetailKeyword("");
      setSearchTarget(detailItems[0].id as TSearchTarget);
    }
    handleSearch();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnterSearch();
    }
  };

  const onClickDetailSearch = () => {
    setIsSearchDetailOpen(true);
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
          value={keyword}
          className={`w-[480px] py-2.5 pr-2.5 pl-12 bg-lightGrey text-textSubtitle ${
            hasHistory ? "rounded-t-[22px]" : "rounded-[22px]"
          } placeholder:text-caption placeholder:text-textSubtitle`}
          placeholder="검색어를 입력하세요"
        />
        {hasHistory && <SearchHistory />}
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
          />
        )}
      </div>
    </div>
  );
}
