export class Navigation {
  constructor() {
    this.nav = document.getElementById('pageNav');
    this.bullets = this.nav.querySelectorAll('.navigation__item');
    this.init();
  }

  handleClick(e) {
    if (e.closest('.navigation__item') && this.bullets.length) {
      this.bullets.forEach(bullet => bullet.classList.remove('_active'));
      e.closest('.navigation__item').classList.add('_active');
    }
  }

  init() {
    const _this = this;

    // listeners
    this.nav.addEventListener('click', function (e) {
      _this.handleClick(e.target);
    });
  }
}
