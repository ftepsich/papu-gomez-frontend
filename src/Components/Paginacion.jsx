import React, { Component } from 'react';

class Paginacion extends Component {
    constructor(props){
        super(props);
        this.state = {
            elemxpage: 10,
            ncols: 0,
            nitems: 0,
            npages: 0
        };
    }

    componentDidMount() {
        let ncols = this.props.rhead.length;
        this.setState({
            ncols,
            nitems: this.props.rbody.length,
            npages: this.props.rbody.length/10
        });
    }

    generalChangePage = (element) => {
    let rows = document.getElementsByClassName("pagination-body"),
        pages = document.getElementsByClassName("pagination-list-item"),
        iPage = parseInt(element.dataset.key);
    Array.prototype.forEach.call( rows, (row,i) => { row.classList.add("hide"); });
    Array.prototype.forEach.call( pages, (page,i) => { page.classList.remove("active"); });
    element.classList.add("active");
    for(let i=(iPage-1)*this.state.elemxpage,j=0; j<this.state.elemxpage && i<rows.length; j++,i++){
        rows[i].classList.remove("hide");
    }
    }

    changePage = (event) => {
        if(!event.target.classList.contains("active")){
            this.generalChangePage(event.target);
        }
    }

    changePagePrev = () => {
        let pageActiveNow = document.getElementsByClassName("pagination-list")[0].querySelector(".active");
        if( pageActiveNow.dataset.key !== "1") {
            this.generalChangePage(pageActiveNow.previousSibling);
        }
    }

    changePageNext = () => {
        let pageActiveNow = document.getElementsByClassName("pagination-list")[0].querySelector(".active");
        if( pageActiveNow.dataset.key !== document.getElementsByClassName("pagination-list-item").length ) {
            this.generalChangePage(pageActiveNow.nextSibling);
        }
    }

    renderInfoUI = (draw = false, row = null) => { 
        if(this.props.info){ 
            return <div className="pagination-col-item">{ draw ? row[this.props.info] : ""}</div>
        }
    }
    renderEditUI = (draw = false, row = null) => { 
        if(this.props.info){ 
            return <div className="pagination-col-item">{ draw ? row[this.props.edit] : ""}</div>
        }
    }
    renderDeleteUI = (draw = false, row = null) => { 
        if(this.props.delete){
            return <div className="pagination-col-item">{ draw ? row[this.props.delete] : ""}</div>
        }
    }

    render(){
        return (
            <div className="pagination">
                <div className="pagination-nav">
                    <div className="pagination-list-item-prev" onClick={this.changePagePrev}>Anterior</div>
                    <div className="pagination-list">
                        {(() => {
                            let paginationItem = [],
                                npages = Math.ceil(this.props.rbody.length/10);
                            paginationItem.push(
                                <div className="pagination-list-item active" data-key="1" onClick={this.changePage} key="1">{1}</div>
                            );
                            for(let i=2; i<=npages; i++){
                                paginationItem.push(
                                    <div className="pagination-list-item" data-key={i} onClick={this.changePage}  key={i}>{i}</div>
                                );
                            }
                            return paginationItem;
                        })()}
                    </div>
                    <div className="pagination-list-item-next" data-key="next" onClick={this.changePageNext}>Siguiente</div>
                </div>
                <div className="pagination-row pagination-head">
                    { this.props.rhead.map( (ecol, key) => 
                        <div className={`pagination-${this.state.ncols}-col`} key={key}>
                            {ecol}
                        </div>
                    )}
                    {this.renderInfoUI()}
                    {this.renderEditUI()}
                    {this.renderDeleteUI()}
                </div>
                { this.props.rbody.map( (row, key) =>
                    <div className={(() => {
                        return `pagination-row pagination-body ${key < 10 ? "" : "hide"}`;
                    })()} key={key}>
                        { row.map( (ecol,kitem) => `${kitem}` !== this.props.info && `${kitem}` !== this.props.delete && `${kitem}` !== this.props.edit ?
                            <div className={`pagination-${this.state.ncols}-col`} key={kitem}>
                                {ecol !== "null" ? ecol : "-"}
                            </div> : null
                        )}
                        {this.renderInfoUI(true, row)}
                        {this.renderEditUI(true, row)}
                        {this.renderDeleteUI(true, row)}
                    </div>
                )}
            </div>
        )
    }
}

export default Paginacion;