import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useMeQuery, useStaticQuery } from "../../context/service/me.service";
import { useSelector } from "react-redux";
import { TonConnectButton } from "@tonconnect/ui-react";

export const Home = () => {
  const { data: me = null } = useMeQuery();
  const lang = me?.language_code || "ru";
  const { data: staticData = null } = useStaticQuery(lang);
  const loading = useSelector((state) => state.loading);
  if (loading)
    return (
      <div className="loading-home">
        <p>{lang === "ru" ? "Загрузка..." : "Loading..."}</p>
      </div>
    );

  return (
    <>
      <div className="page home animate__animated animate__fadeIn">
        <div className="page__header">
          <h1>{staticData?.main_title}</h1>
          <TonConnectButton />
        </div>

        <div className="wallet_info">
          <h1>
            <img src="/icon/wallet-icon.svg" alt="" />
            <span>{staticData?.your_balance}</span>
          </h1>

          <h2>
            {me?.balance || 0} {staticData?.token_symbol}
          </h2>
        </div>

        <ol className="home__list">
          <li>
            <Link to="/task">
              <span>
                <img src="/icon/task-icon.svg" alt="" />
                <span>{staticData?.tasks}</span>
              </span>

              <MdOutlineArrowForwardIos />
            </Link>
          </li>
          <li>
            <Link to="/charging">
              <span>
                <img src="/icon/location-icon.svg" alt="" />
                <span>{staticData?.to_chargers}</span>
              </span>

              <MdOutlineArrowForwardIos />
            </Link>
          </li>
          <li>
            <Link to="/about">
              <span>
                <img src="/icon/openbook-icon.svg" alt="" />
                <span>{staticData?.about_project}</span>
              </span>

              <MdOutlineArrowForwardIos />
            </Link>
          </li>
        </ol>
      </div>
    </>
  );
};
