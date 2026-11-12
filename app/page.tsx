
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Clock,
  Heart,
  Gift,
  Music2,
  CheckCircle2,
  Flower2,
  Sparkles,
  ChevronDown,
  Mail,
  Camera,
  Stars,
} from "lucide-react";

// ==========================================
// 1. COUPLE DETAILS
// ==========================================

const couple = {
  groom: "Alexander",
  bride: "Isabella",
  groomFull: "Alexander James",
  brideFull: "Isabella Rose",
  date: "18 September 2027",
  venue: "Villa di Bella Vista",
  address: "Tuscany, Italy",
  mapUrl: "https://maps.google.com/?q=Tuscany+Italy",
  whatsapp: "", // Add WhatsApp number with country code, e.g. 919876543210
};

// ==========================================
// 2. WEDDING EVENTS
// ==========================================

const events = [
  {
    day: "16 SEP",
    title: "Welcome Dinner",
    time: "7:00 PM onwards",
    place: "Villa Garden",
    note: "An elegant evening of fine dining, music and celebration.",
    icon: "✧",
  },
  {
    day: "17 SEP",
    title: "Garden Party",
    time: "4:00 PM onwards",
    place: "The Rose Garden",
    note: "An afternoon filled with laughter, flowers and beautiful memories.",
    icon: "❀",
  },
  {
    day: "18 SEP",
    title: "The Wedding Ceremony",
    time: "5:30 PM",
    place: "Villa di Bella Vista",
    note: "Two souls, one heart, and a lifetime of love.",
    icon: "♡",
  },
  {
    day: "19 SEP",
    title: "Grand Reception",
    time: "7:30 PM onwards",
    place: "The Grand Ballroom",
    note: "Let's celebrate a beautiful beginning together.",
    icon: "✧",
  },
];

// ==========================================
// 3. MAIN INVITATION COMPONENT
// ==========================================

