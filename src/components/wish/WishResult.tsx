import { useState } from "react";
import None from "../common/None";
import ListItem from "../common/ListItem";

export default function WishResult() {
  const [list, setList] = useState([]);

  return (
    <>
      {list.length === 0 ? (
        <None text="찜한 책이 없습니다." />
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
