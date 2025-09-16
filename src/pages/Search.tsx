import { useState } from "react";
import Layout from "../components/common/Layout";
import SearchBox from "../components/search/SearchBox";
import SearchResult from "../components/search/SearchResult";
import { navItems } from "../data/constants/nav";
import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../api/books";
import type { TSearchTarget } from "../types";
import { detailItems } from "../data/constants/search";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [searchTarget, setSearchTarget] = useState<TSearchTarget>(
    detailItems[0].id as TSearchTarget
  );
  const [detailKeyword, setDetailKeyword] = useState("");

  const { data, refetch } = useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(keyword, 1),
    enabled: false,
  });

  const { data: detailData, refetch: refetchDetail } = useQuery({
    queryKey: ["booksDetail"],
    queryFn: () => getBooks(detailKeyword, 1, searchTarget),
    enabled: false,
  });

  return (
    <Layout title={navItems.search.name}>
      <>
        <SearchBox
          keyword={keyword}
          setKeyword={setKeyword}
          handleSearch={refetch}
          detailKeyword={detailKeyword}
          setDetailKeyword={setDetailKeyword}
          searchTarget={searchTarget}
          setSearchTarget={setSearchTarget}
          refetchDetail={refetchDetail}
        />
        <p>
          도서 검색 결과 &nbsp;&nbsp; 총{" "}
          <span className="text-primary">
            {data?.meta.total_count || detailData?.meta.total_count || 0}
          </span>
          건
        </p>
      </>
      <SearchResult
        data={data?.documents || []}
        detailData={detailData?.documents || []}
      />
    </Layout>
  );
}
