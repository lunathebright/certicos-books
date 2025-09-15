import Layout from "../components/common/Layout";
import SearchBox from "../components/search/SearchBox";
import { navItems } from "../data/constants/nav";

export default function Search() {
  return (
    <Layout title={navItems.search.name}>
      <>
        <SearchBox />
        <p>
          도서 검색 결과 &nbsp;&nbsp; 총 <span className="text-primary">0</span>
          건
        </p>
      </>
    </Layout>
  );
}
