let assign = require('object-assign');
let keys = require('lodash/object/keys');
/**
 * Infinite scroll mixin.
 * @type {Object}
 */
let InfiniteScrollPageMixin = {
    /**
     * Initial state for a scrolling page.
     * @returns {*} the initial state
     */
    getInitialState() {
        return assign({
                hasMoreData: false,
                currentPage: 1
            },
            this.getScrollState()
        );
    },

    /**
     * Next page fetch action handler.
     */
      fetchNextPage() {
        this.setState({
            isLoading: true,
            currentPage: this.state.currentPage + 1
        }, this.search);
    },
    /**
     * State for a no fetch search.
     * @returns {object} current page set to 1.
     */
      getNoFetchState() {
        return {
            currentPage: 1
        };
    },

    /**
     * current state of the scrolling list.
     * @returns {*} the scroll state
     */
    getScrollState() {
        if (this.props.store) {
            let data = this.props.store.get();
            let hasMoreData = data.pageInfos && data.map && data.pageInfos.totalPages && data.pageInfos.currentPage < data.pageInfos.totalPages && keys(data.map).length === 1;
            let totalRecords = data.pageInfos ? data.pageInfos.totalRecords : undefined;
            return {
                map: data.map,
                hasMoreData,
                totalRecords,
                isLoading: false
            };
        } else {
            return {};
        }
    }
};

module.exports = {mixin: InfiniteScrollPageMixin};
