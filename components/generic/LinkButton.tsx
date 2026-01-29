import Link from "next/link";
import { Button } from "../ui/button";
import { ReactNode } from "react";

export const LinkButton = ({
  children,
  link,
  className,
  target,
}: {
  target?: string;
  children: ReactNode;
  link: string;
  className?: string;
}) => {
  return (
    <Link target={target} href={link}>
      <Button className={`cursor-pointer ${className}`}>{children}</Button>
    </Link>
  );
};
