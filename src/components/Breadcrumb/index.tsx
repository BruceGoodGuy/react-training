import React from "react";
import { Breadcrumb as BreadcrumbFB, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items = [],
  className = "",
}) => {
  return (
    <BreadcrumbFB aria-label="breadcrumb" className={className + " mb-4"}>
      <BreadcrumbItem href={"/"} icon={HiHome}>
        Home
      </BreadcrumbItem>
      {items &&
        items.length > 0 &&
        items.map((item, idx) =>
          item.href && !item.active ? (
            <BreadcrumbItem key={idx} href={item.href}>
              {item.label}
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem key={idx}>{item.label}</BreadcrumbItem>
          )
        )}
    </BreadcrumbFB>
  );
};

export default Breadcrumb;
