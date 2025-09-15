import bookImg from "/src/assets/images/book.png";

interface Props {
  text?: string;
}

export default function None({ text = "" }: Props) {
  return (
    <div className="flex justify-center items-center py-[120px]">
      <div className="flex flex-col items-center gap-[24px]">
        <img
          src={bookImg}
          alt=""
          role="presentation"
          className="w-[80px] aspect-square"
        />
        <p className="text-caption text-textSecondary">{text}</p>
      </div>
    </div>
  );
}
