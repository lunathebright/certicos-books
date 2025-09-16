import { useEffect, useState } from "react";
import None from "../common/None";
import ListItem from "../common/ListItem";
import type { KakaoBook } from "../../types/kakao";
import { wishStorage } from "../../data/constants/wish";

interface Props {
  data: KakaoBook[];
  detailData: KakaoBook[];
}

export default function SearchResult({ data, detailData }: Props) {
  const [wishes, setWishes] = useState<KakaoBook[]>([]);

  useEffect(() => {
    localStorage.setItem(wishStorage, JSON.stringify(wishes));
  }, [wishes]);

  useEffect(() => {
    const wishes = localStorage.getItem(wishStorage);
    if (wishes) {
      setWishes(JSON.parse(wishes));
    }
  }, []);
  return (
    <>
      {data.length === 0 && detailData.length === 0 ? (
        <None text="검색된 결과가 없습니다." />
      ) : (
        <>
          {(detailData.length > 0 ? detailData : data).map((book) => (
            <ListItem
              data={book}
              setWishes={setWishes}
              isWished={!!wishes.find((item) => item.isbn === book.isbn)}
              key={book.isbn}
            />
          ))}
        </>
      )}
    </>
  );
}
