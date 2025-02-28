"use client"
import React from "react"
import { BlogImage } from "../bento-grid/icons"
import { DateDash, RightArrow } from "./icons"
import { useQuery } from "@tanstack/react-query"
import { Blog, fetchAllBlogs } from "@/server/api/blogActions"
import { useRouter } from "next/navigation"
import BlogsSkeleton from "./blogs-skeleton"

function Blogs() {
  const router = useRouter()
  const {
    data: blogs,
    isPending,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchAllBlogs,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    // cacheTime: 1000 * 60 * 10, // 10 minutes storage
    refetchOnMount: false, // Prevents refetching on mount
    refetchOnWindowFocus: false, // Prevents refetching when switching tabs
  })

  if (isPending) {
    return <BlogsSkeleton />
  }

  if (error) {
    return (
      <div className="text-red-600 text-center">Error: {error.message}</div>
    )
  }

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "Invalid Date"

    const date = new Date(dateString)
    if (isNaN(date.getTime())) return "Invalid Date" // Handling invalid date strings

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <>
      <section className="flex flex-col px-4 lg:px-12">
        <h1 className="text-center font-orange text-2xl lg:text-3xl xl:text-4xl mb-10">
          Blogs
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {blogs ? (
            (blogs.length > 2 ? blogs.slice(2) : blogs).map(
              (blog: Blog, index) => (
                <div className="flex flex-col w-full" key={index}>
                  <div>
                    {blog?.thumbnail && <BlogImage className="w-full h-full" />}
                  </div>
                  <div className="flex flex-col pt-2">
                    <h1 className="text-2xl font-gilroySemiBold md:text-xl xl:text-2xl">
                      {blog?.title || "Blog title"}
                    </h1>
                    <p className="text-sm font-gilroyMedium leading-5 md:leading-4 xl:text-lg">
                      {blog?.desc
                        ? blog.desc.length > 45
                          ? blog.desc.substring(0, 41) + "..."
                          : blog.desc
                        : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et lacinia mi."}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div
                      className="flex gap-2 items-center justify-center cursor-pointer"
                      onClick={() => {
                        router.push(`/blogs/${blog._id}`)
                      }}
                    >
                      <RightArrow className="w-8 md:w-7 xl:w-10" />
                      <h1 className="text-xs font-gilroySemiBold whitespace-nowrap xl:text-base">
                        Read more
                      </h1>
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                      <span className="text-xs whitespace-nowrap font-gilroyMedium xl:text-sm">
                        {formatDate(blog?.createdAt)}
                      </span>{" "}
                      <DateDash />
                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <span>Blogs Not Found!</span>
          )}
        </div>
      </section>
    </>
  )
}

export default Blogs
