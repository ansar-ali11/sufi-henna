const IslamicPattern = () => {
  return (
    <svg
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="islamic-pattern"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          {/* Star Pattern */}
          <g transform="translate(50, 50)">
            <path
              d="M 0,-40 L 10,-10 L 40,0 L 10,10 L 0,40 L -10,10 L -40,0 L -10,-10 Z"
              fill="currentColor"
              opacity="0.3"
            />
            <circle cx="0" cy="0" r="8" fill="currentColor" opacity="0.5" />
          </g>
          
          {/* Geometric Lines */}
          <line
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.2"
          />
          <line
            x1="100"
            y1="0"
            x2="0"
            y2="100"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.2"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
    </svg>
  );
};

export default IslamicPattern;
