interface Props {
  size?: string;
  iconColor?: string;
}

export default function IconSearch({
  size = "20px",
  iconColor = "#222",
}: Props) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        className="absolute w-[85%] h-[85%] rounded-full border-2"
        style={{ borderColor: iconColor }}
      />
      <div
        className="absolute bottom-0 right-0 w-[2px] h-[40%] -rotate-45 -translate-x-[3px] translate-y-[1.5px]"
        style={{ backgroundColor: iconColor }}
      />
    </div>
  );
}
