import { createPortal } from "react-dom";
import { useEffect } from "react";
import UploadMenu from "./UploadMenu";
import { UploadMenuType } from "../../types/main";

const UploadMenuPortal = ({ setOpenFileMenu }: UploadMenuType) => {
  useEffect(() => {
    // Check if #portal-root exists, if not, create it dynamically
    const portalRoot = document.getElementById('portal-root');
    if (!portalRoot) {
      const newPortalRoot = document.createElement('div');
      newPortalRoot.id = 'portal-root';
      document.body.appendChild(newPortalRoot); // Append to body or any other container
    }
  }, []);

  return createPortal(
    <UploadMenu setOpenFileMenu={setOpenFileMenu} />,
    document.getElementById('portal-root') || document.body // Fallback to body if portal-root doesn't exist
  );
};

export default UploadMenuPortal;
