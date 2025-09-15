import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function Layout({ title, children }: Props) {
  return (
    <main className="border w-1/2 min-w-[600px] max-w-[945px] mx-auto pt-20">
      <h2 className="text-title2 pb-5">{title}</h2>
      <section>{children}</section>
    </main>
  );
}
