import React, { useState, useRef } from "react";
import "./about.css";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useGetUserTaskByTaskIdQuery } from "../../context/service/task.service";
import { useMeQuery, useStaticQuery } from "../../context/service/me.service";
import { useGetHtmlQuery } from "../../context/service/task.service";
import { usePostTaskSelfConfirmMutation } from "../../context/service/task.service";
import { useTonAddress, TonConnectButton } from "@tonconnect/ui-react";
import { Mousedown } from "../../utils/close";
import { IoMdClose } from "react-icons/io";
import { enqueueSnackbar as EnSn } from "notistack";

export const About = () => {
  const [postTaskSelfConfirm] = usePostTaskSelfConfirmMutation();
  const navigate = useNavigate();
  const back = () => navigate(-1);

  const { data: me = null } = useMeQuery();
  const lang = me?.language_code || "ru";
  const { data: staticData = null } = useStaticQuery(lang);
  const { data: task = null } = useGetUserTaskByTaskIdQuery("6");

  const html = useGetHtmlQuery(`${lang}-${task?.other}`);
  const htmlString = html?.error?.data;
  const [wallet, setWallet] = useState(false);
  const modalRef = useRef(null);
  Mousedown({ modalRef: modalRef, onClose: () => setWallet(false) });

  // convert html string to html
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(htmlString, "text/html");
  const htmlElement = htmlDoc.body;
  const und = String(htmlElement.innerHTML) === "undefined";
  const userFriendlyAddress = useTonAddress();
  const access = userFriendlyAddress || null;

  const selfConfirm = async () => {
    if (task?.is_complite) return navigate(-1);

    if (!access) {
      return setWallet(true);
    }

    const setData = { task_id: 1, result: access };
    const { error } = await postTaskSelfConfirm(setData);
    if (error) return EnSn("Ошибка", { variant: "error" });
    EnSn("Успешно", { variant: "success" });
    return navigate(-1);
  };

  if (und)
    return (
      <div className="page confirm animate__animated animate__fadeIn">
        <div className="page__header">
          <h1>{staticData?.main_title}</h1>
          <button onClick={back}>
            <IoArrowBack />
          </button>
        </div>
        <div className="confirm__content">
          <p>{me?.language_code === "ru" ? "Загрузка..." : "Loading..."}</p>
        </div>
      </div>
    );

  return (
    <>
      <div className="page confirm animate__animated animate__fadeIn">
        <div className="page__header">
          <h1>{staticData?.main_title}</h1>
          <button onClick={back}>
            <IoArrowBack />
          </button>
        </div>
        <div
          className="confirm__content"
          dangerouslySetInnerHTML={{ __html: htmlElement.innerHTML }}
        />

        <button onClick={selfConfirm}>{staticData?.thanks_understand}</button>
      </div>
      <div className={"connect_to_ton" + (wallet ? " open" : "")}>
        <div ref={modalRef} className="connect_to_ton__content">
          <div>
            <h1>{lang === "ru" ? "Подключить кошелек" : "Connect wallet"}</h1>

            <button onClick={() => setWallet(false)}>
              <IoMdClose />
            </button>
          </div>
          <TonConnectButton />
        </div>
      </div>
    </>
  );
};
