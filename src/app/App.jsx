import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { Navigation } from "../components/navbar/navbar";

import { HomePage } from "../components/homepage/homepage";
import Footer from '../components/footer/footer';

import { Features } from "../components/features/features";
import { Levels } from "../pages/levels/levels";
import { Commandes } from "../pages/commandes/commandes";
import { ErreurPage } from "../pages/ErreurPage/ErreurPage";
import { PrivacyBot } from "../pages/privacyBot/privacy";
import { Login } from "../pages/login/login";
import { Dashboard } from "../pages/dashboard/dashboard";

import Demo from "../pages/demo/demo";
import { Callback } from "../components/callback/callback";
import Authenticate from '../components/Authenticate';
import { Bio } from "../pages/bio/bio";
import { TermsBot } from "../pages/termsBot/terms";
import { ApprovedBy } from "../components/approvedBy/approvedBy";
import { BrandAddBot } from "../components/addBot/addBot";
import ScrollToTop from "../utils/ScrollToTop"
import { useEffect } from "react";
import Status from "../pages/status/status";
import i18n from '../i18n';
import Loader from "../components/loader/loader";
import SEO from "../components/SEO/seo";

export const App = () => {
  useEffect(() => {
    setEnvColor()
  }, [])

  let randomColor = () => {
    let color = "";
    let letters = "0123456789ABCDEF";

    do {
      color = "";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
    }
    while (parseInt(color, 16) > 0x999999 || parseInt(color, 16) < 0x333333)

    return color;
  }

  let setEnvColor = () => {
    let r = document.getElementsByTagName("html")[0];

    let date = new Date();
    if (date.getMonth() === 9 && (date.getDate() <= 31 && date.getDate() >= 15)) {
      let r = document.getElementsByTagName("html")[0];
      r.style.setProperty('--color-principal', '#ff5e00');
      r.style.setProperty('--color-principal-hover', '#702a00');

      r.style.setProperty('--color-red', '255');
      r.style.setProperty('--color-green', '94');
      r.style.setProperty('--color-blue', '0');
    }
    else if (date.getMonth() === 11 && (date.getDate() <= 27 && date.getDate() >= 10)) {
      let r = document.getElementsByTagName("html")[0];
      r.style.setProperty('--color-principal', '#00bfff');
      r.style.setProperty('--color-principal-hover', '#00688b');

      r.style.setProperty('--color-red', '0');
      r.style.setProperty('--color-green', '191');
      r.style.setProperty('--color-blue', '255');

      setSnow();
    }
    else if (Math.random() < 0.2) {
      colorUpdate(r);
    }
  }

  let colorUpdate = (r) => {
    const color = randomColor();
    r.style.setProperty('--color-principal', "#" + color);
    r.style.setProperty('--color-principal-hover', "#" + randomColor());

    r.style.setProperty('--color-red', parseInt(color.slice(0, 2), 16));
    r.style.setProperty('--color-green', parseInt(color.slice(2, 4), 16));
    r.style.setProperty('--color-blue', parseInt(color.slice(4, 6), 16));
  }

  let setSnow = () => {
    var embedimSnow = document.getElementById('embedim--snow');
    if (!embedimSnow) {
      function embRand(a, b) {
        return Math.floor(Math.random() * (b - a + 1)) + a
      }

      var embCSS = '.embedim-snow{position: absolute;width: 10px;height: 10px;background: white;border-radius: 50%;margin-top:-10px;}';
      var embHTML = '';

      let nbSnow = 70;

      if (window.innerWidth < 900) nbSnow = 30;

      for (let i = 1; i < nbSnow; i++) {

        embHTML += '<i class="embedim-snow"></i>';

        var rndX = (embRand(0, 1000000) * 0.0001), rndO = embRand(-100000, 100000) * 0.0001, rndT = (embRand(3, 8) * 10).toFixed(2), rndS = (embRand(0, 10000) * 0.0001).toFixed(2);

        embCSS += ' .embedim-snow:nth-child(' + i + '){opacity:' + (embRand(1, 10000) * 0.0001).toFixed(2) + ';transform:translate(' + rndX.toFixed(2) + 'vw,-10px) scale(' + rndS + ');animation:fall-' + i + ' ' + embRand(10, 30) + 's -' + embRand(0, 30) + 's linear infinite;}\n@keyframes fall-' + i + '{' + rndT + '%{transform:translate(' + (rndX + rndO).toFixed(2) + 'vw,' + rndT + 'vh) scale(' + rndS + ')}to{transform:translate(' + (rndX + (rndO / 2)).toFixed(2) + 'vw, 105vh) scale(' + rndS + ')}} '
      }
      embedimSnow = document.createElement('div'); embedimSnow.id = 'embedim--snow';
      embedimSnow.innerHTML = '<style>#embedim--snow{position:fixed;left:0;top:0;bottom:0;width:100vw;height:100vh;overflow:hidden;z-index:9999999;pointer-events:none;}' + embCSS + '</style>' + embHTML;
      document.body.appendChild(embedimSnow)
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Loader />
        <Routes>
          <Route path="/" element={
            <>
              <SEO title="Bouns'Bot" description="Bouns'Bot a discord bot compatible with 20 languages developed by @BadbounsTV. The easiest Discord bot to use ! Game | Moderation | Leveling | Twitch Chat | Radio | Ticket | Temp Channel & more !." name="Bouns'Bot" />
              <HomePage />
              <ApprovedBy />
              <Features />
              <BrandAddBot />
              <Footer />
            </>
          } />

          <Route path="/features" element={
            <>
              <Navigation />
              <SEO title="Bouns'Bot Features" description="Discover the features of Bouns'bot, the multifunction bot for your Discord server." name="Bouns'Bot" />
              <Features />
              <BrandAddBot />
            </>
          } />

          <Route path="/commands" element={
            <>
              <Navigation />
              <SEO title="Bouns'Botㆍcommandes" description="Learn how to use Bouns'bot, the multifunction bot for your Discord server." name="Bouns'Bot" />
              <ScrollToTop>
                <Commandes />
                <BrandAddBot />
                <Footer />
              </ScrollToTop>
            </>
          } />

          <Route path="/status" element={
            <>
              <Navigation />
              <SEO title="Bouns'Botㆍstatus" description="See the status of Bouns'bot, the multifunction bot for your Discord server." name="Bouns'Bot" />
              <Status />
              <BrandAddBot />
              <Footer />
            </>
          } />

          <Route path="/level" element={
            <>
              <Navigation />
              <SEO title="Bouns'Botㆍlevels" description="Engage your community with the levels system of Bouns'bot, the multifunction bot for your Discord server." name="Bouns'Bot" />
              <Levels />
            </>
          } />

          <Route path="/demo" element={
            <>
              <Navigation />
              <SEO title="Bouns'Botㆍdemo" description="Cool demo of Bouns'bot, You can even chat with your friends directly here!" name="Bouns'Bot" />
              <Demo />
            </>
          } />

          <Route path="/dashboard" element={
            <Authenticate>
              <Navigation />
              <SEO title="Bouns'Botㆍdashboard" description="Manage your server with the dashboard of Bouns'bot !" name="Bouns'Bot" />
              <Dashboard />
            </Authenticate>
          } />

          <Route path="/dashboard/:id/:typeconfig" element={
            <Authenticate>
              <Navigation background={"#202225"} />
              <SEO title="Bouns'Botㆍdashboard" description="Manage your server with the dashboard of Bouns'bot !" name="Bouns'Bot" />
              <Dashboard />
            </Authenticate>
          } />

          <Route path="/login" element={
            <>
              <Navigation />
              <SEO title="Bouns'Botㆍlogin" description="Login with your Discord account to manage your server with the dashboard of Bouns'bot !" name="Bouns'Bot" />
              <Login />
            </>
          } />

          <Route path="/bot/privacy" element={
            <>
              <Navigation />
              <SEO title="Bouns'Botㆍprivacy" description="Privacy policy of Bouns'bot" name="Bouns'Bot" />
              <ScrollToTop>
                <PrivacyBot />
                <Footer />
              </ScrollToTop>
            </>
          } />

          <Route path="/a-propos" element={
            <>
              <Navigation />
              <SEO title="Bouns'Botㆍabout" description="Why Bouns'bot ? Who is Bouns'bot ? Find out more about Bouns'bot !" name="Bouns'Bot" />
              <ScrollToTop>
                <Bio />
                <Footer />
              </ScrollToTop>
            </>
          } />

          <Route path="/bot/terms" element={
            <>
              <Navigation />
              <SEO title="Bouns'Botㆍterms" description="Terms of service of Bouns'bot" name="Bouns'Bot" />
              <ScrollToTop>
                <TermsBot />
                <Footer />
              </ScrollToTop>
            </>
          } />

          <Route path="/oauth/callback" element={
            <>
              <Navigation />
              <Callback />
            </>
          } />

          <Route path="*" element={
            <>
              <Navigation />
              <SEO title="Bouns'Botㆍ404" description="You look lost, stranger. If you want to add bouns'bot, the button below might help you 👀" name="Bouns'Bot" />
              <ErreurPage />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
