'use strict';

const ipgeolocation = 'https://api.ipgeolocation.io/ipgeo?apiKey=31ece79449854d1c8059ec105e82b33d';

const timeouts = [];

const mobileAndTabletCheck = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

$(document).ready(() => {
  const links = [
    {
      name: 'tiktok',
      link: 'www.tiktok.com/@turtize',
    },
    {
      name: 'spotify',
      link: 'https://open.spotify.com/artist/30WXKK97sXeerbkhM4mtRe?si=EOUg7-2_QNKnzvJnLBOtsw',
    },
    {
      name: 'corrupt.bio',
      link: 'corrupt.bio/t',
    }, 
    {
      name: 'roblox',
      link: 'www.roblox.com/users/2009811896/profile',
    }, 
    {
      name: 'instagram',
      link: 'www.instagram.com/ashedc1g/',
    },
    {
     name: 'snapchat',
     link: 'www.snapchat.com/add/turtize?share_id=JqQCdvCrQ0GDOB7wlF+R8w&locale=sv_SE',
    },
    {
      name: 'feds.lol',
      link: 'feds.lol/yets',
    }
  ];

  for (let i in links) {
    let link = links[i];

    $('#marquee').append(`<a href="https://${link.link}" target="_BLANK">${link.name}</a>`);

    link = $('#marquee').children('a').last();

    if (i != links.length - 1) $('#marquee').append(' <img class="emoticon" src="assets/others/dot.png"> ');
  }

  if (mobileAndTabletCheck()) {
    $('#background').replaceWith('<div id="background" style="background-image: url(assets/images/mobile-background.jpg);"></div>');

    app.shouldIgnoreVideo = true;
  }

  app.titleChanger(['t', 'tu', 'tur', 'turt', 'turti', 'turtiz', 'turtize']);
  app.iconChanger(['assets/icons/rose1.jpg', 'assets/icons/rose2.jpg', 'assets/icons/rose3.jpg', 'assets/icons/rose4.jpg', 'assets/icons/rose5.jpg', 'assets/icons/rose6.jpg', 'assets/icons/rose7.jpg', 'assets/icons/rose7.jpg', 'assets/icons/rose1.jpg']);
});

if ($.cookie('videoTime')) {
  app.videoElement.currentTime = $.cookie('videoTime');
  app.audioElement.currentTime = $.cookie('videoTime');
}

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

document.body.onkeyup = (event) => {
  if (event.keyCode == 32 && app.skippedIntro) {
    if (app.backgroundToggler) {
      app.videoElement.play();
      app.audioElement.play();
    } else {
      app.videoElement.pause();
      app.audioElement.pause();
    }

    return (app.backgroundToggler = !app.backgroundToggler);
  }
};


setInterval(() => {
  $('.troll').remove();
}, 600);

$('.skip').click(() => {
  skipIntro();
});

$.fn.extend({
  animateCss: function(animationName) {
    const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    this.addClass(`animated ${animationName}`).one(animationEnd, () => {
      $(this).removeClass(`animated ${animationName}`);
    });

    return this;
  },
});

const writeLine = (text, speed, timeout, callback) => {
  timeout = typeof timeout === 'number' ? timeout : [0, (callback = timeout)];

  const lineNumber = app.id !== 2 ? ++app.id : (app.id += 2);

  setTimeout(() => {
    const typed = new Typed(`#line${lineNumber}`, {
      strings: text,
      typeSpeed: speed,
      onComplete: callback,
    });
  }, timeout);
};

$.getJSON(ipgeolocation, (data) => {
  writeLine(['Authenticating...', "Granting access to <span style='font-size: 14px; color: #06d;'>[unknown]</span>..."], 30, () => {
    if (app.skippedIntro) return;

    clearCursor();

    const usernames = ['user', 'dude'];

    const ip = data.ip ? data.ip : usernames[Math.floor(Math.random() * usernames.length)];
    const country = data.country_name ? data.country_name : 'your country';

    writeLine([`Access granted! <span style='font-size: 14px; color: #0f0;'>[success]</span>`, `Welcome , <i style='color: #0f0'>${ip}</i>! By the way, nice to see someone from ${country} here!`], 30, 500, () => {
      if (app.skippedIntro) return;

      clearCursor();

      writeLine([`<i style='color: #F62459'>Yet#0001</i>`], 120, 500, () => {
        timeouts.push(
          setTimeout(() => {
            if (app.skippedIntro) return;

            clearCursor();

            setTimeout(() => {
              skipIntro();
            }, 500);
          }, 1000)
        );
      });
    });
  });
});

const skipIntro = () => {
  if (app.skippedIntro) return;

  app.skippedIntro = true;

  timeouts.forEach((timeout) => {
    clearTimeout(timeout);
  });

  $('.top-right').remove();

  $('#main').fadeOut(100, () => {
    $('#main').remove();

    $('#marquee').marquee({
      duration: 15000,
      gap: 420,
      delayBeforeStart: 1000,
      direction: 'left',
      duplicated: true,
    });

    setTimeout(() => {
      $('.brand-header').animateCss(app.effects[Math.floor(Math.random() * app.effects.length)]);
    }, 200);

    setTimeout(() => {
      const typed = new Typed('#brand', {
        strings: app.brandDescription,
        typeSpeed: 40,

        onComplete: () => {
          clearCursor();
        },
      });
    }, 1350);

    setTimeout(() => {
      if (!app.shouldIgnoreVideo) {
        app.videoElement.play();
        app.audioElement.play();
      }

      app.videoElement.addEventListener(
        'timeupdate',
        () => {
          $.cookie('videoTime', app.videoElement.currentTime, { expires: 1 });
        },
        false
      );

      $('.marquee-container').css('visibility', 'visible').hide().fadeIn(100);

      $('.marquee-container').animateCss('zoomIn');

      $('.container').fadeIn();

      $('.background').fadeIn(200, () => {
        if (!app.shouldIgnoreVideo) $('#audio').animate({ volume: app.musicVolume }, app.musicFadeIn);
      });
    }, 200);
  });
};

const clearCursor = () => {
  return $('span').siblings('.typed-cursor').css('opacity', '0');
};
