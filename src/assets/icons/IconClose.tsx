interface Props {
  size?: string;
  iconColor?: string;
  boxClasses?: string;
  iconClasses?: string;
  ariaLabel?: string;
}

export default function IconClose({
  size = "20px",
  iconColor = "#222",
  boxClasses,
  iconClasses,
  ariaLabel,
}: Props) {
  const boxStyles = `w-[${size}] ${boxClasses}`;

  const iconStyles = `before:border-t-[${iconColor}] after:border-t-[${iconColor}] ${iconClasses}`;

  return (
    <div
      className={`relative ${boxStyles} aspect-square
    before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 
    before:w-full before:rotate-45 before:border-t-2 
    after:content-[''] after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 
    after:w-full after:-rotate-45 after:border-t-2 ${iconStyles}`}
      aria-label={ariaLabel ? ariaLabel : "닫기"}
    />
  );
}
