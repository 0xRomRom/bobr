import React, { useEffect } from "react";
import stl from "./Home.module.css";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Marquee from "react-fast-marquee";
import { FaRegCopy } from "react-icons/fa";

const memes = [
  "../Meme1.jpeg",
  "../Meme2.jpeg",
  "../Meme4.jpg",
  "../Meme5.jpeg",
  "../Meme6.jpeg",
  "../Meme7.jpg",
  "../Meme8.jpeg",
  "../Meme3.jpg",
  "../Meme18.jpeg",
  "../Meme9.jpeg",
  "../Meme10.jpg",
  "../Meme11.webp",
  "../Meme16.jpg",
  "../Meme14.jpeg",
  "../Meme12.jpeg",
  "../Meme13.jpeg",
  "../Meme15.jpg",
  "../Meme20.jpg",
  "../Meme17.jpg",
  "../Meme19.jpg",
  "../Meme21.jpeg",
  "../Meme22.jpeg",
  "../Meme23.jpg",
  "../Meme24.jpg",
  "../Meme25.webp",
];

const Home = () => {
  const copyBotWallet = () => {
    navigator.clipboard
      .writeText("ET1FZVF2F33PfY2hLyK6EJ2p4x6dbkva4YBkULFdpump")
      .then(() => {
        alert(`KURWA!`);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  useEffect(() => {
    const kurwaContainer = document.querySelector(`.${stl.kurwaContainer}`);

    const createFallingSpan = () => {
      const span = document.createElement("span");
      span.classList.add(stl.kurwa);
      span.innerText = "KURWA";

      // Random horizontal position
      span.style.left = `${Math.random() * 100}%`;

      // Random speed for each span
      const duration = Math.random() * 7 + 2; // 2 to 5 seconds
      span.style.animationDuration = `${duration}s`;

      kurwaContainer.appendChild(span);

      // Remove and regenerate when out of view
      setTimeout(() => {
        kurwaContainer.removeChild(span);
        createFallingSpan(); // Create a new one
      }, duration * 1000); // Corresponds to the fall duration
    };

    // Generate multiple spans
    for (let i = 0; i < 10; i++) {
      createFallingSpan();
    }
  }, []);

  return (
    <div className={stl.home}>
      <nav>
        <button onClick={() => window.open("https://x.com/bobrCTO", "_blank")}>
          <FaXTwitter />
        </button>
        <button
          onClick={() => window.open("https://t.me/bobrportal", "_blank")}
        >
          <FaTelegramPlane />
        </button>
      </nav>
      <header>
        <div className={stl.centerbox}>
          <h1 className={stl.headertitle}>Solana's Friendliest Rodent</h1>
          <button
            className={stl.buyCta}
            onClick={() =>
              window.open(
                "https://jup.ag/swap/SOL-ET1FZVF2F33PfY2hLyK6EJ2p4x6dbkva4YBkULFdpump",
                "_blank"
              )
            }
          >
            Buy $BOBR
          </button>
          <span className={stl.copy} onClick={copyBotWallet}>
            ET1FZVF2F33PfY2hLyK6EJ2p4x6dbkva4YBkULFdpump <FaRegCopy />
          </span>
        </div>
      </header>
      <main>
        <section className={stl.cutestMeme}>
          <div className={stl.content}>
            <h2>BOBR CTO</h2>
            <div className={stl.boxWrapper}>
              <div className={stl.checkBox}>
                <h3 className={stl.check}>
                  <FaCheck className={stl.checksize} /> Fair Launched
                </h3>
                <h3 className={stl.check}>
                  <FaCheck className={stl.checksize} /> Organic Since Day 1
                </h3>
                <h3 className={stl.check}>
                  <FaCheck className={stl.checksize} /> 100% Community Driven
                </h3>
                <h3 className={stl.check}>
                  <FaCheck className={stl.checksize} /> Cutest Rodent on Solana
                </h3>
              </div>
              <img src="../Bobr.jpeg" alt="BOBR" className={stl.bobrImg} />
              <div className={stl.checkBox}>
                <h3 className={stl.redCheck}>
                  <ImCross className={stl.cross} /> No False Promises
                </h3>
                <h3 className={stl.redCheck}>
                  <ImCross className={stl.cross} /> No Unlocks
                </h3>
                <h3 className={stl.redCheck}>
                  <ImCross className={stl.cross} /> No Cabal
                </h3>
                <h3 className={stl.redCheck}>
                  <ImCross className={stl.cross} /> No KOLs
                </h3>
              </div>
            </div>
          </div>

          <div className={stl.kurwaContainer}></div>
        </section>
        <section className={stl.lore}>
          <div className={stl.scrollWrapper}>
            <div className={stl.wrapper}>
              <p className={stl.stickyText}>
                Once upon a time in Poland, a playful beaver named Bobr became a
                surprising internet star. People loved his silly actions and
                funny personality. Bobr was known for his over-the-top
                expressions and for getting into the craziest situations. He
                turned boring moments into funny adventures, like trying to
                build a dam using household items and hosting a cooking show
                with only river weeds. As he became more popular, Bobr
                symbolized fun and laughter, bringing people together through
                humor and creativity. He inspired countless memes, fan art, and
                videos that celebrated his quirky charm, making him a beloved
                character online.
              </p>
            </div>
            <img src="../Kurwa.webp" alt="Kurwa" className={stl.kurwaImg} />
          </div>
        </section>
        <section className={stl.memes}>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gutter="16px">
              {memes.map((meme) => (
                <img src={meme} key={meme} alt="Meme" className={stl.memeImg} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </section>
        <section className={stl.markets}>
          <div className={stl.marqueeBox}>
            <Marquee speed={300}>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
            </Marquee>
          </div>
          <div className={stl.joinBox}>
            <h2 className={stl.joinTitle}>Join $BOBR Today</h2>
            <div className={stl.linksBar}>
              <button
                className={stl.actionCta}
                onClick={() =>
                  window.open(
                    "https://jup.ag/swap/SOL-ET1FZVF2F33PfY2hLyK6EJ2p4x6dbkva4YBkULFdpump",
                    "_blank"
                  )
                }
              >
                <img src="../Jupiter.png" alt="Jupiter" className={stl.icon} />
              </button>
              <button
                className={stl.actionCta}
                onClick={() =>
                  window.open(
                    "https://dexscreener.com/solana/ffxegwvrxnabkgppp2gvmfbemnaijqejaffbqjiuav6s",
                    "_blank"
                  )
                }
              >
                <img
                  src="../Dexscreener.jpeg"
                  alt="Dexscreener"
                  className={stl.icon}
                />
              </button>
              <button
                className={stl.actionCta}
                onClick={() => window.open("https://x.com/bobrCTO", "_blank")}
              >
                <FaXTwitter />
              </button>
              <button
                className={stl.actionCta}
                onClick={() => window.open("https://t.me/bobrportal", "_blank")}
              >
                <FaTelegramPlane />
              </button>
              <img src="../BobrKurwa.png" alt="Bobr" className={stl.bg} />
            </div>
          </div>
          <div className={stl.marqueeBox2}>
            <Marquee speed={300} direction="right">
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
              <span className={stl.kurwaSpan}>KURWA</span>
            </Marquee>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
