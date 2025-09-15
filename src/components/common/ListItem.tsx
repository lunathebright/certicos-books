import { useState } from "react";
import Button from "./base/Button";
import arrow from "/src/assets/icons/arrowDown.svg";

export default function ListItem() {
  const [isOpen, setIsOpen] = useState(false);

  const onClickViewDetail = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <li
      className={`flex justify-between gap-[56px] w-[960px] mt-[9px] pl-[48px] pr-[16px]
    border-b border-b-[#d2d6da]
    ${isOpen ? "h-[344px] pt-[24px] pb-[40px]" : "h-[100px]"}`}
    >
      <div className={`flex flex-1 ${!isOpen && "items-center"}`}>
        <div className="flex-shrink-0">
          <img
            alt=""
            className={`${
              isOpen ? "w-[210px] h-[280px]" : "w-[48px] h-[68px]"
            }`}
          />
          {/* wish icon */}
        </div>
        <div className={`${isOpen ? "ml-[32px] pt-[20px]" : "ml-[48px]"}`}>
          <div className="flex items-center">
            <p className="text-title3">노르웨이의 숲</p>
            <p className="text-body2 text-textSecondary ml-[16px]">
              무라카미 하루키
            </p>
          </div>
          {isOpen && (
            <div>
              <p className="pt-[16px] pb-[12px] text-body2bold">책 소개</p>
              <p className="text-small">
                “나를 언제까지나 잊지 마, 내가 여기 있었다는 걸 기억해 줘.”
                하루키 월드의 빛나는 다이아몬드 무라카미 하루키를 만나기 위해
                가장 먼저 읽어야 할 책! 페이지를 처음 펼치는 오늘의 젊음들에게,
                그리고 오랜 기억 속에 책의 한 구절을 간직하고 있는 어제의
                젊음들에게, 한결같은 울림으로 예민하고 섬세한 청춘의 감성을
                전하며 영원한 필독서로 사랑받고 있는 무라카미 하루키의 대표작
                『노르웨이의 숲』. 1989년 『상실의 시대』라는 제명으로 처음
                출간된 이래 우리 출판 사상 최장기 베스트셀러를 기록하며 하나의
                사건으로 남은 소설, 『노르웨이의 숲』이 민음사 세계문학전집에
                이어 단행본으로 출간되었다.
              </p>
            </div>
          )}
        </div>
      </div>
      <div
        className={`flex 
        ${isOpen ? "relative flex-col items-end" : "items-center"}`}
      >
        <div
          className={`${
            isOpen && "absolute bottom-[82px] flex flex-col items-end"
          }`}
        >
          {isOpen && (
            <p className="flex items-center gap-[8px] text-title3 font-light">
              <span className="text-small pt-[2px] text-textSubtitle">
                원가
              </span>
              16,000원
            </p>
          )}
          <p
            className={`text-title3 ${
              isOpen
                ? "mt-[8px] flex items-center gap-[8px] text-title3"
                : "mr-[56px]"
            }`}
          >
            {isOpen && (
              <span className="text-small pt-[2px] text-textSubtitle">
                할인가
              </span>
            )}
            13,300원
          </p>
        </div>
        <div
          className={`flex
          ${
            isOpen
              ? "flex-col-reverse items-end justify-between h-full"
              : "items-center gap-[8px] "
          }`}
        >
          <div className={`${isOpen && "w-[240px]"}`}>
            <Button isFullWidth={true}>구매하기</Button>
          </div>
          <Button
            onClick={onClickViewDetail}
            variant="secondary"
            className="w-[115px]"
          >
            <div className="flex gap-[5px]">
              <p>상세보기</p>
              <img
                src={arrow}
                alt=""
                role="presentation"
                className={`${isOpen && "rotate-180"}`}
              />
            </div>
          </Button>
        </div>
      </div>
    </li>
  );
}
