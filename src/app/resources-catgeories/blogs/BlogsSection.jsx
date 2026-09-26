"use client";

import React, { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { Clock, Calendar, Eye } from "lucide-react";
import Link from "next/link";
import { fetchBlogs } from "../lib/resourcesApi";
import ResourcePagination from "../components/ResourcePagination";
import { BlogsSectionSkeleton } from "../components/ResourceSkeletons";
import { useScrollToSectionOnPageChange } from "../hooks/useScrollToSectionOnPageChange";

const ITEMS_PER_PAGE = 9;

export default function BlogsSection({ sectionRef }) {
  const internalSectionRef = useRef(null);
  const scrollTargetRef = sectionRef ?? internalSectionRef;
  const [blogData, setBlogData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useScrollToSectionOnPageChange(scrollTargetRef, currentPage, loading);

  useEffect(() => {
    let cancelled = false;

    const loadBlogs = async () => {
      try {
        setLoading(true);
        const { items, totalPages: pages } = await fetchBlogs({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        });

        if (!cancelled) {
          setBlogData(items);
          setTotalPages(pages);
        }
      } catch {
        if (!cancelled) {
          setBlogData([]);
          setTotalPages(1);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadBlogs();

    return () => {
      cancelled = true;
    };
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={sectionRef ? undefined : "scroll-mt-24 md:scroll-mt-28"} ref={sectionRef ? undefined : internalSectionRef}>
      <div className="pt-3 md:pt-10">
        {loading ? (
          <BlogsSectionSkeleton />
        ) : blogData.length === 0 ? (
          <div className="text-center text-white/60 py-3 md:py-10">
            No blogs available right now.
          </div>
        ) : (
          blogData.slice(0, 1).map((blog, index) => (
            <Link
              key={blog?._id || blog?.id || index}
              href={`/blog/${blog?.slugUrl || blog?.slug}`}
            >
              <m.div
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
                data-testid="featured-resource"
              >
                <div className="absolute -inset-px rounded-3xl overflow-hidden pointer-events-none">
                  <m.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-1/2"
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent 0deg, rgba(123,77,255,0.7) 60deg, rgba(66,212,255,0.7) 120deg, transparent 180deg, transparent 360deg)",
                    }}
                  />
                  <div className="absolute inset-[2px] rounded-[calc(1.5rem-2px)] bg-[#050609]" />
                </div>

                <div className="relative glass rounded-lg md:rounded-3xl overflow-hidden">
                  <div className="grid md:grid-cols-5 gap-0">
                    <div className="relative md:col-span-3 md:aspect-[16/10] md:aspect-auto overflow-hidden min-h-60 md:min-h-100">
                      <img
                        src={blog?.imageUrl}
                        alt={blog?.heading}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{ filter: "brightness(0.75) saturate(1.1)" }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(120deg, rgba(4,5,7,0.4) 0%, rgba(4,5,7,0) 40%, rgba(4,5,7,0.55) 100%)",
                        }}
                      />
                      <div className="absolute top-6 left-6 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full glass text-[11px] tracking-widest uppercase text-white/90">
                          Featured
                        </span>
                        <span className="px-3 py-1 rounded-full glass text-[11px] tracking-widest uppercase text-white/70">
                          {blog?.category || "Blog"}
                        </span>
                      </div>
                    </div>

                    <div className="md:col-span-2 p-4 md:p-6 flex flex-col justify-center">
                      <div>
                        <div className="flex items-center gap-4 text-white/50 text-xs mb-2 md:mb-5">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" /> 8 min
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {blog?.createdAt
                              ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                              })
                              : ""}
                          </span>
                          {/* <span className="inline-flex items-center gap-1.5">
                            <Eye className="h-3.5 w-3.5" /> {blog?.blogViews || 0}
                          </span> */}
                        </div>

                        <h3 className="font-display text-xl md:text-2xl lg:text-3xl tracking-tight text-white line-clamp-2 md:line-clamp-3">
                          {blog?.heading}
                        </h3>

                        <p
                          className="mt-1 text-sm md:text-base !text-white leading-relaxed line-clamp-2 md:line-clamp-3 blog_description"
                          dangerouslySetInnerHTML={{ __html: blog?.description }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </m.div>
            </Link>
          ))
        )}
      </div>

      {!loading && blogData.length > 1 && (
        <div className="grid md:grid-cols-2 gap-4 pt-8 md:pt-10">
          {blogData.slice(1).map((blog, index) => (
            <m.div
              key={blog?._id || blog?.id || index}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
              data-testid="featured-resource"
            >
              <Link href={`/blog/${blog?.slugUrl || blog?.slug}`}>
                <div className="absolute -inset-px rounded-3xl overflow-hidden pointer-events-none">
                  <m.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-1/2"
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent 0deg, rgba(123,77,255,0.7) 60deg, rgba(66,212,255,0.7) 120deg, transparent 180deg, transparent 360deg)",
                    }}
                  />
                  <div className="absolute inset-[2px] rounded-[calc(1.5rem-2px)] bg-[#050609]" />
                </div>

                <div className="relative glass rounded-lg md:rounded-3xl overflow-hidden">
                  <div className="grid gap-0">
                    <div className="py-4 md:py-6 px-4 md:px-6 flex flex-col justify-between">
                      <div>
                        <img
                          src={blog?.imageUrl}
                          alt={blog?.heading}
                          loading="lazy"
                          className="max-h-55 w-full object-cover rounded-lg"
                          style={{ filter: "brightness(0.75) saturate(1.1)" }}
                        />
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center gap-4 text-white/50 text-xs mb-2 md:mb-5">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" /> 8 min
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {blog?.createdAt
                              ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                              })
                              : ""}
                          </span>
                          {/* <span className="inline-flex items-center gap-1.5">
                            <Eye className="h-3.5 w-3.5" /> {blog?.blogViews || 0}
                          </span> */}
                        </div>

                        <h3 className="font-display text-lg md:text-2xl text-white line-clamp-1">
                          {blog?.heading}
                        </h3>

                        <p
                          className="mt-1 text-white! leading-relaxed line-clamp-2 blog_description"
                          dangerouslySetInnerHTML={{ __html: blog?.description }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </m.div>
          ))}
        </div>
      )}

      <ResourcePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        loading={loading}
      />
    </div>
  );
}
