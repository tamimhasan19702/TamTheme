/** @format */
import $ from "jquery";
import axios from "axios";
class Search {
  // discribe and create/initialize our object
  constructor() {
    this.searchOverlayHtml();
    this.resultsDiv = document.querySelector("#search-overlay__results");
    this.openButton = document.querySelector(".js-search-trigger");
    this.closeButton = document.querySelector(".search-overlay__close");
    this.searchOverlay = document.querySelector(".search-overlay");
    this.searchField = document.querySelector("#search-term");
    this.isSpinnerVisible = false;
    this.events();
    this.isOverlayOpen = false;
    this.typingTimer;
    this.previousValue;
  }

  // events
  events() {
    this.openButton.forEach((e) => {
      e.addEventListener("click", (event) => {
        event.preventDefault();
        this.openOverlay();
      });
    });

    this.closeButton.addEventListener("click", this.closeOverlay);
    document.addEventListener("keydown", (e) => this.keyPressDispatcher(e));
    this.searchField.addEventListener("keyup", this.typingLogic);
  }

  //   methods (function, action..)
  typingLogic() {
    if (this.searchField.val() != this.previousValue) {
      clearTimeout(this.typingTimer);

      if (this.searchField.val()) {
        if (!this.isSpinnerVisible) {
          this.resultsDiv.html('<div class="spinner-loader"></div>');
          this.isSpinnerVisible = true;
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 750);
      } else {
        this.resultsDiv.html("");
        this.isSpinnerVisible = false;
      }
    }
    this.previousValue = this.searchField.val();
  }

  async getResults() {
    try {
      const response = await axios.get(
        `${universityData.root_url}/wp-json/university/v1/search`,
        {
          params: {
            term: this.searchField.val(),
          },
        }
      );
      const results = response.data;

      this.resultsDiv.html(`
      <div className="row-results">
   
      <div className="one-third col-md-4">
      <h2 class="search-overlay__section-title">General Information</h2>
      ${
        results.generalInfo.length
          ? `<ul class="link-list min-list">`
          : `<p>No General Information Found for this Keyword`
      }
      ${results.generalInfo
        .map(
          (item) =>
            `<li><a href="${item.permalink}">${item.title}</a> ${
              item.postType == "post" ? ` by ${item.authorName}` : ``
            }</li>`
        )
        .join("")}
      ${results.generalInfo.length ? `</ul>` : `</p>`}
      </div>
      


      <div className="one-third col-md-4">

      <h2 class="search-overlay__section-title">Programs</h2>
      ${
        results.programs.length
          ? `<ul class="link-list min-list">`
          : `<p>No Programs Found for this Keyword. <a href="${universityData.root_url}/programs">View all the Programs here</a>`
      }
      ${results.programs
        .map((item) => `<li><a href="${item.permalink}">${item.title}</a></li>`)
        .join("")}
      ${results.programs.length ? `</ul>` : `</p>`}




     
      <h2 class="search-overlay__section-title">Professors</h2>
      ${
        results.professors.length
          ? `<ul class="link-list min-list">`
          : `<p>No Professors Found for this Keyword.`
      }
      ${results.professors
        .map(
          (item) => `
          <li class="professor-card__list-item">

          <a class="professor-card" href="${item.permalink}">
  
              <img class="professor-card__image" src="${item.image}">
  
              <span class="professor-card__name">
                 ${item.title}
              </span>
  
          </a>
      </li> 
        `
        )
        .join("")}
      ${results.professors.length ? `</ul>` : `</p>`}
      </div>
     



      <div className="one-third col-md-4">
      <h2 class="search-overlay__section-title">Campuses</h2>
      ${
        results.campuses.length
          ? `<ul class="link-list min-list">`
          : `<p>No Campus Location Found for this Keyword. <a href="${universityData.root_url}/campuses">View all the Campuses here</a>`
      }
      ${results.campuses
        .map((item) => `<li><a href="${item.permalink}">${item.title}</a></li>`)
        .join("")}
      ${results.campuses.length ? `</ul>` : `</p>`}







      <h2 class="search-overlay__section-title">Events</h2>
      ${
        results.events.length
          ? ` `
          : `<p>No Events Found for this Keyword. <a href="${universityData.root_url}/events">View all the Events here</a>`
      }
      ${results.events
        .map(
          (item) =>
            `
            <div class="event-summary">
    <a class="event-summary__date t-center" href="${item.permalink}">
        <span class="event-summary__month">
            ${item.month}
        </span>
        <span class="event-summary__day">
            ${item.date}
        </span>
    </a>

    <div class="event-summary__content">
        <h5 class="event-summary__title headline headline--tiny"><a href="${item.permalink}">
                ${item.title}
            </a>
        </h5>
        <p>
            ${item.excerpt}
            <a href="${item.permalink}" class="nu gray">Read more</a>
        </p>
    </div>
</div>
            
            `
        )
        .join("")}
      ${results.events.length ? `` : `</p>`}
      </div>
      </div>
      `);
      this.isSpinnerVisible = false;
    } catch (err) {
      console.log(err);
    }
  }

  keyPressDispatcher(e) {
    const isInputFocused =
      document.querySelector("input, textarea") === document.activeElement;

    if (e.keyCode === 83 && !this.isOverlayOpen && !isInputFocused) {
      this.openOverlay();
    }

    if (e.keyCode === 27 && this.isOverlayOpen) {
      this.closeOverlay();
    }
  }
openOverlay() {
  this.searchOverlay.classList.add("search-overlay--active");
  document.body.classList.add("body-no-scroll");
  this.searchField.value = "";
  setTimeout(() => this.searchField.focus(), 301);
  this.isOverlayOpen = true;
}
  }

closeOverlay() {
    this.searchOverlay.classList.remove("search-overlay--active");
    document.body.classList.remove("body-no-scroll");
    this.isOverlayOpen = false;
}

  searchOverlayHtml() {
    $("body").append(`
    <div class="search-overlay ">
    <div class="search-overlay__top">
        <div class="container">
            <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
            <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term">
            <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
        </div>
    </div>

    <div class="container">
        <div id="search-overlay__results"></div>
    </div>
</div>
    `);
  }
}

export default Search;
