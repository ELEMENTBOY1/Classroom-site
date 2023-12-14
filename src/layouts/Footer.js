import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RefContext } from "../contexts/RefContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSignModal, setDetails } from "../redux/reducers/ModalReducer";
import { useCookies } from "react-cookie";
import axios from "../utilities/axiosConfig";

const Footer = ({ openSearch }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isDark, navCollapsed, setDopple } = useContext(RefContext);
  const openLoginOrSignup = useSelector(store => store.ModalReducer.openSignModal);
  const profile = useSelector(store => store.AuthReducer.profile);
  const [cookies, setCookies] = useCookies(["profile", "userid"])

  const color = (path) => {
    if (location.pathname === path)
      return " font-bold" + (isDark === 0 ? " text-white" : isDark === 1 ? " text-title" : isDark === 2 ? " text-candytitle" : isDark === 3 ? " text-white" : "")
    else
      return (isDark === 0 ? " text-subtext" : isDark === 1 ? " text-subtextlight" : isDark === 2 ? " text-candysubtext" : isDark === 3 ? " text-galaxysubtext" : "")
  }
  const bgColor = (path) => {
    if (location.pathname === path)
      return (isDark === 0 ? " bg-button" : isDark === 1 ? " bg-blue2" : isDark === 2 ? " bg-candysubtext" : isDark === 3 ? " bg-[#5200FF]" : "")
    else
      return (isDark === 0 ? " bg-nav" : isDark === 1 ? " bg-white" : isDark === 2 ? " bg-candynav" : isDark === 3 ? " bg-galaxynav" : "")
  }
  const seeChat = async () => {
    nav("/messages")
    let userid = Math.random().toString(36).slice(2);
    if (!cookies?.userid) setCookies("userid", userid)
    else userid = cookies?.userid
    const { data: { success, data: _dopples } } = await axios.post("/firebase/getDopplesDataByUser", {
      user: profile?.email ?? userid
    })
    if (success)
      setDopple(_dopples.sort((a, b) => b.chat_history[b.chat_history.length - 1].timestamp - a.chat_history[a.chat_history.length - 1].timestamp)[0])
  }

  const create = () => {
    if (!profile) {
      dispatch(setOpenSignModal());
      dispatch(setDetails({ openLoginOrSignup: false }))
    }
    else {
      nav("/");
    }
  }
  return (
    <footer className={"bg-nav w-full relative z-[3] md2:pb-0" + (!navCollapsed ? " pb-[100px]" : "")}>
      <div className="flex flex-col lg2:flex-row justify-between items-center px-5 xl:px-[60px] py-[31.26px] lg2:py-[34px] text-[#8A939D]">
        <div className="flex flex-col items-center lg2:items-start space-y-3 lg2:space-y-[5.93px] lg2:max-w-[366px]">
          {isDark === 0 ?
            <img className="cursor-pointer h-[30px]" src="/images/logo-footer.svg" alt="" onClick={() => nav("/")} />
            :
            <img className="cursor-pointer h-[30px]" src="/images/logo-footer-light.svg" alt="" onClick={() => nav("/")} />
          }
          <span className="text-[14px] leading-[150%] text-center lg2:text-left">Discover A New Dimension Of Connection.</span>
        </div>
        <div className="flex lg2:hidden flex-col items-center space-y-[13px] text-[14px] leading-[17px] lg2:text-[12px] lg2:leading-[14px] mt-5 mb-8">
          <div className="flex items-center space-x-[15px]">
            <Link className="transition duration-800 hover:text-blue2" to="/terms">Term & Conditions</Link>
            <Link className="transition duration-800 hover:text-blue2" to="/privacy">Privacy Policy</Link>
          </div>
          {location.pathname !== "/waitlist-beta" &&
            <div className="flex items-center space-x-[15px]">
              <span className="transition duration-800 hover:text-blue2">About</span>
            </div>
          }
        </div>
        <div className={"hidden lg2:flex gap-x-[25px] gap-y-[24px] text-[12px] leading-[14px] text-black6"}>
          <Link className="transition duration-800 hover:text-blue2" to="/terms">Term & Conditions</Link>
          <Link className="transition duration-800 hover:text-blue2" to="/privacy">Privacy Policy</Link>
          <span className="transition duration-800 hover:text-blue2">About</span>
        </div>
        <div className="flex flex-col items-center lg2:items-start space-y-[15.47px] md:space-y-3">
          <div className="flex space-x-5 md:space-x-[10px]">
            <a className="flex justify-center items-center w-[30px] h-[30px] bg-white text-button rounded-full dark:bg-blue2 dark:text-white transition duration-800 hover:bg-blue2" href="https://twitter.com/DoppleAi" target="_blank" rel="noreferrer" aria-label="twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="15" viewBox="0 0 19 15" fill="currentColor">
                <path d="M18.3034 2.2901C17.6536 2.56509 16.9645 2.74574 16.259 2.82608C17.0024 2.40017 17.5586 1.73028 17.824 0.941193C17.1258 1.3387 16.3603 1.61727 15.5633 1.76797C15.0273 1.21943 14.317 0.855635 13.5426 0.733143C12.7682 0.610652 11.9733 0.736325 11.2813 1.09063C10.5893 1.44493 10.039 2.008 9.71607 2.69232C9.39312 3.37663 9.31555 4.14385 9.49543 4.87468C8.07932 4.80691 6.69394 4.45496 5.42926 3.84171C4.16458 3.22846 3.04887 2.36762 2.15458 1.31507C1.83807 1.83513 1.67174 2.42631 1.67263 3.02808C1.67263 4.20919 2.30189 5.25264 3.25643 5.86355C2.69104 5.84649 2.1381 5.70043 1.64367 5.43754V5.47908C1.64365 6.26584 1.92811 7.02839 2.4488 7.63739C2.9695 8.24639 3.69437 8.66435 4.50048 8.82039C3.97565 8.95659 3.42528 8.97665 2.89113 8.87904C3.11842 9.55625 3.56145 10.1485 4.15818 10.5728C4.7549 10.9971 5.47542 11.2323 6.21883 11.2453C5.48002 11.8004 4.63407 12.2107 3.72937 12.4528C2.82466 12.6949 1.87894 12.764 0.946289 12.6561C2.57414 13.6575 4.46907 14.1892 6.40446 14.1875C12.956 14.1875 16.5374 8.99633 16.5374 4.49429C16.5374 4.34767 16.534 4.19942 16.5272 4.05361C17.2241 3.57169 17.8256 2.97397 18.3034 2.2901Z" />
              </svg>
            </a>
            <a className="flex justify-center items-center w-[30px] h-[30px] bg-white text-button rounded-full dark:bg-blue2 dark:text-white transition duration-800 hover:bg-blue2" href="https://instagram.com/Dopple_ai" target="_blank" rel="noreferrer" aria-label="instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8.39601 0.188423C8.94328 0.186323 9.49055 0.191823 10.0377 0.204922L10.1832 0.210172C10.3512 0.216171 10.5169 0.223671 10.7171 0.23267C11.5151 0.270169 12.0596 0.396162 12.5373 0.581403C13.0323 0.771893 13.4492 1.02988 13.8662 1.44686C14.2475 1.82154 14.5426 2.27478 14.7309 2.77504C14.9162 3.25277 15.0422 3.79799 15.0797 4.59595C15.0887 4.79544 15.0962 4.96193 15.1022 5.12992L15.1067 5.27541C15.12 5.82228 15.1257 6.3693 15.1239 6.91633L15.1247 7.4758V8.45825C15.1265 9.00552 15.1208 9.5528 15.1074 10.0999L15.1029 10.2454C15.0969 10.4134 15.0894 10.5791 15.0804 10.7794C15.0429 11.5773 14.9154 12.1218 14.7309 12.5995C14.5432 13.1003 14.248 13.5539 13.8662 13.9285C13.4912 14.3097 13.0378 14.6047 12.5373 14.7932C12.0596 14.9784 11.5151 15.1044 10.7171 15.1419C10.5169 15.1509 10.3512 15.1584 10.1832 15.1644L10.0377 15.1689C9.49056 15.1822 8.94328 15.188 8.39601 15.1862L7.83654 15.1869H6.85484C6.30756 15.1888 5.76029 15.183 5.21317 15.1697L5.06768 15.1652C4.88965 15.1587 4.71165 15.1512 4.53371 15.1427C3.73575 15.1052 3.19128 14.9777 2.7128 14.7932C2.21234 14.6052 1.75903 14.3101 1.38462 13.9285C1.00292 13.5537 0.707571 13.1002 0.519163 12.5995C0.333922 12.1218 0.207928 11.5773 0.17043 10.7794C0.162078 10.6014 0.154578 10.4234 0.147932 10.2454L0.144182 10.0999C0.130355 9.55281 0.124105 9.00553 0.125433 8.45825V6.91633C0.12334 6.36931 0.12884 5.82228 0.141932 5.27541L0.147182 5.12992C0.153181 4.96193 0.160681 4.79544 0.16968 4.59595C0.207179 3.79724 0.333172 3.25352 0.518412 2.77504C0.706932 2.27453 1.00286 1.82142 1.38537 1.44761C1.75952 1.06569 2.21255 0.770073 2.7128 0.581403C3.19128 0.396162 3.735 0.270169 4.53371 0.23267L5.06768 0.210172L5.21317 0.206422C5.76003 0.192602 6.30705 0.186352 6.85409 0.187673L8.39601 0.188423ZM7.62505 3.93823C7.1282 3.9312 6.63492 4.02299 6.17385 4.20827C5.71279 4.39354 5.29315 4.6686 4.93932 5.01747C4.58549 5.36633 4.30452 5.78204 4.11274 6.24043C3.92097 6.69883 3.82221 7.19077 3.82221 7.68766C3.82221 8.18456 3.92097 8.6765 4.11274 9.13489C4.30452 9.59329 4.58549 10.009 4.93932 10.3579C5.29315 10.7067 5.71279 10.9818 6.17385 11.1671C6.63492 11.3523 7.1282 11.4441 7.62505 11.4371C8.61956 11.4371 9.57334 11.042 10.2766 10.3388C10.9798 9.63558 11.3749 8.6818 11.3749 7.68729C11.3749 6.69278 10.9798 5.739 10.2766 5.03577C9.57334 4.33255 8.61956 3.93823 7.62505 3.93823ZM7.62505 5.43815C7.92391 5.43265 8.22088 5.48675 8.4986 5.5973C8.77632 5.70785 9.02923 5.87264 9.24255 6.08203C9.45587 6.29142 9.62533 6.54122 9.74102 6.81684C9.85672 7.09246 9.91633 7.38837 9.91638 7.68728C9.91643 7.9862 9.85692 8.28213 9.74131 8.55778C9.62571 8.83344 9.45634 9.0833 9.24308 9.29276C9.02983 9.50222 8.77698 9.66709 8.4993 9.77773C8.22161 9.88838 7.92466 9.94258 7.6258 9.93717C7.02909 9.93717 6.45682 9.70013 6.03489 9.2782C5.61295 8.85626 5.37591 8.28399 5.37591 7.68729C5.37591 7.09058 5.61295 6.51831 6.03489 6.09638C6.45682 5.67444 7.02909 5.4374 7.6258 5.4374L7.62505 5.43815ZM11.5623 2.81329C11.3204 2.82297 11.0916 2.9259 10.9238 3.1005C10.7561 3.27511 10.6624 3.50785 10.6624 3.74999C10.6624 3.99213 10.7561 4.22487 10.9238 4.39948C11.0916 4.57409 11.3204 4.67701 11.5623 4.68669C11.811 4.68669 12.0494 4.58792 12.2252 4.41212C12.401 4.23631 12.4998 3.99787 12.4998 3.74924C12.4998 3.50061 12.401 3.26217 12.2252 3.08636C12.0494 2.91056 11.811 2.81179 11.5623 2.81179V2.81329Z" />
              </svg>
            </a>
            <a className="flex justify-center items-center w-[30px] h-[30px] bg-white text-button rounded-full dark:bg-blue2 dark:text-white transition duration-800 hover:bg-blue2" href="https://dopple.ai" target="_blank" rel="noreferrer" aria-label="website">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="currentColor">
                <path d="M13.549 11.4875C13.621 10.8935 13.675 10.2995 13.675 9.6875C13.675 9.0755 13.621 8.4815 13.549 7.8875H16.591C16.735 8.4635 16.825 9.0665 16.825 9.6875C16.825 10.3085 16.735 10.9115 16.591 11.4875M11.956 16.4915C12.496 15.4925 12.91 14.4125 13.198 13.2875H15.853C14.9811 14.7889 13.5977 15.9263 11.956 16.4915ZM11.731 11.4875H7.519C7.429 10.8935 7.375 10.2995 7.375 9.6875C7.375 9.0755 7.429 8.4725 7.519 7.8875H11.731C11.812 8.4725 11.875 9.0755 11.875 9.6875C11.875 10.2995 11.812 10.8935 11.731 11.4875ZM9.625 16.8515C8.878 15.7715 8.275 14.5745 7.906 13.2875H11.344C10.975 14.5745 10.372 15.7715 9.625 16.8515ZM6.025 6.0875H3.397C4.25997 4.58199 5.64232 3.44284 7.285 2.8835C6.745 3.8825 6.34 4.9625 6.025 6.0875ZM3.397 13.2875H6.025C6.34 14.4125 6.745 15.4925 7.285 16.4915C5.64576 15.926 4.26536 14.7884 3.397 13.2875ZM2.659 11.4875C2.515 10.9115 2.425 10.3085 2.425 9.6875C2.425 9.0665 2.515 8.4635 2.659 7.8875H5.701C5.629 8.4815 5.575 9.0755 5.575 9.6875C5.575 10.2995 5.629 10.8935 5.701 11.4875M9.625 2.5145C10.372 3.5945 10.975 4.8005 11.344 6.0875H7.906C8.275 4.8005 8.878 3.5945 9.625 2.5145ZM15.853 6.0875H13.198C12.9163 4.97281 12.4992 3.89681 11.956 2.8835C13.612 3.4505 14.989 4.5935 15.853 6.0875ZM9.625 0.6875C4.648 0.6875 0.625 4.7375 0.625 9.6875C0.625 12.0744 1.57321 14.3636 3.26104 16.0515C4.09677 16.8872 5.08892 17.5501 6.18085 18.0024C7.27278 18.4547 8.4431 18.6875 9.625 18.6875C12.0119 18.6875 14.3011 17.7393 15.989 16.0515C17.6768 14.3636 18.625 12.0744 18.625 9.6875C18.625 8.5056 18.3922 7.33528 17.9399 6.24335C17.4876 5.15142 16.8247 4.15927 15.989 3.32354C15.1532 2.48781 14.1611 1.82488 13.0692 1.37258C11.9772 0.920292 10.8069 0.6875 9.625 0.6875Z" />
              </svg>
            </a>
            <a className="flex justify-center items-center w-[30px] h-[30px] bg-white text-button rounded-full dark:bg-blue2 dark:text-white transition duration-800 hover:bg-blue2" href="https://www.reddit.com/r/DoppleAI/" target="_blank" rel="noreferrer" aria-label="website">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="currentColor">
                <path d="M19 9.05581V9.07794C19 9.47841 18.885 9.85233 18.6866 10.1687L18.6917 10.1599C18.4933 10.4819 18.2094 10.7426 17.8716 10.9129L17.8598 10.9181C17.9395 11.2153 17.9852 11.556 17.9852 11.9085V11.9218C17.9798 13.0257 17.5831 14.0912 16.8656 14.9302L16.8708 14.9235C16.0694 15.8817 15.0425 16.6258 13.8823 17.0889L13.8315 17.1066C12.6256 17.6125 11.2243 17.9068 9.7537 17.9068L9.64086 17.9061H9.64676L9.53909 17.9068C8.07068 17.9068 6.6716 17.6125 5.39643 17.08L5.46723 17.1066C4.29394 16.646 3.25428 15.8997 2.44266 14.9353L2.43307 14.9235C1.7188 14.0863 1.32424 13.0231 1.31941 11.9226V11.9174C1.31941 11.5708 1.36072 11.233 1.43816 10.9099L1.43226 10.9394C1.08376 10.7696 0.788784 10.507 0.579681 10.1805L0.574518 10.1724C0.361516 9.83958 0.248859 9.45245 0.250009 9.05729C0.250009 8.48423 0.48159 7.96502 0.856989 7.58888C1.0433 7.39508 1.26688 7.24095 1.51428 7.13575C1.76168 7.03056 2.02779 6.97647 2.29663 6.97674H2.33351H2.33129H2.36006C2.94934 6.97674 3.48035 7.22971 3.84911 7.6324L3.85059 7.63387C5.43641 6.54768 7.30948 5.95772 9.23154 5.93905H9.23744L10.4514 0.488764C10.4725 0.398342 10.5284 0.319894 10.607 0.270458L10.6085 0.269721C10.6479 0.242019 10.6927 0.223023 10.74 0.213994C10.7873 0.204966 10.836 0.206112 10.8828 0.217357L10.8806 0.216619L14.7408 1.06403C14.8692 0.803686 15.0616 0.592755 15.2991 0.445988L15.3058 0.442301C15.541 0.294796 15.8272 0.207031 16.134 0.207031C16.5654 0.207031 16.9571 0.380349 17.241 0.662082C17.525 0.934227 17.7012 1.317 17.7012 1.74108V1.76763V1.76615V1.78828C17.7012 2.21456 17.525 2.59955 17.241 2.87391L17.2403 2.87465C17.095 3.02087 16.9221 3.13684 16.7318 3.21583C16.5414 3.29483 16.3372 3.33528 16.1311 3.33486C15.7173 3.33523 15.3203 3.17159 15.027 2.87981C14.8828 2.73988 14.7682 2.57239 14.69 2.38728C14.6118 2.20217 14.5717 2.00323 14.5719 1.80229V1.77426V1.77574L11.0776 1.00134L9.98971 5.93831C12.0157 5.95306 13.8934 6.57627 15.4525 7.63461L15.4179 7.61248C15.6115 7.41046 15.8441 7.24978 16.1015 7.14013C16.3589 7.03049 16.6359 6.97415 16.9158 6.97453C17.491 6.97453 18.0117 7.20832 18.3886 7.58667C18.764 7.95248 18.9971 8.46358 18.9971 9.02852V9.05729V9.05581H19ZM4.62646 11.1371V11.1607C4.62646 11.5855 4.80051 11.9698 5.08151 12.2456C5.22086 12.3913 5.38834 12.5073 5.5738 12.5864C5.75927 12.6655 5.95887 12.7061 6.1605 12.7058H6.18705H6.18558C6.6017 12.7054 7.00067 12.5399 7.29491 12.2457C7.58915 11.9514 7.75463 11.5525 7.75502 11.1364V11.1113C7.75502 10.6872 7.57876 10.3044 7.29481 10.033L7.29407 10.0323C7.1527 9.88796 6.98389 9.77335 6.79758 9.6952C6.61127 9.61706 6.41121 9.57695 6.20918 9.57724H6.1841H6.18558C5.77327 9.5807 5.37883 9.74598 5.0872 10.0375C4.79558 10.3289 4.63012 10.7233 4.62646 11.1356V11.1371ZM13.0998 14.8513C13.1364 14.816 13.1654 14.7737 13.1853 14.7269C13.2051 14.6802 13.2153 14.6299 13.2153 14.5791C13.2153 14.5283 13.2051 14.478 13.1853 14.4313C13.1654 14.3845 13.1364 14.3422 13.0998 14.307C13.067 14.2736 13.0279 14.2472 12.9847 14.2292C12.9415 14.2112 12.8951 14.2021 12.8483 14.2022H12.838H12.8329C12.734 14.2021 12.6389 14.2395 12.5666 14.307C12.2171 14.6325 11.785 14.856 11.3172 14.953L11.3003 14.956C10.1856 15.2386 9.01765 15.235 7.90474 14.9457L7.95194 14.956C7.4768 14.8608 7.03741 14.6356 6.68267 14.3055L6.68414 14.307C6.61198 14.2394 6.51675 14.2019 6.4179 14.2022H6.40388C6.35711 14.2021 6.31079 14.2113 6.26761 14.2293C6.22443 14.2473 6.18527 14.2737 6.15239 14.307C6.11536 14.3393 6.08568 14.3792 6.06532 14.424C6.04497 14.4688 6.03442 14.5174 6.03439 14.5666V14.5769C6.03439 14.6846 6.07938 14.7819 6.15239 14.8513C6.49827 15.1771 6.91473 15.4186 7.3693 15.5571L7.39143 15.563C7.79582 15.7098 8.21498 15.8122 8.64152 15.8683L8.67324 15.872C9.0007 15.9035 9.31783 15.9192 9.62464 15.9192C9.93145 15.9192 10.2486 15.9035 10.576 15.872C11.0281 15.8137 11.4723 15.7056 11.9006 15.5497L11.8579 15.5637C12.3219 15.4262 12.7475 15.1823 13.1006 14.8513L13.0991 14.8527L13.0998 14.8513ZM13.0689 12.7065H13.0939C13.518 12.7065 13.9008 12.5303 14.1722 12.2463L14.1729 12.2456C14.4539 11.9698 14.628 11.5855 14.628 11.1607V11.1356V11.1371C14.6245 10.7248 14.4592 10.3303 14.1678 10.0387C13.8763 9.7471 13.4819 9.58164 13.0696 9.57798H13.0453C12.6205 9.57798 12.2362 9.75203 11.9604 10.033C11.8146 10.1724 11.6987 10.3399 11.6196 10.5253C11.5405 10.7108 11.4999 10.9104 11.5002 11.112V11.1386V11.1371C11.5005 11.5532 11.666 11.9522 11.9603 12.2464C12.2545 12.5407 12.6535 12.7062 13.0696 12.7065H13.0689Z" />
              </svg>
            </a>
            <a className="flex justify-center items-center w-[30px] h-[30px] bg-white text-button rounded-full dark:bg-blue2 dark:text-white transition duration-800 hover:bg-blue2" href="https://discord.gg/WqHY6VSP" target="_blank" rel="noreferrer" aria-label="website">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="15" viewBox="0 0 19 15" fill="currentColor">
                <path d="M16.1149 1.8946C14.9273 1.34101 13.6416 0.93922 12.3023 0.707072C12.2905 0.706697 12.2788 0.7089 12.268 0.713528C12.2572 0.718157 12.2476 0.725097 12.2398 0.733859C12.079 1.02851 11.8915 1.41244 11.7665 1.70709C10.346 1.4928 8.90128 1.4928 7.4807 1.70709C7.3557 1.40352 7.1682 1.02851 6.99855 0.733859C6.98962 0.716001 6.96283 0.707072 6.93605 0.707072C5.59672 0.93922 4.3199 1.34101 3.12344 1.8946C3.11451 1.8946 3.10558 1.90353 3.09665 1.91246C0.668015 5.54646 -0.00164619 9.08226 0.32872 12.5823C0.32872 12.6002 0.337649 12.618 0.355507 12.627C1.96269 13.8056 3.50738 14.5199 5.03421 14.9931C5.06099 15.002 5.08778 14.9931 5.09671 14.9752C5.45386 14.4842 5.7753 13.9663 6.05209 13.4216C6.06995 13.3859 6.05209 13.3502 6.01638 13.3413C5.50744 13.1448 5.02528 12.9127 4.55205 12.6448C4.51634 12.627 4.51634 12.5734 4.54312 12.5466C4.64134 12.4752 4.73956 12.3948 4.83777 12.3234C4.85563 12.3055 4.88242 12.3055 4.90028 12.3145C7.97179 13.7163 11.2844 13.7163 14.3202 12.3145C14.338 12.3055 14.3648 12.3055 14.3827 12.3234C14.4809 12.4038 14.5791 12.4752 14.6773 12.5555C14.713 12.5823 14.713 12.6359 14.6684 12.6538C14.2041 12.9306 13.713 13.1538 13.2041 13.3502C13.1684 13.3591 13.1594 13.4038 13.1684 13.4306C13.4541 13.9752 13.7755 14.4931 14.1237 14.9842C14.1505 14.9931 14.1773 15.002 14.2041 14.9931C15.7399 14.5199 17.2845 13.8056 18.8917 12.627C18.9096 12.618 18.9185 12.6002 18.9185 12.5823C19.3114 8.5376 18.2667 5.0286 16.1506 1.91246C16.1417 1.90353 16.1327 1.8946 16.1149 1.8946ZM6.51639 10.4484C5.59672 10.4484 4.82885 9.60013 4.82885 8.55546C4.82885 7.51079 5.57887 6.66256 6.51639 6.66256C7.46285 6.66256 8.21287 7.51972 8.20394 8.55546C8.20394 9.60013 7.45392 10.4484 6.51639 10.4484ZM12.7398 10.4484C11.8201 10.4484 11.0522 9.60013 11.0522 8.55546C11.0522 7.51079 11.8023 6.66256 12.7398 6.66256C13.6862 6.66256 14.4363 7.51972 14.4273 8.55546C14.4273 9.60013 13.6862 10.4484 12.7398 10.4484Z" />
              </svg>
            </a>
          </div>
          <span className="text-[14px] leading-[17px] lg2:text-[12px] lg2:leading-[14px]">© 2023 Dopple Labs Inc. All Rights Reserved.</span>
        </div>
      </div>
      {navCollapsed &&
        <nav className={"block md2:hidden w-full transition duration-800 border-t" + (isDark === 0 ? " bg-nav border-button" : isDark === 1 ? " bg-white border-[#EDEDF0]" : isDark === 2 ? " bg-candynav border-candysubtext" : isDark === 3 ? " bg-galaxynav border-galaxybutton" : "")}>
          <div className="flex justify-center items-center space-x-[22px] py-4 text-[12px] leading-[14px]">
            <button className={"flex flex-col items-center space-y-1 group transition w-[60px]" + color("/")} onClick={() => nav("/")}>
              <div className={"flex justify-center items-center rounded-[5px] w-10 h-10 transition relative" + bgColor("/")}>
                {location.pathname === "/" ?
                  <img src="/images/nav/explore-selected.svg" alt="" />
                  :
                  <>
                    {isDark === 0 && <img src="/images/nav/explore.svg" alt="" />}
                    {isDark === 1 && <img src="/images/nav/explore-light.svg" alt="" />}
                    {isDark === 2 && <img src="/images/nav/explore-candy.svg" alt="" />}
                    {isDark === 3 && <img src="/images/nav/explore-galaxy.svg" alt="" />}
                  </>
                }
              </div>
              <span>Explore</span>
            </button>
            <button className={"flex flex-col items-center space-y-1 group transition w-[60px]" + color("/community")} onClick={() => nav("/community")}>
              <div className={"flex justify-center items-center rounded-[5px] w-10 h-10 transition relative" + bgColor("/community")}>
                {location.pathname === "/community" ?
                  <img src="/images/nav/community-selected.svg" alt="" />
                  :
                  <>
                    {isDark === 0 && <img src="/images/nav/community.svg" alt="" />}
                    {isDark === 1 && <img src="/images/nav/community-light.svg" alt="" />}
                    {isDark === 2 && <img src="/images/nav/community-candy.svg" alt="" />}
                    {isDark === 3 && <img src="/images/nav/community-galaxy.svg" alt="" />}
                  </>
                }
              </div>
              <span>Community</span>
            </button>
            <button className={"flex flex-col items-center space-y-1 group transition w-[60px]" + color("/create")} onClick={create}>
              <div className={"flex justify-center items-center rounded-[5px] w-10 h-10 transition relative" + bgColor("/create")}>
                {location.pathname === "/create" ?
                  <img src="/images/nav/create-selected.svg" alt="" />
                  :
                  <>
                    {isDark === 0 && <img src="/images/nav/create.svg" alt="" />}
                    {isDark === 1 && <img src="/images/nav/create-light.svg" alt="" />}
                    {isDark === 2 && <img src="/images/nav/create-candy.svg" alt="" />}
                    {isDark === 3 && <img src="/images/nav/create-galaxy.svg" alt="" />}
                  </>
                }
              </div>
              <span>Create</span>
            </button>
            <button className={"flex flex-col items-center space-y-1 group transition w-[60px]" + color("/messages")} onClick={seeChat}>
              <div className={"flex justify-center items-center rounded-[5px] w-10 h-10 transition relative" + bgColor("/messages")}>
                {location.pathname === "/messages" ?
                  <img src="/images/nav/messages-selected.svg" alt="" />
                  :
                  <>
                    {isDark === 0 && <img src="/images/nav/messages.svg" alt="" />}
                    {isDark === 1 && <img src="/images/nav/messages-light.svg" alt="" />}
                    {isDark === 2 && <img src="/images/nav/messages-candy.svg" alt="" />}
                    {isDark === 3 && <img src="/images/nav/messages-galaxy.svg" alt="" />}
                  </>
                }
              </div>
              <span>Messages</span>
            </button>
            <button className={"flex flex-col items-center space-y-1 group transition w-[60px]" + color("/account")} onClick={() => profile ? nav("/account") : dispatch(setOpenSignModal())}>
              <div className={"flex justify-center items-center rounded-[5px] w-10 h-10 transition relative" + bgColor("/account")}>
                {location.pathname === "/account" ?
                  <img src="/images/nav/account-selected.svg" alt="" />
                  :
                  <>
                    {isDark === 0 && <img src="/images/nav/account.svg" alt="" />}
                    {isDark === 1 && <img src="/images/nav/account-light.svg" alt="" />}
                    {isDark === 2 && <img src="/images/nav/account-candy.svg" alt="" />}
                    {isDark === 3 && <img src="/images/nav/account-galaxy.svg" alt="" />}
                  </>
                }
              </div>
              <span>Account</span>
            </button>
          </div>
        </nav>
      }
    </footer>
  );
};

export default Footer;
