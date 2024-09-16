import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Heading {
  id: string;
  text: string;
  level: number;
}

const TableOfContents: React.FC = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  // const [scrollY, setScrollY] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".MuiTypography-h1, .MuiTypography-h2, .MuiTypography-h3, .MuiTypography-h4"
      )
    );

    const headingElements: Heading[] = elements.map((element, index) => {
      const match = element.className.match(/MuiTypography-h(\d)/);
      const level = match ? parseInt(match[1], 10) : 1;
      return {
        id: element.id || `heading-${index}`,
        text: element.textContent || `Heading ${index + 1}`,
        level: level,
      };
    });

    setHeadings(headingElements);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "50px 0% -55% 0%", threshold: 1 }
    );

    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveId(id);
      // element.scrollIntoView({ behavior: "smooth" });
      const headerOffset = 100; // Điều chỉnh giá trị này dựa trên chiều cao của header
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      console.log("offsetPosition", offsetPosition);
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      router.push(`#${id}`, undefined, { shallow: true });
    }
  };

  return (
    <div className="bg-white mr-8 rounded p-4 scroll-m-1 flex flex-col w-[300px]">
      <h2 className="flex justify-center mb-2">Mục lục</h2>
      <ul className="list-none p-0">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`cursor-pointer hover:text-blue-500 ml-${
              (heading.level - 1) * 4
            } ${activeId === heading.id ? "text-blue-500 " : ""}`}
            onClick={() => handleClick(heading.id)}
          >
            {heading.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
