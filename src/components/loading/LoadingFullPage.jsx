import React from 'react';
import "./_loading.css";
import { useHistory } from "react-router-dom";

function LoadingFullPage({ error, url = "/", errorMessage = "Une erreur est survenue", errorButton = "Retour à l'accueil" }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(url);
  };


  if (error) return (
    <div className="loadingFullPage">
      <div className="alignImage error">
        <h3>{errorMessage}</h3>
        <svg width="267" height="267" viewBox="0 0 973 973" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1896_285)">
            <path d="M318.841 774.275C313.49 774.275 308.544 777.126 305.862 781.757L234.678 904.652C228.886 914.652 236.101 927.17 247.658 927.17H732.492C744.049 927.17 751.264 914.652 745.472 904.652L674.289 781.757C671.606 777.126 666.66 774.275 661.309 774.275H318.841Z" fill="var(--color-principal-hover)" />
            <path d="M882.511 571.341C931.931 551.456 955.883 495.269 935.996 445.85V445.85C916.111 396.435 859.923 372.498 810.506 392.38V392.38C761.083 412.265 737.13 468.457 757.021 517.878V517.878C776.909 567.291 833.096 591.224 882.511 571.341V571.341Z" fill="url(#paint0_linear_1896_285)" />
            <path d="M64.6184 535.699C100.85 575.117 162.176 577.703 201.599 541.477V541.477C241.032 505.241 243.618 443.896 207.373 404.471V404.471C171.14 365.06 109.819 362.477 70.3992 398.7V398.7C30.9687 434.933 28.3798 496.273 64.6184 535.699V535.699Z" fill="url(#paint1_linear_1896_285)" />
            <path d="M829.009 708.527C721.084 869.479 280.083 876.795 157.523 708.527C34.9637 538.43 260.595 210.804 491.08 218.12C721.566 227.266 935.106 549.404 829.009 708.527Z" fill="url(#paint2_linear_1896_285)" />
            <path d="M793.213 687.39C697.638 829.923 307.106 836.402 198.573 687.391C90.0387 536.76 289.848 246.628 493.957 253.107C698.065 261.205 887.167 546.478 793.213 687.39Z" fill="black" />
            <path d="M478.721 118.119C478.721 115.358 480.959 113.119 483.721 113.119H502.849C505.61 113.119 507.849 115.358 507.849 118.119V235.399C507.849 238.16 505.61 240.399 502.849 240.399H483.721C480.959 240.399 478.721 238.16 478.721 235.399V118.119Z" fill="var(--color-principal-hover)" />
            <path d="M452.988 159.071C473.211 181.076 507.444 182.521 529.45 162.299V162.299C551.461 142.072 552.903 107.828 532.67 85.823V85.823C512.445 63.8274 478.219 62.3871 456.217 82.6051V82.6051C434.21 102.829 432.763 137.065 452.988 159.071V159.071Z" fill="url(#paint3_linear_1896_285)" />
            <path className='zoomAndRotate' d="M389.171 687.946L493.627 581.683L597.836 687.686C603.104 693.045 610.04 695.74 616.976 695.74C623.915 695.74 630.839 693.043 636.113 687.69L636.119 687.684C646.626 676.985 646.629 659.69 636.117 648.998L636.117 648.998L531.771 542.873L636.108 436.749L632.543 433.244L636.108 436.749C646.619 426.057 646.619 408.752 636.108 398.061C625.544 387.315 608.395 387.311 597.836 398.061C597.835 398.062 597.835 398.062 597.834 398.063L493.618 504.064L389.411 398.063C378.855 387.314 361.686 387.311 351.135 398.062C340.617 408.753 340.617 426.058 351.136 436.749C351.137 436.749 351.137 436.75 351.138 436.751L455.465 542.874L350.89 649.258C350.889 649.258 350.889 649.258 350.889 649.258C340.372 659.957 340.369 677.253 350.89 687.946C356.158 693.305 363.094 696 370.03 696C376.966 696 383.902 693.305 389.171 687.946L385.605 684.44L389.171 687.946Z" fill="url(#paint4_linear_1896_285)" stroke="url(#paint5_linear_1896_285)" stroke-width="10" />
          </g>
          <defs>
            <linearGradient id="paint0_linear_1896_285" x1="919.5" y1="421.5" x2="788.5" y2="525" gradientUnits="userSpaceOnUse">
              <stop stop-color="var(--color-principal-hover)" />
              <stop offset="1" stop-color="var(--color-principal)" />
            </linearGradient>
            <linearGradient id="paint1_linear_1896_285" x1="73.5" y1="394.5" x2="199.5" y2="537.5" gradientUnits="userSpaceOnUse">
              <stop stop-color="var(--color-principal)" />
              <stop offset="1" stop-color="var(--color-principal-hover)" />
            </linearGradient>
            <linearGradient id="paint2_linear_1896_285" x1="857" y1="602" x2="123" y2="593.5" gradientUnits="userSpaceOnUse">
              <stop stop-color="var(--color-principal)" />
              <stop offset="1" stop-color="var(--color-principal-hover)" />
            </linearGradient>
            <linearGradient id="paint3_linear_1896_285" x1="537.317" y1="85.6792" x2="457.498" y2="148.746" gradientUnits="userSpaceOnUse">
              <stop stop-color="var(--color-principal-hover)" />
              <stop offset="1" stop-color="var(--color-principal)" />
            </linearGradient>
            <linearGradient id="paint4_linear_1896_285" x1="639" y1="580.121" x2="347.987" y2="577.349" gradientUnits="userSpaceOnUse">
              <stop stop-color="var(--color-principal)" />
              <stop offset="1" stop-color="var(--color-principal-hover)" />
            </linearGradient>
            <linearGradient id="paint5_linear_1896_285" x1="639" y1="580.121" x2="347.987" y2="577.349" gradientUnits="userSpaceOnUse">
              <stop stop-color="var(--color-principal)" />
              <stop offset="1" stop-color="var(--color-principal-hover)" />
            </linearGradient>
            <clipPath id="clip0_1896_285">
              <rect width="973" height="973" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <button onClick={() => { handleClick() }} className="btn btn-primary btn-lg btn-block">{errorButton}</button>
      </div>
    </div>
  );

  return (
    <div className="loadingFullPage">
      <div className="alignImage">
        <svg width="267" height="267" viewBox="0 0 973 973" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_250_597)">
            <path d="M319.841 764.275C314.49 764.275 309.544 767.126 306.862 771.757L235.678 894.652C229.886 904.652 237.101 917.17 248.658 917.17H733.492C745.049 917.17 752.264 904.652 746.472 894.652L675.289 771.757C672.606 767.126 667.66 764.275 662.309 764.275H319.841Z" fill="var(--color-principal)" />
            <path d="M883.511 561.341C932.931 541.456 956.883 485.269 936.996 435.85V435.85C917.111 386.435 860.923 362.498 811.506 382.38V382.38C762.083 402.265 738.13 458.457 758.021 507.878V507.878C777.909 557.291 834.096 581.224 883.511 561.341V561.341Z" fill="url(#paint0_linear_250_597)" />
            <path d="M65.6184 525.699C101.85 565.117 163.176 567.703 202.599 531.477V531.477C242.032 495.241 244.618 433.896 208.373 394.471V394.471C172.14 355.06 110.819 352.477 71.3992 388.7V388.7C31.9687 424.933 29.3798 486.273 65.6184 525.699V525.699Z" fill="url(#paint1_linear_250_597)" />
            <path d="M830.009 698.527C722.084 859.479 281.083 866.795 158.523 698.527C35.9637 528.43 261.595 200.804 492.08 208.12C722.566 217.266 936.106 539.404 830.009 698.527Z" fill="url(#paint2_linear_250_597)" />
            <path d="M794.213 677.39C698.638 819.923 308.106 826.402 199.573 677.391C91.0387 526.76 290.848 236.628 494.957 243.107C699.065 251.205 888.167 536.478 794.213 677.39Z" fill="black" />
            <path d="M479.721 108.119C479.721 105.358 481.959 103.119 484.721 103.119H503.849C506.61 103.119 508.849 105.358 508.849 108.119V225.399C508.849 228.16 506.61 230.399 503.849 230.399H484.721C481.959 230.399 479.721 228.16 479.721 225.399V108.119Z" fill="var(--color-principal-hover)" />
            <path d="M453.988 149.071C474.211 171.076 508.444 172.521 530.45 152.299V152.299C552.461 132.072 553.903 97.8283 533.67 75.823V75.823C513.445 53.8274 479.219 52.3871 457.217 72.6051V72.6051C435.21 92.8285 433.763 127.065 453.988 149.071V149.071Z" fill="url(#paint3_linear_250_597)" />

            <path className='animUp1' d="M340.83 554.921C356.197 571.641 382.208 572.739 398.93 557.373V557.373C415.655 542.004 416.751 515.984 401.376 499.263V499.263C386.008 482.55 360.002 481.456 343.284 496.818V496.818C326.561 512.185 325.463 538.199 340.83 554.921V554.921Z" fill="url(#paint4_linear_250_597)" />
            <path className='animUp2' d="M464.039 554.921C479.406 571.641 505.417 572.739 522.139 557.373V557.373C538.864 542.004 539.96 515.984 524.585 499.263V499.263C509.217 482.55 483.211 481.456 466.493 496.818V496.818C449.77 512.185 448.672 538.199 464.039 554.921V554.921Z" fill="url(#paint5_linear_250_597)" />
            <path className='animUp3' d="M587.25 554.921C602.617 571.641 628.628 572.739 645.349 557.373V557.373C662.075 542.004 663.17 515.984 647.796 499.263V499.263C632.428 482.55 606.422 481.456 589.704 496.818V496.818C572.981 512.185 571.882 538.199 587.25 554.921V554.921Z" fill="url(#paint6_linear_250_597)" />
          </g>
          <defs>
            <linearGradient id="paint0_linear_250_597" x1="920.5" y1="411.5" x2="789.5" y2="515" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--color-principal-hover)" />
              <stop offset="1" stopColor="var(--color-principal)" />
            </linearGradient>
            <linearGradient id="paint1_linear_250_597" x1="74.5" y1="384.5" x2="200.5" y2="527.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--color-principal)" />
              <stop offset="1" stopColor="var(--color-principal-hover)" />
            </linearGradient>
            <linearGradient id="paint2_linear_250_597" x1="858" y1="592" x2="124" y2="583.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--color-principal)" />
              <stop offset="1" stopColor="var(--color-principal-hover)" />
            </linearGradient>
            <linearGradient id="paint3_linear_250_597" x1="538.317" y1="75.6792" x2="458.498" y2="138.746" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--color-principal-hover)" />
              <stop offset="1" stopColor="var(--color-principal)" />
            </linearGradient>

            <linearGradient id="paint4_linear_250_597" x1="404.907" y1="499.154" x2="344.257" y2="547.075" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--color-principal-hover)" />
              <stop offset="1" stopColor="var(--color-principal)" />
            </linearGradient>
            <linearGradient id="paint5_linear_250_597" x1="528.116" y1="499.154" x2="467.466" y2="547.075" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--color-principal-hover)" />
              <stop offset="1" stopColor="var(--color-principal)" />
            </linearGradient>
            <linearGradient id="paint6_linear_250_597" x1="651.327" y1="499.154" x2="590.677" y2="547.075" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--color-principal-hover)" />
              <stop offset="1" stopColor="var(--color-principal)" />
            </linearGradient>

            <clipPath id="clip0_250_597">
              <rect width="973" height="973" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default LoadingFullPage;
