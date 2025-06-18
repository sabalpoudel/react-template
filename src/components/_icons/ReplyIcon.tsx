import React from "react";

export const ReplyIcon = ({ className = "", fill = "#01aef3", ...props }) => {
  return (
    <svg
      fill="none"
      className={className}
      viewBox="-2.8 -2.8 33.6 33.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill={fill}
        fill-rule="evenodd"
        d="M11.983 7.01v-5.9c.034-.3-.047-.6-.275-.83-.396-.39-1.038-.39-1.434 0L.285 11.24c-.211.21-.301.48-.287.76-.014.27.076.55.287.76l9.934 10.89c.371.32 1.052.5 1.489.06.227-.22.327-.42.292-.71v-6c6.6 0 12.569 4.75 13.754 11.01.798-1.84 1.246-3.86 1.246-5.99 0-8.29-6.724-15.01-15.017-15.01"
      />
    </svg>
  );
};
