import None from "../common/None";
import ListItem from "../common/ListItem";
import type { KakaoBook } from "../../types/kakao";

interface Props {
  data: KakaoBook[];
}

export default function SearchResult({ data }: Props) {
  return (
    <>
      {data.length === 0 ? (
        <None text="검색된 결과가 없습니다." />
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
