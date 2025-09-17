import None from "../common/None";
import ListItem from "../common/ListItem";
import type { KakaoBook } from "../../types/kakao";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  data: KakaoBook[];
  pageSize: number;
}

export default function WishResult({ data, pageSize }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState<KakaoBook[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const observedRef = useRef<HTMLDivElement | null>(null);

  const getPage = useCallback(
    (pageNumber: number) => {
      const startIdx = (pageNumber - 1) * pageSize;
      const endIdx = startIdx + pageSize;
      const pageItems = data.slice(startIdx, endIdx);

      setList((prev) => [...prev, ...pageItems]);
      setHasMore(endIdx < data.length);
    },
    [data, pageSize]
  );

  useEffect(() => {
    if (!observedRef.current || !hasMore) return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setCurrentPage((prev) => prev + 1);
      }
    });

    observerRef.current.observe(observedRef.current);

    return () => observerRef.current?.disconnect();
  }, [list, hasMore]);

  useEffect(() => {
    getPage(currentPage);
  }, [currentPage, getPage]);

  useEffect(() => {
    setList([]);
    setCurrentPage(1);
    getPage(1);
  }, [data, getPage]);

  return (
    <>
      {data.length === 0 ? (
        <None text="찜한 책이 없습니다." />
      ) : (
        <>
          {list.map((book) => (
            <ListItem data={book} key={book.isbn} />
          ))}
          <div ref={observedRef} className="mt-48"></div>
        </>
      )}
    </>
  );
}
