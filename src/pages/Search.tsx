import { useState } from "react";
import Layout from "../components/common/Layout";
import SearchBox from "../components/search/SearchBox";
import SearchResult from "../components/search/SearchResult";
import { navItems } from "../data/constants/nav";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getBooks } from "../api/books";
import type { TSearchTarget } from "../types";
import { detailItems } from "../data/constants/search";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [searchTarget, setSearchTarget] = useState<TSearchTarget>(
    detailItems[0].id as TSearchTarget
  );
  const [detailKeyword, setDetailKeyword] = useState("");

  const queryClient = useQueryClient();

  const { data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["books"],
    queryFn: ({ pageParam = 1 }) => getBooks(keyword, pageParam),
    enabled: false,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      pages.flatMap((p) => p.documents).length < lastPage.meta.total_count
        ? pages.length + 1
        : undefined,
  });

  const {
    data: detailData,
    refetch: refetchDetail,
    fetchNextPage: fetchNextDetailPage,
    hasNextPage: hasNextDetail,
  } = useInfiniteQuery({
    queryKey: ["booksDetail"],
    queryFn: ({ pageParam = 1 }) =>
      getBooks(detailKeyword, pageParam, searchTarget),
    enabled: false,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      pages.flatMap((p) => p.documents).length < lastPage.meta.total_count
        ? pages.length + 1
        : undefined,
  });

  const handleSearch = async (isDetail: boolean) => {
    if (isDetail) {
      queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] === "booksDetail",
      });
      await refetchDetail();
    } else {
      queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] === "books",
      });
      await refetch();
    }
  };

  const books = data?.pages.flatMap((p) => p.documents) || [];
  const detailBooks = detailData?.pages.flatMap((p) => p.documents) || [];

  return (
    <Layout title={navItems.search.name}>
      <>
        <SearchBox
          keyword={keyword}
          setKeyword={setKeyword}
          handleSearch={handleSearch}
          detailKeyword={detailKeyword}
          setDetailKeyword={setDetailKeyword}
          searchTarget={searchTarget}
          setSearchTarget={setSearchTarget}
        />
        <p>
          도서 검색 결과 &nbsp;&nbsp; 총{" "}
          <span className="text-primary">
            {data?.pages[0]?.meta.total_count ||
              detailData?.pages[0]?.meta.total_count ||
              0}
          </span>
          건
        </p>
      </>
      <SearchResult
        data={books.length > 0 ? books : detailBooks}
        fetchNextPage={books.length > 0 ? fetchNextPage : fetchNextDetailPage}
        hasMore={books.length > 0 ? !!hasNextPage : !!hasNextDetail}
      />
    </Layout>
  );
}
