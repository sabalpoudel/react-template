import React, { useState, useRef, useEffect } from "react";
import { AccordionCompWrapper } from "./AccordionCompWrapper";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type AccordionItem = {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  defaultActiveIndex?: number | null;
  allowMultiple?: boolean;
};

export const AccordionComp: React.FC<AccordionProps> = ({
  items,
  defaultActiveIndex = null,
  allowMultiple = false,
}) => {
  const [activeIndices, setActiveIndices] = useState<number[]>(
    defaultActiveIndex !== null ? [defaultActiveIndex] : []
  );
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    contentRefs.current = contentRefs.current.slice(0, items.length);
  }, [items]);

  const toggleAccordion = (index: number) => {
    setActiveIndices((prev) => {
      if (allowMultiple) {
        return prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index];
      } else {
        return prev.includes(index) ? [] : [index];
      }
    });
  };

  const setContentRef = (index: number) => (el: HTMLDivElement | null) => {
    contentRefs.current[index] = el;
  };

  return (
    <AccordionCompWrapper className="accordion">
      {items.map((item, index) => {
        const isActive = activeIndices.includes(index);
        return (
          <div className="accordion-item" key={item.id}>
            <div
              aria-expanded={isActive}
              className="accordion-item-title"
              onClick={() => toggleAccordion(index)}
              aria-controls={`accordion-content-${item.id}`}
            >
              <span className="accordion-item-title-text">{item.title}</span>
              {isActive ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </div>
            <div
              ref={setContentRef(index)}
              id={`accordion-content-${item.id}`}
              className="accordion-item-content"
              style={{
                maxHeight: isActive
                  ? `${contentRefs.current[index]?.scrollHeight}px`
                  : "0px",
              }}
              aria-hidden={!isActive}
            >
              <div className="accordion-item-content-inner">{item.content}</div>
            </div>
          </div>
        );
      })}
    </AccordionCompWrapper>
  );
};
