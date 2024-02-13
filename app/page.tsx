"use client";

import ProfileDisplays from "./components/ProfileDisplays";
import SideBar from "./components/SideBar";
import { useState } from "react";
import { Profile, profileTable, Filter } from "./Types/types";
import { supabase } from "./utils/supabase";

export default function Home() {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const [filter, setFilter] = useState<Filter>({
    gender: { filMale: true, filFemale: false, filOther: false },
    experience_level: {
      filBeginner: false,
      filIntermediate: true,
      filAdvanced: false,
    },
  });

  async function readProfiles() {
    const { data, error } = await supabase.from(profileTable).select();

    if (error) {
      alert(`ERROR ${error.code}:\n${error.message}`);
    } else {
      setProfiles(data);
      console.log(data);
    }
  }

  return (
    <div className="flex">
      <div>
        <SideBar onFetchProfiles={readProfiles} />
      </div>
      <div>
        <ProfileDisplays profiles={profiles} filter={filter} />
      </div>
    </div>
  );
}
