import IconClose from "../../assets/icons/IconClose";
import { detailItems } from "../../data/constants/search";
import type { TSearchTarget } from "../../types";
import Button from "../common/base/Button";

interface Props {
  detailKeyword: string;
  setDetailKeyword: React.Dispatch<React.SetStateAction<string>>;
  searchTarget: TSearchTarget;
  setSearchTarget: React.Dispatch<React.SetStateAction<TSearchTarget>>;
  handleSearch: (isDetail: boolean) => void;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setIsSearchDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchDetail({
  detailKeyword,
  setDetailKeyword,
  searchTarget,
  setSearchTarget,
  handleSearch,
  setKeyword,
  setIsSearchDetailOpen,
}: Props) {
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailKeyword(e.target.value);
  };

  const onChagneSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchTarget(e.target.value as TSearchTarget);
  };

  const onClickSearch = () => {
    if (!detailKeyword) return;
    setKeyword("");
    handleSearch(true);
    setIsSearchDetailOpen(false);
  };

  const onClickClose = () => {
    setIsSearchDetailOpen(false);
    setDetailKeyword("");
    setSearchTarget(detailItems[0].id as TSearchTarget);
  };

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[calc(100%+10px)] w-[360px] h-[160px]
    px-[24px] py-[36px] bg-white rounded-[8px] shadow-[0px_4px_14px_6px_rgba(151,151,151,0.15)]"
    >
      <div className="flex gap-[4px] pt-[4px] pb-[16px]">
        <select
          value={searchTarget}
          onChange={onChagneSelect}
          className="w-[100px] pb-1.5 border-b border-b-[#d2d6da] text-[14px]"
        >
          {detailItems.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          value={detailKeyword}
          onChange={onChangeInput}
          placeholder="검색어 입력"
          className="w-full pl-[9px] pb-1.5 border-b border-b-primary text-caption text-[14px]"
        />
      </div>
      <Button onClick={onClickSearch} size="s" isFullWidth={true}>
        검색하기
      </Button>
      <button className="absolute top-[8px] right-[8px]" onClick={onClickClose}>
        <IconClose iconColor="#B1B8C0" />
      </button>
    </div>
  );
}
