import React, { useEffect, useState } from "react";

interface ChildComponentProps {
  children: React.ReactNode;
}

interface MainContextState {
  installprompt: Event | null; // Adjust the type to accept Event or null
}

export const Mcontext = React.createContext({ 
  install: null as Event | null // Type assertion to Event | null
});

export const MainContext = ({ children }: ChildComponentProps) => {
  const [state, setState] = useState<MainContextState>({
    installprompt: null,
  });

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      setState({ ...state, installprompt: e });
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []); // Ensure state is added to the dependency array if used inside the effect

  return (
    <div>
      <Mcontext.Provider value={{ install: state.installprompt }}>
        {children}
      </Mcontext.Provider>
    </div>
  );
};
