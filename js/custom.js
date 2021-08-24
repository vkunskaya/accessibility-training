(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}


(function() {
  const baseContent = [
    document.querySelector('header'),
    document.querySelector('main'),
    document.querySelector('footer'),
  ];
  const modalsList = [
    {
      buttonId: 'card-modal-button', 
      modalId: 'modal-card',
    },
    {
      buttonId: 'image1-modal-button',
      modalId: 'modal-image1',
    },
    {
      buttonId: 'image2-modal-button',
      modalId: 'modal-image2',
    }
  ];

  function getOtherModals(modalId) {
    const otherModalsIds = modalsList.reduce((acc, { modalId: id }) => {
      if (id !== modalId) {
        acc.push(id);
      }

      return acc;
    }, []);

    return otherModalsIds.map(id => document.querySelector(`#${id}`));
  }

  function setClickHandler({ buttonId, modalId }) {
    const modalButton = document.querySelector(`#${buttonId}`);
    const modal = document.querySelector("#" + modalButton.dataset.target);
    const modalHeader = modal.querySelector("#" + modal.getAttribute('aria-labelledby'));
    const modalCloseButtton = modal.querySelector('.modal-close');
    const content = [...baseContent, ...getOtherModals(modalId)];

    modalButton.addEventListener("click", function() {
      content.forEach(element => element.setAttribute('aria-hidden', true));
      modalHeader.focus();
    });

    modalCloseButtton.addEventListener('click', () => {
      content.forEach(element => element.setAttribute('aria-hidden', false));
    });
  }

  modalsList.forEach(setClickHandler);
})();

(function() {
  const timerRoot = document.querySelector('#update-timer');
  let content = parseInt(timerRoot.textContent);
  function updateTimer() {
    content += 1;
    timerRoot.textContent = `update ${content}`;
  }
  setInterval(updateTimer, 60000);
})();


(function () {
  const keys = {
    end: 35,
    home: 36,
    left: 37,
    right: 39,
    enter: 13,
    space: 32
  };

    // Add or subtract depending on key pressed
    var direction = {
      37: -1,
      39: 1,
    };

  function keydownEventListener (event) {
    const key = event.keyCode;

    switch (key) {
      case keys.end:
        event.preventDefault();
        // Activate last tab
        focusLastTab();
        break;
      case keys.home:
        event.preventDefault();
        // Activate first tab
        focusFirstTab();
        break;
    }
  }

  function keyupEventListener (event) {
    var key = event.keyCode;

    switch (key) {
      case keys.left:
      case keys.right:
        switchTabOnArrowPress(event);
        break;

      case keys.enter:
      case keys.space:
        activateTab(event.target);
        break;
    }
  }

  function addListeners (tab, index) {
    tab.addEventListener('keydown', keydownEventListener);
    tab.addEventListener('keyup', keyupEventListener);

    // Build an array with all tabs (<button>s) in it
    tab.index = index;
  }

  const tabs = document.querySelectorAll('[role="tab"]');
  const panels = document.querySelectorAll('[role="tabpanel"]');

  tabs.forEach(addListeners);

    // Either focus the next, previous, first, or last tab
  // depending on key pressed
  function switchTabOnArrowPress (event) {
    var pressed = event.keyCode;

    if (direction[pressed]) {
      var target = event.target;
      if (target.index !== undefined) {
        if (tabs[target.index + direction[pressed]]) {
          tabs[target.index + direction[pressed]].focus();
        }
        else if (pressed === keys.left) {
          focusLastTab();
        }
        else if (pressed === keys.right) {
          focusFirstTab();
        }
      }
    }
  }

  // Activates any given tab panel
  function activateTab (tab) {
    // Deactivate all other tabs
    deactivateTabs();

    // Remove tabindex attribute
    tab.removeAttribute('tabindex');

    // Set the tab as selected
    tab.setAttribute('aria-selected', 'true');

    // Get the value of aria-controls (which is an ID)
    var controls = tab.getAttribute('aria-controls');

    // Set is-active class to tab panel to make it visible
    document.getElementById(controls).classList.add('is-active');
  }

  // Deactivate all tabs and tab panels
  function deactivateTabs () {
    tabs.forEach(tab => {
      tab.setAttribute('tabindex', '-1');
      tab.setAttribute('aria-selected', 'false');
    })

    panels.forEach(panel => {
      if (panel.classList.contains('is-active')) {
        panel.classList.remove('is-active');
      }
    })
  }

  // Make a guess
  function focusFirstTab () {
    tabs[0].focus();
  }

  // Make a guess
  function focusLastTab () {
    tabs[tabs.length - 1].focus();
  }
})();
