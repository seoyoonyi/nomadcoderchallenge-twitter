import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import useMutation from "@/lib/client/useMutation";
import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";

const TweetDetail = () => {
  const router = useRouter();

  const {
    data,
    mutate: boundMutate,
    isValidating,
  } = useSWR(router.query.id ? `/api/tweets/${router.query.id}` : null);
  const [toggleLike] = useMutation(`/api/tweets/${router.query.id}/like`);

  const handleLike = async () => {
    if (!data) return;
    boundMutate(
      (prev: { likes: boolean }) => prev && { ...prev, likes: !prev.likes },
      false
    );
    toggleLike({});
  };

  return (
    <div className="max-w-2xl min-h-screen px-6 mx-auto">
      <div className="flex justify-between w-full h-20 py-2">
        <div className="flex items-center h-full py-4 ">
          <div className="h-full">
            <Link href="/">
              <ArrowLeft className="w-full h-full stroke-zinc-400" />
            </Link>
          </div>
          <p className="ml-5 text-xl font-bold ">트윗</p>
        </div>
      </div>
      <div className="max-w-2xl py-8 mx-auto">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 mr-3 bg-gray-300 rounded-full">
            <User className="w-full h-full p-2 stroke-zinc-400" />
          </div>
          <p className="text-xl">{data?.tweet.user.name}</p>
        </div>
        {isValidating ? (
          <p>Loading...</p>
        ) : (
          <>
            {data && data.tweet && (
              <>
                <p className="mt-5 mb-2 text-xl">{data.tweet.text}</p>
                <button
                  className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md`}
                  onClick={handleLike}
                >
                  {data?.likes ? "Unlike" : "Like"}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TweetDetail;
