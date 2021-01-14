import React from 'react'

type IconProps = {
  width?: string | number
  height?: string | number
  color?: string
  defaultWidth?: string
  defaultHeight?: string
}

export const IconDashboard: React.FC<IconProps> = ({
  width,
  height,
  color,
  defaultWidth = '16',
  defaultHeight = '16'
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width ? defaultWidth : width}
      height={!height ? defaultHeight : height}
      fill={!color ? 'currentColor' : color}
      className="bi bi-clipboard"
      viewBox="0 0 16 16"
    >
      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
    </svg>
  )
}

export const IconCursor: React.FC<IconProps> = ({
  width,
  height,
  color,
  defaultWidth = '16',
  defaultHeight = '16'
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width ? defaultWidth : width}
      height={!height ? defaultHeight : height}
      fill={!color ? 'currentColor' : color}
      className="bi bi-cursor"
      viewBox="0 0 16 16"
    >
      <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z" />
    </svg>
  )
}

export const IconEditPen: React.FC<IconProps> = ({
  width,
  height,
  color,
  defaultWidth = '16',
  defaultHeight = '16'
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width ? defaultWidth : width}
      height={!height ? defaultHeight : height}
      fill={!color ? 'currentColor' : color}
      className="bi bi-cursor"
      viewBox="0 0 16 16"
    >
      <path d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
    </svg>
  )
}

export const IconTrashBin: React.FC<IconProps> = ({
  width,
  height,
  color,
  defaultWidth = '16',
  defaultHeight = '16'
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width ? defaultWidth : width}
      height={!height ? defaultHeight : height}
      fill={!color ? 'currentColor' : color}
      className="bi bi-cursor"
      viewBox="0 0 16 16"
    >
      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
    </svg>
  )
}

export const IconJournal: React.FC<IconProps> = ({
  width,
  height,
  color,
  defaultWidth = '16',
  defaultHeight = '16'
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width ? defaultWidth : width}
      height={!height ? defaultHeight : height}
      fill={!color ? 'currentColor' : color}
      className="bi bi-cursor"
      viewBox="0 0 16 16"
    >
      <path d="M7.5 3.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-.861 1.542l1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047L11 4.75V7a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 7v-.5s1.54-1.274 1.639-1.208zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
      <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
      <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
    </svg>
  )
}

export const IconTag: React.FC<IconProps> = ({
  width,
  height,
  color,
  defaultWidth = '16',
  defaultHeight = '16'
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width ? defaultWidth : width}
      height={!height ? defaultHeight : height}
      fill={!color ? 'currentColor' : color}
      className="bi bi-cursor"
      viewBox="0 0 16 16"
    >
      <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z" />
      <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z" />
    </svg>
  )
}

export const IconBagPlus: React.FC<IconProps> = ({
  width,
  height,
  color,
  defaultWidth = '16',
  defaultHeight = '16'
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width ? defaultWidth : width}
      height={!height ? defaultHeight : height}
      fill={!color ? 'currentColor' : color}
      className="bi bi-cursor"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
      />
      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
    </svg>
  )
}

export const IconChatRight: React.FC<IconProps> = ({
  width,
  height,
  color,
  defaultWidth = '16',
  defaultHeight = '16'
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width ? defaultWidth : width}
      height={!height ? defaultHeight : height}
      fill={!color ? 'currentColor' : color}
      className="bi bi-cursor"
      viewBox="0 0 16 16"
    >
      <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
      <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
    </svg>
  )
}

export const IconCashStack: React.FC<IconProps> = ({
  width,
  height,
  color,
  defaultWidth = '16',
  defaultHeight = '16'
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width ? defaultWidth : width}
      height={!height ? defaultHeight : height}
      fill={!color ? 'currentColor' : color}
      className="bi bi-cursor"
      viewBox="0 0 16 16"
    >
      <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z" />
    </svg>
  )
}

export const IconColumnsGap: React.FC<IconProps> = ({
  width,
  height,
  color,
  defaultWidth = '16',
  defaultHeight = '16'
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width ? defaultWidth : width}
      height={!height ? defaultHeight : height}
      fill={!color ? 'currentColor' : color}
      className="bi bi-cursor"
      viewBox="0 0 16 16"
    >
      <path d="M6 1v3H1V1h5zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm14 12v3h-5v-3h5zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5zM6 8v7H1V8h5zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H1zm14-6v7h-5V1h5zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1h-5z" />
    </svg>
  )
}

export const IconPeople: React.FC<IconProps> = ({
  width,
  height,
  color,
  defaultWidth = '16',
  defaultHeight = '16'
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width ? defaultWidth : width}
      height={!height ? defaultHeight : height}
      fill={!color ? 'currentColor' : color}
      className="bi bi-cursor"
      viewBox="0 0 16 16"
    >
      <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
    </svg>
  )
}

export const IconPersonPlus: React.FC<IconProps> = ({
  width,
  height,
  color,
  defaultWidth = '16',
  defaultHeight = '16'
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width ? defaultWidth : width}
      height={!height ? defaultHeight : height}
      fill={!color ? 'currentColor' : color}
      className="bi bi-cursor"
      viewBox="0 0 16 16"
    >
      <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
      <path
        fillRule="evenodd"
        d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
      />
    </svg>
  )
}

