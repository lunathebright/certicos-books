import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function Layout({ title, children }: Props) {
  return (
    <main className="w-[960px] mx-auto pt-20 pb-60">
      <h2 className="text-title2 pb-5">{title}</h2>
      <section>{children}</section>
    </main>
  );
}
