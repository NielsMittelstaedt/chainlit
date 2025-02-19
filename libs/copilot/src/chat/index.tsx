import { useEffect } from 'react';

import { useChatInteract, useChatSession } from '@chainlit/react-client';

import { IWidgetConfig } from '../types';
import ChatBody from './body';

interface Props {
  config: IWidgetConfig;
}

export default function ChatWrapper({ config }: Props) {
  const { connect, session } = useChatSession();
  const { sendMessage } = useChatInteract();
  useEffect(() => {
    if (session?.socket?.connected) return;
    connect({
      // @ts-expect-error window typing
      transports: window.transports,
      userEnv: {}
    });
  }, [connect]);

  useEffect(() => {
    // @ts-expect-error is not a valid prop
    window.sendChainlitMessage = sendMessage;
  }, [sendMessage]);

  return <ChatBody widgetConfig={config} />;
}