export const IconJournals: React.FC<IconProps> = ({
  width,
  height,
  color,
  defaultWidth = '16',
  defaultHeight = '16'
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width ? defaultWidth : width}
      height={!height ? defaultHeight : height}
      fill={!color ? 'currentColor' : color}
      className="bi bi-cursor"
      viewBox="0 0 16 16"
    >
      <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2z" />
      <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0z" />
    </svg>
  )
}

export const IconJournalPlus: React.FC<IconProps> = ({
  width,
  height,
  color,
  defaultWidth = '16',
  defaultHeight = '16'
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width ? defaultWidth : width}
      height={!height ? defaultHeight : height}
      fill={!color ? 'currentColor' : color}
      className="bi bi-cursor"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"
      />
      <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
      <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
    </svg>
  )
}

export const IconBell: React.FC<IconProps> = ({
  width,
  height,
  color,
  defaultWidth = '16',
  defaultHeight = '16'
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!width ? defaultWidth : width}
      height={!height ? defaultHeight : height}
      fill={!color ? 'currentColor' : color}
      className="bi bi-bell-fill"
      viewBox="0 0 16 16"
    >
      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
    </svg>
  )
}

/* Only icons from icograms below */
/* https://icograms.com/ */

export const IconRack: React.FC<IconProps> = ({
  width,
  height,
  color,
  defaultWidth = '16',
  defaultHeight = '16'
}: IconProps) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        id="Layer_1"
        x="0px"
        y="0px"
        width={!width ? defaultWidth : width}
        height={!height ? defaultHeight : height}
        viewBox="0 0 64 64"
        enableBackground="new 0 0 64 64"
      >
        <g>
          <g>
            <polygon
              fill="#3366CC"
              points="14.8,12 14.8,36 16,36.6 17.2,36 17.2,12 16,11.4   "
            />
            <polygon
              opacity="0.11"
              points="16,36.6 14.8,36 14.8,12 16,12.6   "
            />
            <polygon
              opacity="0.29"
              points="16,36.6 17.2,36 17.2,12 16,12.6   "
            />
          </g>
          <g>
            <polygon
              fill="#3366CC"
              points="9.1,38.9 16,29.6 16,29 15.4,28.7 9.1,37.4   "
            />
            <polygon
              opacity="0.29"
              points="9.1,38.9 16,29.6 16,29 9.1,38.3   "
            />
          </g>
          <g>
            <polygon
              fill="#3366CC"
              points="46.8,28 46.8,52 48,52.6 49.2,52 49.2,28 48,27.4   "
            />
            <polygon
              opacity="0.11"
              points="48,52.6 46.8,52 46.8,28 48,28.6   "
            />
            <polygon
              opacity="0.29"
              points="48,52.6 49.2,52 49.2,28 48,28.6   "
            />
          </g>
          <g>
            <polygon
              fill="#3366CC"
              points="6.8,16 6.8,40 8,40.6 9.2,40 9.2,16 8,15.4   "
            />
            <polygon opacity="0.11" points="8,40.6 6.8,40 6.8,16 8,16.6   " />
            <polygon opacity="0.29" points="8,40.6 9.2,40 9.2,16 8,16.6   " />
          </g>
          <g>
            <polygon
              fill="#999999"
              points="8,39.6 8,40.2 40,56.2 48,52.2 48,51.6 16,35.6   "
            />
            <polygon opacity="0.11" points="40,56.2 8,40.2 8,39.6 40,55.6   " />
            <polygon
              opacity="0.29"
              points="40,56.2 48,52.2 48,51.6 40,55.6   "
            />
          </g>
          <g>
            <polygon
              fill="#FFCC00"
              points="31.4,36.2 31.4,43.6 24,47.3 16.6,43.6 16.6,36.2 24,32.5   "
            />
            <polygon
              opacity="0.29"
              points="24,47.3 31.4,43.6 31.4,36.2 24,39.9   "
            />
            <polygon
              opacity="0.3"
              points="26.8,33.9 28.6,34.8 21.2,38.5 21.2,42.1 19.4,41.2 19.4,37.6   "
            />
            <polygon
              opacity="0.11"
              points="24,47.3 16.6,43.6 16.6,36.2 24,39.9   "
            />
          </g>
          <g>
            <polygon
              fill="#FFCC00"
              points="39.4,40.2 39.4,47.6 32,51.3 24.6,47.6 24.6,40.2 32,36.5   "
            />
            <polygon
              opacity="0.29"
              points="32,51.3 39.4,47.6 39.4,40.2 32,43.9   "
            />
            <polygon
              opacity="0.3"
              points="34.8,37.9 36.6,38.8 29.2,42.5 29.2,46.1 27.4,45.2 27.4,41.6   "
            />
            <polygon
              opacity="0.11"
              points="32,51.3 24.6,47.6 24.6,40.2 32,43.9   "
            />
          </g>
          <g>
            <polygon
              fill="#FFCC00"
              points="47.4,44.2 47.4,51.6 40,55.3 32.6,51.6 32.6,44.2 40,40.5   "
            />
            <polygon
              opacity="0.29"
              points="40,55.3 47.4,51.6 47.4,44.2 40,47.9   "
            />
            <polygon
              opacity="0.3"
              points="42.8,41.9 44.6,42.8 37.2,46.5 37.2,50.1 35.4,49.2 35.4,45.6   "
            />
            <polygon
              opacity="0.11"
              points="40,55.3 32.6,51.6 32.6,44.2 40,47.9   "
            />
          </g>
          <g>
            <polygon
              fill="#999999"
              points="8,31.6 8,32.2 40,48.2 48,44.2 48,43.6 16,27.6   "
            />
            <polygon opacity="0.11" points="40,48.2 8,32.2 8,31.6 40,47.6   " />
            <polygon
              opacity="0.29"
              points="40,48.2 48,44.2 48,43.6 40,47.6   "
            />
          </g>
          <g>
            <polygon
              fill="#FFCC00"
              points="23.4,24.2 23.4,31.6 16,35.3 8.6,31.6 8.6,24.2 16,20.5   "
            />
            <polygon
              opacity="0.29"
              points="16,35.3 23.4,31.6 23.4,24.2 16,27.9   "
            />
            <polygon
              opacity="0.3"
              points="18.8,21.9 20.6,22.8 13.2,26.5 13.2,30.1 11.4,29.2 11.4,25.6   "
            />
            <polygon
              opacity="0.11"
              points="16,35.3 8.6,31.6 8.6,24.2 16,27.9   "
            />
          </g>
          <g>
            <polygon
              fill="#FFCC00"
              points="31.4,28.2 31.4,35.6 24,39.3 16.6,35.6 16.6,28.2 24,24.5   "
            />
            <polygon
              opacity="0.29"
              points="24,39.3 31.4,35.6 31.4,28.2 24,31.9   "
            />
            <polygon
              opacity="0.3"
              points="26.8,25.9 28.6,26.8 21.2,30.5 21.2,34.1 19.4,33.2 19.4,29.6   "
            />
            <polygon
              opacity="0.11"
              points="24,39.3 16.6,35.6 16.6,28.2 24,31.9   "
            />
          </g>
          <g>
            <polygon
              fill="#FFCC00"
              points="47.4,36.2 47.4,43.6 40,47.3 32.6,43.6 32.6,36.2 40,32.5   "
            />
            <polygon
              opacity="0.29"
              points="40,47.3 47.4,43.6 47.4,36.2 40,39.9   "
            />
            <polygon
              opacity="0.3"
              points="42.8,33.9 44.6,34.8 37.2,38.5 37.2,42.1 35.4,41.2 35.4,37.6   "
            />
            <polygon
              opacity="0.11"
              points="40,47.3 32.6,43.6 32.6,36.2 40,39.9   "
            />
          </g>
          <g>
            <polygon
              fill="#3366CC"
              points="41.1,46.9 48,37.6 48,37 47.4,36.7 41.1,45.4   "
            />
            <polygon
              opacity="0.29"
              points="41.1,46.9 48,37.6 48,37 41.1,46.3   "
            />
          </g>
          <g>
            <polygon
              fill="#3366CC"
              points="41.1,54.9 48,45.6 48,45 47.4,44.7 41.1,53.4   "
            />
            <polygon
              opacity="0.29"
              points="41.1,54.9 48,45.6 48,45 41.1,54.3   "
            />
          </g>
          <g>
            <polygon
              fill="#999999"
              points="8,23.6 8,24.2 40,40.2 48,36.2 48,35.6 16,19.6   "
            />
            <polygon opacity="0.11" points="40,40.2 8,24.2 8,23.6 40,39.6   " />
            <polygon
              opacity="0.29"
              points="40,40.2 48,36.2 48,35.6 40,39.6   "
            />
          </g>
          <g>
            <polygon
              fill="#FFCC00"
              points="23.4,16.2 23.4,23.6 16,27.3 8.6,23.6 8.6,16.2 16,12.5   "
            />
            <polygon
              opacity="0.29"
              points="16,27.3 23.4,23.6 23.4,16.2 16,19.9   "
            />
            <polygon
              opacity="0.3"
              points="18.8,13.9 20.6,14.8 13.2,18.5 13.2,22.1 11.4,21.2 11.4,17.6   "
            />
            <polygon
              opacity="0.11"
              points="16,27.3 8.6,23.6 8.6,16.2 16,19.9   "
            />
          </g>
          <g>
            <polygon
              fill="#3366CC"
              points="41.1,39 48,29.7 48,29.1 47.4,28.8 41.1,37.5   "
            />
            <polygon
              opacity="0.29"
              points="41.1,39 48,29.7 48,29.1 41.1,38.4   "
            />
          </g>
          <g>
            <polygon
              fill="#3366CC"
              points="38.8,32 38.8,56 40,56.6 41.2,56 41.2,32 40,31.4   "
            />
            <polygon
              opacity="0.11"
              points="40,56.6 38.8,56 38.8,32 40,32.6   "
            />
            <polygon
              opacity="0.29"
              points="40,56.6 41.2,56 41.2,32 40,32.6   "
            />
          </g>
        </g>
      </svg>
    </>
  )
}

