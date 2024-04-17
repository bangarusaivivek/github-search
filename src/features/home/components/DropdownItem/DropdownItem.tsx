import React, { useCallback } from "react";
import { DropdownItemProps } from "./typings";

const DropdownItem = (props: DropdownItemProps) => {
  const { data, onItemClick, isSelected } = props;
  const { html_url, full_name } = data;

  const handleItemClick = useCallback(() => {
    onItemClick(data);
  }, [data, onItemClick]);

  return (
    <div
      className="w-full flex flex-row items-center min-h-[40px] pl-[16px] rounded-r-[20px] hover:bg-gray-200"
      style={{ background: isSelected ? "#e5e7eb" : "transparent" }}
      onClick={handleItemClick}
      tabIndex={0}
    >
      <img src="/icons/github.svg" alt="" height="20px" width="20px" />
      <div className="mr-[4px] ml-[16px] text-[14px] font-bold whitespace-no-wrap">
        {full_name}
      </div>
      <span>-</span>
      <div className="ml-[4px] text-[14px] font-bold text-blue-600 whitespace-no-wrap">
        {" "}
        {html_url}
      </div>
    </div>
  );
};

export default DropdownItem;
