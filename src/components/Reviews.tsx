"use client";

import { HTMLAttributes, useEffect, useRef, useState } from "react";
import MaxwidthWrapper from "./MaxWidthWrapper";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Phone from "./Phone";

const PHONES = [
  "https://utfs.io/f/4d9d9cb5-2d65-450d-9738-a2b7a1a0eec7-1d.png",
  "https://utfs.io/f/7a43bc34-e5ac-42f0-96b6-c191e32e9ac5-1e.png",
  "https://utfs.io/f/48be1e0d-9a01-4d8a-8ce6-0390c5febc41-1f.png",
  "https://utfs.io/f/d8ea7d3f-3ac2-4d96-bc27-a564cdbc4e75-1g.png",
  "https://utfs.io/f/3601553e-ecd6-470c-a590-171d44945c7a-1h.png",
  "https://utfs.io/f/87c1b70f-6353-462d-9137-f1ef112d4721-1i.png",
  "https://utfs.io/f/a1daf0b6-2318-49c4-a254-a7cda46b2761-1j.png",
  "https://utfs.io/f/8a71b09e-6daa-4593-88e4-75cf05fd3db0-1k.png",
  "https://utfs.io/f/c930fcf5-95eb-4b64-b363-b29693123d23-1l.png",
  "https://utfs.io/f/802d5671-c822-42ab-891a-3166d2a35a19-17j.png",
  "https://utfs.io/f/9154b11d-6c37-417f-86de-dcfdcd090b53-17k.png",
  "https://utfs.io/f/a9a5bb7e-d811-4e58-8ef0-da03a2cada81-17l.png",
  "https://utfs.io/f/fc96592c-1a2b-4cdd-a109-a6380e3cad7e-17m.png",
  "https://utfs.io/f/a6d6ff5e-8db0-476c-a8d5-93bca8ff724e-17n.png",
  "https://utfs.io/f/1305e719-3647-4d27-ab79-948f2d2c1546-17o.png",
  "https://utfs.io/f/fc907ece-a443-41e1-8482-301a97aa590b-17p.png",
  "https://utfs.io/f/9171b571-b612-4073-8ce0-f15e81c97ee7-17q.png",
  "https://utfs.io/f/f8995b54-395e-4ecb-a94d-f75bb4a1ef77-17r.png",
  "https://utfs.io/f/b8bb4f34-dcb9-4979-8ec2-73e6e1d60594-17s.png",
  "https://utfs.io/f/2377cd54-0bbc-4aba-a4f3-e8be35da03fd-18e.png",
  "https://utfs.io/f/ce26b76d-d3b5-41bd-8014-518ae08ca564-18f.png",
  "https://utfs.io/f/4fcd75f2-e636-4c0a-bd8a-d7588771bef6-18g.png",
  "https://utfs.io/f/b2775285-d07e-45a0-b488-d03f76e3b527-18h.png",
  "https://utfs.io/f/275f7d19-240a-4f9d-8fc3-1a8635677260-18i.png",
  "https://utfs.io/f/e2b5f024-8378-43df-a1d4-3b4ac480d6e5-18j.png",
  "https://utfs.io/f/18e36633-0b1a-4325-be3f-db3edb1e58ef-18k.png",
  "https://utfs.io/f/e42ccab2-96e7-42ce-906b-6730fc88f0c3-18l.png",
];

function splitArray<T>(array: Array<T>, numParts: number) {
  const result: Array<Array<T>> = [];

  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }

  return result;
}

function ReviewColumn({
  reviews,
  className,
  reviewClassName,
  msPerPixel = 0,
}: {
  reviews: string[];
  className?: string;
  reviewClassName?: (reviewIndex: number) => string;
  msPerPixel?: number;
}) {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnHeight, setColumnHeight] = useState(0);
  const duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    if (!columnRef.current) return;

    const resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    });

    resizeObserver.observe(columnRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={columnRef}
      className={cn("animate-marquee space-y-8 py-4", className)}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      {reviews.map((imgSrc, reviewIndex) => (
        <Review
          key={reviewIndex}
          className={reviewClassName?.(reviewIndex % reviews.length)}
          imgSrc={imgSrc}
        />
      ))}
    </div>
  );
}

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
}

function Review({ imgSrc, className, ...props }: ReviewProps) {
  const POSSIBLE_ANIMATION_DELAYS = [
    "0s",
    "0.1s",
    "0.2s",
    "0.3s",
    "0.4s",
    "0.5s",
  ];

  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[
      Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
    ];

  return (
    <div
      className={cn(
        "animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5",
        className
      )}
      style={{ animationDelay }}
      {...props}
    >
      <Phone imgSrc={imgSrc} />
    </div>
  );
}

function ReviewGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const columns = splitArray(PHONES, 3);
  const column1 = columns[0];
  const column2 = columns[1];
  const column3 = splitArray(columns[2], 2);

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView ? (
        <>
          <ReviewColumn
            reviews={[...column1, ...column3.flat(), ...column2]}
            reviewClassName={(reviewIndex) =>
              cn({
                "md:hidden": reviewIndex >= column1.length + column3[0].length,
                "lg:hidden": reviewIndex >= column1.length,
              })
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...column2, ...column3[1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= column2.length ? "lg: hidden" : ""
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={column3.flat()}
            className="hidden md:block"
            msPerPixel={10}
          />
        </>
      ) : null}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100" />
    </div>
  );
}

export function Reviews() {
  return (
    <MaxwidthWrapper className="relative max-w-5xl">
      <img
        aria-hidden
        src="https://utfs.io/f/3634c75a-24a3-472b-b8d7-c72a8ba82372-s54eja.png"
        className="absolute select-none hidden xl:block -left-32 top-1/3"
      />
      <ReviewGrid />
    </MaxwidthWrapper>
  );
}
