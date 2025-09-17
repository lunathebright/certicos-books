import { useEffect, useState } from "react";
import Button from "./base/Button";
import arrow from "/src/assets/icons/arrowDown.svg";
import type { KakaoBook } from "../../types/kakao";
import { breakLines } from "../../utils";
import likeFill from "/src/assets/icons/likeFill.svg";
import likeLine from "/src/assets/icons/likeLine.svg";
import { storage_wish } from "../../data/constants/wish";

interface Props {
  data: KakaoBook;
}

export default function ListItem({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isWished, setIsWished] = useState(false);

  const onClickViewDetail = () => {
    setIsOpen((prev) => !prev);
  };

  const onClickWish = () => {
    const storageItems = localStorage.getItem(storage_wish);
    let wishes: KakaoBook[] = storageItems ? JSON.parse(storageItems) : [];

    if (isWished) {
      wishes = wishes.filter((book) => book.isbn !== data.isbn);
      setIsWished(false);
    } else {
      wishes.unshift(data);
      setIsWished(true);
    }

    localStorage.setItem(storage_wish, JSON.stringify(wishes));
  };

  const onClickBuy = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const wishes = localStorage.getItem(storage_wish);
    if (wishes) {
      const parsedWishes: KakaoBook[] = JSON.parse(wishes) as KakaoBook[];
      setIsWished(parsedWishes.some((book) => book.isbn === data.isbn));
    }
  }, [data.isbn]);

  return (
    <li
      className={`flex justify-between gap-[56px] w-[960px] mt-[9px] pl-[48px] pr-[16px]
    border-b border-b-[#d2d6da]
    ${isOpen ? "h-[344px] pt-[24px] pb-[40px]" : "h-[100px]"}`}
    >
      <div className={`flex flex-1 ${!isOpen && "items-center"}`}>
        <div className="relative flex-shrink-0">
          <img
            src={data.thumbnail || undefined}
            alt={`${data.title} thumbnail`}
            className={`${
              isOpen ? "w-[210px] h-[280px]" : "w-[48px] h-[68px]"
            }`}
          />
          <button
            onClick={onClickWish}
            className={`absolute aspect-square
              ${
                isOpen
                  ? "w-[24px] top-[4px] right-[4px]"
                  : "w-[16px] top-[1.5px] right-[2px]"
              }`}
          >
            <img
              src={isWished ? likeFill : likeLine}
              className="w-full h-full"
            />
          </button>
        </div>
        <div className={`${isOpen ? "ml-[32px] pt-[20px]" : "ml-[48px]"}`}>
          <div className="flex items-center">
            <p className="text-title3">{data.title}</p>
            <p className="text-body2 text-textSecondary ml-[16px]">
              {data.authors.join(", ")}
            </p>
          </div>
          {isOpen && (
            <div>
              <p className="pt-[16px] pb-[12px] text-body2bold">책 소개</p>
              <div className="flex flex-col gap-2 text-small">
                {breakLines(data.contents)}
              </div>
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
          {isOpen && data.sale_price > 0 && (
            <p className="flex items-center gap-[8px] text-title3 font-light">
              <span className="text-small pt-[2px] text-textSubtitle">
                원가
              </span>
              <span className="line-through">
                {data.price.toLocaleString()}
              </span>
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
                {data.sale_price > 0 ? "할인가" : "원가"}
              </span>
            )}
            <span>
              {(data.sale_price > 0
                ? data.sale_price
                : data.price
              ).toLocaleString()}
            </span>
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
            <Button onClick={() => onClickBuy(data.url)} isFullWidth={true}>
              구매하기
            </Button>
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
