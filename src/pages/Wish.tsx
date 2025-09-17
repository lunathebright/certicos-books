import { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import WishResult from "../components/wish/WishResult";
import { navItems } from "../data/constants/nav";
import type { KakaoBook } from "../types/kakao";
import { storage_wish } from "../data/constants/wish";

export default function Wish() {
  const [list, setList] = useState<KakaoBook[]>([]);

  useEffect(() => {
    const wishes = localStorage.getItem(storage_wish);
    if (wishes) {
      setList(JSON.parse(wishes));
    }
  }, []);

  return (
    <Layout title={navItems.wish.name}>
      <>
        <p>
          찜한 책 &nbsp;&nbsp; 총{" "}
          <span className="text-primary">{list.length || 0}</span>건
        </p>
        <WishResult data={list} />
      </>
    </Layout>
  );
}
