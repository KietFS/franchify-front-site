import Checkbox from "@/components/atom/Checkbox";
import React, { useState } from "react";

interface IFilterFacetsProps {
  title: string;
  facets: Array<{
    id: number | string;
    name: string;
    count?: number;
  }>;
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
}

const FilterFacets: React.FC<IFilterFacetsProps> = ({
  facets,
  title,
  selectedIds,
  setSelectedIds,
}) => {
  const handleFacetChange = (id: string, checked: boolean) => {
    let newSelectedIds: string[];
    if (checked) {
      newSelectedIds = [...selectedIds, id];
    } else {
      newSelectedIds = selectedIds.filter((selectedId) => selectedId !== id);
    }
    setSelectedIds(newSelectedIds);
  };

  return (
    <div className="flex flex-col gap-y-2 border-b border-b-gray-300 py-8">
      <h3 className="mb-4 text-[18px] font-semibold text-secondary-900">
        {title}
      </h3>
      {facets.map((facet) => (
        <Checkbox
          key={facet.id}
          label={facet.name}
          subLabel={facet?.count !== undefined ? `(${facet.count})` : undefined}
          checkboxProps={{
            checked: selectedIds.includes(String(facet.id)),
            onClick: (event) => {
              const checked = (event.target as HTMLInputElement).checked;
              handleFacetChange(String(facet.id), checked);
            },
          }}
        />
      ))}
    </div>
  );
};

export default FilterFacets;
