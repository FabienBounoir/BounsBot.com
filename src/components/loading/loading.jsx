import React from 'react';
import "./_loading.css";

function Loading() {
  // const [count, setCount] = useState(0);

  return (
    <div className="loadingFullPage">
      <div className="alignImage">
        {/* <svg className="logo" width="267" height="249" viewBox="0 0 944 882" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M305.841 728.275C300.49 728.275 295.544 731.126 292.862 735.757L221.678 858.652C215.886 868.652 223.101 881.17 234.658 881.17H719.492C731.049 881.17 738.264 868.652 732.472 858.652L661.289 735.757C658.606 731.126 653.66 728.275 648.309 728.275H305.841Z" fill="var(--color-principal)"/>
<path d="M853.511 525.341C902.931 505.457 926.883 449.27 906.996 399.851C887.111 350.435 830.923 326.499 781.506 346.381C732.083 366.265 708.13 422.457 728.021 471.878C747.909 521.291 804.096 545.224 853.511 525.341Z" fill="url(#paint0_linear_7_295)"/>
<path d="M65.6184 489.699C101.85 529.117 163.176 531.703 202.599 495.477C242.032 459.241 244.618 397.896 208.373 358.471C172.14 319.06 110.819 316.477 71.3992 352.7C31.9687 388.933 29.3798 450.273 65.6184 489.699Z" fill="url(#paint1_linear_7_295)"/>
<g filter="url(#filter0_d_7_295)">
<path d="M816.009 662.527C708.084 823.479 267.083 830.795 144.523 662.527C21.9637 492.43 247.595 164.804 478.08 172.12C708.566 181.266 922.106 503.404 816.009 662.527Z" fill="url(#paint2_linear_7_295)"/>
</g>
<path d="M465.721 72.1191C465.721 69.3577 467.959 67.1191 470.721 67.1191H489.849C492.61 67.1191 494.849 69.3577 494.849 72.1191V189.399C494.849 192.16 492.61 194.399 489.849 194.399H470.721C467.959 194.399 465.721 192.16 465.721 189.399V72.1191Z" fill="var(--color-principal-hover)"/>
<rect x="522" y="411" width="224.113" height="223.123" rx="111.562" fill="white"/>
<path d="M742.979 505.153C742.979 463.801 710.02 431 668.489 431C627.623 431 594 464.465 594 505.153C594 545.842 627.623 579.306 668.489 579.306C710.02 579.306 742.979 545.842 742.979 505.153Z" fill="black"/>
<rect x="211" y="411" width="224.113" height="223.123" rx="111.562" fill="white"/>
<path d="M430.979 505.153C430.979 463.801 398.02 431 356.489 431C315.623 431 282 464.465 282 505.153C282 545.842 315.623 579.306 356.489 579.306C398.02 579.306 430.979 545.842 430.979 505.153Z" fill="black"/>
<path d="M529.131 650.028C494.2 660.532 455.969 659.869 421.683 648.056C415.103 646.085 410.475 638.861 412.467 631.656C414.439 625.096 421.683 620.488 428.946 622.46C459.25 632.964 491.564 633.609 522.532 624.432C539.011 619.844 545.611 644.776 529.131 650.028Z" fill="black"/>
<path d="M367.868 319.241C375.112 319.904 381.047 312.681 381.047 306.12C381.047 298.897 375.112 293.645 367.868 293C329.637 289.72 291.406 298.252 257.12 315.961C241.968 323.848 255.147 346.809 270.299 338.94C300.622 323.185 334.245 316.624 367.868 319.241ZM689.529 338.94C704.681 346.809 717.861 324.493 702.709 315.961C669.087 298.252 630.192 289.72 592.625 293C585.381 293.645 579.445 298.897 579.445 306.12C579.445 312.681 585.381 319.904 592.625 319.241C626.248 316.624 659.87 323.185 689.529 338.94Z" fill="black"/>
<g filter="url(#filter1_d_7_295)">
<path d="M439.988 113.071C460.211 135.076 494.444 136.521 516.45 116.299C538.461 96.0717 539.903 61.8283 519.67 39.823C499.445 17.8274 465.219 16.3871 443.217 36.6051C421.21 56.8285 419.763 91.0648 439.988 113.071Z" fill="url(#paint3_linear_7_295)"/>
</g>
<defs>
<filter id="filter0_d_7_295" x="46" y="112" width="862" height="742" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="32"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7_295"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7_295" result="shape"/>
</filter>
<filter id="filter1_d_7_295" x="421.717" y="22.3359" width="116.233" height="116.232" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7_295"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7_295" result="shape"/>
</filter>
<linearGradient id="paint0_linear_7_295" x1="890.5" y1="375.5" x2="759.5" y2="479" gradientUnits="userSpaceOnUse">
<stop stopColor="var(--color-principal-hover)"/>
<stop offset="1" stopColor="var(--color-principal)"/>
</linearGradient>
<linearGradient id="paint1_linear_7_295" x1="74.5" y1="348.5" x2="200.5" y2="491.5" gradientUnits="userSpaceOnUse">
<stop stopColor="var(--color-principal)"/>
<stop offset="1" stopColor="var(--color-principal-hover)"/>
</linearGradient>
<linearGradient id="paint2_linear_7_295" x1="844" y1="556" x2="110" y2="547.5" gradientUnits="userSpaceOnUse">
<stop stopColor="var(--color-principal)"/>
<stop offset="1" stopColor="var(--color-principal-hover)"/>
</linearGradient>
<linearGradient id="paint3_linear_7_295" x1="524.317" y1="39.6792" x2="444.498" y2="102.746" gradientUnits="userSpaceOnUse">
<stop stopColor="var(--color-principal-hover)"/>
<stop offset="1" stopColor="var(--color-principal)"/>
</linearGradient>
</defs>
</svg> */}

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

export default Loading;
