import React from "react";
import directory from "../directory.json";

class Wrapper extends React.Component {
    // options for the ghost will be confirmed unknown or excluded clicking will cycle through the states
    state = {
        sortedList: directory,
        Freezing: 'unknown',
        EMF5: 'unknown',
        Orbs: 'unknown',
        SpiritBox: 'unknown',
        GhostWriting: 'unknown',
        Fingerprints: 'unknown',
    };

    // this function takes in the button value and assigns it to ghost attributes
    //based on that value it changes the state from unknown to confirmed to excluded and back to unknown in that order
    buttonPress = event => {
        let ghostAttribute = event.target.value;
        // console.log(ghostAttribute);
        //gives and error identifier expected but that is a bogus error message
        switch (this.state.[ghostAttribute]) {
            case 'unknown':
                console.log('unknown to confirmed');
                this.setState({
                    [ghostAttribute]: 'confirmed'
                });
                break;
            case 'confirmed':
                console.log('confirmed to excluded');
                this.setState({
                    [ghostAttribute]: 'excluded'
                });
                break;
            case 'excluded':
                console.log('excluded to unknown');
                this.setState({
                    [ghostAttribute]: 'unknown'
                });
                break;
            default:
                console.log('ERROR default reached');
        }
        this.renderList();
    };

    // var newArray = directory.filter(function (el) {
    //     return el.Freezing === this.state.Freezing &&
    //     el.EMF5 === this.state.EMF5 &&
    //     el.Orbs === this.state.Orbs &&
    //     el.SpiritBox === this.state.SpiritBox &&
    //     el.GhostWriting === this.state.GhostWriting &&
    //     el.Fingerprints === this.state.Fingerprints
    // });

    renderList = () => {

        console.log('render list function reached');
        console.log(this.state);

        function ghostFilter(dir) {
            console.log("inside ghost filter function");

            console.log(dir);

            return dir.Freezing === "confirmed";
        }

        this.setState({ sortedList: directory.filter(ghostFilter) })


        // this.setState({ sortedList: directory.sort((a, b) => (a.Freezing > b.Freezing) ? 1 : -1) })
        // this.setState({ sortedList: directory.filter() })
    };


    render() {
        return (
            <div>
                <div className="card-body">

                    {/* button div */}
                    <div>
                        <button value="Freezing" onClick={this.buttonPress}>
                            Freezing
                        </button>{" "}
                    </div>
                    <div>
                        <button value="EMF5" onClick={this.buttonPress}>
                            EMF5
                        </button>{" "}
                    </div>
                    <div>
                        <button value="Orbs" onClick={this.buttonPress}>
                            Orbs
                        </button>{" "}
                    </div>
                    <div>
                        <button value="SpiritBox" onClick={this.buttonPress}>
                            Spirit Box
                        </button>{" "}
                    </div>
                    <div>
                        <button value="GhostWriting" onClick={this.buttonPress}>
                            Ghost Writing
                        </button>{" "}
                    </div>
                    <div>
                        <button value="Fingerprints" onClick={this.buttonPress}>
                            Fingerprints
                        </button>{" "}
                    </div>

                    {/* button div */}



                    {/* list div */}
                    <ul className="list-group">
                        {this.state.sortedList.map(result => (
                            <li className="list-group-item" key={result.id}>
                                {result.Name} --- {result.Strengths} --- {result.Weaknesses}
                            </li>
                        ))}
                    </ul>
                    {/* list div */}
                </div>
            </div>
        );
    }
}
export default Wrapper;