import React from "react";
import Image from "next/image";
import { Camp } from "../../camps/types/Camp";

interface CampCardProps {
  camp: Camp;
  onSelect: (camp: Camp) => void;
}

export const CampCard: React.FC<CampCardProps> = ({ camp, onSelect }) => {
  const getGroundTypes = () => {
    const groundTypes = {
      잔디: camp.siteBottomCl1,
      파쇄석: camp.siteBottomCl2,
      데크: camp.siteBottomCl3,
      자갈: camp.siteBottomCl4,
      맨흙: camp.siteBottomCl5
    };
    return Object.entries(groundTypes)
      .filter(([_, value]) => Number(value) > 0)
      .map(([type]) => type);
  };

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <button
        onClick={() => onSelect(camp)}
        className="flex w-full flex-row items-start space-x-4"
      >
        <div className="relative h-[110px] w-[110px] flex-shrink-0 overflow-hidden rounded-lg text-left">
          <Image
            src={
              camp.firstImageUrl || "/assets/images/camp/img-camp-default.jpg"
            }
            className="object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
            fill
            sizes="200px"
            alt={camp.facltNm}
          />
          <span className="absolute right-2 top-2 max-w-[80px] truncate rounded bg-white/90 px-2 py-1 text-xs font-medium text-gray-700">
            {camp.doNm}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col space-y-2 text-left">
          <h2 className="truncate text-lg font-bold text-gray-900">
            {camp.facltNm}
          </h2>

          <div className="flex min-w-0 flex-wrap gap-1">
            {camp.sbrsEtc?.split(",").map((tag, index) => (
              <span
                key={index}
                className="max-w-full truncate rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-600"
              >
                {tag.trim()}
              </span>
            ))}
          </div>

          <div className="min-w-0 space-y-1 text-sm text-gray-600">
            <p className="truncate">{camp.addr1}</p>
            <div className="flex min-w-0 items-center space-x-2 text-xs">
              {/* <span className="truncate font-medium text-gray-900">249Km</span> */}
              {/* <span className="h-1 w-1 flex-shrink-0 rounded-full bg-gray-300"></span> */}
              <span className="truncate">{camp.induty}</span>
              {getGroundTypes().map((type) => (
                <React.Fragment key={type}>
                  <span className="h-1 w-1 flex-shrink-0 rounded-full bg-gray-300"></span>
                  <span className="truncate">{type}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};
