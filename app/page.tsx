
"use client";

import {
  useRef,
  useState,
  useEffect,
  type FormEvent,
  type PointerEvent,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  Heart,
  Music2,
  CalendarDays,
  MapPin,
  Clock,
  Flower2,
  Sparkles,
  Gift,
  CheckCircle2,
  ChevronDown,
  ArrowUp,
  Send,
  Star,
} from "lucide-react";

/* ==========================================
   WEDDING INFORMATION
========================================== */

const couple = {
  groom: "Alexander",
  bride: "Isabella",

  groomFull: "Alexander James",
  brideFull: "Isabella Rose",

  weddingDate: "18 September 2027",

  venue: "Villa di Bella Vista",
  location: "Tuscany, Italy",

  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Villa+di+Bella+Vista+Tuscany+Italy",

  whatsapp: "",

  musicUrl: "/music/romantic-song.mp3",
};

/* ==========================================
   WEDDING EVENTS
========================================== */

const events = [
  {
    number: "01",
    date: "16 SEP",
    title: "Welcome Dinner",
    description:
      "An intimate evening of warm welcomes, beautiful conversations and a lovely dinner under the stars.",
    time: "7:00 PM onwards",
    location: "Villa Garden",
  },

  {
    number: "02",
    date: "17 SEP",
    title: "Garden Party",
    description:
      "Join us for an enchanting garden celebration filled with laughter, music and unforgettable moments.",
    time: "4:00 PM onwards",
    location: "The Rose Garden",
  },

  {
    number: "03",
    date: "18 SEP",
    title: "The Wedding Ceremony",
    description:
      "The day our forever begins. We invite you to witness and celebrate our wedding ceremony.",
    time: "5:30 PM",
    location: "Villa di Bella Vista",
  },

  {
    number: "04",
    date: "19 SEP",
    title: "Grand Reception",
    description:
      "One final evening of celebration, dancing and beautiful memories with the people we love.",
    time: "7:30 PM onwards",
    location: "The Grand Ballroom",
  },
];

/* ==========================================
   SCRATCH INVITATION COMPONENT

   Premium metallic gold scratch surface.
   Supports mouse, touch and pen.
========================================== */

