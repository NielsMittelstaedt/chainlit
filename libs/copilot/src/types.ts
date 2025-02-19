export interface IWidgetConfig {
  chainlitServer: string;
  jwt?: string;
  jupyterToken?: string;
  workspaceId?: string;
  showCot?: boolean;
  accessToken?: string;
  theme?: 'light' | 'dark';
  button?: {
    containerId?: string;
    imageUrl?: string;
    className?: string;
  };
  customCssUrl?: string;
}
