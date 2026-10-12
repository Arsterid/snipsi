export default function Scissors() {
  return (
    <span className="url-ribbon__scissors" aria-hidden="true">
      <svg
        className="scissors-illustration"
        viewBox="0 0 48 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="9" r="5.3" />
        <circle cx="9" cy="33" r="5.3" />

        <path d="M12.8 12.7 C17 15 21.7 17.6 26.4 19.8" />
        <path d="M12.8 29.3 C17 27 21.7 24.4 26.4 22.2" />

        <path
          className="scissors-illustration__blade scissors-illustration__blade--top"
          d="M29.5 19.8 C33.6 14.7 37.8 8.9 42 3.4"
        />
        <path
          className="scissors-illustration__blade scissors-illustration__blade--bottom"
          d="M29.5 22.2 C33.6 27.3 37.8 33.1 42 38.6"
        />

        <circle cx="28.1" cy="21" r="1.8" />
      </svg>
    </span>
  );
}
