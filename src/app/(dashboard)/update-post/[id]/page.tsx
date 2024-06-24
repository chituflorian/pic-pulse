"use client";

import PostForm from "@/components/forms/PostForm";
import { useGetPostById } from "@/lib/react-query/queries";
import Loader from "@/components/shared/Loader";

const EditPost = ({ params }: { params: { id: string } }) => {
  const { data: post, isLoading } = useGetPostById(params.id);

  if (isLoading)
    return (
      <div className="flex-center h-full w-full">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start w-full max-w-5xl justify-start gap-3">
          <img src="/assets/icons/edit.svg" width={36} height={36} alt="edit" />
          <h2 className="h3-bold md:h2-bold w-full text-left">Edit Post</h2>
        </div>

        {isLoading ? <Loader /> : <PostForm action="Update" post={post} />}
      </div>
    </div>
  );
};

export default EditPost;
