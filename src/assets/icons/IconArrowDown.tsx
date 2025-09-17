interface Props {
  size?: string;
  iconColor?: string;
}

export default function IconArrowDown({
  size = "10px",
  iconColor = "#B1B8C0",
}: Props) {
  return (
    <div
      className="relative aspect-square"
      style={{ width: size, height: size }}
    >
      <div
        className="absolute bottom-0 left-0 translate-x-[50%] w-[2px] h-full -rotate-45"
        style={{ backgroundColor: iconColor }}
      />
      <div
        className="absolute bottom-0 right-0 -translate-x-[50%] w-[2px] h-full rotate-45"
        style={{ backgroundColor: iconColor }}
      />
    </div>
  );
}
