import React from "react";
import DefinitionInWebViewModal from "./DefinitionInWebViewModal";
import InfoModals from "./InfoModals";
import OnPressModals from "./OnPressModals";
import WebViewModal from "./WebViewModal";
import NewWordAddedModal from "./NewWordAddedModal";

const AppModals = () => {
  return (
    <>
      <InfoModals />
      <OnPressModals />
      <DefinitionInWebViewModal />
      <WebViewModal />
      <NewWordAddedModal />
    </>
  );
};

export default AppModals;
