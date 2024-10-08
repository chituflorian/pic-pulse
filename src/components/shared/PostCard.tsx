"use client";

import { Models } from "appwrite";

import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";
import PostStats from "./PostStats";
import Link from "next/link";
import { Card } from "../ui/card";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  if (!post.creator) return null;

  if (!post) {
    return null;
  }

  return (
    <Card className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${post.creator.$id}`}>
            <img
              src={
                post.creator?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="w-12 rounded-full lg:h-12"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </p>
            <div className="flex-center text-muted-foreground gap-2">
              <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(post.$createdAt)}
              </p>
              •
              <Link href={post.locationUrl || ""}>
                <p className="subtle-semibold lg:small-regular hover:underline">
                  {post.location}
                </p>
              </Link>
            </div>
          </div>
        </div>

        <Link
          href={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}
        >
          <img
            src={"/assets/icons/edit.svg"}
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </div>

      <Link href={`/posts/${post.$id}`}>
        <div className="flex items-center justify-between">
          <div className="small-medium lg:base-medium py-5">
            <p>{post.caption}</p>
            <ul className="mt-2 flex gap-1">
              {post.tags.map((tag: string, index: string) => (
                <li
                  key={`${tag}${index}`}
                  className="text-muted-foreground small-regular"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
          {post.maxParticipants > 0 && (
            <div className="mr-5 flex gap-2">
              <p className="small-medium text-muted-foreground lg:base-medium">
                Max {post.maxParticipants} participants
              </p>
            </div>
          )}
        </div>

        <img
          src={post.imageUrl || "/assets/images/side-img.svg"}
          alt="post image"
          className="post-card_img"
        />
      </Link>

      <PostStats post={post} userId={user.id} />
    </Card>
  );
};

export default PostCard;
