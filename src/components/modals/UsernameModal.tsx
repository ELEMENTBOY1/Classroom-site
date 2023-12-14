import React, { useMemo, useRef, useState } from "react";
import { Slide } from "@mui/material";
import Cookies from "js-cookie";
import { useUserProfile } from "#/state/profile";
import { useInterface } from "#/state/interface";
import { request } from "#/utilities/fetch";
import { useModal } from "#/state/modal";

import { cn } from "#/lib/cn";

export const UsernameModal = () => {
  const setProfile = useUserProfile(store => store.setProfile);
  const profile = useUserProfile(store => store.profile);
  const mode = useInterface(store => store.mode);
  const setModal = useModal(store => store.setModal);

  const { email } = profile;
  const [username, setUsername] = useState("");
  const [doing, setDoing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [nameExists, setNameExists] = useState(false);
  const container = useRef();

  const close = () => null;

  const confirm = async () => {
    if (!nameExists) {
      const data = request(
        "/user/google",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password: "" }),
        },
        true,
      );

      data.then(data => {
        if (data.success) {
          Cookies.set("token", data.token);
          const profileData = request(`/user/email/${email}`);
          profileData.then(data => {
            setProfile(data.data);
            setModal("none");
          });
        }
      });
    }
  };

  useMemo(async () => {
    const { exists } = await request(`/user/username/${username}`, {});
    setNameExists(exists);
  }, [username]);

  return (
    <div>
      <div
        className={cn(
          "absolute h-full w-full bg-menuback outline-none backdrop-blur-[5px]",
        )}
      >
        <div
          className={cn(
            "fixed left-1/2 top-1/2 w-[calc(100%-40px)] max-w-[388px] -translate-x-1/2 -translate-y-1/2",
          )}
          ref={container}
        >
          <Slide direction="up" in={true} timeout={300}>
            <div
              className={cn(
                "rounded-[5px] border shadow-lg outline-none",
                mode === 0
                  ? " border-button bg-nav-desktop"
                  : mode === 1
                  ? " border-button bg-white"
                  : mode === 2
                  ? " border-button bg-white"
                  : mode === 3
                  ? " border-button bg-nav-desktop"
                  : "",
              )}
            >
              <div
                className={cn(
                  "relative flex flex-col items-center px-[15px] py-[30px] md:px-[30px]",
                )}
              >
                {completed ? (
                  mode === 0 || mode === 3 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100"
                      height="100"
                      viewBox="0 0 100 100"
                      fill="none"
                    >
                      <g filter="url(#filter0_i_3779_105266)">
                        <g clipPath="url(#clip0_3779_105266)">
                          <rect
                            width="100"
                            height="100"
                            rx="15"
                            fill="url(#paint0_linear_3779_105266)"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M43.1691 32.6857C43.8755 28.7602 47.3331 25.7804 51.492 25.7804C63.7845 25.7804 73.8049 35.867 73.8049 48.1262C73.8049 60.6124 63.5991 70.8863 51.0779 70.8863H33.6841C30.4722 70.8863 27.4325 69.4343 25.4141 66.9359C25.4141 72.31 29.7707 76.6667 35.1449 76.6667H51.0779C66.8774 76.6667 79.63 63.7437 79.63 48.1262C79.63 32.7356 67.0628 20 51.492 20C43.6054 20 37.2121 26.3444 37.2121 34.1706V58.4557H33.845C32.4058 58.4557 31.2391 57.2979 31.2391 55.8697V32.8701V32.6255C31.2391 27.661 33.8115 23.051 38.0364 20.4441H37.8401C30.9774 20.4441 25.4141 26.0074 25.4141 32.8701V55.8697C25.4141 60.4903 29.1887 64.2361 33.845 64.2361H52.1735C60.9531 64.2361 68.0705 57.1733 68.0705 48.4609C68.0705 39.7485 60.9531 32.6857 52.1735 32.6857H43.1691ZM52.0544 58.3281H42.918V38.3386H52.0544C57.6169 38.3386 62.1263 42.8134 62.1263 48.3334C62.1263 53.8533 57.6169 58.3281 52.0544 58.3281Z"
                            fill="#1B1C20"
                          />
                          <g opacity="0.5" filter="url(#filter1_f_3779_105266)">
                            <path
                              d="M100.38 60.7736L-0.419922 35.8006V-0.826416H100.38V60.7736Z"
                              fill="url(#paint1_linear_3779_105266)"
                            />
                          </g>
                        </g>
                        <rect
                          x="1.22197"
                          y="1.22197"
                          width="97.5561"
                          height="97.5561"
                          rx="13.778"
                          stroke="white"
                          stroke-width="2.44394"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_i_3779_105266"
                          x="0"
                          y="0"
                          width="100"
                          height="106.517"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="6.51717" />
                          <feGaussianBlur stdDeviation="3.25859" />
                          <feComposite
                            in2="hardAlpha"
                            operator="arithmetic"
                            k2="-1"
                            k3="1"
                          />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="shape"
                            result="effect1_innerShadow_3779_105266"
                          />
                        </filter>
                        <filter
                          id="filter1_f_3779_105266"
                          x="-3.67851"
                          y="-4.085"
                          width="107.318"
                          height="68.1173"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                          />
                          <feGaussianBlur
                            stdDeviation="1.62929"
                            result="effect1_foregroundBlur_3779_105266"
                          />
                        </filter>
                        <linearGradient
                          id="paint0_linear_3779_105266"
                          x1="0"
                          y1="100"
                          x2="100"
                          y2="0"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#F2F2F2" />
                          <stop offset="1" stop-color="white" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_3779_105266"
                          x1="13.0201"
                          y1="-9.98317"
                          x2="42.3231"
                          y2="82.4666"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="white" />
                          <stop
                            offset="1"
                            stop-color="white"
                            stop-opacity="0"
                          />
                        </linearGradient>
                        <clipPath id="clip0_3779_105266">
                          <rect width="100" height="100" rx="15" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100"
                      height="100"
                      viewBox="0 0 100 100"
                      fill="none"
                    >
                      <g filter="url(#filter0_i_3779_106436)">
                        <g clip-path="url(#clip0_3779_106436)">
                          <rect
                            width="100"
                            height="100"
                            rx="15"
                            fill="url(#paint0_linear_3779_106436)"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M43.1691 32.6857C43.8755 28.7602 47.3331 25.7804 51.492 25.7804C63.7845 25.7804 73.8049 35.867 73.8049 48.1262C73.8049 60.6124 63.5991 70.8863 51.0779 70.8863H33.6841C30.4722 70.8863 27.4325 69.4343 25.4141 66.9359C25.4141 72.31 29.7707 76.6667 35.1449 76.6667H51.0779C66.8774 76.6667 79.63 63.7437 79.63 48.1262C79.63 32.7356 67.0628 20 51.492 20C43.6054 20 37.2121 26.3444 37.2121 34.1706V58.4557H33.845C32.4058 58.4557 31.2391 57.2979 31.2391 55.8697V32.8701V32.6255C31.2391 27.661 33.8115 23.051 38.0364 20.4441H37.8401C30.9774 20.4441 25.4141 26.0074 25.4141 32.8701V55.8697C25.4141 60.4903 29.1887 64.2361 33.845 64.2361H52.1735C60.9531 64.2361 68.0705 57.1733 68.0705 48.4609C68.0705 39.7485 60.9531 32.6857 52.1735 32.6857H43.1691ZM52.0537 58.3282H42.9173V38.3386H52.0537C57.6163 38.3386 62.1256 42.8134 62.1256 48.3334C62.1256 53.8534 57.6163 58.3282 52.0537 58.3282Z"
                            fill="white"
                          />
                          <g opacity="0.5" filter="url(#filter1_f_3779_106436)">
                            <path
                              d="M97.2556 60L-0.501953 35.6757V0H97.2556V60Z"
                              fill="url(#paint1_linear_3779_106436)"
                              fill-opacity="0.5"
                            />
                          </g>
                        </g>
                        <rect
                          x="1.22197"
                          y="1.22197"
                          width="97.5561"
                          height="97.5561"
                          rx="13.778"
                          stroke="#1E1E1E"
                          stroke-width="2.44394"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_i_3779_106436"
                          x="0"
                          y="0"
                          width="100"
                          height="106.517"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="6.51717" />
                          <feGaussianBlur stdDeviation="3.25859" />
                          <feComposite
                            in2="hardAlpha"
                            operator="arithmetic"
                            k2="-1"
                            k3="1"
                          />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="shape"
                            result="effect1_innerShadow_3779_106436"
                          />
                        </filter>
                        <filter
                          id="filter1_f_3779_106436"
                          x="-3.76054"
                          y="-3.25859"
                          width="104.275"
                          height="66.5172"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                          />
                          <feGaussianBlur
                            stdDeviation="1.62929"
                            result="effect1_foregroundBlur_3779_106436"
                          />
                        </filter>
                        <linearGradient
                          id="paint0_linear_3779_106436"
                          x1="50"
                          y1="0"
                          x2="50"
                          y2="100"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#333333" />
                          <stop offset="1" stop-color="#0E0E0E" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_3779_106436"
                          x1="12.5324"
                          y1="-8.91891"
                          x2="41.1754"
                          y2="81.0581"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="white" />
                          <stop
                            offset="1"
                            stop-color="white"
                            stop-opacity="0"
                          />
                        </linearGradient>
                        <clipPath id="clip0_3779_106436">
                          <rect width="100" height="100" rx="15" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  )
                ) : (
                  <div
                    className={cn(
                      "flex h-[100px] w-[100px] items-center justify-center rounded-[15px] text-subtext",
                      mode === 0
                        ? " bg-button"
                        : mode === 1
                        ? " bg-[#EDEDF0]"
                        : mode === 2
                        ? " bg-[#EDEDF0]"
                        : mode === 3
                        ? " bg-button"
                        : "",
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="53"
                      height="56"
                      viewBox="0 0 53 56"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M33.4392 10.9928C33.4392 16.8613 28.6819 21.6187 22.8134 21.6187C16.9449 21.6187 12.1875 16.8613 12.1875 10.9928C12.1875 5.1243 16.9449 0.366943 22.8134 0.366943C28.6819 0.366943 33.4392 5.1243 33.4392 10.9928ZM0.746094 35.5793C0.746094 30.0565 5.22325 25.5793 10.7461 25.5793H34.8809C40.3488 25.5793 44.7917 29.9679 44.8795 35.4148L33.2702 46.968L32.5101 50.2131H0.746094V35.5793Z"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M46.504 36.6853L52.0588 42.2223L47.9175 46.4048L45.0781 43.5653L42.3346 40.8217L46.504 36.6853ZM41.3586 41.7899L35.2013 47.8985C35.0309 48.0689 34.9113 48.2805 34.8612 48.5002L33.3898 55.2832L40.264 53.8807C40.4773 53.8283 40.6821 53.7105 40.8477 53.5449L46.9502 47.3817L44.106 44.5374L41.3586 41.7899Z"
                      />
                    </svg>
                  </div>
                )}
                <span
                  className={cn(
                    "mt-[30px] text-[24px] font-bold leading-[28px]",
                    mode === 0
                      ? " text-white"
                      : mode === 1
                      ? " text-title"
                      : mode === 2
                      ? " text-title"
                      : mode === 3
                      ? " text-white"
                      : "",
                  )}
                >
                  {completed ? "Welcome to Dopple!" : "Choose your username"}
                </span>
                <span
                  className={cn(
                    "mt-[10px] text-[16px] leading-[19px]",
                    mode === 0
                      ? " text-white"
                      : mode === 1
                      ? " text-title"
                      : mode === 2
                      ? " text-title"
                      : mode === 3
                      ? " text-white"
                      : "",
                  )}
                >
                  {completed
                    ? "Your AI adventure begins here."
                    : "Your username will be used in chats."}
                </span>
                {!completed && (
                  <div
                    className={cn(
                      "duration-800 relative my-[47px] flex h-[50px] w-full items-center rounded-[5px] border px-5 transition",
                      mode === 0
                        ? " bg-inputback"
                        : mode === 1
                        ? " bg-[#F7F7FA]"
                        : mode === 2
                        ? " bg-[#F7F7FA]"
                        : mode === 3
                        ? " bg-inputback"
                        : "",
                      nameExists || username.length > 15
                        ? " border-[#E93131]"
                        : mode === 0
                        ? " border-button"
                        : mode === 1
                        ? " border-[#C4C7CB]"
                        : mode === 2
                        ? " border-[#C4C7CB]"
                        : mode === 3
                        ? " text-button"
                        : "",
                    )}
                  >
                    <input
                      className={cn(
                        "w-0 flex-1",
                        mode === 0
                          ? " text-white"
                          : mode === 1
                          ? " text-title"
                          : mode === 2
                          ? " text-title"
                          : mode === 3
                          ? " text-white"
                          : "",
                      )}
                      placeholder="Choose username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                    {nameExists || username.length > 15 ? (
                      <svg
                        className="ml-[10px] cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="18"
                        viewBox="0 0 19 18"
                        fill="none"
                        onClick={() => setUsername("")}
                      >
                        <path
                          d="M2 1.5L17 16.5M2 16.5L17 1.5"
                          stroke="#E93131"
                          stroke-width="3"
                          stroke-linejoin="round"
                        />
                      </svg>
                    ) : username.length > 0 ? (
                      <svg
                        className="ml-[10px]"
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="12"
                        viewBox="0 0 19 12"
                        fill="none"
                      >
                        <path
                          d="M2 4.72363L7.40001 10.4673L17 1.53271"
                          stroke="#048DFF"
                          strokeWidth="2.97819"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : null}
                    {nameExists && username.length > 0 && (
                      <span
                        className={cn(
                          "absolute bottom-[calc(100%+5px)] right-0 text-[14px] leading-[17px] text-[#E93131]",
                        )}
                      >
                        Username is already in use
                      </span>
                    )}
                    {username.length > 15 && (
                      <span
                        className={cn(
                          "absolute bottom-[calc(100%+5px)] right-0 text-[14px] leading-[17px] text-[#E93131]",
                        )}
                      >
                        Max character limit reached
                      </span>
                    )}
                  </div>
                )}
                {completed ? (
                  <button
                    className={cn(
                      "mt-[30px] flex h-[50px] w-full items-center justify-center space-x-[10px] rounded-[5px] bg-blue2 text-[14px] font-bold leading-[17px] transition hover:bg-blue3 disabled:bg-subtext disabled:text-[#CACACA]",
                    )}
                    onClick={close}
                  >
                    Continue
                  </button>
                ) : (
                  <>
                    <button
                      className={cn(
                        "flex h-[50px] w-full items-center justify-center space-x-[10px] rounded-[5px] bg-blue2 text-[14px] font-bold leading-[17px] transition hover:enabled:bg-blue3 disabled:bg-subtext disabled:text-[#CACACA]",
                      )}
                      onClick={confirm}
                      disabled={nameExists || username.length === 0 || doing}
                    >
                      <span>Confirm</span>
                      {doing && (
                        <svg className="spinnerInner1" viewBox="0 0 120 120">
                          <circle cx="60" cy="60" r="50" />
                        </svg>
                      )}
                    </button>
                    <span
                      className={cn(
                        "leading[17px] mt-[30px] text-[14px]",
                        mode === 0
                          ? " text-white"
                          : mode === 1
                          ? " text-title"
                          : mode === 2
                          ? " text-title"
                          : mode === 3
                          ? " text-white"
                          : "",
                      )}
                    >
                      You can change this at any time in settings.
                    </span>
                  </>
                )}
              </div>
            </div>
          </Slide>
        </div>
      </div>
    </div>
  );
};