export default function Invitation() {
  const [opened, setOpened] = useState(false);
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("2");
  const [attendance, setAttendance] = useState("Joyfully accepts");
  const [sent, setSent] = useState(false);
  const [musicOn, setMusicOn] = useState(false);

  // ========================================
  // 4. WHATSAPP RSVP FUNCTION
  // ========================================

  function sendRsvp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const message = [
      "Wedding RSVP",
      `Name: ${name}`,
      `Attendance: ${attendance}`,
      `Guests: ${guests}`,
      `Wedding: ${couple.groom} & ${couple.bride}`,
    ].join("\n");

    const phone = couple.whatsapp.replace(/\D/g, "");

    const url = phone
      ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  // ========================================
  // 5. WEBSITE CONTENT
  // ========================================

  return (
    <main>

      {/* ===================================
          OPENING CURTAIN SCREEN
      =================================== */}

      <AnimatePresence>
        {!opened && (
          <motion.div
            className="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >

            <motion.div
              className="curtain curtainLeft"
              initial={{ x: 0 }}
              exit={{ x: "-105%" }}
              transition={{ duration: 2, delay: 0.2 }}
            />

            <motion.div
              className="curtain curtainRight"
              initial={{ x: 0 }}
              exit={{ x: "105%" }}
              transition={{ duration: 2, delay: 0.2 }}
            />

            <motion.div
              className="introContent"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              <span className="eyebrow">
                A CELEBRATION OF LOVE
              </span>

              <div className="monogram">
                A <i>&</i> I
              </div>

              <p>THE WEDDING OF</p>

              <h1>
                {couple.groom}
                <span> & </span>
                {couple.bride}
              </h1>

              <button
                className="openButton"
                onClick={() => setOpened(true)}
              >
                Open Invitation
                <Heart size={15} />
              </button>

              <small>{couple.date}</small>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================
          MAIN WEBSITE
      =================================== */}

      <div className="site">

        {/* NAVIGATION */}

        <header className="topbar">

          <span className="brand">
            {couple.groom} & {couple.bride}
          </span>

          <button
            className="music"
            onClick={() => setMusicOn(!musicOn)}
            aria-label="Toggle music"
          >
            <Music2 size={16} />

            {musicOn ? "Music on" : "Music"}
          </button>

        </header>

        {/* =================================
            HERO / WEDDING COVER
        ================================= */}

        <section className="hero">

          <div className="heroOrnament">
            ❧
          </div>

          <p className="eyebrow">
            TOGETHER WITH THEIR FAMILIES
          </p>

          <h1>
            {couple.groom}
            <span className="amp">&</span>
            {couple.bride}
          </h1>

          <p className="heroLine">
            invite you to celebrate
            the beginning of their forever
          </p>

          <div className="datePill">
            <CalendarDays size={16} />
            {couple.date}
          </div>

          {/* CSS PALACE ILLUSTRATION */}

          <div
            className="houseArt"
            role="img"
            aria-label="Illustrated romantic wedding palace"
          >

            <div className="sun" />

            <div className="palace">

              <div className="roof roofMain" />

              <div className="dome" />

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
              <span>✿</span>
              <span>❀</span>
              <span>✿</span>
              <span>❀</span>
              <span>✿</span>
            </div>

          </div>

          <div className="scrollHint">
            SCROLL TO EXPLORE
            <ChevronDown size={18} />
          </div>

        </section>

        {/* =================================
            WELCOME SECTION
        ================================= */}

        <section className="section welcome">

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
            Some moments become memories,
            and some memories become forever.
            As we begin this beautiful new chapter,
            we would be delighted to have you by our side.
          </p>

          <div className="signature">
            With love,

            <strong>
              {couple.groom} & {couple.bride}
            </strong>
          </div>

        </section>

        {/* =================================
            OUR LOVE STORY
        ================================= */}

        <section className="section story">

          <p className="eyebrow">
            THE BEGINNING OF FOREVER
          </p>

          <h2>
            Our <em>Story</em>
          </h2>

          <div className="storyCard">

            <div className="storyImage">

              <div className="heartIllustration">
                ♡
              </div>

              <span>
                two hearts, one beautiful story
              </span>

            </div>

            <p>
              What started as a beautiful meeting
              became a thousand little reasons to smile.
              Through every conversation, every adventure
              and every dream, we found our favourite
              person in each other.
            </p>

            <p>
              Now, with our families and favourite people
              around us, we cannot wait to say
              "I do".
            </p>

            <div className="signature">
              Forever begins with you.
            </div>

          </div>

        </section>

        {/* =================================
            WEDDING EVENTS
        ================================= */}

        <section className="section events">

          <p className="eyebrow">
            SAVE THE DATES
          </p>

          <h2>
            The Wedding
            <em> Celebrations</em>
          </h2>

          <p className="bodyCopy">
            A few special moments,
            made even more special with you.
          </p>

          <div className="timeline">

            {events.map((event, index) => (

              <motion.article
                className="eventCard"
                key={event.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
              >

                <div className="eventDate">
                  {event.day}
                </div>

                <div className="eventDetails">

                  <span className="eventNumber">
                    0{index + 1}
                  </span>

                  <h3>
                    {event.icon} {event.title}
                  </h3>

                  <p>
                    {event.note}
                  </p>

                  <div className="eventMeta">

                    <span>
                      <Clock size={14} />
                      {event.time}
                    </span>

                    <span>
                      <MapPin size={14} />
                      {event.place}
                    </span>

                  </div>

                </div>

              </motion.article>

            ))}

          </div>

        </section>

        {/* =================================
            VENUE SECTION
        ================================= */}

        <section className="section venue">

          <MapPin className="sectionIcon" />

          <p className="eyebrow">
            WHERE THE MAGIC HAPPENS
          </p>

          <h2>
            Meet us <em>there</em>
          </h2>

          <div className="venueCard">

            <div className="venueArtwork">
              ✧
              <br />
              THE
              <br />
              <b>ROYAL</b>
              <br />
              CELEBRATION
              <br />
              ✧
            </div>

            <h3>
              {couple.venue}
            </h3>

            <p>
              {couple.address}
            </p>

            <a
              className="outlineButton"
              href={couple.mapUrl}
              target="_blank"
              rel="noreferrer"
            >
              VIEW ON MAP
              <MapPin size={14} />
            </a>

          </div>

        </section>

        {/* =================================
            RSVP SECTION
        ================================= */}

        <section className="section rsvp">

          <Heart className="sectionIcon" />

          <p className="eyebrow">
            KINDLY REPLY
          </p>

          <h2>
            Will you <em>join us?</em>
          </h2>

          <p className="bodyCopy">
            Your presence is the greatest gift.
            Please let us know if you can
            celebrate with us.
          </p>

          <form onSubmit={sendRsvp}>

            <label>
              Your name

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </label>

            <label>
              Number of guests

              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
              </select>
            </label>

            <label>
              Your response

              <select
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
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
              className="submitButton"
              type="submit"
            >
              SEND RSVP
              <Heart size={15} />
            </button>

            {sent && (

              <p className="success">
                <CheckCircle2 size={16} />
                WhatsApp RSVP opened.
                Please send your message there.
              </p>

            )}

          </form>

        </section>

        {/* =================================
            GIFT SECTION
        ================================= */}

        <section className="section gifts">

          <Gift className="sectionIcon" />

          <p className="eyebrow">
            YOUR BLESSINGS ARE ENOUGH
          </p>

          <h2>
            Gifts & <em>good wishes</em>
          </h2>

          <p className="bodyCopy">
            Your love, blessings and presence
            are all we could ever ask for.
            Thank you for being part of our story.
          </p>

        </section>

        {/* =================================
            FINAL FOOTER
        ================================= */}

        <footer>

          <div className="footerFlourish">
            ❧
          </div>

          <p>
            WITH LOVE AND GRATITUDE
          </p>

          <h2>
            {couple.groom}
            <i> & </i>
            {couple.bride}
          </h2>

          <span>
            {couple.date}
          </span>

          <div className="footerHeart">
            ♡
          </div>

          <p className="footerMessage">
            WE CAN'T WAIT TO CELEBRATE WITH YOU
          </p>

        </footer>

      </div>

    </main>
  );
}
