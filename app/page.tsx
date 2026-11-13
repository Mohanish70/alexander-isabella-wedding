
"use client";

import { useRef, useState, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
} from "lucide-react";

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

export default function WeddingInvitation() {
  const [opened, setOpened] = useState(false);
  const [curtainsOpened, setCurtainsOpened] = useState(false);

  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("2");
  const [attendance, setAttendance] = useState("Joyfully accepts");
  const [sent, setSent] = useState(false);

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
        "Please add your wedding music file at public/music/wedding-music.mp3"
      );
    }
  };

  const handleRSVP = (event: FormEvent<HTMLFormElement>) => {
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

    window.open(whatsappLink, "_blank", "noopener,noreferrer");
    setSent(true);
  };

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

      {/* =========================================
          OPENING INVITATION
      ========================================= */}

      <AnimatePresence
        onExitComplete={() => setCurtainsOpened(true)}
      >
        {!opened && (
          <motion.div
            className="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: {
                duration: 0.8,
                delay: 1.6,
              },
            }}
          >
            {/* LEFT CURTAIN */}
            <motion.div
              className="curtain curtainLeft"
              initial={{ x: 0 }}
              exit={{ x: "-105%" }}
              transition={{
                duration: 2,
                delay: 0.2,
                ease: [0.76, 0, 0.24, 1],
              }}
            />

            {/* RIGHT CURTAIN */}
            <motion.div
              className="curtain curtainRight"
              initial={{ x: 0 }}
              exit={{ x: "105%" }}
              transition={{
                duration: 2,
                delay: 0.2,
                ease: [0.76, 0, 0.24, 1],
              }}
            />

            {/* DECORATIVE DETAILS */}
            <div className="introDecoration">
              <span>✧</span>
              <span>❦</span>
              <span>✧</span>
            </div>

            {/* INTRO CONTENT */}
            <motion.div
              className="introContent"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.5,
                ease: "easeOut",
              }}
            >
              <p className="eyebrow">
                A CELEBRATION OF LOVE
              </p>

              {/* A & I MONOGRAM */}
              <div className="monogram">
                <span>A</span>
                <i>&</i>
                <span>I</span>
              </div>

              <p className="introSubtitle">
                THE WEDDING OF
              </p>

              <h1 className="introNames">
                {couple.groom}
                <span> & </span>
                {couple.bride}
              </h1>

              <p className="introMessage">
                Together with their families, they invite you
                <br />
                to celebrate the beginning of their forever.
              </p>

              {/* OPEN BUTTON */}
              <button
                type="button"
                className="openButton"
                onClick={() => setOpened(true)}
              >
                <span>OPEN INVITATION</span>
                <Heart size={16} />
              </button>

              <p className="introBottom">
                WITH LOVE, ALWAYS
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================
          MAIN WEBSITE
      ========================================= */}

      <div className="site">

        {/* NAVIGATION */}
        <header className="topbar">
          <a href="#home" className="brand">
            A <span>&</span> I
          </a>


          <button
            type="button"
            className={`music ${musicOn ? "musicActive" : ""}`}
            onClick={toggleMusic}
            aria-label={musicOn ? "Pause music" : "Play music"}
          >
            <Music2 size={14} />
            <span>{musicOn ? "MUSIC ON" : "MUSIC"}</span>
          </button>
        </header>

        {/* =========================================
            HERO SECTION
        ========================================= */}

        <section className="hero" id="home">
          <div className="heroOrnament">
            <Flower2 size={38} strokeWidth={1} />
          </div>

          <motion.div
            className="heroContent"
            initial={{ opacity: 0, y: 20 }}
            animate={
              curtainsOpened
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 1,
              delay: 0.2,
              ease: "easeOut",
            }}
          >
            <p className="eyebrow">
              TOGETHER WITH THEIR FAMILIES
            </p>

            <h1>
              {couple.groom}
              <span className="heroAmp">&</span>
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
            initial={{ opacity: 0, y: 20 }}
            animate={
              curtainsOpened
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 1.2,
              delay: 0.4,
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

          {/* DATE: ONLY AFTER CURTAINS OPEN */}
          <motion.div
            className="datePill"
            initial={{ opacity: 0, y: 20 }}
            animate={
              curtainsOpened
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 1,
              delay: 0.3,
              ease: "easeOut",
            }}
          >
            <CalendarDays size={17} />
            <span>{couple.weddingDate}</span>
          </motion.div>

          <motion.p
            className="eyebrow"
            initial={{ opacity: 0 }}
            animate={
              curtainsOpened
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            transition={{ duration: 1, delay: 0.6 }}
            style={{ marginTop: 18 }}
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

        {/* =========================================
            WELCOME SECTION
        ========================================= */}

        <motion.section
          className="section welcome"
          id="welcome"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
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

        {/* =========================================
            OUR STORY
        ========================================= */}

        <motion.section
          className="section story"
          id="story"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
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
              <div className="storySparkle">✧</div>
              <div className="heartIllustration">♡</div>
              <span>FOREVER BEGINS HERE</span>
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

        {/* =========================================
            WEDDING EVENTS
        ========================================= */}

        <motion.section
          className="section events"
          id="events"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
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
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
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

                  <h3>{event.title}</h3>

                  <p>{event.description}</p>

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

        {/* =========================================
            VENUE
        ========================================= */}

        <motion.section
          className="section venue"
          id="venue"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
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
              <Flower2 size={35} strokeWidth={1} />

              <span>WELCOME TO</span>

              <strong>Villa</strong>

              <span>DI BELLA VISTA</span>
            </div>

            <h3>{couple.venue}</h3>

            <p>{couple.location}</p>

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

        {/* =========================================
            RSVP
        ========================================= */}

        <motion.section
          className="section rsvp"
          id="rsvp"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
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

        {/* =========================================
            GIFTS
        ========================================= */}

        <motion.section
          className="section gifts"
          id="gifts"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
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

        {/* =========================================
            FOOTER
        ========================================= */}

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
            BACK TO TOP <ArrowUp size={13} />
          </a>
        </footer>
      </div>
    </main>
  );
}