export const IconFarmWoman: React.FC<IconProps> = ({
  width,
  height,
  color,
  defaultWidth = '48',
  defaultHeight = '72'
}: IconProps) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={!width ? defaultWidth : width}
        height={!height ? defaultHeight : height}
        viewBox="0 0 160 240"
      >
        <path
          d="m57.4 230.4c9.3 4.6 20.8 1.4 31.7-3.5s26-13.7 23.2-17c-2.7-3.3-31.2 1.7-41 5.6-9.7 3.9-21.8 11-13.9 14.9z"
          opacity=".2"
        />
        <path
          d="m60.7 113.3s-1.2 10.2 1 13.8c2.2 3.7 5.8 3.7 5.8 3.7l-4.2 23.2s14 5.5 18.8 7.8 11.4 7.1 12 8.1-2.5 6.1-4 8-2.4 1-3.5.6c-2.5-.9-13.2-3.5-18.7-5.7-5.5-2.3-11.3-3.1-15.3-3.6s-6.7-3-6.9-10.2c-.2-7.1.6-26.6 2.4-34.6 1-4.3 3-16.2 3-16.2z"
          fill="#28896d"
        />
        <path
          d="m60.7 113.3s-1.2 10.2 1 13.8c2.2 3.7 5.8 3.7 5.8 3.7l-4.2 23.2s14 5.5 18.8 7.8 11.4 7.1 12 8.1-2.5 6.1-4 8-2.4 1-3.5.6c-2.5-.9-13.2-3.5-18.7-5.7-5.5-2.3-11.3-3.1-15.3-3.6s-6.7-3-6.9-10.2c-.2-7.1.6-26.6 2.4-34.6 1-4.3 3-16.2 3-16.2z"
          opacity=".2"
        />
        <path
          d="m79.7 43s3.9.3 5.9 5.2-2.6 15.6-2.6 15.6-9.2-11-8.1-14.1 4.8-6.7 4.8-6.7z"
          fill="#762c07"
        />
        <path
          d="m90.3 166.3c1.7.9 8.4 3 8.7 4.6.2 1.6-1.6 7.5-2.2 8.4-.6 1-2 .1-2.1 2.2-.1 2.2-.3 5.1-1 6.6-.6 1.5-4.8 7.1-5.7 7.1s-.8-9.6-1.1-11.4-.9-3.2-1.9-5.6c3.5-4 5.3-11.9 5.3-11.9z"
          fill="#825012"
        />
        <path
          d="m97.1 169.2c-.5 4.1-1.1 7.8-2.3 9.8-1.2 2.1-1.4 6.1-1.7 7.6s-3.7 5.8-5.1 6.9c-.2.1-.4.4-.5.8.1.6.3 1 .5 1 1 0 5.1-5.6 5.7-7.1s.9-4.4 1-6.6 1.4-1.3 2.1-2.2c.6-1 2.4-6.8 2.2-8.4-.1-.6-.9-1.2-1.9-1.8z"
          opacity=".5"
        />
        <path
          d="m48 79s-6.7 7.4-8.7 8.9c-1.9 1.5-3 2.7-3 2.7s-3.8-1.8-5.8-1c-2.1.9-5.2 3.5-4.9 4.4.4 1.2 3.9-.6 3.9-.6s-2.2 2.9-2.5 4.1-1.9 4.7-1.4 6.1 2.8 3.1 3.9 2.2c1.1-1 5.7-3.8 7.2-5.4s.9-3.5 1.8-4.1c1-.6 11.6-7.1 12.6-7.9s3.7-6.6 3.7-6.6z"
          fill="#fbd7c7"
        />
        <path
          d="m59.6 50.6c-2.1.6-5.6 3.5-5.7 6.2s.8 5.9-.4 8.7c-1.2 2.7-5.7 9.8-6.1 12.6-.4 2.7.5 4.3 1.5 6s3.4 4.5 3.1 8-.4 13.8-.1 15.4c.4 1.6 12.8 3.5 17.1 2.3s11.1-4.8 11.1-4.8.1-9.2 1.4-13.1c1.2-4 2.1-6 2.1-6s6.6-18.9 3.8-21.6c-2.7-2.7-3.5-3.7-5.3-5.6-1.7-1.9-3.6-4.7-8.1-6.4s-14.4-1.7-14.4-1.7z"
          fill="#f90"
        />
        <path
          d="m59.3 52 3.6 1.4s-4.7 10.7-5.6 13.4c-1 2.7-6.2 10.9-6.2 10.9l13.7 4.5s4.9-10.8 7.1-14.2c3.8-5.7 10.1-10.2 10.1-10.2l2.5 3s-6 4-8.4 7.7c-4 6.2-6 11.9-6.4 15.8s-.2 12.7.8 14.3 11.3 3.2 11.3 3.2 4.8 8.5 6.8 15.5c2.1 6.9-.3 23.6-1.8 30.8s-3.2 14.2-2.9 17.7c.3 3.6 5.1 24.2 5.6 32.6s-1.2 18.2-2.2 19c-1 .9-7.4-.5-9-.4s-3.1-.1-3.2-1.1.9-10.4.5-16.3c-.3-6-4.2-15.9-5.7-20.7s-4.3-18.7-4.1-26.6 0-21.7 0-21.7-4.4-1.1-5.8-6.7-2.7-9.7-3.7-10.8-5.9-1.9-5.3-4.4c.4-1.5-.1-16.6-.4-18.6-.3-2.1-4.1-9.2-3.9-11.9.2-3.7 6.4-11.3 7.8-15.1s4.8-11.1 4.8-11.1z"
          fill="#28896d"
        />
        <path
          d="m56.6 36.4c-1.2 3.4-1.1 10.8.4 14.9 1.5 4.2 3.5 6.3 4.7 6.4s2.5-.5 2.5-.5.6 1.1.5 2.6c-.2 3.1-1 7.8-.5 8.2.6.6 8.2-4.3 10.6-6.9 1.9-2 3.2-5.4 3-5.8s-2.3-3.5-2.2-4.8 2.4-4.1 2.4-5.3.9-12.1-7.2-13.6-12.7.6-14.2 4.8z"
          fill="#fbd7c7"
        />
        <path
          d="m55.4 38.7c.2 1.3 1.6 1.4 4.3 2.2 2.7.9 5.7 5 7.8 5.3s4.8-.7 6.7-1.4 3 .2 3.3.9c.3.8 3.5-6.9.8-12.1-3-5.6-10.7-8.2-17.1-4.3-5.8 3.7-5.9 8.3-5.8 9.4z"
          fill="#762c07"
        />
        <path
          d="m79.2 41.6c1.4.3 1.7 2 .8 3.7s-1.2 2.6-2.2 2.2-.1-1.4.3-3.2c.4-1.7.3-2.8 1.1-2.7z"
          fill="#f90"
        />
        <path
          d="m74.2 212.6c-1.3 7.1-9.1 10-10.3 10.8-1.2.9-4.1 2.8-3.2 5.5s8.4 3.1 11.6 2.3c2.3-.6 6.8-4.3 8-4.8 1.2-.4 1.4.2 1.4.2s6.3-2 6.8-3 1.1-10.2 1.1-10.2l-7.5.5z"
          fill="#825012"
        />
        <path
          d="m82.8 224c-3 .9-8.4 4.7-11.9 5.6-2.8.7-8.6-.1-10.3-2.5-.2.6-.2 1.2 0 1.9.9 2.7 8.4 3.1 11.6 2.3 2.3-.6 6.8-4.3 8-4.8 1.2-.4 1.4.2 1.4.2s6.3-2 6.8-3c.1-.2.3-1 .4-2-2.3 1-4.7 1.9-6 2.3z"
          opacity=".5"
        />
        <path
          d="m77.7 93.5c0-6.7-11.4-12.1-25.5-12.1s-25.5 5.4-25.5 12.1c0 4.8 5.7 28 5.7 30.2 0 5.2 8.9 9.4 19.8 9.4s19.8-4.2 19.8-9.4c0-2.2 5.7-25.5 5.7-30.2z"
          fill="#825012"
        />
        <ellipse cx="52.2" cy="93.9" opacity=".2" rx="23.3" ry="11" />
        <path
          d="m74.8 96.7c-.1-4-3.4-7.1-7.4-7.1-.3 0-.7 0-1 .1-.6-3.4-3.6-6.1-7.3-6.1-2.8 0-5.2 1.5-6.5 3.8-1.3-2.1-3.6-3.5-6.3-3.5-3.4 0-6.2 2.3-7.1 5.4-.6-.1-1.2-.2-1.8-.2-4.1 0-7.4 3.3-7.4 7.4 0 .3 0 .7.1 1 1.7 2.5 5.3 4.6 9.9 5.9.1 0 .4 0 .5.1 3.4.9 7.4 1.5 11.7 1.5 4 0 7.9-.5 11.2-1.3.1-.1.4-.2.5-.1 5.3-1.6 9.3-4 10.9-6.9z"
          fill="#cc291f"
        />
        <g fill="#fff">
          <circle cx="45.4" cy="96.8" opacity=".2" r="3.1" />
          <circle cx="58.2" cy="87.8" opacity=".2" r="3.1" />
          <circle cx="55.3" cy="96.7" opacity=".2" r="3.1" />
          <circle cx="66" cy="95.1" opacity=".2" r="3.1" />
          <circle cx="46.1" cy="88.7" opacity=".2" r="3.1" />
          <circle cx="35.2" cy="94.5" opacity=".2" r="3.1" />
        </g>
        <path
          d="m78.4 100.5s-5.2 4.1-6.8 5.1c-1.6 1.1-3 3-4.8 3.1-1.7.2-2.8-2.7-4.7-2.5-1.9.1-5.5-.5-6.9-.5-1.2 0-3.4.2-3 1 .1.1.2.3.4.5 1.6 1.2 3.5 1.2 4.4 1.4 1 .2 2.1.5 2.1.5s-2.9 1-5.3 1.8-6.7.1-7.8.3c-.8.2-1.5 3.6 1.2 5s9 1.2 10.8.9c2.6-.4 7.7-1.4 9.1-2.2 1.5-.8 5.8-2.9 8-3.8 2.2-1 9.8-4.9 9.8-4.9z"
          fill="#fbd7c7"
        />
        <path
          d="m79.5 73.7c.4 3 3.9 11.5 5 13.7 1.2 2.2 2.8 6 2.8 6s-4.6 2.2-6.3 3.6-3.8 3.5-3.8 3.5 1.8 3.3 2.7 5 2.2 2.5 2.2 2.5 8.1-4 11.3-6.6c3.2-2.7 5.1-3.8 5.1-6.6s-3.5-9.9-4.3-13-.9-10.1-3-14c-1.6-3-3.1-4.8-5.5-5.3-3.3-.7-6.2 11.2-6.2 11.2z"
          fill="#f90"
        />
      </svg>
    </>
  )
}

