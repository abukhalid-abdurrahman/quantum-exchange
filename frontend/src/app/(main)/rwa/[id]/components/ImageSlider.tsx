"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ImageSliderProps {
  images: string[];
  title: string;
}

export default function ImageSlider({ images, title }: ImageSliderProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [mainImage, setMainImage] = useState(images[0]);

  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const scrollByStep = (direction: "up" | "down") => {
    if (!carouselRef.current) return;
    const step = 80;
    carouselRef.current.scrollBy({
      top: direction === "up" ? -step : step,
      behavior: "smooth",
    });
  };

  // ===== Drag / Touch scroll =====
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartY(e.pageY - carouselRef.current.offsetTop);
    setScrollTop(carouselRef.current.scrollTop);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const y = e.pageY - carouselRef.current.offsetTop;
    const walk = y - startY;
    carouselRef.current.scrollTop = scrollTop - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartY(e.touches[0].pageY - carouselRef.current.offsetTop);
    setScrollTop(carouselRef.current.scrollTop);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const y = e.touches[0].pageY - carouselRef.current.offsetTop;
    const walk = y - startY;
    carouselRef.current.scrollTop = scrollTop - walk;
  };

  const handleTouchEnd = () => setIsDragging(false);

  return (
    <div className="max-h-[570px] flex gap-2.5 select-none">
      <div className="w-[70px] flex flex-col items-center">
        <Button
          variant="outline"
          size="sm"
          className="w-full rounded-sm"
          onClick={() => scrollByStep("up")}
        >
          <ChevronUp color="#fff" size={20} />
        </Button>

        <div
          ref={carouselRef}
          className="overflow-y-hidden space-y-2 my-2.5 max-h-[490px] cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((image, i) => (
            <div
              key={i}
              onClick={() => setMainImage(image)}
              className="bg-muted/80 bg-cover bg-no-repeat bg-center aspect-square rounded-sm overflow-hidden flex justify-center items-center cursor-pointer border-2 border-muted/80"
            >
              <img
                src={image}
                alt={title}
                className="rounded-xs w-full h-auto aspect-square shadow-none pointer-events-none"
              />
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full rounded-sm"
          onClick={() => scrollByStep("down")}
        >
          <ChevronDown color="#fff" size={20} />
        </Button>
      </div>

      <img
        src={mainImage}
        alt={title}
        className="rounded-xl max-h-[570px] w-auto aspect-square"
      />
    </div>
  );
}
