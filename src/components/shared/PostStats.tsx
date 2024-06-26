"use client";
import { Models } from "appwrite";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  useSavePost,
  useDeleteSavedPost,
  useGetCurrentUser,
  useJoinEvent,
} from "@/lib/react-query/queries";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const location = usePathname();
  const router = useRouter();

  const [isSaved, setIsSaved] = useState(false);

  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();
  const { mutate: joinEvent } = useJoinEvent();

  const savedPostRecord =
    currentUser?.save?.find(
      (record: Models.Document) => record.post?.$id === post.$id
    ) || null;

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser, savedPostRecord]);

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavePost(savedPostRecord.$id);
    }

    savePost({ userId: userId, postId: post.$id });
    setIsSaved(true);
  };

  const handleJoinEvent = () => {
    joinEvent({ postId: post.$id, userId: userId });
    router.push(`/posts/${post.$id}`);
  };

  const containerStyles = location.startsWith("/profile") ? "w-full" : "";

  return (
    <div
      className={`z-20 flex items-center justify-between ${containerStyles}`}
    >
      <div className="flex gap-2">
        <Image
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="share"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={(e) => handleSavePost(e)}
        />
      </div>

      {post.maxParticipants > 0 && (
        <Button onClick={handleJoinEvent}>Join Event</Button>
      )}
    </div>
  );
};

export default PostStats;
