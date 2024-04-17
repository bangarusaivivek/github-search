import React from "react";
import { RepoCardProps } from "./typings";
import { formatTime } from "../../../../helpers";

const RepoCard = (props: RepoCardProps) => {
  const { data, onBtnClick } = props;
  const {
    stargazers_count,
    description,
    html_url,
    private: isPrivate,
    language,
    forks,
    name,
    updated_at,
  } = data;

  return (
    <div
      className="border border-gray-300 rounded-md p-4 w-full max-w-screen-md"
      style={{ height: "fit-content" }}
      role="article"
      aria-label={`Repository: ${name}`}
    >
      <div className="flex justify-between items-center">
        <div className="mb-[4px] flex-grow">
          <a
            className="mr-[4px] text-blue-600 no-underline text-base font-semibold inline-block"
            href={html_url}
          >
            {name}
          </a>
          <span
            className="border border-gray-300 rounded-[32px] inline-block text-[12px] font-medium leading-[18px] px-[8px] ml-[4px] mb-[4px]"
            aria-label={isPrivate ? "Private Repository" : "Public Repository"}
          >
            {isPrivate ? "Private" : "Public"}
          </span>
          <p className="mb-[16px] text-gray-600 break-all pr-[24px]">
            {description || ""}
          </p>
        </div>
        <button
          className="bg-blue-600 text-white text-sm rounded-md px-[16px] text-[16px] h-[36px] font-semibold"
          onClick={onBtnClick}
        >
          Deploy
        </button>
      </div>
      <div className="text-[12px] text-gray-600 flex flex-row items-center">
        {language && (
          <span
            className="mr-[16px] inline-flex"
            aria-label={`Language: ${language}`}
          >
            <span className="bg-yellow-600 relative top-1 inline-block w-[12px] h-[12px] border border-gray-300 rounded-full z-[-1]"></span>
            <span className="ml-[4px]">{language}</span>
          </span>
        )}
        <span
          className="mr-[16px] inline-flex"
          aria-label={`Stars: ${stargazers_count}`}
        >
          <img src={"/icons/star.svg"} alt="Star Icon" />
          <span className="ml-[4px]">{stargazers_count || 0}</span>
        </span>
        <span className="mr-[16px] inline-flex" aria-label={`Forks: ${forks}`}>
          <img src={"/icons/fork.svg"} alt="Fork Icon" />
          <span className="ml-[4px]">{forks || 0}</span>
        </span>
        <span
          className="mr-[16px] inline-flex"
          aria-label={`UpdatedAt: ${updated_at}`}
        >
          <span>{formatTime(updated_at)}</span>
        </span>
      </div>
    </div>
  );
};

export default RepoCard;
