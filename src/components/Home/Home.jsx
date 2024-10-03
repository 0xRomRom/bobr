import React, { useEffect } from "react";
import stl from "./Home.module.css";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { TbLockCheck } from "react-icons/tb";
import { GiBurningSkull } from "react-icons/gi";
import { AiFillPrinter } from "react-icons/ai";
import { FaExchangeAlt } from "react-icons/fa";
import { RiNumbersFill } from "react-icons/ri";
import { FaTheaterMasks } from "react-icons/fa";
import { GiCapybara } from "react-icons/gi";
import { FaPeopleCarry } from "react-icons/fa";
import { FaSyringe } from "react-icons/fa";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Marquee from "react-fast-marquee";
import { FaRegCopy } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion

const memes = [
  // "../Meme1.jpg",
  "../Meme2.jpeg",
  "../Meme4.jpg",
  // "../Meme5.jpeg",
  "../Meme6.jpg",
  "../Meme7.jpg",
  "../Meme8.jpeg",
  "../Meme3.jpg",
  // "../Meme18.jpeg",
  "../Meme9.jpeg",
  "../Meme10.jpg",
  "../Meme11.webp",
  "../Meme16.jpg",
  // "../Meme14.jpeg",
  "../Meme12.jpeg",
  // "../Meme13.jpeg",
  "../Meme15.jpg",
  "../Meme20.jpg",
  "../Meme17.jpg",
  "../Meme19.jpg",
  "../Meme21.jpeg",
  "../Meme22.jpeg",
  "../Meme24.jpg",
  "../Meme23.jpg",
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
      const duration = Math.random() * 3 + 2; // 2 to 5 seconds
      span.style.animationDuration = `${duration}s`;

      kurwaContainer.appendChild(span);

      // Remove and regenerate when out of view
      setTimeout(() => {
        kurwaContainer.removeChild(span);
        createFallingSpan(); // Create a new one
      }, duration * 1000); // Corresponds to the fall duration
    };

    // Generate multiple spans
    for (let i = 0; i < 7; i++) {
      createFallingSpan();
    }
  }, []);

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={stl.home}>
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
            <h2>$BOBR CTO</h2>
            <div className={stl.marqueeWrap}>
              <Marquee speed={300}>
                <div className={stl.box}>
                  <TbLockCheck className={stl.icon} />
                  <span>Renounced</span>
                </div>
                <div className={stl.box}>
                  <GiBurningSkull className={stl.icon} />
                  <span>Liquidity Burned</span>
                </div>
                <div className={stl.box}>
                  <AiFillPrinter className={stl.icon} />
                  <span>
                    Mint Authority
                    <br /> Revoked
                  </span>
                </div>
                <div className={stl.box}>
                  <FaExchangeAlt className={stl.icon} />
                  <span>
                    100% Tokens
                    <br /> Circulating
                  </span>
                </div>
                <div className={stl.box}>
                  <RiNumbersFill className={stl.icon} />
                  <span>
                    Increasing
                    <br /> Holder Count
                  </span>
                </div>
                <div className={stl.box}>
                  <GiCapybara className={stl.icon} />
                  <span>
                    Cutest Rodent
                    <br /> On Solana
                  </span>
                </div>
                <div className={stl.box}>
                  <FaTheaterMasks className={stl.icon} />
                  <span>
                    Transparency
                    <br /> Since Day 1
                  </span>
                </div>
                <div className={stl.box}>
                  <FaPeopleCarry className={stl.icon} />
                  <span>
                    Active
                    <br /> Community
                  </span>
                </div>
                <div className={stl.box}>
                  <FaSyringe className={stl.icon} />
                  <span>
                    Team On
                    <br /> Steroids
                  </span>
                </div>
              </Marquee>
            </div>
          </div>

          <div className={stl.kurwaContainer}></div>
        </section>

        <section className={stl.lore}>
          <div className={stl.scrollWrapper}>
            <div className={stl.wrapper}>
              <p className={stl.stickyText}>
                Once upon a time in Poland, a playful beaver became an
                unexpected internet star. A video went viral featuring a man
                filming the beaver and shouting, "KURWA BÓBR!" ("F*cking
                Beaver!" in Polish).
                <br /> <br /> The man's exasperated yet amused reaction struck a
                chord, and the beaver's unbothered demeanor turned the clip into
                a sensation. The phrase "KURWA BÓBR!" quickly became a meme,
                inspiring countless fan art, remixes, and parody videos. The
                beaver and the now-iconic expression became symbols of the
                internet's love for the absurd and hilarious, making him a
                beloved figure across the web and a testament to how the
                simplest moments can bring people together through humor.
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

        <section className={stl.howtobuy}>
          <div className={stl.stickyBox}>
            <div className={stl.blackBox}></div>
            <h2 className={stl.howToHero}>How To Buy $BOBR</h2>
          </div>
          <div className={stl.modalStack}>
            <motion.div
              className={stl.stackModal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={modalVariants}
              transition={{ duration: 0.6 }}
            >
              <div className={stl.innerModal}>
                <h2>Step 1 )</h2>
                <p>Create a Solana wallet.</p>

                <p>
                  Head over to{" "}
                  <a
                    className={stl.phantomAnchor}
                    href="https://chromewebstore.google.com/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa?pli=1"
                    target="_blank"
                  >
                    phantom.app
                  </a>{" "}
                  and install the browser extension. Follow the instructions to
                  create your own Solana wallet.
                </p>
              </div>
              <div className={stl.coble}></div>
            </motion.div>

            <motion.div
              className={stl.stackModal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={modalVariants}
              transition={{ duration: 0.6 }}
            >
              <div className={stl.innerModal}>
                <h2>Step 2 )</h2>
                <p>Fund your wallet with Solana.</p>
                <p>
                  Find an exchange in your region that allows for your favorite
                  Fiat to crypto transfer methods, and proceed to purchase
                  Solana. After purchase transfer the Solana to your Phantom
                  wallet.
                </p>
              </div>
              <div className={stl.coble}></div>
            </motion.div>

            <motion.div
              className={stl.stackModal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={modalVariants}
              transition={{ duration: 0.6 }}
            >
              <div className={stl.innerModal}>
                <h2>Step 3 )</h2>
                <p>Find the right buy opportunity.</p>
                <p>
                  Now that you're setup, ready to buy $BOBR, let's find you a
                  good price entry.
                </p>
                <p>
                  Head over to{" "}
                  <a
                    className={stl.phantomAnchor}
                    href="https://dexscreener.com/solana/ffxegwvrxnabkgppp2gvmfbemnaijqejaffbqjiuav6s"
                    target="_blank"
                  >
                    Dexscreener
                  </a>{" "}
                  and find out about the current market's state.
                </p>
              </div>
              <div className={stl.coble}></div>
            </motion.div>

            <motion.div
              className={stl.stackModal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={modalVariants}
              transition={{ duration: 0.6 }}
            >
              <div className={stl.innerModal}>
                <h2>Step 4 )</h2>
                <p>Buy $BOBR.</p>
                <p>
                  Found a dip? Let's buy it! Head over to{" "}
                  <a
                    className={stl.phantomAnchor}
                    href="https://jup.ag/swap/SOL-ET1FZVF2F33PfY2hLyK6EJ2p4x6dbkva4YBkULFdpump"
                    target="_blank"
                  >
                    Jupiter Exchange
                  </a>{" "}
                  and purchase the desired amount of $BOBR while it's cheap.
                </p>
              </div>
              <div className={stl.coble}></div>
            </motion.div>
            <motion.div
              className={stl.stackModal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={modalVariants}
              transition={{ duration: 0.6 }}
            >
              <div className={stl.innerModal}>
                <h2>Step 5 )</h2>
                <p>There is no step 5, welcome!</p>
                <p>
                  BOBR loves you and welcomes you to their friendly community on{" "}
                  <a
                    href="https://t.me/bobrportal"
                    className={stl.phantomAnchor}
                  >
                    {" "}
                    telegram
                  </a>
                  .
                </p>
              </div>
              <div className={stl.coble}></div>
            </motion.div>
          </div>
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
              <span className={stl.kurwaSpan}>BOBR</span>
              <span className={stl.kurwaSpan}>BOBR</span>
              <span className={stl.kurwaSpan}>BOBR</span>
              <span className={stl.kurwaSpan}>BOBR</span>
              <span className={stl.kurwaSpan}>BOBR</span>
              <span className={stl.kurwaSpan}>BOBR</span>
              <span className={stl.kurwaSpan}>BOBR</span>
              <span className={stl.kurwaSpan}>BOBR</span>
              <span className={stl.kurwaSpan}>BOBR</span>
              <span className={stl.kurwaSpan}>BOBR</span>
              <span className={stl.kurwaSpan}>BOBR</span>
              <span className={stl.kurwaSpan}>BOBR</span>
              <span className={stl.kurwaSpan}>BOBR</span>
              <span className={stl.kurwaSpan}>BOBR</span>
              <span className={stl.kurwaSpan}>BOBR</span>
              <span className={stl.kurwaSpan}>BOBR</span>
              <span className={stl.kurwaSpan}>BOBR</span>
              <span className={stl.kurwaSpan}>BOBR</span>
              <span className={stl.kurwaSpan}>BOBR</span>
              <span className={stl.kurwaSpan}>BOBR</span>
            </Marquee>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
