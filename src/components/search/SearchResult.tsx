import { useState } from "react";
import None from "../common/None";
import ListItem from "../common/ListItem";

export default function SearchResult() {
  const [list, setList] = useState([1]);

  return (
    <>
      {list.length === 0 ? (
        <None text="검색된 결과가 없습니다." />
      ) : (
        <>
          {[...Array(10)].map((_, idx) => (
            <ListItem key={idx} />
          ))}
        </>
      )}
    </>
  );
}
