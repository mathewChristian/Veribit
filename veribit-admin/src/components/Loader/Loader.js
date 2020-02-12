import React, { PureComponent } from "react";

class Loader extends PureComponent {
    state = {}
    render() {
        return (

            <div className="spinner">
                <div className="spinner-text">Loading..</div>
                <div className="spinner-sector spinner-sector-slate"></div>
                <div className="spinner-sector spinner-sector-yellow"></div>
                <div className="spinner-sector spinner-sector-black"></div>
            </div>

        );
    }
}

export default Loader;