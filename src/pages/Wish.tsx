import Layout from "../components/common/Layout";
import WishResult from "../components/wish/WishResult";
import { navItems } from "../data/constants/nav";

export default function Wish() {
  return (
    <Layout title={navItems.wish.name}>
      <>
        <p>
          찜한 책 &nbsp;&nbsp; 총 <span className="text-primary">0</span>건
        </p>
        <WishResult />
      </>
    </Layout>
  );
}
