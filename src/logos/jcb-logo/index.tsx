import React, { useId } from 'react';
import { SJcbLogo } from './styles';
import { TJcbLogoProps } from './types';

const JcbLogo = ({
  width = 45,
  height = 34,
  variant = 'clean',
  ...props
}: TJcbLogoProps) => {
  const uid = useId().replace(/:/g, '');
  const realistic = variant === 'realistic';
  const greenA = realistic ? `jcbGreenA-${uid}` : undefined;
  const greenB = realistic ? `jcbGreenB-${uid}` : undefined;
  const greenC = realistic ? `jcbGreenC-${uid}` : undefined;
  const blue = realistic ? `jcbBlue-${uid}` : undefined;
  const red = realistic ? `jcbRed-${uid}` : undefined;
  const letter = (id?: string) => (id ? `url(#${id})` : '#FFFFFF');

  return (
    <SJcbLogo
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 300 231.511"
      fill="none"
      aria-hidden
      {...props}
    >
      {greenA && greenB && greenC && blue && red ? (
        <defs>
          <linearGradient
            id={greenA}
            gradientUnits="userSpaceOnUse"
            x1="117.386"
            y1="81.399"
            x2="157.33"
            y2="81.399"
            gradientTransform="matrix(1.125 0 0 1.125 -11.976 -13.862)"
          >
            <stop offset="0" stopColor="#007940" />
            <stop offset="0.2285" stopColor="#00873F" />
            <stop offset="0.7433" stopColor="#40A737" />
            <stop offset="1" stopColor="#5CB531" />
          </linearGradient>
          <linearGradient
            id={greenB}
            gradientUnits="userSpaceOnUse"
            x1="117.384"
            y1="75.171"
            x2="157.332"
            y2="75.171"
            gradientTransform="matrix(1.125 0 0 1.125 -11.976 -13.862)"
          >
            <stop offset="0" stopColor="#007940" />
            <stop offset="0.2285" stopColor="#00873F" />
            <stop offset="0.7433" stopColor="#40A737" />
            <stop offset="1" stopColor="#5CB531" />
          </linearGradient>
          <linearGradient
            id={greenC}
            gradientUnits="userSpaceOnUse"
            x1="117.385"
            y1="68.399"
            x2="157.331"
            y2="68.399"
            gradientTransform="matrix(1.125 0 0 1.125 -11.976 -13.862)"
          >
            <stop offset="0" stopColor="#007940" />
            <stop offset="0.2285" stopColor="#00873F" />
            <stop offset="0.7433" stopColor="#40A737" />
            <stop offset="1" stopColor="#5CB531" />
          </linearGradient>
          <linearGradient
            id={blue}
            gradientUnits="userSpaceOnUse"
            x1="27.959"
            y1="75.171"
            x2="68.522"
            y2="75.171"
            gradientTransform="matrix(1.125 0 0 1.125 -11.976 -13.862)"
          >
            <stop offset="0" stopColor="#1F286F" />
            <stop offset="0.4751" stopColor="#004E94" />
            <stop offset="0.8261" stopColor="#0066B1" />
            <stop offset="1" stopColor="#006FBC" />
          </linearGradient>
          <linearGradient
            id={red}
            gradientUnits="userSpaceOnUse"
            x1="72.46"
            y1="75.171"
            x2="111.855"
            y2="75.171"
            gradientTransform="matrix(1.125 0 0 1.125 -11.976 -13.862)"
          >
            <stop offset="0" stopColor="#6C2C2F" />
            <stop offset="0.1735" stopColor="#882730" />
            <stop offset="0.5731" stopColor="#BE1833" />
            <stop offset="0.8585" stopColor="#DC0436" />
            <stop offset="1" stopColor="#E60039" />
          </linearGradient>
        </defs>
      ) : null}
      <g transform="translate(-9.4 96.811)">
        <g transform="matrix(1.821516 0 0 1.821516 -8.544 -109.837)">
          {realistic ? (
            <path
              fill="#FFFFFF"
              d="m 174,108.3 c 0,14 -11.4,25.4 -25.4,25.4 l -138.2,0 0,-100.6 c 0,-14 11.4,-25.4 25.4,-25.4 l 138.2,0 0,100.6 z"
            />
          ) : null}
          <path
            fill={letter(greenA)}
            d="M129 82.5h10.5c.3 0 1-.1 1.3-.1 2-.4 3.7-2.2 3.7-4.7s-1.7-4.2-3.7-4.7c-.3-.1-.9-.1-1.3-.1H129z"
          />
          <path
            fill={letter(greenB)}
            d="m138.3 16.2c-10 0-18.2 8.1-18.2 18.2v18.9h25.7c.6 0 1.3 0 1.8.1 5.8.3 10.1 3.3 10.1 8.5 0 4.1-2.9 7.6-8.3 8.3v.2c5.9.4 10.4 3.7 10.4 8.8 0 5.5-5 9.1-11.6 9.1h-28.2v37h26.7c10 0 18.2-8.1 18.2-18.2v-90.9h-26.6z"
          />
          <path
            fill={letter(greenC)}
            d="M143.2 63.1c0-2.4-1.7-4-3.7-4.3-.2 0-.7-.1-1-.1h-9.5v8.8h9.5c.3 0 .9 0 1-.1 2-.3 3.7-1.9 3.7-4.3z"
          />
          <path
            fill={letter(blue)}
            d="m37.7 16.2c-10 0-18.2 8.1-18.2 18.2v44.9c5.1 2.5 10.4 4.1 15.7 4.1 6.3 0 9.7-3.8 9.7-9V53.2h15.6v21.1c0 8.2-5.1 14.9-22.4 14.9-10.5 0-18.7-2.3-18.7-2.3v38.3h26.7c10 0 18.2-8.1 18.2-18.2V16.2h-26.6z"
          />
          <path
            fill={letter(red)}
            d="m88 16.2c-10 0-18.2 8.1-18.2 18.2v23.8c4.6-3.9 12.6-6.4 25.5-5.8 6.9.3 14.3 2.2 14.3 2.2v7.7c-3.7-1.9-8.1-3.6-13.8-4-9.8-.7-15.7 4.1-15.7 12.5s5.9 13.3 15.7 12.5c5.7-.4 10.1-2.2 13.8-4v7.7s-7.3 1.9-14.3 2.2c-12.9.6-20.9-1.9-25.5-5.8v42h26.7c10 0 18.2-8.1 18.2-18.2v-91h-26.7z"
          />
        </g>
      </g>
    </SJcbLogo>
  );
};

export default JcbLogo;
