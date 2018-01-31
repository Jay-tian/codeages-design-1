import Component from '../../js/component';

class Radio extends Component {
  constructor(props) {
    super();
    
    this.options = {
      parent: document,
    };

    Object.assign(this.options, props);

    this.init();
  }

  init() {
    this.events();
  }

  events() {
    $(this.options.parent).on('click.cd.radio', this.options.el, event => this.clickEvent(event));
  }

  clickEvent(event) {
    event.stopPropagation();
    let $this = $(event.currentTarget);

    $this.parent().addClass('checked')
         .siblings().removeClass('checked');

    this.emit('change', event, $this.val());
  }
}

export default Radio;
