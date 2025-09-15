import { detailItems } from "../../data/constants/search";
import closeIcon from "/src/assets/icons/close.svg";

export default function SearchDetail() {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[calc(100%+10px)] w-[360px] h-[160px]
    px-[24px] py-[36px] bg-white rounded-[8px] shadow-[0px_4px_14px_6px_rgba(151,151,151,0.15)]"
    >
      <div className="flex gap-[4px] pt-[4px] pb-[16px]">
        <select className="w-[100px] pb-1.5 border-b border-b-[#d2d6da] text-[14px]">
          {detailItems.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          placeholder="검색어 입력"
          className="w-full pl-[9px] pb-1.5 border-b border-b-primary text-caption text-[14px]"
        />
      </div>
      <button className="w-full py-[6px] bg-primary rounded-[8px] text-[14px] text-white">
        검색하기
      </button>
      <img
        src={closeIcon}
        alt="닫기"
        className="absolute top-[8px] right-[8px] w-[20px] h-[20px]"
      />
    </div>
  );
}
