/* ==========================================================
   AstroGuide — Horoscope
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ========================================================
     ELEMENTS
     ======================================================== */

  const zodiacItems = document.querySelectorAll(
    ".ag-services-zodiac-item"
  );

  const horoscopeIcon = document.getElementById(
    "ag-horoscope-icon"
  );

  const horoscopeSign = document.getElementById(
    "ag-horoscope-sign"
  );

  const horoscopeTitle = document.getElementById(
    "ag-horoscope-title"
  );

  const horoscopeDescription = document.getElementById(
    "ag-horoscope-description"
  );

  const horoscopeLove = document.getElementById(
    "ag-horoscope-love"
  );

  const horoscopeCareer = document.getElementById(
    "ag-horoscope-career"
  );

  const horoscopeFinance = document.getElementById(
    "ag-horoscope-finance"
  );

  const horoscopeWellness = document.getElementById(
    "ag-horoscope-wellness"
  );

  const horoscopeContent = document.getElementById(
    "ag-horoscope-content"
  );


  /* ========================================================
     HOROSCOPE DATA
     ======================================================== */

  const horoscopeData = {

    /* ======================================================
       ARIES
       ====================================================== */

    aries: {

      name: "Aries",

      svg: `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="zodiac-icon"
        >
          <path d="M12 7.5a4.5 4.5 0 1 1 5 4.5"/>
          <path d="M7 12a4.5 4.5 0 1 1 5-4.5V21"/>
        </svg>
      `,

      description:
        "Today encourages you to focus your energy on what truly matters. Trust your instincts while giving yourself enough time to think before making an important decision.",

      love:
        "Open communication can bring greater understanding to your relationships today.",

      career:
        "A focused approach will help you make meaningful progress toward your professional goals.",

      finance:
        "Consider your priorities carefully before making a financial commitment.",

      wellness:
        "Give yourself space to slow down and restore your energy."

    },


    /* ======================================================
       TAURUS
       ====================================================== */

    taurus: {

      name: "Taurus",

      svg: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zodiac-taurus preview-icon"><circle cx="12" cy="15" r="6"/><path d="M18 3A6 6 0 0 1 6 3"/></svg>
      `,

      description:
        "A steady and thoughtful approach can help you handle today's responsibilities with greater confidence. Trust the progress you have already made.",

      love:
        "Patience and honesty can create a stronger sense of connection with someone close to you.",

      career:
        "Consistent effort may bring noticeable progress in an area that has required patience.",

      finance:
        "Review your plans carefully and focus on practical financial choices.",

      wellness:
        "A calm routine and enough rest can help you maintain your balance."

    },


    /* ======================================================
       GEMINI
       ====================================================== */

    gemini: {

      name: "Gemini",

      svg: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zodiac-gemini preview-icon"><path d="M16 4.525v14.948"/><path d="M20 3A17 17 0 0 1 4 3"/><path d="M4 21a17 17 0 0 1 16 0"/><path d="M8 4.525v14.948"/></svg>
      `,

      description:
        "Your curiosity may lead you toward an interesting conversation or new perspective today. Stay open to ideas while keeping your priorities clear.",

      love:
        "A meaningful conversation can help you understand another person's perspective more clearly.",

      career:
        "Your communication skills can help you navigate an important professional situation.",

      finance:
        "Avoid rushing into decisions and give yourself time to compare your options.",

      wellness:
        "Take short breaks from mental activity and give your mind room to reset."

    },


    /* ======================================================
       CANCER
       ====================================================== */

    cancer: {

      name: "Cancer",

      svg: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zodiac-cancer preview-icon"><path d="M21 14.5A9 6.5 0 0 1 5.5 19"/><path d="M3 9.5A9 6.5 0 0 1 18.5 5"/><circle cx="17.5" cy="14.5" r="3.5"/><circle cx="6.5" cy="9.5" r="3.5"/></svg>
      `,

      description:
        "Today invites you to pay attention to your emotional needs while continuing to move forward with confidence.",

      love:
        "Being open about how you feel can create greater emotional closeness.",

      career:
        "Trust your instincts when navigating a situation that requires sensitivity and patience.",

      finance:
        "A careful review of your spending can help you feel more financially secure.",

      wellness:
        "Create some quiet time for yourself and focus on what helps you feel grounded."

    },


    /* ======================================================
       LEO
       ====================================================== */

    leo: {

      name: "Leo",

      svg: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zodiac-leo preview-icon"><path d="M10 16c0-4-3-4.5-3-8a5 5 0 0 1 10 0c0 3.466-3 6.196-3 10a3 3 0 0 0 6 0"/><circle cx="7" cy="16" r="3"/></svg>
      `,

      description:
        "Your natural confidence can help you take the lead today, but remember to leave room for the ideas and perspectives of others.",

      love:
        "Warmth and generosity can strengthen your connection with someone special.",

      career:
        "A confident approach may help you take an important step toward a professional goal.",

      finance:
        "Think beyond immediate rewards and keep your longer-term priorities in mind.",

      wellness:
        "Balance activity with enough rest so that your energy remains steady."

    },


    /* ======================================================
       VIRGO
       ====================================================== */

    virgo: {

      name: "Virgo",

      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zodiac-virgo preview-icon"><path d="M11 5.5a1 1 0 0 1 5 0V16a5 5 0 0 0 5 5"/><path d="M16 11.5a1 1 0 0 1 5 0V16a5 5 0 0 1-5 5"/><path d="M6 19V6a3 3 0 0 0-3-3h0"/><path d="M6 5.5a1 1 0 0 1 5 0V19"/></svg>
      `,

      description:
        "Small details may deserve your attention today. Use your practical nature to organize your priorities without putting unnecessary pressure on yourself.",

      love:
        "Simple acts of care can communicate more than complicated gestures.",

      career:
        "Your attention to detail can help you solve a problem efficiently.",

      finance:
        "Organizing your financial priorities can make upcoming decisions easier.",

      wellness:
        "Avoid overthinking and make time for activities that help you relax."

    },


    /* ======================================================
       LIBRA
       ====================================================== */

    libra: {

      name: "Libra",

      svg: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zodiac-libra preview-icon"><path d="M3 16h6.857c.162-.012.19-.323.038-.38a6 6 0 1 1 4.212 0c-.153.057-.125.368.038.38H21"/><path d="M3 20h18"/></svg>
      `,

      description:
        "Balance becomes especially important today. Give yourself enough time to consider different perspectives before choosing your next step.",

      love:
        "Honest and balanced communication can bring harmony to your relationships.",

      career:
        "Cooperation may be more productive than trying to handle everything alone.",

      finance:
        "Consider both your immediate needs and longer-term financial plans.",

      wellness:
        "Create a peaceful environment that allows you to recharge."

    },


    /* ======================================================
       SCORPIO
       ====================================================== */

    scorpio: {

      name: "Scorpio",

      svg: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zodiac-scorpio preview-icon"><path d="M10 19V5.5a1 1 0 0 1 5 0V17a2 2 0 0 0 2 2h5l-3-3"/><path d="m22 19-3 3"/><path d="M5 19V5.5a1 1 0 0 1 5 0"/><path d="M5 5.5A2.5 2.5 0 0 0 2.5 3"/></svg>
      `,

      description:
        "Today's energy encourages deeper reflection. Trust your intuition while making sure your decisions are supported by clear understanding.",

      love:
        "Emotional honesty can help deepen an important relationship.",

      career:
        "Focus on one meaningful objective instead of spreading your energy too widely.",

      finance:
        "Look beneath the surface of financial decisions before committing.",

      wellness:
        "Protect your personal space and allow yourself time to reset."

    },


    /* ======================================================
       SAGITTARIUS
       ====================================================== */

    sagittarius: {

      name: "Sagittarius",

      svg: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zodiac-sagittarius preview-icon"><path d="M15 3h6v6"/><path d="M21 3 3 21"/><path d="m9 9 6 6"/></svg>
      `,

      description:
        "A fresh perspective may help you see an opportunity that previously felt uncertain. Stay curious and allow yourself to explore.",

      love:
        "Shared experiences and honest conversations can bring renewed excitement.",

      career:
        "An open-minded approach may reveal a new professional possibility.",

      finance:
        "Keep enthusiasm balanced with practical planning before spending.",

      wellness:
        "Movement and time outdoors can help refresh your energy."

    },


    /* ======================================================
       CAPRICORN
       ====================================================== */

    capricorn: {

      name: "Capricorn",

      svg: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zodiac-capricorn preview-icon"><path d="M11 21a3 3 0 0 0 3-3V6.5a1 1 0 0 0-7 0"/><path d="M7 19V6a3 3 0 0 0-3-3h0"/><circle cx="17" cy="17" r="3"/></svg>
      `,

      description:
        "Your patience and determination can help you make meaningful progress today. Focus on what is within your control.",

      love:
        "Showing appreciation through consistent actions can strengthen trust.",

      career:
        "Steady effort and clear priorities can move an important project forward.",

      finance:
        "Practical planning can help you maintain greater financial stability.",

      wellness:
        "Do not let responsibilities prevent you from taking necessary breaks."

    },


    /* ======================================================
       AQUARIUS
       ====================================================== */

    aquarius: {

      name: "Aquarius",

      svg: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zodiac-aquarius preview-icon"><path d="m2 10 2.456-3.684a.7.7 0 0 1 1.106-.013l2.39 3.413a.7.7 0 0 0 1.096-.001l2.402-3.432a.7.7 0 0 1 1.098 0l2.402 3.432a.7.7 0 0 0 1.098 0l2.389-3.413a.7.7 0 0 1 1.106.013L22 10"/><path d="m2 18.002 2.456-3.684a.7.7 0 0 1 1.106-.013l2.39 3.413a.7.7 0 0 0 1.097 0l2.402-3.432a.7.7 0 0 1 1.098 0l2.402 3.432a.7.7 0 0 0 1.098 0l2.389-3.413a.7.7 0 0 1 1.106.013L22 18.002"/></svg>
      `,

      description:
        "New ideas may appear when you allow yourself to think differently. Stay open to possibilities without losing sight of what matters.",

      love:
        "Giving each other enough space while staying connected can strengthen understanding.",

      career:
        "Your original ideas may offer a useful solution to a current challenge.",

      finance:
        "Think carefully before making an unconventional financial choice.",

      wellness:
        "Give your mind a break from constant stimulation and reconnect with yourself."

    },


    /* ======================================================
       PISCES
       ====================================================== */

    pisces: {

      name: "Pisces",

      svg: `
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zodiac-pisces preview-icon"><path d="M19 21a15 15 0 0 1 0-18"/><path d="M20 12H4"/><path d="M5 3a15 15 0 0 1 0 18"/></svg>
      `,

      description:
        "Your intuition may be particularly strong today. Use it as a guide while staying grounded in the practical details of your situation.",

      love:
        "Empathy and emotional openness can create a deeper connection.",

      career:
        "Trust your creative instincts while keeping your professional priorities clear.",

      finance:
        "Avoid emotional spending and give yourself time before making financial decisions.",

      wellness:
        "Rest, reflection, and quiet moments can help restore your energy."

    }

  };


  /* ========================================================
     UPDATE HOROSCOPE
     ======================================================== */

  function updateHoroscope(zodiac) {

    const data = horoscopeData[zodiac];

    if (!data) {
      return;
    }


    /* Start content transition */

    horoscopeContent.classList.add("is-changing");


    setTimeout(() => {

      /* ----------------------------------------------
         CHANGE ZODIAC SVG
         ---------------------------------------------- */

      horoscopeIcon.innerHTML = data.svg;


      /* ----------------------------------------------
         CHANGE ZODIAC NAME
         ---------------------------------------------- */

      horoscopeSign.textContent = data.name;


      /* ----------------------------------------------
         CHANGE HOROSCOPE TITLE
         ---------------------------------------------- */

      horoscopeTitle.textContent = data.name;


      /* ----------------------------------------------
         CHANGE MAIN DESCRIPTION
         ---------------------------------------------- */

      horoscopeDescription.textContent =
        data.description;


      /* ----------------------------------------------
         CHANGE LOVE
         ---------------------------------------------- */

      horoscopeLove.textContent =
        data.love;


      /* ----------------------------------------------
         CHANGE CAREER
         ---------------------------------------------- */

      horoscopeCareer.textContent =
        data.career;


      /* ----------------------------------------------
         CHANGE FINANCE
         ---------------------------------------------- */

      horoscopeFinance.textContent =
        data.finance;


      /* ----------------------------------------------
         CHANGE WELLNESS
         ---------------------------------------------- */

      horoscopeWellness.textContent =
        data.wellness;


      /* Finish content transition */

      horoscopeContent.classList.remove(
        "is-changing"
      );

    }, 250);

  }


  /* ========================================================
     ZODIAC BUTTON EVENTS
     ======================================================== */

  zodiacItems.forEach((item) => {

    item.addEventListener("click", () => {

      const zodiac = item.dataset.zodiac;


      /* ----------------------------------------------
         Remove active state from all signs
         ---------------------------------------------- */

      zodiacItems.forEach((button) => {

        button.classList.remove("active");

        button.setAttribute(
          "aria-selected",
          "false"
        );

      });


      /* ----------------------------------------------
         Activate selected sign
         ---------------------------------------------- */

      item.classList.add("active");

      item.setAttribute(
        "aria-selected",
        "true"
      );


      /* ----------------------------------------------
         Update horoscope
         ---------------------------------------------- */

      updateHoroscope(zodiac);

    });

  });


  /* ========================================================
     INITIAL HOROSCOPE
     ======================================================== */

  updateHoroscope("aries");

});