function ScratchWeddingInvitation({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawingRef = useRef(false);
  const completedRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);

  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number }[]
  >([]);

  const particleId = useRef(0);

  /* --------------------------------------
     CREATE GOLD SCRATCH SURFACE
  -------------------------------------- */

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 800;

    // Metallic gold gradient.

    const gold = ctx.createLinearGradient(
      0,
      0,
      1200,
      800
    );

    gold.addColorStop(0, "#f8e8b7");
    gold.addColorStop(0.18, "#c79743");
    gold.addColorStop(0.36, "#f7e4a8");
    gold.addColorStop(0.56, "#b58232");
    gold.addColorStop(0.78, "#f4dfa0");
    gold.addColorStop(1, "#c18d3d");

    ctx.fillStyle = gold;
    ctx.fillRect(0, 0, 1200, 800);

    // Metallic shine.

    const shine = ctx.createLinearGradient(
      0,
      0,
      1200,
      0
    );

    shine.addColorStop(0, "rgba(255,255,255,0.05)");
    shine.addColorStop(0.45, "rgba(255,255,255,0.24)");
    shine.addColorStop(0.5, "rgba(255,255,255,0.4)");
    shine.addColorStop(0.55, "rgba(255,255,255,0.12)");
    shine.addColorStop(1, "rgba(255,255,255,0.04)");

    ctx.fillStyle = shine;
    ctx.fillRect(0, 0, 1200, 800);

    // Fine metallic grain.

    for (let i = 0; i < 8000; i++) {
      const x = Math.random() * 1200;
      const y = Math.random() * 800;

      ctx.fillStyle =
        Math.random() > 0.5
          ? "rgba(255,255,255,0.16)"
          : "rgba(105,65,20,0.09)";

      ctx.fillRect(x, y, 2, 2);
    }

    // Double gold border.

    ctx.strokeStyle = "rgba(105,70,28,0.65)";
    ctx.lineWidth = 3;
    ctx.strokeRect(32, 32, 1136, 736);

    ctx.strokeStyle = "rgba(255,255,255,0.7)";
    ctx.lineWidth = 2;
    ctx.strokeRect(45, 45, 1110, 710);

    // Decorative corner ornaments.

    ctx.fillStyle = "#80551e";
    ctx.textAlign = "center";
    ctx.font = "65px Georgia";

    ctx.fillText("❦", 90, 115);
    ctx.fillText("❦", 1110, 115);
    ctx.fillText("❦", 90, 730);
    ctx.fillText("❦", 1110, 730);

    // Invitation cover text.

    ctx.fillStyle = "#79501e";

    ctx.font = "italic 54px Georgia";
    ctx.fillText(
      "Something Beautiful Awaits",
      600,
      335
    );

    ctx.font = "24px Arial";
    ctx.fillText(
      "A SPECIAL CELEBRATION IS WAITING TO BE REVEALED",
      600,
      425
    );

    ctx.font = "55px Georgia";
    ctx.fillText("♡", 600, 525);

    return () => {
      drawingRef.current = false;
    };
  }, []);

  /* --------------------------------------
     SCRATCH COORDINATES
  -------------------------------------- */

  const getPosition = (
    event: PointerEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;

    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();

    return {
      x:
        ((event.clientX - rect.left) / rect.width) *
        canvas.width,

      y:
        ((event.clientY - rect.top) / rect.height) *
        canvas.height,
    };
  };

  /* --------------------------------------
     GOLD PARTICLE TRAIL
  -------------------------------------- */

  const createParticles = (
    x: number,
    y: number
  ) => {
    const newParticles = Array.from(
      { length: 3 },
      () => ({
        id: ++particleId.current,

        x:
          (x / 1200) * 100,

        y:
          (y / 800) * 100,

        size: 3 + Math.random() * 5,
      })
    );

    setParticles((previous) =>
      [...previous, ...newParticles].slice(-30)
    );
  };

  /* --------------------------------------
     SCRATCH PAINTING
  -------------------------------------- */

  const scratchAt = (
    event: PointerEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;

    if (!canvas || !drawingRef.current || finished) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const point = getPosition(event);

    if (!point) return;

    ctx.save();

    ctx.globalCompositeOperation = "destination-out";

    ctx.lineWidth = 82;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();

    if (lastPointRef.current) {
      ctx.moveTo(
        lastPointRef.current.x,
        lastPointRef.current.y
      );
    } else {
      ctx.moveTo(point.x, point.y);
    }

    ctx.lineTo(point.x, point.y);

    ctx.stroke();

    ctx.beginPath();

    ctx.arc(
      point.x,
      point.y,
      41,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.restore();

    lastPointRef.current = point;

    // Create a small golden sparkle trail.

    if (Math.random() > 0.55) {
      createParticles(point.x, point.y);
    }
  };

  /* --------------------------------------
     CALCULATE SCRATCH PROGRESS
  -------------------------------------- */

  const calculateProgress = () => {
    const canvas = canvasRef.current;

    if (!canvas || completedRef.current) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const image = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );

    let transparent = 0;
    let total = 0;

    // Sample every 16th pixel.

    for (
      let i = 3;
      i < image.data.length;
      i += 64
    ) {
      total++;

      if (image.data[i] < 30) {
        transparent++;
      }
    }

    const amount = Math.round(
      (transparent / total) * 100
    );

    setProgress(amount);

    // Automatically reveal at 45%.

    if (amount >= 45) {
      completedRef.current = true;

      setFinished(true);

      setParticles([]);

      window.setTimeout(() => {
        onComplete();
      }, 1200);
    }
  };

  /* --------------------------------------
     POINTER EVENTS
  -------------------------------------- */

  const startScratch = (
    event: PointerEvent<HTMLCanvasElement>
  ) => {
    if (finished || completedRef.current) return;

    event.preventDefault();

    drawingRef.current = true;

    lastPointRef.current = null;

    event.currentTarget.setPointerCapture(
      event.pointerId
    );

    scratchAt(event);
  };

  const moveScratch = (
    event: PointerEvent<HTMLCanvasElement>
  ) => {
    if (!drawingRef.current) return;

    scratchAt(event);
  };

  const stopScratch = () => {
    if (!drawingRef.current) return;

    drawingRef.current = false;

    lastPointRef.current = null;

    calculateProgress();
  };

  /* --------------------------------------
     SCRATCH INTERFACE
  -------------------------------------- */

  return (
    <motion.div
      className="scratchIntro"

      initial={{ opacity: 0 }}

      animate={{ opacity: 1 }}

      exit={{
        opacity: 0,
        scale: 1.04,
        filter: "blur(8px)",
      }}

      transition={{ duration: 1 }}
    >
      {/* BACKGROUND LIGHT EFFECTS */}

      <div className="scratchAmbient ambientOne" />
      <div className="scratchAmbient ambientTwo" />

      <div className="scratchStars">
        {Array.from({ length: 16 }).map((_, index) => (
          <motion.span
            key={index}
            className="ambientStar"

            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${index * 0.3}s`,
            }}

            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.7, 1.3, 0.7],
            }}

            transition={{
              duration: 3 + (index % 3),
              repeat: Infinity,
            }}
          >
            ✧
          </motion.span>
        ))}
      </div>

      {/* MAIN INVITATION CARD */}

      <motion.div
        className="scratchCard"

        initial={{
          opacity: 0,
          y: 45,
          scale: 0.94,
        }}

        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}

        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
      >
        <div className="scratchCardOuter">

          <div className="scratchCardInner">

            {/* UNDERLYING WEDDING INVITATION */}

            <div className="scratchSecret">

              <div className="secretTop">
                <span>TOGETHER WITH THEIR FAMILIES</span>
              </div>

              <div className="secretFlourish">
                ✧ ❦ ✧
              </div>

              <p className="secretEyebrow">
                REQUEST THE PLEASURE OF YOUR COMPANY
              </p>

              <h1 className="secretNames">
                {couple.groom}
                <span>&</span>
                {couple.bride}
              </h1>

              <div className="secretDivider">
                <span>♡</span>
              </div>

              <p className="secretInvitation">
                JOYFULLY INVITE YOU TO CELEBRATE
                <br />
                THE BEGINNING OF THEIR FOREVER
              </p>

              <div className="secretFullNames">
                {couple.groomFull}
                <span>&</span>
                {couple.brideFull}
              </div>

              <div className="secretVenue">
                <span>AT THE BEAUTIFUL</span>
                <strong>{couple.venue}</strong>
                <span>{couple.location}</span>
              </div>

              <div className="secretBottom">
                WITH LOVE, ALWAYS
              </div>

            </div>

            {/* GOLD SCRATCH LAYER */}

            <motion.canvas
              ref={canvasRef}

              className={`scratchCanvas ${
                finished ? "scratchFinished" : ""
              }`}

              onPointerDown={startScratch}
              onPointerMove={moveScratch}
              onPointerUp={stopScratch}
              onPointerCancel={stopScratch}
              onLostPointerCapture={stopScratch}

              animate={
                finished
                  ? {
                      opacity: 0,
                      scale: 1.025,
                    }
                  : {
                      opacity: 1,
                      scale: 1,
                    }
              }

              transition={{
                duration: 1.1,
              }}
            />

            {/* PARTICLES */}

            <div className="scratchParticleLayer">
              <AnimatePresence>
                {particles.map((particle) => (
                  <motion.span
                    key={particle.id}

                    className="scratchParticle"

                    style={{
                      left: `${particle.x}%`,
                      top: `${particle.y}%`,
                      width: particle.size,
                      height: particle.size,
                    }}

                    initial={{
                      opacity: 1,
                      scale: 0,
                    }}

                    animate={{
                      opacity: 0,
                      scale: 1.8,
                      y: -25,
                    }}

                    exit={{ opacity: 0 }}

                    transition={{
                      duration: 0.7,
                    }}
                  >
                    ✧
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>

            {/* DECORATIVE HEART SEAL */}

            <motion.div
              className="scratchSeal"

              animate={
                finished
                  ? {
                      scale: 1.5,
                      opacity: 0,
                      rotate: 25,
                    }
                  : {
                      scale: [1, 1.04, 1],
                    }
              }

              transition={{
                duration: 2,
                repeat: finished ? 0 : Infinity,
              }}
            >
              <Heart size={28} fill="currentColor" />
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* INSTRUCTIONS */}

      <motion.div
        className="scratchInstructions"

        animate={{
          y: [0, -5, 0],
        }}

        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="scratchInstructionIcon">
          <Sparkles size={21} />
        </div>

        <p>
          {finished
            ? "YOUR WEDDING INVITATION IS UNFOLDING"
            : "A SPECIAL CELEBRATION AWAITS"}
        </p>

        <span>
          {finished
            ? "GET READY FOR A BEAUTIFUL BEGINNING"
            : "SCRATCH THE GOLDEN SURFACE TO REVEAL"}
        </span>
      </motion.div>

      {/* PROGRESS BAR */}

      <div className="scratchProgress">
        <motion.div
          className="scratchProgressFill"

          animate={{
            width: `${progress}%`,
          }}

          transition={{
            duration: 0.3,
          }}
        />
      </div>

      <p className="scratchProgressLabel">
        {finished
          ? "THE CELEBRATION BEGINS"
          : `${progress}% REVEALED`}
      </p>

      <p className="scratchFooter">
        ALEXANDER & ISABELLA · A CELEBRATION OF LOVE
      </p>

    </motion.div>
  );
}

/* ==========================================
   MAIN WEDDING WEBSITE
========================================== */

export default function WeddingInvitation() {

  const [opened, setOpened] = useState(false);

  const [musicOn, setMusicOn] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [guestName, setGuestName] = useState("");

  const [guestCount, setGuestCount] = useState("2");

  const [attendance, setAttendance] = useState(
    "Joyfully accepts"
  );

  const [sent, setSent] = useState(false);

  /* --------------------------------------
     MUSIC CONTROL
  -------------------------------------- */

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (musicOn) {
      audio.pause();
      setMusicOn(false);
      return;
    }

    try {
      await audio.play();
      setMusicOn(true);
    } catch {
      setMusicOn(false);

      alert(
        "Please check your wedding music file at public/music/romantic-song.mp3"
      );
    }
  };

  /* --------------------------------------
     RSVP
  -------------------------------------- */

  const handleRSVP = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const message = [
      "Wedding RSVP",
      "",
      `Name: ${guestName}`,
      `Number of Guests: ${guestCount}`,
      `Response: ${attendance}`,
      "",
      `Wedding Couple: ${couple.groom} & ${couple.bride}`,
      `Wedding Date: ${couple.weddingDate}`,
      `Venue: ${couple.venue}, ${couple.location}`,
    ].join("\n");

    const phone = couple.whatsapp.replace(/\D/g, "");

    const whatsappLink = phone
      ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(
      whatsappLink,
      "_blank",
      "noopener,noreferrer"
    );

    setSent(true);
  };

  /* ======================================
     COMPLETE WEDDING WEBSITE
  ====================================== */

  return (
    <main className="wedding">

      {/* AUDIO */}

      <audio
        ref={audioRef}
        src={couple.musicUrl}
        loop
        preload="none"
        onEnded={() => setMusicOn(false)}
      />

      {/* ==================================
          SCRATCH-TO-REVEAL INTRO
      ================================== */}

      <AnimatePresence mode="wait">
        {!opened && (
          <ScratchWeddingInvitation
            onComplete={() => setOpened(true)}
          />
        )}
      </AnimatePresence>

      {/* ==================================
          MAIN WEBSITE
      ================================== */}

      <motion.div
        className={`site ${
          opened ? "siteVisible" : "siteHidden"
        }`}

        initial={{
          opacity: 0,
          y: 15,
        }}

        animate={{
          opacity: opened ? 1 : 0,
          y: opened ? 0 : 15,
        }}

        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}

        style={{
          pointerEvents: opened ? "auto" : "none",
        }}
      >

        {/* NAVIGATION */}

        <header className="topbar">

          <a href="#home" className="brand">
            A <span>&</span> I
          </a>

          <button
            type="button"

            className={`music ${
              musicOn ? "musicActive" : ""
            }`}

            onClick={toggleMusic}

            aria-label={
              musicOn ? "Pause music" : "Play music"
            }
          >
            <Music2 size={14} />

            <span>
              {musicOn ? "MUSIC ON" : "MUSIC"}
            </span>
          </button>

        </header>

        {/* ==================================
            HERO SECTION
        ================================== */}

        <section className="hero" id="home">

          <div className="heroOrnament">
            <Flower2 size={38} strokeWidth={1} />
          </div>

          <motion.div
            className="heroContent"

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={
              opened
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 20,
                  }
            }

            transition={{
              duration: 1,
              delay: 0.3,
            }}
          >

            <p className="eyebrow">
              TOGETHER WITH THEIR FAMILIES
            </p>

            <h1>
              {couple.groom}

              <span className="heroAmp">
                &
              </span>

              {couple.bride}
            </h1>

            <p className="heroLine">
              Request the pleasure of your company
              <br />
              as they begin their forever.
            </p>

          </motion.div>

          {/* PALACE ILLUSTRATION */}

          <motion.div
            className="houseArt"

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={
              opened
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 20,
                  }
            }

            transition={{
              duration: 1.2,
              delay: 0.5,
            }}
          >

            <div className="sun" />

            <div className="palace">

              <div className="dome" />

              <div className="roof roofMain" />
              <div className="roof roofLeft" />

              <div className="building">

                <div className="windows">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>

                <div className="door" />

              </div>

              <div className="wing wingLeft" />
              <div className="wing wingRight" />

            </div>

            <div className="garden">
              <span>♣</span>
              <span>✿</span>
              <span>♣</span>
              <span>✿</span>
              <span>♣</span>
            </div>

          </motion.div>

          {/* DATE */}

          <motion.div
            className="datePill"

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: opened ? 1 : 0,
              y: opened ? 0 : 20,
            }}

            transition={{
              duration: 1,
              delay: 0.6,
            }}
          >
            <CalendarDays size={17} />
            <span>18 SEPTEMBER 2027</span>
          </motion.div>

          <motion.p
            className="eyebrow"

            initial={{ opacity: 0 }}

            animate={{
              opacity: opened ? 1 : 0,
            }}

            transition={{
              duration: 1,
              delay: 0.8,
            }}

            style={{
              marginTop: 18,
            }}
          >
            <MapPin
              size={13}
              style={{
                display: "inline",
                verticalAlign: "middle",
                marginRight: 7,
              }}
            />

            {couple.location.toUpperCase()}
          </motion.p>

          <a href="#welcome" className="scrollHint">
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown size={16} />
          </a>

        </section>

        {/* ==================================
            WELCOME SECTION
        ================================== */}

        <motion.section
          className="section welcome"
          id="welcome"

          initial={{
            opacity: 0,
            y: 25,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{
            once: true,
            amount: 0.2,
          }}

          transition={{
            duration: 0.8,
          }}
        >

          <Flower2 className="sectionIcon" />

          <p className="eyebrow">
            A NOTE FROM OUR HEARTS
          </p>

          <h2>
            With joyful hearts,
            <br />
            <em>we invite you</em>
          </h2>

          <p className="bodyCopy">
            Some moments in life become even more beautiful
            when shared with the people who mean the most.
            As we begin this wonderful new chapter together,
            it would mean the world to have you by our side.
          </p>

          <div className="signature">
            With love,

            <strong>
              {couple.groom} & {couple.bride}
            </strong>
          </div>

        </motion.section>

        {/* ==================================
            OUR STORY
        ================================== */}

        <motion.section
          className="section story"
          id="story"

          initial={{
            opacity: 0,
            y: 25,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{
            once: true,
            amount: 0.2,
          }}

          transition={{
            duration: 0.8,
          }}
        >

          <Sparkles className="sectionIcon" />

          <p className="eyebrow">
            TWO HEARTS, ONE JOURNEY
          </p>

          <h2>
            Our <em>Story</em>
          </h2>

          <div className="storyCard">

            <div className="storyImage">

              <div className="storySparkle">
                ✧
              </div>

              <div className="heartIllustration">
                ♡
              </div>

              <span>
                FOREVER BEGINS HERE
              </span>

            </div>

            <div className="storyText">

              <p>
                What began as two separate journeys slowly
                became one beautiful story.
              </p>

              <p>
                Through laughter, little moments and countless
                memories, we discovered something truly special.
              </p>

              <p>
                Now, surrounded by the people we love, we are
                ready to make our promises and begin forever.
              </p>

              <div className="signature">
                <strong>
                  {couple.groom} & {couple.bride}
                </strong>
              </div>

            </div>

          </div>

        </motion.section>

        {/* ==================================
            WEDDING EVENTS
        ================================== */}

        <motion.section
          className="section events"
          id="events"

          initial={{
            opacity: 0,
            y: 25,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{
            once: true,
            amount: 0.1,
          }}

          transition={{
            duration: 0.8,
          }}
        >

          <CalendarDays className="sectionIcon" />

          <p className="eyebrow">
            SAVE THE CELEBRATION
          </p>

          <h2>
            Wedding <em>Festivities</em>
          </h2>

          <p className="bodyCopy">
            Four beautiful days filled with love,
            laughter and unforgettable memories.
            We cannot wait to celebrate with you.
          </p>

          <div className="timeline">

            {events.map((event, index) => (

              <motion.article
                className="eventCard"
                key={event.number}

                initial={{
                  opacity: 0,
                  x: -20,
                }}

                whileInView={{
                  opacity: 1,
                  x: 0,
                }}

                viewport={{
                  once: true,
                  amount: 0.2,
                }}

                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
              >

                <div className="eventDate">
                  {event.date}
                </div>

                <div className="eventDetails">

                  <span className="eventNumber">
                    EVENT {event.number}
                  </span>

                  <h3>
                    {event.title}
                  </h3>

                  <p>
                    {event.description}
                  </p>

                  <div className="eventMeta">

                    <span>
                      <Clock size={14} />
                      {event.time}
                    </span>

                    <span>
                      <MapPin size={14} />
                      {event.location}
                    </span>

                  </div>

                </div>

              </motion.article>

            ))}

          </div>

        </motion.section>

        {/* ==================================
            VENUE
        ================================== */}

        <motion.section
          className="section venue"
          id="venue"

          initial={{
            opacity: 0,
            y: 25,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{
            once: true,
            amount: 0.2,
          }}

          transition={{
            duration: 0.8,
          }}
        >

          <MapPin className="sectionIcon" />

          <p className="eyebrow">
            A PLACE TO REMEMBER
          </p>

          <h2>
            The <em>Venue</em>
          </h2>

          <div className="venueCard">

            <div className="venueArtwork">

              <Flower2
                size={35}
                strokeWidth={1}
              />

              <span>
                WELCOME TO
              </span>

              <strong>
                Villa
              </strong>

              <span>
                DI BELLA VISTA
              </span>

            </div>

            <h3>
              {couple.venue}
            </h3>

            <p>
              {couple.location}
            </p>

            <a
              href={couple.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="outlineButton"
            >
              <MapPin size={15} />
              VIEW LOCATION
            </a>

          </div>

        </motion.section>

        {/* ==================================
            RSVP
        ================================== */}

        <motion.section
          className="section rsvp"
          id="rsvp"

          initial={{
            opacity: 0,
            y: 25,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{
            once: true,
            amount: 0.2,
          }}

          transition={{
            duration: 0.8,
          }}
        >

          <Heart className="sectionIcon" />

          <p className="eyebrow">
            KINDLY RESPOND
          </p>

          <h2>
            Will you <em>join us?</em>
          </h2>

          <p className="bodyCopy">
            Your presence would make our celebration
            even more special. Kindly let us know
            if you can join us.
          </p>

          <form onSubmit={handleRSVP}>

            <label>
              YOUR NAME

              <input
                type="text"
                placeholder="Enter your full name"
                value={guestName}

                onChange={(event) =>
                  setGuestName(event.target.value)
                }

                required
              />
            </label>

            <label>
              NUMBER OF GUESTS

              <select
                value={guestCount}

                onChange={(event) =>
                  setGuestCount(event.target.value)
                }
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
                <option value="6">6 Guests</option>
              </select>
            </label>

            <label>
              YOUR RESPONSE

              <select
                value={attendance}

                onChange={(event) =>
                  setAttendance(event.target.value)
                }
              >
                <option value="Joyfully accepts">
                  Joyfully accepts
                </option>

                <option value="Regretfully declines">
                  Regretfully declines
                </option>
              </select>
            </label>

            <button
              type="submit"
              className="submitButton"
            >
              <span>SEND RSVP</span>
              <Send size={15} />
            </button>

            {sent && (
              <p className="success">
                <CheckCircle2 size={17} />

                Your RSVP message has been prepared.
                Please complete sending it in WhatsApp.
              </p>
            )}

          </form>

        </motion.section>

        {/* ==================================
            GIFTS
        ================================== */}

        <motion.section
          className="section gifts"
          id="gifts"

          initial={{
            opacity: 0,
            y: 25,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{
            once: true,
            amount: 0.2,
          }}

          transition={{
            duration: 0.8,
          }}
        >

          <Gift className="sectionIcon" />

          <p className="eyebrow">
            A THOUGHTFUL NOTE
          </p>

          <h2>
            Your presence
            <br />
            is our <em>present</em>
          </h2>

          <p className="bodyCopy">
            Having you celebrate this special occasion
            with us is the greatest gift we could ask for.
            Your love, blessings and presence mean
            everything to us.
          </p>

        </motion.section>

        {/* ==================================
            FOOTER
        ================================== */}

        <footer className="footer">

          <div className="footerFlourish">
            ❦
          </div>

          <p className="eyebrow">
            THE BEGINNING OF FOREVER
          </p>

          <h2>
            {couple.groom}
            <i>&</i>
            {couple.bride}
          </h2>

          <p className="footerDate">
            {couple.weddingDate.toUpperCase()}
          </p>

          <div className="footerHeart">
            <Heart size={25} />
          </div>

          <p className="footerMessage">
            THANK YOU FOR BEING PART OF OUR STORY
          </p>

          <a href="#home" className="backTop">
            BACK TO TOP
            <ArrowUp size={13} />
          </a>

        </footer>

      </motion.div>

    </main>
  );
}
