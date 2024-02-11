import React, { useEffect, useState } from "react";
import { Alert, Button, Space } from 'antd';

interface ChildComponentProps {
  children: React.ReactNode;
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): void;
}

export interface MainContextState {
  installprompt: BeforeInstallPromptEvent | null; // Adjust the type to BeforeInstallPromptEvent or null
}

export const Mcontext = React.createContext({
  install: null as BeforeInstallPromptEvent | null // Adjust the type here too
});

export const MainContext = ({ children }: ChildComponentProps) => {
  const [state, setState] = useState<MainContextState>({
    installprompt: null
  });

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setState({ ...state, installprompt: e as BeforeInstallPromptEvent });
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, [state]);

  return (
    <div>
      <Mcontext.Provider value={{ install: state.installprompt }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert
            message="Install"
            description="You can add the app to your screen with the install button"
            type="info"
            action={
              <Space direction="vertical">
                <Button
                  size="small"
                  type="primary"
                  onClick={() => state.installprompt?.prompt()}
                >
                  Install
                </Button>
              </Space>
            }
            closable
          />
        </Space>
        {children}
      </Mcontext.Provider>
    </div>
  );
};
