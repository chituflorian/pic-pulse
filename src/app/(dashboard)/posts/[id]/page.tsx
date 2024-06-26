"use client";

import { Button } from "@/components/ui";
import Loader from "@/components/shared/Loader";
import {
  useGetPostById,
  useGetUserPosts,
  useDeletePost,
  useGetEventParticipants, // Importați hook-ul pentru a obține participanții la eveniment
} from "@/lib/react-query/queries";
import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PostStats from "@/components/shared/PostStats";
import GridPostList from "@/components/shared/GridPostList";
import UserCard from "@/components/shared/UserCard"; // Importați UserCard

const PostDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const { user } = useUserContext();

  const { data: post, isLoading } = useGetPostById(params.id);
  const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts(
    post?.creator.$id
  );
  const { data: participants, isLoading: isParticipantsLoading } =
    useGetEventParticipants(params.id); // Obțineți participanții la eveniment
  const { mutate: deletePost } = useDeletePost();

  const relatedPosts = userPosts?.documents.filter(
    (userPost) => userPost.$id !== params.id
  );

  const handleDeletePost = () => {
    deletePost({ postId: params.id, imageId: post?.imageId });
    router.back();
  };

  return (
    <div className="post_details-container">
      <div className="hidden w-full max-w-5xl md:flex">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="shad-button_ghost"
        >
          <img
            src={"/assets/icons/back.svg"}
            alt="back"
            width={24}
            height={24}
          />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
      </div>

      {isLoading || !post ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="creator"
            className="post_details-img"
          />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                href={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    post?.creator.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="h-8 w-8 rounded-full lg:h-12 lg:w-12"
                />
                <div className="flex flex-col gap-1">
                  <p className="base-medium lg:body-bold">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center text-muted-foreground gap-2">
                    <p className="subtle-semibold lg:small-regular ">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    •
                    <Link href={post?.locationUrl || ""}>
                      <p className="subtle-semibold lg:small-regular hover:underline">
                        {post?.location}
                      </p>
                    </Link>
                  </div>
                </div>
              </Link>

              <div className="flex-center gap-4">
                <Link
                  href={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}
                >
                  <img
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ost_details-delete_btn ${
                    user.id !== post?.creator.$id && "hidden"
                  }`}
                >
                  <img
                    src={"/assets/icons/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>

            <hr className="border-border w-full border" />

            <div className="small-medium lg:base-regular flex w-full flex-1 flex-col">
              <p>{post?.caption}</p>
              <ul className="mt-2 flex gap-1">
                {post?.tags.map((tag: string, index: string) => (
                  <li
                    key={`${tag}${index}`}
                    className="text-muted-foreground small-regular"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl">
        <hr className="border-border w-full border" />

        <div className="user-container">
          <h3 className="body-bold md:h3-bold my-10 w-full">Participants</h3>
          {isParticipantsLoading ? (
            <Loader />
          ) : (
            <ul className="user-grid">
              {participants?.map((participant) => (
                <li
                  key={participant?.$id}
                  className="w-full min-w-[200px] flex-1  "
                >
                  <UserCard user={participant} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <h3 className="body-bold md:h3-bold my-10 w-full">
          More Related Posts
        </h3>
        {isUserPostLoading || !relatedPosts ? (
          <Loader />
        ) : (
          <GridPostList posts={relatedPosts} />
        )}
      </div>
    </div>
  );
};

export default PostDetails;
