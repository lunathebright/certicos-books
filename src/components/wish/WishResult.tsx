import None from "../common/None";
import ListItem from "../common/ListItem";
import type { KakaoBook } from "../../types/kakao";

interface Props {
  data: KakaoBook[];
}

export default function WishResult({ data }: Props) {
  return (
    <>
      {data.length === 0 ? (
        <None text="찜한 책이 없습니다." />
      ) : (
        <>
          {data.map((book) => (
            <ListItem data={book} key={book.isbn} />
          ))}
        </>
      )}
    </>
  );
}
