"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Camera, Maximize2, Paperclip, Play, X } from "lucide-react";
import { activities, activitySection, type ActivityItem } from "@/content/site";
import { ScrollOrnament } from "@/components/scroll-ornament";
import { useMotionPreference } from "@/components/use-motion-preference";
import "@/components/folio.css";
import "@/components/folio-finishing.css";
import "@/components/activity-collage.css";

type PhotoOrigin = Pick<DOMRect, "left" | "top" | "width" | "height">;

function ActivityCard({ item, index, onOpen }: { item: ActivityItem; index: number; onOpen: (id: string, origin: PhotoOrigin) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 85, damping: 26 });
  const tilt = [-2, 1.5, -1, 2, -1.5, 1][index % 6];
  const rotate = useTransform(progress, [0, 1], [tilt - 0.8, tilt + 0.8]);
  const y = useTransform(progress, [0, 1], [6, -6]);
  const media = (
      <div className="folio-activityMedia" data-empty={!item.image} data-kind={item.kind}>
        {item.image ? (
          <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 699px) 42vw, (max-width: 999px) 40vw, 350px" style={{ objectPosition: item.image.position }} />
        ) : item.kind === "video" ? (
          <div className="folio-activityFilm" aria-hidden="true">
            <span className="folio-activityOrbit" />
            <span className="folio-activityPlay"><Play size={36} strokeWidth={1.5} fill="currentColor" /></span>
            <span className="folio-activityFilmLabel">a little glimpse</span>
          </div>
        ) : (
          <div className="folio-activityPhotoEmpty" aria-hidden="true">
            <Camera size={48} strokeWidth={1.2} />
            <span>saving a little space</span>
          </div>
        )}
        {item.image && item.kind === "video" && <span className="folio-activityPlay folio-activityPlayOverlay" aria-hidden="true"><Play size={30} fill="currentColor" /></span>}
        {item.image && item.kind === "photo" && <span className="folio-activityZoom" aria-hidden="true"><Maximize2 size={16} /></span>}
      </div>
  );

  return (
    <motion.li ref={ref} id={`activity-moment-${index}`} className="folio-activityItem" style={{ y: reduce ? 0 : y, rotate: reduce ? tilt : rotate }}>
    <figure className="folio-activityPrint" data-kind={item.kind}>
      {item.image && item.kind === "photo" ? (
        <button type="button" className="folio-activityOpen" onClick={(event) => onOpen(item.id, event.currentTarget.closest("figure")!.getBoundingClientRect())} aria-label={`View full photo: ${item.title}`} aria-haspopup="dialog">{media}</button>
      ) : item.href ? (
        <a className="folio-activityLink" href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${item.title} — watch on YouTube (opens in a new tab)`}>{media}</a>
      ) : media}
      <figcaption className="sr-only">{item.title}</figcaption>
    </figure>
    </motion.li>
  );
}

function PhotoViewer({ item, origin, position, total, onClose, onPrevious, onNext }: {
  item: ActivityItem;
  origin: PhotoOrigin | null;
  position: number;
  total: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const animations = useRef<Animation[]>([]);
  const initialOrigin = useRef(origin);
  const reduce = useMotionPreference();
  const [closing, setClosing] = useState(false);
  const closingRef = useRef(false);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    // Read the actual OS preference here: hydration deliberately starts stationary.
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    const photo = frame.current;
    const board = sheet.current;
    if (!photo || !board) return;
    const source = initialOrigin.current;
    const target = photo.getBoundingClientRect();
    const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
    const x = source ? source.left + source.width / 2 - target.left - target.width / 2 : 0;
    const y = source ? source.top + source.height / 2 - target.top - target.height / 2 : 18;
    const scale = source ? Math.min(source.width / target.width, source.height / target.height) : 0.9;
    animations.current = [
      photo.animate([
        { transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(-1.5deg)` },
        { transform: "translate(0, 0) scale(1) rotate(-1.5deg)" },
      ], { duration: 540, easing: ease }),
      board.animate([{ opacity: 0.25 }, { opacity: 1 }], { duration: 360, easing: ease }),
    ];
    const stopMotion = () => { if (preference.matches) animations.current.forEach((animation) => animation.cancel()); };
    preference.addEventListener("change", stopMotion);
    return () => {
      preference.removeEventListener("change", stopMotion);
      animations.current.forEach((animation) => animation.cancel());
    };
  }, []);

  const closeViewer = () => {
    if (closingRef.current) return;
    if (reduce || !frame.current || !sheet.current) { onClose(); return; }
    closingRef.current = true;
    setClosing(true);
    animations.current.forEach((animation) => animation.cancel());
    const current = frame.current.getBoundingClientRect();
    const cardIndex = activities.findIndex((entry) => entry.id === item.id);
    const destination = document.getElementById(`activity-moment-${cardIndex}`)?.querySelector("figure")?.getBoundingClientRect();
    const visible = destination && destination.bottom > 80 && destination.top < window.innerHeight;
    const x = visible ? destination.left + destination.width / 2 - current.left - current.width / 2 : 0;
    const y = visible ? destination.top + destination.height / 2 - current.top - current.height / 2 : 12;
    const scale = visible ? Math.min(destination.width / current.width, destination.height / current.height) : 0.94;
    const exit = frame.current.animate([
      { transform: "translate(0, 0) scale(1) rotate(-1.5deg)", opacity: 1 },
      { transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(-1.5deg)`, opacity: visible ? 1 : 0 },
    ], { duration: 300, easing: "cubic-bezier(0.4, 0, 1, 1)", fill: "forwards" });
    const fade = sheet.current.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: "ease-in", fill: "forwards" });
    animations.current = [exit, fade];
    void Promise.allSettled([exit.finished, fade.finished]).then(onClose);
  };

  if (!item.image) return null;

  return (
    <dialog ref={dialog} className="folio-photoViewer" aria-labelledby="activity-photo-title" aria-describedby="activity-photo-detail"
      onCancel={(event) => { event.preventDefault(); closeViewer(); }}
      onClick={(event) => { if (event.target === event.currentTarget) closeViewer(); }}
      onKeyDown={(event) => {
        if (closingRef.current) return;
        if (event.key === "ArrowLeft") { event.preventDefault(); onPrevious(); }
        if (event.key === "ArrowRight") { event.preventDefault(); onNext(); }
      }}>
      <div ref={sheet} className="folio-photoViewerSheet">
        <span className="folio-activityBoardHardware" aria-hidden="true"><i /><i /><i /><i /></span>
        <button type="button" className="folio-photoClose" onClick={closeViewer} disabled={closing} aria-label="Close photo viewer"><X size={22} /></button>
        <div ref={frame} className="folio-photoHanging">
          <div className="folio-photoFull">
            <Image key={item.id} src={item.image.src} alt={item.image.alt} fill unoptimized sizes="(max-width: 799px) 90vw, 75vw" />
          </div>
          <p className="folio-photoPrintNote">a little moment, kept.</p>
        </div>
        <div className="folio-photoStory">
          <div className="folio-photoNoteCopy">
          <div className="folio-photoCounter" role="status" aria-live="polite">Photo {position + 1} of {total}</div>
          <span className="folio-activityKind">{item.category}</span>
          <h2 id="activity-photo-title">{item.title}</h2>
          <p id="activity-photo-detail">{item.detail}</p>
          <a className="folio-activityAction" href={item.image.src} target="_blank" rel="noopener noreferrer">Open original photo<ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
          {item.href && <a className="folio-activityAction" href={item.href} target="_blank" rel="noopener noreferrer">{item.linkLabel ?? (item.kind === "video" ? "Watch on YouTube" : "View original post")}<ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>}
          </div>
          <div className="folio-photoNavigation">
            <button type="button" disabled={closing} onClick={onPrevious} aria-label="Previous photo"><ArrowLeft size={19} aria-hidden="true" />Previous</button>
            <button type="button" disabled={closing} onClick={onNext} aria-label="Next photo">Next<ArrowRight size={19} aria-hidden="true" /></button>
          </div>
          <p className="folio-photoHint">A little memory, a little closer.<br />Use the arrow keys to wander. Esc to return.</p>
        </div>
      </div>
    </dialog>
  );
}

const photoItems = activities.filter((item) => item.kind === "photo" && item.image);
const PAGE_SIZE = 8;

export function Activity() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const firstNewIndex = useRef<number | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [photoOrigin, setPhotoOrigin] = useState<PhotoOrigin | null>(null);
  const openPhoto = (id: string, origin: PhotoOrigin) => {
    setPhotoOrigin(origin);
    setSelectedId(id);
  };
  const reduce = useMotionPreference();
  const shownCount = Math.min(visibleCount, activities.length);

  useEffect(() => {
    if (firstNewIndex.current === null) return;
    const card = document.getElementById(`activity-moment-${firstNewIndex.current}`);
    card?.querySelector<HTMLElement>("button, a")?.focus({ preventScroll: true });
    card?.scrollIntoView({ block: "start", behavior: reduce ? "instant" : "smooth" });
    firstNewIndex.current = null;
  }, [visibleCount, reduce]);

  const loadMore = () => {
    firstNewIndex.current = shownCount;
    setVisibleCount((count) => Math.min(count + PAGE_SIZE, activities.length));
  };
  const selectedIndex = photoItems.findIndex((item) => item.id === selectedId);
  const selected = photoItems[selectedIndex];
  const movePhoto = (direction: number) => setSelectedId(photoItems[(selectedIndex + direction + photoItems.length) % photoItems.length].id);
  const headingParts = activitySection.heading.split(/\*([^*]+)\*/);
  return (
    <section id="activity" aria-labelledby="activity-title" className="folio-activity folio-finished">
      <div className="folio-activityInner">
        <div className="folio-activityIntro">
          <div>
            <h2 id="activity-title">{headingParts.map((part, index) => index % 2 ? <em key={index}>{part}</em> : <span key={index}>{part}</span>)}</h2>
            <p>{activitySection.intro}</p>
          </div>
          <ScrollOrnament variant="bloom" className="folio-activityBloom" />
        </div>
        <div className="folio-activityPegboard">
          <span className="folio-activityBoardHardware" aria-hidden="true"><i /><i /><i /><i /></span>
          <div className="folio-activityBoardHeader"><span><Paperclip size={18} aria-hidden="true" />Little moments, collected.</span><span>Photos, stories & little detours</span></div>
          <ul id="activity-gallery" className="folio-activityAlbum" aria-label="Activity photo pegboard">
            {activities.slice(0, shownCount).map((item, index) => <ActivityCard key={item.id} item={item} index={index} onOpen={openPhoto} />)}
          </ul>
          <div className="folio-activityMore">
            <p role="status" aria-live="polite" aria-atomic="true">{shownCount} of {activities.length} moments pinned{shownCount === activities.length ? " — all caught up!" : ". More memories below."}</p>
            {shownCount < activities.length && <button type="button" onClick={loadMore} aria-controls="activity-gallery">Lihat selengkapnya<ArrowDown size={18} aria-hidden="true" /></button>}
          </div>
        </div>
        <p className="folio-activityNote">{activitySection.note}</p>
      </div>
      {selected && <PhotoViewer item={selected} origin={photoOrigin} position={selectedIndex} total={photoItems.length} onClose={() => setSelectedId(null)} onPrevious={() => movePhoto(-1)} onNext={() => movePhoto(1)} />}
    </section>
  );
}
