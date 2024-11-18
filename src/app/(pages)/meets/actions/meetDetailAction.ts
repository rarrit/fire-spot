"use server";

import { createClient } from "@/_utils/supabase/server";
import { MeetWithCamp } from "../types/meet.types";
import supabaseRpc from "@/_utils/supabase/supabase.rpc";

const getMeetDetail = async ({
  meetId
}: {
  meetId: string;
}): Promise<MeetWithCamp | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc(supabaseRpc.meet.getMeetDetail, {
    meet_id: Number(meetId)
  });

  if (error || !data) {
    return null;
  }

  const typedData = data as unknown as MeetWithCamp;

  // typedData.meet.attendee_count = typedData.attendee_count;

  return { ...typedData };
};

export { getMeetDetail };