export const IconFarmMan: React.FC<IconProps> = ({
  width,
  height,
  color,
  defaultWidth = '48',
  defaultHeight = '72'
}: IconProps) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={!width ? defaultWidth : width}
        height={!height ? defaultHeight : height}
        viewBox="0 0 160 240"
      >
        <path
          d="m104.2 229.8c-19.9 13.1-24.4-.8-37.6-6.2-15.2-6.3-27.5-9.3-19.8-18.3s21.3-10.2 34.2-.4c9.5 7.2 47.4 9 23.2 24.9z"
          opacity=".2"
        />
        <path
          d="m58.8 192.8c.1 2-.8 6.2-3.4 8-2.7 1.8-8.3 3.2-9.6 6.5s-.4 6.5 3.2 6.9 8.8-1.3 11.7-3.4c2.9-2.2 5-4.2 5-4.2l1.5 1.1s5.9-3.2 6.1-3.8c.3-.6-.9-8.5-.8-8.8s0-2.3 0-2.3z"
          fill="#825012"
        />
        <path
          d="m55.6 211.1c-4 1.9-8.9 1.3-10.3-1.6-.2 2.4.9 4.4 3.7 4.7 3.6.4 8.8-1.3 11.7-3.4 2.9-2.2 5-4.2 5-4.2l1.5 1.1s5.9-3.2 6.1-3.8c.1-.3-.1-2.7-.4-4.8-1 .8-2.3 1.9-3.8 2.9-3.7 2.6-8.8 7-13.5 9.1z"
          opacity=".5"
        />
        <path
          d="m92.5 214.2c-1.1 3.4-6.1 7.4-8 10.3s-2.8 8.3 1.5 9.6 10.1-.9 13.4-4.2 4.2-5.4 4.2-5.4l1.9.4 4.2-4.2s-.6-5-.8-6.5c-.1-1.5-7.6-3.8-7.6-3.8z"
          fill="#825012"
        />
        <path
          d="m99.3 229.9c3.3-3.3 4.2-5.4 4.2-5.4l1.9.4 4.2-4.2s-.2-1.8-.4-3.6c-3.1 1.8-6.5 6-8.7 8.9-2.3 3.1-4.5 4.9-10.7 5.7-4.1.6-5.9-.8-6.9-3.2-.3 2.4.4 4.7 3 5.5 4.4 1.4 10.1-.8 13.4-4.1z"
          opacity=".5"
        />
        <path
          d="m59.2 92.5c-.4 1-3 4.4-3.1 5.5s-.4 5.9-.1 7 .7 5.8 1.3 6 2.4-1.8 2.4-2.3-.6-2-.1-3.1c.5-1 3.3-6.7 3.9-7.5s.2-6.6.2-6.6l-.6-1.5-3.7.9z"
          fill="#fbd7c7"
        />
        <path
          d="m61.1 91.1-1.9.4-.4-2.3s-1.4-.8-1.1-2.7.8-15.2 1.5-18.4 1.8-10.1 1.9-11.8 1.1-8.5 3.1-9.9c1.9-1.4 11.2-2.3 18.4 0s13.6 4.4 15.3 5 8.7 3.6 12.6 10.7c4 7.1 14.4 22.7 14.9 23.7s.8 4.5-2.3 7.6c-3.1 3.2-9.7 11.9-12.6 14.1s-5.7 2.3-5.7 2.3l-2.3 2.3-5.4-5.7 2.3-1.9s-1-3.4.4-4.6c1.4-1.1 11.2-11 11.1-11.5-.1-.4-5.2-5.7-6.1-7.3-1-1.5-3.4-4.2-3.4-4.2s-2.6 5.3-3.4 8-.4 16.4-.4 16.4l-1.1 11.5s-16.1 7.5-22.9 5.4c-6.8-2.2-13.4-9.6-13.4-9.6z"
          fill="#cc291f"
        />
        <path
          d="m56.5 197.4s6.8 3.1 11.1 3.1 7.4-1 7.6-2.3.5-7.8 1.5-12.6 2.4-11.7 1.9-15.7-.6-10.7-.4-12.6c.3-1.9.8-8 .8-8s2 13.1 3.8 15.7c1.8 2.5 4.6 14.7 5 19.9s1.9 18.2 1.9 22.2.8 6.9.8 6.9 6.6 3.3 9.6 3.4c2.9.1 9.7-.5 10.3-3.8s-.9-18.2-1.9-25.6-5.1-24.7-6.1-33.6-2-27.1-2.2-33.6c-.1-1.9-.6-10.6-1-15-.4-4.3-1.1-5.5-1.1-5.5s-2.1 1.2-4.5 1.7c-4.5 1-8 .8-8 .8s-.1-11.6.4-15.8 1.9-10 1.9-10l-1.8-.8s2.8-8.8 5.6-13.8c3.6-6.3 8.4-10.3 8.4-10.3l-4.3-1.8s-5.2 4.6-8.3 10.6c-1.8 3.4-5.7 13.8-5.7 13.8l-15.7-4.6s.6-8.4 1.1-11.4c.9-6.2 3.6-14.2 3.6-14.2l-4.2.8s-2 4.1-3.2 12.3c-.8 4.6-1.5 11.4-1.5 11.4l-.7-.1s-.7 16.8-.8 22.6c-.1 5.9-.8 13.5-1.1 17.6s-1.7 19.6-1.5 28.7.9 12.9.8 19.9-1.8 18.7-1.5 25.6c.1 6.9-1.1 13.5-.6 14.1z"
          fill="#06547a"
        />
        <path
          d="m99.3 105.9s-.6.9-2.5 1.1-3.9-.2-5.8 1.1-4.7 3.4-6.9 4c-2.2.5-3.9 2.9-3.6 4.4s5.4 4.7 9.4 3.6 7.1-2.6 8.7-4 3-4.7 4-4.7c1-.1-3.3-5.5-3.3-5.5z"
          fill="#fbd7c7"
        />
        <path
          d="m99.7 99.9c-1.4 1.1-.4 4.6-.4 4.6l-2.3 1.9 5.4 5.7 2.3-2.3s2.9-.1 5.7-2.3c1.1-.9 2.9-2.8 4.8-5l-6.5-11.6c-3 3.2-8 8.2-9 9z"
          fill="#cc291f"
        />
        <path
          d="m58 27.2c0-.8 3.9-.3 6.1-.4 2.7-.2 4.6-3.9 6.1-5.5s3.7-5.9 7.8-5.4 7.3 5.4 10 6.9 3.5 2.9 3.3 5.4-.4 5.5-.4 5.5-3.3-5.3-8.7-4.1c-10.5 2.4-24.2-2.4-24.2-2.4z"
          fill="#825012"
        />
        <path
          d="m57.8 27c-1.6.6 4.4 11.5 10 13.3s20.4 5.3 23.7 5 5.5-2.4 4.9-3.6-.4-.1-2.5-3.3-1.9-9.2-10.5-9.1-9.9.7-14.3 0-8.9-3.2-11.3-2.3z"
          fill="#825012"
        />
        <path
          d="m57.8 27c-1.6.6 4.4 11.5 10 13.3s20.4 5.3 23.7 5 5.5-2.4 4.9-3.6-.4-.1-2.5-3.3-1.9-9.2-10.5-9.1-9.9.7-14.3 0-8.9-3.2-11.3-2.3z"
          opacity=".2"
        />
        <path
          d="m87.1 39.1c0-.2 0-.4 0-.6-.1-.5-.6-1.3-2.3-1.3-2.4.1-3.3 3.6-3.3 3.6-.3.1-1.1-.4-1.7-1.7s-1.9-5.2-2.3-6.5-3.2-.5-5-.8c-1.4-.2-4.3-.4-5.3-2.2-.1 0-.1 0-.2 0-1.1 2.6-1.5 5.4-1.4 7.6.4 3.8.1 12.7 2.4 13.8s5.4 0 5.4 0 .4.3 0 1.9-.4 10.7-.4 10.7 7-7.5 9.6-9.2 6.3-5.1 6.1-5.7-1.9-1.2-2.3-3.1c-.4-1.8-.2-3.1-.2-3.1s.9-2.1.9-3.4z"
          fill="#fbd7c7"
        />
        <path
          d="m72.6 31.9c1.8.3 4.6-.6 5 .8.4 1.3 1.7 5.2 2.3 6.5s1.4 1.8 1.7 1.7c0 0 .9-3.5 3.3-3.6 1.7-.1 2.2.8 2.3 1.3.1.2.1.4.1.4s1.2-2.4 1.8-5.5c-.2-.3-.3-.5-.6-.7-1.5-1-2.2-1.8-4.4-2s-3.7-.7-8.1-.4c-3.2.2-6.5-.4-8.6-.7.8 1.8 3.7 2 5.2 2.2z"
          fill="#762c07"
        />
      </svg>
    </>
  )
}

