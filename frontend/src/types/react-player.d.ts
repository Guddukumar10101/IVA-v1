declare module "react-player" {
  import * as React from "react";

  interface ReactPlayerProps {
    url: string;
    controls?: boolean;
    width?: string | number;
    height?: string | number;
    [key: string]: any;
  }

  const ReactPlayer: React.ComponentType<ReactPlayerProps>;
  export default ReactPlayer;
}
