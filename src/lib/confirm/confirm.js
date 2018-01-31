import Component from '../../js/component';

const TRANSITION_DURATION = 300;
const BACKDROP_TRANSITION_DURATION = 150;

class Confirm extends Component {
  constructor(props) {
    super();

    this.options = {
      title: '',
      content: '',
      okText: 'Confirm',
      cancelText: 'Cancel',
      className: '',
    };

    Object.assign(this.options, props);

    this.$modal = null;
    this.$backdrop =  null;
    this.$body = $(document.body);

    this.init();
  }

  init() {
    this.addDrop();

    let html = this.template();
    this.$modal = $(html);
    this.$modal.appendTo(this.$body.addClass('cd-modal-open'));

    setTimeout(() => {
      this.$modal.addClass('cd-in');
    }, TRANSITION_DURATION);

    this.events();
  }

  events() {
    this.$modal.on('click', '[data-toggle="cd-confirm-cancel"]', event => this.cancelEvent(event));
    this.$modal.on('click', '[data-toggle="cd-confirm-ok"]', event => this.okEvent(event));
  }

  cancelEvent(event) {
    this.rmConfirm(event);

    this.emit('cancel');
  }

  okEvent(event) {
    this.rmConfirm(event);

    this.emit('ok');
  }

  rmConfirm() {
    this.$modal.removeClass('cd-in');
    
    setTimeout(() => {
      this.$body.removeClass('cd-modal-open');
      this.$modal.remove();
      this.rmDrop();
    }, TRANSITION_DURATION);
  }

  template() {
    let modalHeader = this.options.title ? `
      <div class="modal-header">
        <h4 class="modal-title">${this.options.title}</h4>
      </div>
    ` : '';

    let modalBody = `
      <div class="modal-body">
        <div class="cd-pb24 cd-dark-major">
          ${this.options.content}
        </div>
      </div>
    `;

    let modalFooter = `
      <div class="modal-footer">
        <button class="cd-btn cd-btn-link-default cd-btn-lg" type="button" data-toggle="cd-confirm-cancel">
          ${this.options.cancelText}
        </button>
        <button class="cd-btn cd-btn-link-primary cd-btn-lg" type="button" data-toggle="cd-confirm-ok">
          ${this.options.okText}
        </button>
      </div>
    `;

    return `
      <div class="cd-modal ${this.options.className} cd-fade" style="display:block">
        <div class="cd-modal-dialog cd-modal-dialog-sm">
          <div class="modal-content">
            ${modalHeader}
            ${modalBody}
            ${modalFooter}
          </div>
        </div>
      </div>
    `;
  }

  rmDrop() {
    this.$backdrop.remove();
    this.$backdrop = null;
  }

  addDrop() {
    this.$backdrop = $(document.createElement('div'))
                      .addClass('cd-modal-backdrop cd-fade')
                      .appendTo(this.$body);

    setTimeout(() => {
      this.$backdrop.addClass('cd-in');
    }, BACKDROP_TRANSITION_DURATION);
  }
}

export default Confirm;
