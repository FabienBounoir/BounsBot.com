import React from 'react';
import "./_loading.css";

import logo from "../picture/logo5.svg";

function Loading() {
  // const [count, setCount] = useState(0);

  return (
      <div class="loadingFullPage">
        <div class="alignImage">
          <img src={logo} alt="Logo Chargement" />
        </div>
      </div>
  );
}

export default Loading;
