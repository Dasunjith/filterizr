import { 
  debounce,
} from './utils';

class FilterControls {
  /**
   * @param {object} Filterizr keep a ref to the Filterizr object to control actions
   * @param {string} selector optionally the selector of the .filtr-controls, used when
   *                          there is a need to have multiple Filterizr instances
   */
  constructor(Filterizr, selector = '') {
    this.props = {
      Filterizr,
      selector
    }

    this.setupFilterControls();
    this.setupShuffleControls();
    this.setupSearchControls();
    this.setupSortControls();
  }

  /**
   * Sets up the controls for filtering
   */
  setupFilterControls() {
    const {
      Filterizr,
      selector
    } = this.props;

    // Single filter mode controls
    $(`${selector} *[data-filter]`).on('click', (evt) => {
      const $ctrl = $(evt.target);
      const targetFilter = $ctrl.attr('data-filter');

      // update active filter in Filterizr's options
      Filterizr.setOptions({
        filter: targetFilter,
      });

      Filterizr.filter(Filterizr.options.filter);
    });

    // Multifilter mode controls
    $(`${selector} *[data-multifilter]`).on('click', (evt) => {
      const $ctrl        = $(evt.target);
      const targetFilter = $ctrl.attr('data-multifilter');
      
      Filterizr.toggleFilter(targetFilter);
    });
  }

  /**
   * Sets up the controls for shuffling
   */
  setupShuffleControls() {
    const {
      Filterizr,
      selector
    } = this.props;

    $(`${selector} *[data-shuffle]`).on('click', (evt) => {
      Filterizr.shuffle();
    });
  }

  /**
   * Sets up the controls for searching
   */
  setupSearchControls() {
    const {
      Filterizr,
      selector
    } = this.props;

    const handler = 

    $(`${selector} *[data-search]`).on('keyup', debounce((evt) => {
      const $textfield = $(evt.target);
      const val = $textfield.val();
      
      Filterizr.props.searchTerm = val.toLowerCase();
      Filterizr.search(Filterizr.props.searchTerm);
    }, 250));
  }

  /*
   * Sets up the controls for sorting
   */
  setupSortControls() {
    const {
      Filterizr,
      selector
    } = this.props;

    $(`${selector} *[data-sortAsc]`).on('click', (evt) => {
      const sortAttr = $(`${selector} *[data-sortOrder]`).val();
      Filterizr.props.sortOrder = 'asc';
      Filterizr.sort(sortAttr, 'asc');
    });
    $(`${selector} *[data-sortDesc]`).on('click', (evt) => {
      const sortAttr = $(`${selector} *[data-sortOrder]`).val();
      Filterizr.props.sortOrder = 'desc';
      Filterizr.sort(sortAttr, 'desc');
    });
  }
}

export default FilterControls;
