"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * The screen contents. Renders the still on the server, plays the scroll video
 * through once after mount, then settles back on the still rather than looping.
 * Anyone who has asked their device for reduced motion only ever sees the still.
 */
function Screen({
  src,
  video,
  alt,
  fit,
  priority,
}: {
  src: string;
  video?: string;
  alt: string;
  fit: string;
  priority: boolean;
}) {
  const [allowVideo, setAllowVideo] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!video) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAllowVideo(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [video]);

  return (
    <div className="absolute inset-0">
      {/* The still stays mounted underneath the whole time. Swapping it in only
          after the video ended made Next request its largest variant, because
          layout was not known yet, which left the screen blank while it loaded. */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="280px"
        className={`${fit} object-top`}
        /* eager when there is a video, so the still is already decoded and
           ready the instant playback finishes */
        priority={priority || !!video}
      />
      {allowVideo && video && !finished ? (
        <video
          src={video}
          autoPlay
          muted
          playsInline
          preload="metadata"
          aria-hidden
          onEnded={() => setFinished(true)}
          className={`absolute inset-0 h-full w-full ${fit} object-top`}
        />
      ) : null}
    </div>
  );
}

/**
 * Presents a screenshot inside an iPhone style device: brushed metal edge,
 * black bezel, rounded screen and a Dynamic Island. The counterpart to
 * BrowserFrame, for things that live on a phone rather than in a browser.
 */
export function PhoneFrame({
  src,
  video,
  alt,
  priority = false,
  width = "w-[236px] sm:w-[262px]",
  fit = "object-contain",
}: {
  src: string;
  video?: string;
  alt: string;
  priority?: boolean;
  width?: string;
  /** contain shows the whole screenshot, cover fills the screen. */
  fit?: "object-contain" | "object-cover";
}) {
  return (
    <div className={`relative mx-auto ${width}`}>
      {/* Side buttons, for a bit of physicality */}
      <span
        aria-hidden
        className="absolute -left-[2px] top-[104px] h-8 w-[3px] rounded-l-sm bg-[#3f3f42]"
      />
      <span
        aria-hidden
        className="absolute -left-[2px] top-[150px] h-12 w-[3px] rounded-l-sm bg-[#3f3f42]"
      />
      <span
        aria-hidden
        className="absolute -right-[2px] top-[130px] h-16 w-[3px] rounded-r-sm bg-[#3f3f42]"
      />

      {/* Titanium edge */}
      <div className="relative rounded-[2.6rem] bg-gradient-to-b from-[#54545a] via-[#2f2f33] to-[#1b1b1e] p-[3px] shadow-[0_28px_60px_-18px_rgba(23,18,12,0.55)]">
        {/* Black bezel */}
        <div className="rounded-[2.45rem] bg-black p-[7px]">
          {/* Screen */}
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.05rem] bg-[#f6f6f6]">
            <Screen
              src={src}
              video={video}
              alt={alt}
              fit={fit}
              priority={priority}
            />
            {/* Dynamic Island */}
            <span
              aria-hidden
              className="absolute left-1/2 top-[9px] h-[21px] w-[74px] -translate-x-1/2 rounded-full bg-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The phone sitting on a soft tinted stage, used where BrowserFrame would sit
 * for a web project.
 */
export function PhoneShowcase({
  src,
  video,
  alt,
  label,
  priority = false,
  peek = false,
}: {
  src: string;
  video?: string;
  alt: string;
  label?: string;
  priority?: boolean;
  /** Crops the phone to a wide band so it can sit beside a browser frame in a
   *  card grid, with the device rising out of the bottom edge. */
  peek?: boolean;
}) {
  const stage =
    "relative overflow-hidden border-b border-line/70 bg-gradient-to-b from-accent-soft/60 via-surface to-surface";
  const blob = (
    <div
      aria-hidden
      className="glow glow-gold animate-drift pointer-events-none absolute -right-40 -top-44 h-[30rem] w-[30rem] rounded-full"
    />
  );

  if (peek) {
    return (
      <div className={`${stage} aspect-[16/10]`}>
        {blob}
        <div className="absolute inset-x-0 top-7">
          <PhoneFrame
            src={src}
            alt={alt}
            priority={priority}
            width="w-[216px]"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`${stage} px-6 py-12`}>
      {blob}
      <div className="relative">
        <PhoneFrame src={src} video={video} alt={alt} priority={priority} />
        {label ? (
          <p className="mt-6 text-center font-mono text-xs text-muted">
            {label}
          </p>
        ) : null}
      </div>
    </div>
  );
}
