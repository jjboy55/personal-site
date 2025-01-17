import Image from "next/image";
import React from "react";
import Title from "./common/Title";
import { client } from "@/utils/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";

const builder = imageUrlBuilder(client);

function urlFor(source: {}) {
  return builder.image(source);
}

interface ProjectProps {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  coverPhoto: {
    asset: "string";
  };
}

async function getProject() {
  const query = `*[_type == "project"]`;
  const data = await client.fetch(query, {
    next: {
      revalidate: 3600,
    },
  });
  return data as ProjectProps[];
}

const Work = async () => {
  const projects = (await getProject()) as ProjectProps[];
  return (
    <div className="flex flex-col w-full py-12">
      {/* section title */}
      <Title title="View Works" />
      {/* portfolio projects */}
      <div className="w-full">
        {projects.map((project, index) => (
          <Link key={index} href={`project/${project.slug.current}`}>
            <div className="cursor-pointer group">
              <div className="relative w-full h-[254px] sm:h-[364px] md:h-[564px] lg:h-[56vw]">
                <Image
                  src={urlFor(project.coverPhoto).url()}
                  alt="download"
                  className="w-full h-auto"
                  fill
                  priority
                />
              </div>
              <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:items-center justify-between py-4">
                <div className="text-[22px] lg:text-[28px] font-normal">
                  {project.title}
                </div>
                <div className="flex items-center space-x-3">
                  <span>View Project</span>

                  <div className="w-[40px] h-[40px] bg-[#ACA0E8] rounded-full flex justify-center items-center">
                    <Image
                      className="transform transition-transform ease-in-out duration-300 group-hover:-rotate-45"
                      src="/arrow.svg"
                      alt="download"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Work;
