define([], function() {

  let initialized = false;

  let Plugin = {
    initialize : function() {
      if (initialized) {
        return;
      }

      let ctaNav = document.querySelector('.dcf-cta');
      let ctaLinks = document.querySelectorAll('.dcf-link-cta');
      let ctaButtons = document.querySelectorAll('.dcf-btn-toggle-cta');
      let ctaLists = document.querySelectorAll('.dcf-list-cta');

      for (let i = 0; i < ctaLinks.length; i++) {
        let ctaLink = ctaLinks[i];
        ctaLink.setAttribute('hidden', '');
      }

      if (window.matchMedia('(max-width: 56.12em)').matches) {

        for (let i = 0; i < ctaLists.length; i++) {
          let ctaList = ctaLists[i];
          ctaList.removeAttribute('aria-expanded');
          ctaList.removeAttribute('hidden');
        }

      }

      if (window.matchMedia('(min-width: 56.12em)').matches) {

        for (let i = 0; i < ctaButtons.length; i++) {
          let ctaButton = ctaButtons[i];
          ctaButton.removeAttribute('hidden');
        }

        function onKeyUp(e) {
          if (e.keyCode === 27) {
            closeAllPopovers();
          }
        }

        let toggleButtonOnClick = function() {
          if (this.getAttribute('aria-pressed') == 'true') {
            closePopover(this);
          } else {
            openPopover(this);
          }
        };

        let openButtonOnMouseover = function() {
          if (this.getAttribute('aria-pressed') == 'false') {
            openPopover(this);
          }
        };

        let openPopover = function(ctabtn) {
          if (ctabtn.getAttribute('aria-pressed') == 'true') {
            // already open
            return;
          }
          closeAllPopovers();
          ctabtn.setAttribute('aria-pressed', 'true');
          ctabtn.nextElementSibling.setAttribute('aria-expanded', 'true');
          ctabtn.nextElementSibling.removeAttribute('hidden');
          ctabtn.focus();
          document.addEventListener('keyup', onKeyUp);
        };

        let closePopover = function(ctabtn) {
          if (ctabtn.getAttribute('aria-pressed') == 'false') {
            // already closed
            return;
          }

          ctabtn.setAttribute('aria-pressed', 'false');
          ctabtn.nextElementSibling.setAttribute('aria-expanded', 'false');
          ctabtn.nextElementSibling.setAttribute('hidden', '');
          ctabtn.focus();
          document.removeEventListener('keyup', onKeyUp);
        };

        let closeAllPopovers = function() {
          for (var i = 0; i < ctaButtons.length; ++i) {
            if (ctaButtons[i].getAttribute('aria-pressed') == 'true') {
              closePopover(ctaButtons[i]);
            }
          }
        }

        // Close all CTA Popovers when mouseleave CTA nav or open popovers
        ctaNav.addEventListener('mouseleave', closeAllPopovers);

        // Set events for each button in CTA nav
        for (let i = 0; i < ctaButtons.length; i++) {
          ctaButtons[i].addEventListener('click', toggleButtonOnClick);
          ctaButtons[i].addEventListener('mouseover', openButtonOnMouseover);
        }

      }
    }
  };

  return Plugin;
});
