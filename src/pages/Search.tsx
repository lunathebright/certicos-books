import { useState } from "react";
import Layout from "../components/common/Layout";
import SearchBox from "../components/search/SearchBox";
import SearchResult from "../components/search/SearchResult";
import { navItems } from "../data/constants/nav";
import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../api/books";

export default function Search() {
  const [keyword, setKeyword] = useState("");

  const { data, refetch } = useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(keyword),
    enabled: false,
  });

  return (
    <Layout title={navItems.search.name}>
      <>
        <SearchBox
          keyword={keyword}
          setKeyword={setKeyword}
          handleSearch={refetch}
        />
        <p>
          도서 검색 결과 &nbsp;&nbsp; 총{" "}
          <span className="text-primary">{data?.meta.total_count}</span>건
        </p>
      </>
      <SearchResult data={data?.documents || []} />
    </Layout>
  );
}
