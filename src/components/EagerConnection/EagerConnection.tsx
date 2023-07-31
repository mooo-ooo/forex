import { ReactNode, useEffect } from "react";
import { useAccount, useConnect } from "wagmi";

const EagerConnectionWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { connect, connectors, pendingConnector } = useConnect();
  const { isDisconnected } = useAccount();

  useEffect(() => {
    if (!isDisconnected) return;

    // if wagmi.connected set to true, then wagmi will not show modal
    // to reconnect user wallet, but instead will use prev connection
    // I found this example in this public repo: https://github.com/sumicet/web3auth-modal-wagmi
    const wagmiConnected = localStorage.getItem("wagmi.connected");
    const isWagmiConnected = wagmiConnected
      ? JSON.parse(wagmiConnected)
      : false;

    if (!isWagmiConnected) return;
    connect({ connector: connectors[0] });
  }, [connect, connectors]);

  return <>{children}</>;
};

export default EagerConnectionWrapper