"use client";
import { Models } from "appwrite";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  useSavePost,
  useDeleteSavedPost,
  useGetCurrentUser,
} from "@/lib/react-query/queries";
import { usePathname } from "next/navigation";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const location = usePathname();

  const [isSaved, setIsSaved] = useState(false);

  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

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
        <div className="mr-5 flex gap-2">
          <p className="small-medium text-muted-foreground lg:base-medium">
            Max {post.maxParticipants} participants
          </p>
        </div>
      )}
    </div>
  );
};

export default PostStats;
