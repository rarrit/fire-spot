"use client";
import {
  getFollowerData,
  getFollowingData,
  getUserProfileAll
} from "@/_utils/service/followService";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import FollowCard from "./FollowCard";
import {
  QK_FOLLOWER_USER_PROFILE,
  QK_FOLLOWING_USER_PROFILE,
  QK_USER_PROFILE_ALL
} from "@/_utils/api/queryKeys/followQueryKeys";

type FollowFormProps = {
  loginUserId: string;
  profileUser: string;
};

const FollowForm = ({ loginUserId, profileUser }: FollowFormProps) => {
  const [isFollower, setIsFollower] = useState(true);

  const { data: follower, isError: followerError } = useSuspenseQuery({
    queryKey: QK_FOLLOWER_USER_PROFILE(profileUser),
    queryFn: () => getFollowerData(profileUser),
    staleTime: 0
  });

  const { data: following, isError: followingError } = useSuspenseQuery({
    queryKey: QK_FOLLOWING_USER_PROFILE(profileUser),
    queryFn: () => getFollowingData(profileUser),
    staleTime: 0
  });

  // 유저 프로필을 가져오는 쿼리
  const { data: userProfileAll } = useSuspenseQuery({
    queryKey: QK_USER_PROFILE_ALL(profileUser),
    queryFn: () => getUserProfileAll(),
    staleTime: 0
  });

  const followerUser = follower?.map((user) => user.following_id) || [];
  const followingUser = following?.map((user) => user.follower_id) || [];

  const matchingFollowerProfiles = userProfileAll?.filter((profile) =>
    followerUser.includes(profile.id)
  );
  const matchingFollowingProfiles = userProfileAll?.filter((profile) =>
    followingUser.includes(profile.id)
  );

  if (followerError) return <div>팔로워 에러</div>;
  if (followingError) return <div>팔로잉 에러</div>;

  return (
    <div className="follow_form">
      <div className="item-center flex justify-between">
        <h2 className="text-[18px] font-bold">
          {isFollower ? "팔로워 목록" : "팔로잉 목록"}
        </h2>
        <ul className="flex items-center">
          <li className="li-before-line relative mr-[8px] pr-[8px]">
            <button
              onClick={() => setIsFollower(true)}
              className={`${isFollower && "active color-[#000] font-bold"} text-[14px] text-[#bfbfbf]`}
            >
              팔로워보기
            </button>
          </li>
          <li>
            <button
              onClick={() => setIsFollower(false)}
              className={`${!isFollower && "active color-[#000] font-bold"} text-[14px] text-[#bfbfbf]`}
            >
              팔로잉보기
            </button>
          </li>
        </ul>
      </div>
      <ul className="mt-[40px] flex flex-wrap items-center gap-[30px] max-1280:gap-[15px]">
        {isFollower ? (
          <>
            {/* 팔로워 */}
            {matchingFollowingProfiles?.map((profile) => {
              return (
                <li
                  key={profile.id}
                  className="w-full max-w-[calc(20%-24px)] rounded-[12px] px-[25px] py-[30px] shadow-custom max-1280:max-w-[calc(25%-12px)] max-767:max-w-[calc(50%-8px)]"
                >
                  <FollowCard loginUserId={loginUserId} profile={profile} />
                </li>
              );
            })}
          </>
        ) : (
          <>
            {/* 팔로잉 */}
            {matchingFollowerProfiles?.map((profile) => {
              return (
                <li
                  key={profile.id}
                  className="w-full max-w-[calc(20%-24px)] rounded-[12px] px-[25px] py-[30px] shadow-custom max-1280:max-w-[calc(25%-12px)] max-767:max-w-[calc(50%-8px)]"
                >
                  <FollowCard loginUserId={loginUserId} profile={profile} />
                </li>
              );
            })}
          </>
        )}
      </ul>
    </div>
  );
};

export default FollowForm;
