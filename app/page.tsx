"use client";

import ProfileDisplays from "./components/ProfileDisplays";
import SideBar from "./components/SideBar";
import { useState } from "react";
import { Profile, profileTable, Filter } from "./Types/types";
import { supabase } from "./utils/supabase";
import { pages } from "next/dist/build/templates/app-page";

export default function Home() {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const [filter, setFilter] = useState<Filter>({
    gender: { filMale: false, filFemale: false, filOther: false },
    experience_level: {
      filBeginner: false,
      filIntermediate: false,
      filAdvanced: false,
    },
  });

  const readProfiles = async () => {
    const { data, error } = await supabase.from(profileTable).select();

    if (error) {
      alert(`ERROR ${error.code}:\n${error.message}`);
    } else {
      setProfiles(data);
    }
  };

  const handleFilter = (fil: Filter) => {
    setFilter(fil);
    console.log(pages);
  };

  return (
    <div className="flex">
      <div>
        <SideBar onFetchProfiles={readProfiles} onFilterChange={handleFilter} />
      </div>
      <div>
        <ProfileDisplays profiles={profiles} filter={filter} />
      </div>
    </div>
  );
}
