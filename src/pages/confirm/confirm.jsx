import React, { useState, useRef } from "react";
import "./confirm.css";
import { useParams } from "react-router-dom";
import { useGetHtmlQuery } from "../../context/service/task.service";
import { useGetUserTaskQuery } from "../../context/service/task.service";
import { useNavigate } from "react-router-dom";
import { usePostTaskSelfConfirmMutation } from "../../context/service/task.service";
import { useTonAddress } from "@tonconnect/ui-react";
import { enqueueSnackbar as EnSn } from "notistack";
import { IoMdClose } from "react-icons/io";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Mousedown } from "../../utils/close";
import { IoArrowBack } from "react-icons/io5";
import { useMeQuery, useStaticQuery } from "../../context/service/me.service";
import { useSelector } from "react-redux";

export const Confirm = () => {
  const navigate = useNavigate();
  const { data: me = null } = useMeQuery();
  const lang = me?.language_code || "ru";
  const { data: staticData = null } = useStaticQuery(lang);
  const { id } = useParams();
  const { data: task = null } = useGetUserTaskQuery(id);

  const back = () => navigate(-1);

  const html = useGetHtmlQuery(`${lang}-${task?.other}`);
  const htmlString = html?.error?.data;

  const [postTaskSelfConfirm] = usePostTaskSelfConfirmMutation();
  const [wallet, setWallet] = useState(false);
  const modalRef = useRef(null);
  Mousedown({ modalRef: modalRef, onClose: () => setWallet(false) });
  const loading = useSelector((state) => state.loading);

  // convert html string to html
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(htmlString, "text/html");
  const htmlElement = htmlDoc.body;
  const und = String(htmlElement.innerHTML) === "undefined";

  const userFriendlyAddress = useTonAddress();
  const access = userFriendlyAddress || null;

  const selfConfirm = async () => {
    if (task.is_complite) return navigate(-1);

    if (task.type === "connectToTon") {
      if (!access) {
        return setWallet(true);
      }
    }

    const setData = { task_id: id, result: access || "1" };
    const { error } = await postTaskSelfConfirm(setData);
    if (error) return EnSn("Ошибка", { variant: "error" });
    EnSn("Успешно", { variant: "success" });
    return navigate(-1);
  };

  if (und)
    return (
      <div className="page confirm animate__animated animate__fadeIn">
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
          style={{ display: !loading ? "flex" : "none" }}
          className="confirm__content"
          dangerouslySetInnerHTML={{ __html: htmlElement.innerHTML }}
        />

        <button
          style={{ display: !loading ? "block" : "none" }}
          onClick={selfConfirm}
        >
          {staticData?.thanks_understand}
        </button>
      </div>
      <div className={"connect_to_ton" + (wallet ? " open" : "")}>
        <div ref={modalRef} className="connect_to_ton__content">
          <div>
            <h1>
              {lang === "ru" ? "Подключение к TON" : "Connect wallet to TON"}
            </h1>

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
