import { RepositoryData } from "../../../../store/Home/typings";

export interface DropdownItemProps {
  data: RepositoryData;
  onItemClick: (data: RepositoryData) => void;
  isSelected: boolean;
}
