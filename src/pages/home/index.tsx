import React from "react";

import { useHistory } from "react-router-dom";
import { Header } from "../../layouts/header";
import { Button } from "../../components/button";
import { IconLink } from "../../components/iconLink";
import { CdoFinanceBlock } from "../../components/cdoFinanceBlock";
import { FadeInScroll } from "../../components/fadeIn";
import { typeFade } from "../../components/fadeIn/types";

import "./index.scss";

interface IDataButton {
  text: string;
  isHovered: boolean;
}
const mainButtonDummy: IDataButton[] = [
  { text: "Launch CDO", isHovered: true },
  { text: "Buy CODEX", isHovered: false },
  { text: "Documentation", isHovered: false },
];

const linkSrc: string[] = [
  'https://discord.gg/2BBEjQgXqH',
  'https://t.me/cdofinance',
  'https://twitter.com/CDOfinance',
  'https://medium.com/cdo-finance'
]

export function HomePage() {
  const history = useHistory();
  const [mainButtons, setMainButtons] = React.useState(mainButtonDummy);

  const handleButtonHover = (index: number) => {
    const buttons = mainButtons.map((btn, i) => {
      let data: IDataButton = { ...btn, isHovered: i === index };
      return data;
    });
    setMainButtons(buttons);
  };

  return (
    <div
      className="home"
      style={{ background: 'url("/images/home-background.svg") 0% 0% / cover' }}
    >
      <Header withBtn={false} />
      <article className="homeMain">
        <h1>Risk-Adjusted Yield Farming Protocol</h1>
        <p>
          Creating Optimal DeFi Yield Products for all through onchain
          structured finance
        </p>
        <div className="homeMainBtns">
          {mainButtons.map((btn, i) => (
            <Button
              onClick={
                i === 0 ? () => history.push("liquidity-pools") : 
                i === 1 ? () => window.open('https://exchange.pancakeswap.finance/#/swap?inputCurrency=0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c&outputCurrency=0x9e95cb3d0560f9cba88991f828322526851bfb56') :
                i === 2 ? () => window.open('https://app.gitbook.com/@cdo-finance/s/cdo-finance/') : undefined
              }
              onMouseEnter={() => handleButtonHover(i)}
              key={i}
              isMain={btn?.isHovered}
            >
              {btn?.text}
            </Button>
          ))}
        </div>
      </article>
      <div className="homeSocials">
        {[
          "/images/icons/discord.svg",
          "/images/icons/telegram.svg",
          "/images/icons/twitter.svg",
          "/images/icons/rounds.svg",
        ].map((icon, i) => (
          <IconLink key={i} imgSrc={icon} linkSrc={linkSrc[i]} />
        ))}
      </div>
      <CdoFinanceBlock />
      <FadeInScroll
        selectorClass="homeBot"
        type={typeFade.FadeIn}
        checkPoint={200}
      >
        <div className="homeBot">
          <div className="homeBotWrap">
            {["Leveraged Yield", "Risk Mitigation", "Custom Tenure"].map(
              (el, i) => (
                <div key={i} className="homeBotItem">
                  <img
                    src={`/images/icons/${el
                      .toLowerCase()
                      .split(" ")
                      .join("-")}.svg`}
                    alt="icon"
                  />
                  <div className="homeBotItemText">{el}</div>
                </div>
              )
            )}
          </div>
          <div className="homeBotWrap">
            {[
              "Inherent Insurance",
              "Asset Collateralisation",
              "Gas Efficient",
            ].map((el, i) => (
              <div key={i} className="homeBotItem">
                <img
                  src={`/images/icons/${el
                    .toLowerCase()
                    .split(" ")
                    .join("-")}.svg`}
                  alt="icon"
                />
                <div className="homeBotItemText">{el}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeInScroll>
      <FadeInScroll
        selectorClass="homeBottom"
        type={typeFade.FadeBottonUp}
        checkPoint={500}
      >
        <div className="homeBottom fade-in-up">
          {[
            "Community-Owned",
            "Fair Launch",
            "Bootstrapped (No investor!)",
          ].map((el, i) => (
            <div key={i} className="homeBottomItem">
              <img
                src={`/images/icons/${
                  i === 0 ? "community" : el.split(" ")[0].toLocaleLowerCase()
                }.svg`}
                alt="icon"
              />
              <div className="homeBottomItemText">{el}</div>
            </div>
          ))}
        </div>
      </FadeInScroll>
    </div>
  );
}
