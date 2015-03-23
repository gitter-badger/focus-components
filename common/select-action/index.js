var builder = require('focus').component.builder;
var React = require('react');
var Img = require('../img').component;


var selectActionMixin = {

    /**
     * Display name.
     */
    displayName: 'select-action',
    /**
     * Default props.
     * @returns {object} Defauilt props.
     */
    getDefaultProps: function(){
        return {
            operationList: [],
            style: 'dots-three-vertical'
        };
    },

    /**
     * Handle action on selected item.
     * @param {function} action Action to call
     * @returns {function} Function called when item is selected.
     * @private
     */
    _handleAction: function (action){
        return (event)=>{
            if(event) {
                event.preventDefault();
            }
            if(this.props.operationParam){
                action(this.props.operationParam);
            }else{
                action();
            }
        };
    },

    /**
     * Generate the list of actions.
     * @param {object} operationList List of operations.
     * @returns {Array} List of action in li component.
     * @private
     */
    _getList: function(operationList) {
        var liList = [];
        for (var key in operationList) {
            var operation = operationList[key];

            liList.push(<li key={key} onClick={this._handleAction(operation.action)} className={operation.style} ><a href="javascript:void(0)">{operation.label}</a></li>);
            if(operation.childOperationList) {
                liList.push(<li><ul>{this._getList(operation.childOperationList)}</ul></li>);
            }
        }
        return liList;
    },

    /**
     * Render the component.
     * @returns  {XML} Htm code.
     */
    render: function renderSelectAcion(){
        if(this.props.operationList.length == 0) {
            return <div/>;
        }
        var liList = this._getList(this.props.operationList);
        return (
            <div className="select-action btn-group">
                <a href={window.location.pathname} data-target="#" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"><Img src={this.props.style} /></a>
                <ul className="dropdown-menu">{liList}</ul>
            </div>);
    }


};

module.exports =  builder(selectActionMixin);
