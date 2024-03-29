import React from "react";
import directory from "../directory.json";

let classNameConfirmed = 'btn btn-success btn-lg';
let classNameUnknown = 'btn btn-secondary btn-lg';
let classNameExcluded = 'btn btn-danger btn-lg';
//this is for the button map function that doesnt work
// let clues = [
//     {
//         "id": 1,
//         "Name": "Freezing",
//     },
//     {
//         "id": 2,
//         "Name": "EMF5",
//     },
//     {
//         "id": 3,
//         "Name": "Orbs",
//     },
//     {
//         "id": 4,
//         "Name": "SpiritBox",
//     },
//     {
//         "id": 5,
//         "Name": "GhostWriting",
//     },
//     {
//         "id": 6,
//         "Name": "Fingerprints",
//     },
// ]
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
        FreezingIsAClue: 'Check this!',
        EMF5IsAClue: 'Check this!',
        OrbsIsAClue: 'Check this!',
        SpiritBoxIsAClue: 'Check this!',
        GhostWritingIsAClue: 'Check this!',
        FingerprintsIsAClue: 'Check this!'
    };
    // this function takes in the button value and assigns it to ghost attributes
    //based on that value it changes the state from unknown to confirmed to excluded and back to unknown in that order
    buttonPress = async event => {
        let ghostAttribute = event.target.value;
        // console.log('event.currentTarget ' + event.target);
        //gives an error identifier expected but that is a bogus error message
        switch (this.state.[ghostAttribute]) {
            case 'unknown':
                await this.setState({
                    [ghostAttribute]: 'confirmed'
                });
                event.target.className = classNameConfirmed;
                break;
            case 'confirmed':
                await this.setState({
                    [ghostAttribute]: 'excluded'
                });
                event.target.className = classNameExcluded;
                break;
            case 'excluded':
                await this.setState({
                    [ghostAttribute]: 'unknown'
                });
                event.target.className = classNameUnknown;
                break;
            default:
                console.log('ERROR default reached');
        }
        await this.renderList();
    };

    renderList = async () => {
        let freeze = this.state.Freezing;
        let EMF5 = this.state.EMF5;
        let Orbs = this.state.Orbs;
        let SpiritBox = this.state.SpiritBox;
        let GhostWriting = this.state.GhostWriting;
        let Fingerprints = this.state.Fingerprints;
        function ghostFilter(dir) {
            //if you look at the console log, this runs TWELVE times, and i dont know why
            console.log("inside ghost filter function");
            return (dir.Freezing === freeze || 'unknown' === freeze) &&
                (dir.EMF5 === EMF5 || 'unknown' === EMF5) &&
                (dir.Orbs === Orbs || 'unknown' === Orbs) &&
                (dir.SpiritBox === SpiritBox || 'unknown' === SpiritBox) &&
                (dir.GhostWriting === GhostWriting || 'unknown' === GhostWriting) &&
                (dir.Fingerprints === Fingerprints || 'unknown' === Fingerprints);
        }
        let FilteredGhostList = directory.filter(ghostFilter);
        await this.setState({ sortedList: FilteredGhostList });


        // section calculates what remaining clues are worth checking
        // basically if the filterghost list has ghosts in it, it will store the value into first result
        //it will then loop through the list of ghosts and if any any point a ghost is different than the first result
        //you know that the clue is worth searching for
        //if the list only contains 1 ghost, or if all ghosts have the same attribute, then the initial irrelevant state remains
        await this.setState({ FreezingIsAClue: 'irrelevant' });
        if (this.state.Freezing === 'unknown' && FilteredGhostList.length > 0) {
            let firstResult = FilteredGhostList[0].Freezing;
            for (let i = 0; i < FilteredGhostList.length; i++) {
                if (firstResult !== FilteredGhostList[i].Freezing) {
                    await this.setState({ FreezingIsAClue: 'Check this!' });
                }
            }
        }

        await this.setState({ EMF5IsAClue: 'irrelevant' });
        if (this.state.EMF5 === 'unknown' && FilteredGhostList.length > 0) {
            let firstResult = FilteredGhostList[0].EMF5;
            for (let i = 0; i < FilteredGhostList.length; i++) {
                if (firstResult !== FilteredGhostList[i].EMF5) {
                    await this.setState({ EMF5IsAClue: 'Check this!' });
                }
            }
        }

        await this.setState({ OrbsIsAClue: 'irrelevant' });
        if (this.state.Orbs === 'unknown' && FilteredGhostList.length > 0) {
            let firstResult = FilteredGhostList[0].Orbs;
            for (let i = 0; i < FilteredGhostList.length; i++) {
                if (firstResult !== FilteredGhostList[i].Orbs) {
                    await this.setState({ OrbsIsAClue: 'Check this!' });
                }
            }
        }

        await this.setState({ SpiritBoxIsAClue: 'irrelevant' });
        if (this.state.SpiritBox === 'unknown' && FilteredGhostList.length > 0) {
            let firstResult = FilteredGhostList[0].SpiritBox;
            for (let i = 0; i < FilteredGhostList.length; i++) {
                if (firstResult !== FilteredGhostList[i].SpiritBox) {
                    await this.setState({ SpiritBoxIsAClue: 'Check this!' });
                }
            }
        }

        await this.setState({ GhostWritingIsAClue: 'irrelevant' });
        if (this.state.GhostWriting === 'unknown' && FilteredGhostList.length > 0) {
            let firstResult = FilteredGhostList[0].GhostWriting;
            for (let i = 0; i < FilteredGhostList.length; i++) {
                if (firstResult !== FilteredGhostList[i].GhostWriting) {
                    await this.setState({ GhostWritingIsAClue: 'Check this!' });
                }
            }
        }

        await this.setState({ FingerprintsIsAClue: 'irrelevant' });
        if (this.state.Fingerprints === 'unknown' && FilteredGhostList.length > 0) {
            let firstResult = FilteredGhostList[0].Fingerprints;
            for (let i = 0; i < FilteredGhostList.length; i++) {
                if (firstResult !== FilteredGhostList[i].Fingerprints) {
                    await this.setState({ FingerprintsIsAClue: 'Check this!' });
                }
            }
        }
    };
    detailsbuttonPress = event => {
        if (event.target.nextSibling.className === 'collapse') {
            event.target.nextSibling.className = '';
        } else if (event.target.nextSibling.className === '') {
            event.target.nextSibling.className = 'collapse';
        }
    };


    resetButton = async event => {
        await this.setState({ FreezingIsAClue: 'Check this!' });
        await this.setState({ EMF5IsAClue: 'Check this!' });
        await this.setState({ OrbsIsAClue: 'Check this!' });
        await this.setState({ SpiritBoxIsAClue: 'Check this!' });
        await this.setState({ GhostWritingIsAClue: 'Check this!' });
        await this.setState({ FingerprintsIsAClue: 'Check this!' });

        await this.setState({ Freezing: 'unknown' });
        await this.setState({ EMF5: 'unknown' });
        await this.setState({ Orbs: 'unknown' });
        await this.setState({ SpiritBox: 'unknown' });
        await this.setState({ GhostWriting: 'unknown' });
        await this.setState({ Fingerprints: 'unknown' });
        await this.renderList();
        //this is put in to reload the page. everything is reset appropriately above BUT
        //the colors on all the buttons dont change back to grey. 

        //jquery could be used to find all buttons (other than the reset button) and reset their classnames?
        window.location.reload();
    };
    render() {
        return (
            <div>
                <div className="card-body">
                    {/* this isnt working, occasionally a button will click and update. also the confirmed unknown etc state is borked
                <div  className="buttongroup">
                    {clues.map(result => (
                        <button value={result.Name} type="button" className={classNameUnknown} key={result.id} onClick={this.buttonPress}>

                            <h2>{result.Name} </h2>
                            {this.state.{result.Name}}
                        </button>
                    ))}
                </div> */}
                    {/* button div */}
                    {/* if you assign html tags to the clues, the on click will not work properly. if you do current target, itll work, but then only change the word color */}
                    <div>
                        <button value="Freezing" type="button" className={classNameUnknown} onClick={this.buttonPress}>
                            Freezing
                            <br></br>
                            {this.state.Freezing}
                            <br></br>
                            ------
                            <br></br>
                            {this.state.FreezingIsAClue}
                        </button>
                        <button value="EMF5" type="button" className={classNameUnknown} onClick={this.buttonPress}>
                            EMF5
                            <br></br>
                            {this.state.EMF5}
                            <br></br>
                            ------
                            <br></br>
                            {this.state.EMF5IsAClue}
                        </button>
                        <button value="Orbs" type="button" className={classNameUnknown} onClick={this.buttonPress}>
                            Orbs
                            <br></br>
                            {this.state.Orbs}
                            <br></br>
                            ------
                            <br></br>
                            {this.state.OrbsIsAClue}
                        </button>
                        <button value="SpiritBox" type="button" className={classNameUnknown} onClick={this.buttonPress}>
                            SpiritBox
                            <br></br>
                            {this.state.SpiritBox}
                            <br></br>
                            ------
                            <br></br>
                            {this.state.SpiritBoxIsAClue}
                        </button>
                        <button value="GhostWriting" type="button" className={classNameUnknown} onClick={this.buttonPress}>
                            GhostWriting
                            <br></br>
                            {this.state.GhostWriting}
                            <br></br>
                            ------
                            <br></br>
                            {this.state.GhostWritingIsAClue}
                        </button>
                        <button value="Fingerprints" type="button" className={classNameUnknown} onClick={this.buttonPress}>
                            Fingerprints
                            <br></br>
                            {this.state.Fingerprints}
                            <br></br>
                            ------
                            <br></br>
                            {this.state.FingerprintsIsAClue}
                        </button>
                    </div>

                    <button value="Fingerprints" type="button" className="btn btn-warning btn-lg" onClick={this.resetButton}>
                        Reset All to
                            <br></br>
                            unknown
                        </button>
                    {/* list div */}
                    <ul className="list-group">
                        {this.state.sortedList.map(result => (
                            <li className="list-group-item" key={result.id}>

                                <h2>{result.Name} </h2>
                                <button value={result.Name} type="button" className="btn btn-primary" onClick={this.detailsbuttonPress}>
                                    Details
                                </button>
                                <div className='collapse' id={result.Name}>
                                    <div className="card card-body">
                                        <p><strong>Strengths --- </strong>{result.Strengths}</p>
                                        <p><strong>Weaknesses --- </strong>{result.Weaknesses}</p>
                                        <p><strong>Power --- </strong>{result.Power}</p>
                                        <p><strong>Notes --- </strong>{result.Notes}</p>
                                    </div>
                                </div>
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