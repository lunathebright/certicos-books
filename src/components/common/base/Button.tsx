import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  isFullWidth?: boolean;
  size?: "s" | "m";
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  isFullWidth = false,
  size = "m",
  className = "",
  ...props
}: Props) {
  const variants = {
    primary: "bg-primary text-white",
    secondary: "bg-lightGrey text-textSecondary",
  };

  const sizes = {
    s: "py-[6px] px-[10px] text-[14px]",
    m: "py-[16px] px-[28px] text-[16px]",
  };

  return (
    <button
      {...props}
      className={`${variants[variant]} ${sizes[size]}
      ${isFullWidth && "w-full"}
      rounded-[8px] flex justify-center items-center
      ${className} truncate`}
    >
      {children}
    </button>
  );
}
