/**
 * Description:
 * A small animated spinner used to indicate loading states in buttons or minimal UI elements.
 */


import React from 'react';

const SpinnerLoader = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="inline w-5 h-5 text-black animate-spin fill-white"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer circle path */}
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908Z"
          fill="currentColor"
        />
        {/* Inner spinning arc */}
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7666 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.05125 38.4468 6.5209C39.0803 8.99056 41.4378 10.4516 43.9109 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2552 17.9648 79.4997 21.7997 82.5881 26.2913C84.875 29.7997 86.7614 33.7971 88.0833 38.2158C88.911 40.9186 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SpinnerLoader;