export const IconEmptySoil: React.FC<IconProps> = ({
  width,
  height,
  color,
  defaultWidth = '128',
  defaultHeight = '64'
}: IconProps) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={!width ? defaultWidth : width}
        height={!height ? defaultHeight : height}
        viewBox="0 0 128 64"
      >
        <path d="m64 0 64 32-64 32-64-32z" fill="#825012" />
        <path d="m64 0 64 32-64 32-64-32z" fill="#825012" />
        <g fill="#fff">
          <path
            d="m114 25h-2l-2 2-3 2-3 1-1 1-3 1-2 1h-2l-2 2-3 2-3 1-1 1-3 1-2 1h-2l-2 2-3 2-3 1-1 1-3 1-2 1h-2l-2 2-3 2-3 1-1 1-3 1-2 1 10 5 2-1v-1l3-.5 1-1.5 3-.5 2-1.5 3-1 2-1 2-1v-1l3-.5 1-1.5 3-.5 2-1.5 3-1 2-1 2-1v-1l3-.5 1-1.5 3-.5 2-1.5 3-1 2-1 2-1v-1l3-.5 1-1.5 3-.5 2-1.5 3-1 2-1z"
            opacity=".1"
          />
          <path
            d="m18 34 3-.5 2-1.5 3-1 2-1 2-1v-1l3-.5 1-1.5 3-.5 2-1.5 3-1 2-1 2-1v-1l3-.5 1-1.5 3-.5 2-1.5 3-1 2-1 2-1v-1l3-.5 1-1.5 3-.5 2-1.5 3-1 2-1-10-5h-2l-2 2-3 2-3 1-1 1-3 1-2 1h-2l-2 2-3 2-3 1-1 1-3 1-2 1h-2l-2 2-3 2-3 1-1 1-3 1-2 1h-2l-2 2-3 2-3 1-1 1-3 1-2 1 10 5 2-1v-1l3-.5z"
            opacity=".1"
          />
          <path
            d="m34 42 3-.5 2-1.5 3-1 2-1 2-1v-1l3-.5 1-1.5 3-.5 2-1.5 3-1 2-1 2-1v-1l3-.5 1-1.5 3-.5 2-1.5 3-1 2-1 2-1v-1l3-.5 1-1.5 3-.5 2-1.5 3-1 2-1-10-5h-2l-2 2-3 2-3 1-1 1-3 1-2 1h-2l-2 2-3 2-3 1-1 1-3 1-2 1h-2l-2 2-3 2-3 1-1 1-3 1-2 1h-2l-2 2-3 2-3 1-1 1-3 1-2 1 10 5 2-1v-1l3-.5z"
            opacity=".1"
          />
          <path
            d="m50 50 3-.5 2-1.5 3-1 2-1 2-1v-1l3-.5 1-1.5 3-.5 2-1.5 3-1 2-1 2-1v-1l3-.5 1-1.5 3-.5 2-1.5 3-1 2-1 2-1v-1l3-.5 1-1.5 3-.5 2-1.5 3-1 2-1-10-5h-2l-2 2-3 2-3 1-1 1-3 1-2 1h-2l-2 2-3 2-3 1-1 1-3 1-2 1h-2l-2 2-3 2-3 1-1 1-3 1-2 1h-2l-2 2-3 2-3 1-1 1-3 1-2 1 10 5 2-1v-1l3-.5z"
            opacity=".1"
          />
          <path
            d="m116 26-3 1-3 2-3 1.5-3 1.5-1 1-3 1-3 1-3 2-3 1.5-3 1.5-1 1-3 1-3 1-3 2-3 1.5-3 1.5-1 1-3 1-3 1-3 2-3 1.5-3 1.5-1 1-3 1 2 1 3-1 2-1.5 4-1.5 2-1.5 2-1.5 3-1 3-1 2-1.5 4-1.5 2-1.5 2-1.5 3-1 3-1 2-1.5 4-1.5 2-1.5 2-1.5 3-1 3-1 2-1.5 4-1.5 2-1.5 2-1.5 3-1z"
            opacity=".15"
          />
          <path
            d="m25 26 2-1.5 4-1.5 2-1.5 2-1.5 3-1 3-1 2-1.5 4-1.5 2-1.5 2-1.5 3-1 3-1 2-1.5 4-1.5 2-1.5 2-1.5 3-1-2-1-3 1-3 2-3 1.5-3 1.5-1 1-3 1-3 1-3 2-3 1.5-3 1.5-1 1-3 1-3 1-3 2-3 1.5-3 1.5-1 1-3 1-3 1-3 2-3 1.5-3 1.5-1 1-3 1 2 1 3-1 2-1.5 4-1.5 2-1.5 2-1.5 3-1z"
            opacity=".15"
          />
          <path
            d="m41 34 2-1.5 4-1.5 2-1.5 2-1.5 3-1 3-1 2-1.5 4-1.5 2-1.5 2-1.5 3-1 3-1 2-1.5 4-1.5 2-1.5 2-1.5 3-1-2-1-3 1-3 2-3 1.5-3 1.5-1 1-3 1-3 1-3 2-3 1.5-3 1.5-1 1-3 1-3 1-3 2-3 1.5-3 1.5-1 1-3 1-3 1-3 2-3 1.5-3 1.5-1 1-3 1 2 1 3-1 2-1.5 4-1.5 2-1.5 2-1.5 3-1z"
            opacity=".15"
          />
          <path
            d="m57 42 2-1.5 4-1.5 2-1.5 2-1.5 3-1 3-1 2-1.5 4-1.5 2-1.5 2-1.5 3-1 3-1 2-1.5 4-1.5 2-1.5 2-1.5 3-1-2-1-3 1-3 2-3 1.5-3 1.5-1 1-3 1-3 1-3 2-3 1.5-3 1.5-1 1-3 1-3 1-3 2-3 1.5-3 1.5-1 1-3 1-3 1-3 2-3 1.5-3 1.5-1 1-3 1 2 1 3-1 2-1.5 4-1.5 2-1.5 2-1.5 3-1z"
            opacity=".15"
          />
        </g>
      </svg>
    </>
  )
}
