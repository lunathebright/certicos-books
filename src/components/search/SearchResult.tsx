import { useEffect, useRef } from "react";
import None from "../common/None";
import ListItem from "../common/ListItem";
import type { KakaoBook } from "../../types/kakao";

interface Props {
  data: KakaoBook[];
  fetchNextPage: () => void;
  hasMore: boolean;
}

export default function SearchResult({ data, fetchNextPage, hasMore }: Props) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!lastItemRef.current || !hasMore) return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observerRef.current.observe(lastItemRef.current);

    return () => observerRef.current?.disconnect();
  }, [data, hasMore, fetchNextPage]);

  return (
    <>
      {data.length === 0 ? (
        <None text="검색된 결과가 없습니다." />
      ) : (
        <>
          {data.map((book) => (
            <div key={book.isbn}>
              <ListItem data={book} key={book.isbn} />
            </div>
          ))}
          <div ref={lastItemRef} className="mt-48"></div>
        </>
      )}
    </>
  );
}
