import closeIcon from "/src/assets/icons/close.svg";

export default function SearchHistory() {
  const onClickDelete = () => {};
  return (
    <ul className="absolute w-full pl-12 pb-2 bg-lightGrey rounded-b-[22px] text-textSubtitle text-caption">
      {[...Array(3)].map((_, idx) => (
        <li className="flex items-center justify-between py-4 pr-6" key={idx}>
          <p className="w-5/6 truncate">노르웨이숲</p>
          <button onClick={onClickDelete}>
            <img src={closeIcon} alt="삭제" />
          </button>
        </li>
      ))}
    </ul>
  );
}
