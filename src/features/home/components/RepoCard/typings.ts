import { RepositoryData } from "../../../../store/Home/typings";

export interface RepoCardProps {
  data: RepositoryData;
  onBtnClick?: () => void;
}
