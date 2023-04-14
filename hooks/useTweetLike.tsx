import useMutation from "@/lib/client/useMutation";
import { useEffect } from "react";
import useSWR from "swr";

const useTweetLike = (tweetId: string | string[]) => {
  const {
    data,
    mutate: boundMutate,
    isValidating,
  } = useSWR(
    tweetId ? `/api/tweets/${tweetId}` : null
    // 초기 데이터를 불러올 때 null 대신에 다른 값을 전달
    // 예: { revalidateOnMount: true }
  );

  const [toggleFav] = useMutation(`/api/tweets/${tweetId}/like`);
  console.log("tweetId", tweetId);
  console.log("커스텀훅스", data);

  const handleLike = async () => {
    if (!data) return;
    // boundMutate 함수를 사용하여 likes 값을 업데이트
    boundMutate((prev: any) => (prev ? { ...prev, likes: !prev.likes } : prev));
    // toggleFav 함수 호출 시 요청에 필요한 데이터 전달
    await toggleFav({ tweetId: data.id }); // 예: tweetId를 요청에 필요한 데이터로 전달
  };

  // const handleLike = () => {
  //   if (!data) return;
  //   boundMutate((prev: any) => prev && { ...prev, likes: !prev.likes }, false);
  //   toggleFav({});
  // };

  return { handleLike, data, isValidating };
};

export default useTweetLike;
